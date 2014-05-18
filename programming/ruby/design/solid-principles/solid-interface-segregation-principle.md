# Interface Segregation Principle

*Clients should not be forced to depend on methods that they do not use.*

This isn't much of a problem in Ruby, but it's worth going through this in the sense that we might use that.

This is a Java example from `capybara-webkit`:

    public class WebPage # or interface?
      public String currentUrl() {};
      public void setUrl(String url) { };
      public String[] consoleMessages() { };
      public String[] alertMessages() { };
      public String[] confirmMessages() { };
      public String[] promptMessage() { };
    }

The problem is that if something else wants to use the URL, you pass in a `WebPage` as opposed to something that can have a URL (other things can not have URLs anyway). What we can do is to segregate the interfaces into two:

    public class WebPage implements HasUrl, HasMessages

So we can pass in things like `HasUrl` and `HasMessages` instead of an entire `WebPage`.

In Ruby, you can just pass something that responds to `currentUrl` (duck typing).

> AR class

    class Article < AR::Base
      def self.latest
        order('created_at DESC').limit(5)
      end

      def self.popular
        order('popularity DESC').limit(5)
      end
    end

> `FrontPage` service object

    class FrontPage
      def initialize(articles, user)
        @articles = articles
        @user = user
      end

      # We just show the latest and the popular articles.
      def articles
        @article.latest + @article.popular
      end
    end

The problem with Ruby and AR is that the interface is so wide! We can abuse this! Joe creates a new interface for this in a query object. This is why we not only want to have small interfaces, we want to have small classes and small objects.

"If it quacks like a duck, it's probably a duck *so let's assume it has feathers, a beak, and won't drown in water.*"

