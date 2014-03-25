# Nobody Will Train You But You
[link](http://www.confreaks.com/videos/2427-railsconf2013-nobody-will-train-you-but-you)

Googled Rails - April 2012. Junior Dev - August 2012. Developer - October 2012. Test Double - April 2013. RailsConf - April 2013.

People are waiting for something. Month after month, they look at the Sundays and they can't stand going to work on the Monday.

The "do what you love", only you can do it.

After 2 months, you are still expected to suck.

On his browser, he had a ton of Purple links on whatever we were working on. Then after doing what we're doing, we forgot what they were.

When you go to the web, each time you do a search, you can write them down on an index card.

Recipes: regex, `config.each_with_object` and `inject`. Do you know it off the top of your head?

When you're fluent enough in Ruby that you don't need to go back to the web because you at least know what is supposed to happen.

Does this help though when you want to learn Law of Demeter or Composition over Inheritance though?

When I was doing tests without following the Law of Demeter, it just came to a point where I knew that if I change something in the app a lot of things change in a different part.

*If Google has the world's answers, the Github has the world's window.*

"Process can not be inferred from product any more than a pig can be inferred from a sausage. It is possible, however, for us to follow the process forware from blank page to final draft and learn something of what happens."

Build an app with Corey Haines, Objects on Rails, Sucks Rocks. This was the perfect tutorial for me. We're creating a web app. It's hitting an external API, with a database, with API. Every single line of the code is being typed and commited.

I've treated each episode of Sucks -> Rocks as a Kata. I've watched each 4-5 times. It took me 40 hours to memorize this tutorial.

Testing the interface vs testing the implementation: This works in the S-R app.

    class SearchEngine
      def self.count_results(query)
        google = Google::Search::Web.new(:query => query)
        google.response.estimated_count
      end
    end

This was originally in Bing, and I swapped it out for Google in 2 lines of production code. 0 lines of test code changed. This of course is a subset of the SRP.

## Single Responsibility

    class CachedScores < AR::Base
      attr_accessible :term, :score
      class NoScore < RuntimeError; end

      def self.for_term(term)
        cached_score = find_by_term(term) or raise NoScore
        result = cached_score.score
        result || RockScore::NoScore
      end

      def self.save_score(term, score)
        score = nil if score == RockScore::NoScore
        create!(:term => term, :score => :score)
      end
    end

At no point do we allow an AR method to leave the model. `for_term`, `save_score`, that's the API.

By myself, the app would look like this:

    JSON API - Controller - Cache Logic
    Domain Logic - Model - 3rd-Party - Database

I have tests first, but things are smeared all over the system.

When tests are used to drive control over the system, they look like this:

    JSON-API <-> Controller
                    V
                Cache logic -> Domain logic -> 3rd-Party
                    V
                Model -> Database

This is also where I started to fight `Nil`. I hate you `undefined method 'each' for nil:NilClass`. Things can go jump and jump around because of `nil` because when ActiveRecord doesn't find something it returns a `nil`.

So this is how I structure code now, using a Sentinel object.

    class Performance
      NoScore = Class.new

      def self.for_employee(employee)
        hits = MetricsService.get employee
        value = calculate_for_employee hits
        value || NoScore
      end
    end

At least we have something to represent the "nothing of a class". So it's nice by the way to actually have things in your Toolbox.

Memorizing a good tutorial made me a better developer. I'm writing tests that test meaningful things. I have more resilient tests now and now I'm faster because I know everything already. And now, I have the confidence to start with a PORO. And every time I think about this, I go back to the `tryruby.org`.

*"See the very best programmers, the ones that work where they want because their resume is their name, the ones that wouldn't put up with a depressing Sunday because they didn't want to go work the next Monday, because every single day, they're just doing the thing they love so much, the very best programmers didn't get that way through hard work or "trying to get better", they got that way because they're having so much freaking fun, they couldn't bear to put down the keyboard."*
