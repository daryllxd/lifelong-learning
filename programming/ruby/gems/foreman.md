# Introducing Foreman
[link](http://blog.daviddollar.org/2011/05/06/introducing-foreman.html)

Splitting an app up with jobs/workers/scheduling is great for performance and scalability. The downside is that it becomes much more complicated to get the app and all its parts running.

Using Foreman, you can declare the various processes that are needed to run your application using a `Procfile`.

    web: bundle exec thin start -p $PORT
    worker: bundle exec rake resque:work QUEUE=*
    clock: bundle exec rake resque:scheduler

    $ bundle install
    $ foreman start

Foreman will start all of the processes associated with your app and display `stdout` and `stderr` of each process.

# Railscasts 281: Foreman

    $ foreman start faye        # Starts faye only
    $ foreman start -c worker=4 # We start multiple copies of a process
    $ foreman export upstart    # Foreman will write a number of upstart configuration files to the current directory.

# Foreman Manual
[link](http://ddollar.github.io/foreman/)

    -c, --concurrency: Specify number of each process type to run, process=num, process=num
    -e, --env: Specify one or more .env files to load
    -f, --procfile: Specify an alternate procfile to load
    -p, --port: Specify port to use as base for this application
