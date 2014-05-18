# Background Jobs with Resque
[link](http://tutorials.jumpstartlab.com/topics/performance/background_jobs.html)

The solution to long-running requests: return a successful response, then resque some computation to happen later, outside the origin request/response cycle.

## Common Areas

- Data processing (generating thumbnails or resizing images)
- 3rd Party APIs
- Maintenance (expiring old sessions and sweeping caches)
- Sending Email

*Applications with good OO design make it easy to send jobs to workers, poor OO makes it hard to extract jobs since responsibilities tend to overlap.*

    $ brew install redis
    gem 'resque'

## A fake delay

    class ArticlesController < ApplicationController
      # more code goes here

      def create
        @article = Article.new(params[:article])

        if @article.save
          sleep(5) # !!!!

          flash[:notice] = "Article was created."
          redirect_to articles_path
        else
          render :new
        end
      end
    end

There is a 5 seconds delay with the `sleep(5)`. Let's move that fake process to a background job.

## Writing a Job

A good practice is to create an `app/jobs` folder and store your job classes there. *A Resque job is any Ruby class or module with a `perform` clas method.*

    class Sleeper
      @queue = :sleep

      def self.perform(seconds)
        sleep(seconds)
      end
    end

Resque can maintain multiple queues for different job types. By setting the `@queue` class instance variable, this worker will only look for jobs on the `:sleep` queue.

## Queueing a Job

    Resque.enqueue(Sleeper, 5)

The parameters will be serialized as JSON and appended onto the Redis queue specified in the job class. The above call would be added to the `sleep` queue with the following JSON:

    {
      'class': 'Sleeper',
      'args': [ 5 ]
    }

Now we can do this:

    def create
      ...
      if @article.save
        Resque.enqueue(Sleeper, 5)

        flash[:notice] ...
        redirect_to ...
      end

*Jobs should only need to access your models. If you're tempted to trigger a controller action, it' a sign that the controller action is holding domain logic which needs to be pushed down to the model.*

When a job is created it gets appended to a list data structure in Redis. A Resque worker will then try to process the job.

## Monitoring the Resque Queue

Resque provides a Sinatra application as a web interface to monitor the status of your queues & workers and to view statistics of the instance.

    mount Resque::Server.new, at: "/resque" # localhost:3000/resque to check out the web backend.

- Overview: List of queues and workers.
- Failed: Shows which jobs failed along with the exception that was thrown.
- Workers: Shows a lits of workers and their status.
- Stat: Displays overall stats of the Resque instance as well as a listing of all the keys in Redis.

## Starting Up the Workers

    require 'resque/tasks' at the top of your Rakefile
    $ bundle exec rake -T resque

    rake:resque:failures:sort # Sorts the failed queue for the failure backend
    rake resque:work          # Start a Resque worker
    rake resque:workers       # Start multiple Resque workers

You can control these tasks with environment variables:

    QUEUE - controls which queue to monitor
    COUNT - sets the number of workers

    $ bundle exec rake environment resque:work QUEUE=sleep

Once the rake task starts it will begin processing jobs from the queue, and now the delay is gone.

## Additional Rake Tasks

    $ rake resque:work QUEUE=sleep # Save memory and startup time by skipping access to Rails

> `config/initializers/resque.rb`

    Resque.logger.formatter = Resque::QuietFormatter.new # default
    Resque.logger.formatter = Resque::VerboseFormatter.new
    Resque.logger.formatter = Resque::VeryVerboseFormatter.new

## Queuing Calculations

    def show
      @articles = Article.for_dashboard
      @article_count = Article.count
      @article_word_count = Article.total_word_count
      @most_popular_article = Article.most_popular

      @comments = Comment.for_dashboard
      @comment_count = Comment.count
      @comment_word_count = Comment.total_word_count
    end

Total word count is implemented as follows:

    def self.total_word_count
      all.inject(0) {|total, a| total += a.word_count }
    end

What happens is that each viewing of the dashboard causes a calculation involving each comment or article to be run... This should be cached or be calculated in the background.

## Word Count

Create `lib/tasks/resque` and add the following line:

    require 'resque/tasks'

To replace the `Comment.total_word_count`, we create `app/jobs/comment_total_word_count.rb`:

    class CommentTotalWordCount
      @queue = :total_word_count

      def self.perform
        Comment.total_word_count
      end
    end

*We've moved the call that calculates total count of words for comments into a job method, moving the slow operation away from the request-response cycle. Now we can store this value not in the database, but in Redis.*

No need to add `redis` gem to the Gemfile since Resque has it declared as a dependency. We still have to bring a Redis endpoint into our Rails application so that we can easily access the memory store.

> `config/initializers/redis.rb`

    class DataCache
      def self.data
        @data ||= Redis.new(host: 'localhost', port: 6379)
      end

> Redis wrappers for setting, getting, and getting an integer.

      def self.set(key, value)
        data.set(key, value)
      end

      def self.get(key)
        data.get(key)
      end

      def self.get_i(key)
        data.get(key).to_i
      end
    end

Restarting the Rails server then leads us to have a globally-available handle on our Redis store.

> New Resque job

    class CommentTotalWordCount
      @queue = :total_word_count

      def self.perform
        DataCache.set 'comment_total_word_count', Comment.total_word_count
      end
    end

Run the Resque worker processor: `bundle exec rake environment resque:work QUEUE=total_word_count`

When do we enqueue the job? After we make a new comment.

    class CommentsController
      def create
        article = Article.find(params[:comment][:article_id])
        comment = article.comments.create(params[:comment])

        Resque.enqueue(CommentTotalWordCount)
        ,,,
      end
    end

We store the current total word count after each comment is created so it can be retrieved later. Back in the dashboard controller:

    @comment_word_count = DataCache.get_i('comment_total_word_count')

## Refactoring to a Cleaner Approach

Better if we put the "getting the word count" and "calculating the new word count" back into the model, so the controller won't know the underlying implementation.

    class Comment
      def self.calculate_total_word_count
        total = all.inject(0) {|total, a| total += a.word_count }
        DataCache.set 'comment/total_word_count', total
      end

      def self.total_word_count
        DataCache.get_i('comment/total_word_count')
      end
    end

We can then revert the perform method back to where it was:

    def self.perform
      # DataCache.set 'comment_total_word_count', Comment.total_word_count
      Comment.calculate_total_word_count
    end

So with the dashboard controller:

    def show
      # @comment_word_count = DataCache.get_i('comment_total_word_count')
      @comment_word_count = Comment.total_word_count
    end

*Before we startd to implement the job pattern, the `DashboardController` was unaware of the calculation that `Comment.total_word_count` did.* Now, it's still ignorant of the background work and caching going on behind the scenes.

# Introducing Resque
[link](https://github.com/blog/542-introducing-resque)

- SQS: Limitation was latency.
- ActiveMessaging: Our jobs should be Ruby classes or objects, not subclasses of some framework's design.
- BackgroundJob loaded the entire Rails environment for each job.
- DelayedJob was better since you don't have to load Rails every tie but the queries become expensive when you have a lot of jobs pending (say 30,000).
- Beanstalkd was fast and has constant time push/pop, but it didn't have some DJ features: seeing failed jobs, pending jobs, manipulating the queue.

We wanted this:

Persistence, see what's pending, modify pending jobs in-place, tags, priorities, fast pushing/popping, see what workers are doing/have done, see failed jobs, kill fat, stale, and long-running workers, keep Rails loaded, distributed workers, don't retry failed jobs, don't release failed jobs.

Redis has: atomic, O(1) list push/pop, ability to paginate over lists without mutating them, queryable keyspace, fast, easy to install, reliable Ruby client, can store arbitrary strings, has support for integer counters, persistent, has master-slave replication, and is network aware.
