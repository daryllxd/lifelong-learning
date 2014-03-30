# Part 1: Layered Architecture
[link](http://www.sitepoint.com/ddd-for-rails-developers-part-1-layered-architecture/)

## Layered Architecture

- User Interface - Responsible for showing information to the user and processing the user's input
- Application - Thin and does not contain application logic. Functionality such as generating reports, email, etc.
- Domain Layer - Described business proceses. Abstract domain concepts must be contained in this layer.
- Infrastructure Layer - Responsible for persistence, messaging, email delivery.

## Layered Architecture and Rails (Violations)

- Domain objects serialize themselves into JSON or XML. These are both parts of the UI layer, when you override `as_json` you violate the core idea of the layered architecture and change the direction of your dependencies between layers.
- Controllers contain big chunks of biz logic (usually a few calls to the domain layer).
- Domain objects do infrastructure tasks. So no fat controllers, now we have "Swiss army knife" domain objects. Some describe the business + connect to remote service + generate a pdf + send an email.
- Domain objects know too much about the database: If you extend DOs from AR you couple the domain layer to the infrastructure layer.

## Make a Separate Class for JSON Serialization

Make a separate class for JSON serialization -> If you aren't writing a JSON parser, move JSON out of domain (`Person`) and put it into a `PersonJsonSerializer`.

- Domain has no knowledge of UI.
- We split 2 responsibilities of the person (being a person, serializing to JSON).
- Easier to test. You can stub out the person in the serializer. You can also stub out the serializer in the controller.

*By default, `respond_with` calls `as_json` on the object you passed. It doesn't decouple model from serialization. But if you install `ActiveModel::Serializers` gem, `respond_with` will call the serializer of the passed object, not the object itself.*

## Controllers Don't Contain Any Logic

*Controllers should not contain any logic apart from parsing the user's input or rendering proper templates.*

> Bad:

    def sell_book
      @book = Book.find(params[:id])
      if book.sold?
        book.errors.add :base, "The book is already sold"
      else
        book.sell
      end
    end

> Better

    def sell_book
      @book = Book.find(params[:id])
      BookSellingService.sell_book(@book)
    end

Controller is easier to test because no conditional, and business logic is also easier to test (can exist without Rails).

## Domain Objects Should Not Know Anything About Infrastructure Underneath

The domain layer should be abstract. This means all dependencies on any kind of external services don't belong here. If you send out a tweet each time a post is published:

> Bad

    class Post < AR::Base
      after_create :send_tweet

      def send_tweet
        twitter = Twitter.login(username, password)
        twitter.send_tweet generate_tweet_from_subject(subject)
      end
    end

> Better

    class Post < AR:Base
      has_many :comments
    end

    class TwitterNotification < AR::Observer
      observe :post

      def after_create post
        twitter = Twitter.login(username, password)
        twitter.send_tweet (generate_tweet_from_subject)
      end
    end

> Best

    class TwitterNotification < AR::Obs
      def after_create post
        TwitterService.send_tweet post.subject
      end
    end

    class TwitterService
      def self.send_tweet subject
        twitter = Twitter.login(username, password)
        twitter.send_tweet generate_tweet_from_subject(subject)
      end
    end

The problem with the first is you have to stub out Twitter in all unit tests, and it violates the SRP because it stores stuff to the database and it also sends tweets. So we split out an observer on it. Twitter can also be unavailable and accessing it synchronously is not a good idea anyway.

Then we make a `TwitterService` to further separate things: We only need to test the `TwitterService` to test the Twitter connection. We also separate the core domain from the Twitter domain with an observer. It is easier to change the functionality of either `TwitterService` or the observer without affecting each other.

The Post model has no need to know to handle Twitter info, making connects, authenticating. The Notifier's responsibility is to respond to events that occur in the lifecycle of the model it was registered to observe. The responsibility of talking to Twitter is handled by a service object. With an `after_create` hook, every single test that attempts to create a Post model would try to contact Twitter.

## Isolate AR

Since the domain should be abstract, the database schema should not affect how we design our entities. The DDD approach is to extract a separate layer responsible for persistence. The DDD approach is to extract a separate layer responsible for persistence:

    class PostsRepository
      def find_by_id id
      end

      def new_posts_of_author author
      end

      def save post
      end
    end

Other approach: Model-based

    module PostsRepository
      def new_posts_of_author author
      end
    end

    class Post < AR::Base
      extend PostsRepository
    end

This provides separation of concerns. Posts is a business object and PostsRepository is responsible for persistence. This also makes mocking the persistent layer straightforward, and provides an in-memory implementation of `Repository`.
