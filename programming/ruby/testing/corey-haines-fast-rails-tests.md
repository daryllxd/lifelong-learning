# Fast Rails Tests - Corey Haines
[link](http://www.confreaks.com/videos/2133-arrrrcamp2011-fast-rails-tests)

When tests run super long you just don't want to run tests anymore. The TDD cycle, the second-by-second thing we do to execute our system, is to run test, see they pass, write small test to say that your system does _this_, then make red, then simplest code possible to get test to pass, then run test again. In your cycle, you take about a minute per change.

The thing about Rails was when you do `rails new`, you have the `tests` folder. Also, a lot of people used to have the N+1 problem, but in Rails we don't have that problem. Then we figured out skinny, controller fat models. Our tests gave us the confidence that things are still working even as we refactor. We have this safety net, the tests. They verify that we aren't breaking anything. We don't have a QA department anymore.

There's a fundamental difference between *Tests First* and  *Test-Driven*. Test-driven means that you are also thinking of the design, in tests first you change the tests if they fail.

Instead of putting band-aids like Spork, ask yourself, what can you do to your design to make your things more testable. Design = better design. My definition of a better design is very simple. It's one that is easy to change. You can talk about individual parts and patterns like cohesion, coupling, etc., but they are all about how they are easy to change. Testable code is about having good design. We can react to the pain of testing not with band-aids like Spork, but with a better design.

The core problem of slow Rails tests are not the hitting the database thing, that is why we mock it. The important thing is to isolate things. The huge core dependency is Rails itself. So why not react to the pain of testing from isolating yourself from the core thing that gives you pain, Rails itself.

Ex:

    def total_price
      products.map(&:price).inject(0, &:+)
    end

Nothing here depends on Rails. We live in a wonderful language where things are duck-typed. The goal is, what are some ways that we can make our business logic isolated from our third-party dependency, Rails itself.

*The simplest way is to take the methods out and put them somewhere else.* So where do we put that code? (Not in lib, please.) The code you end up writing usually ends up as a namespace, right? So the idea is, why not build something there? `app/speedy_shop/calculates_total_price.rb` and `spec/speedy_shop/calculates_total_price.rb`.

We don't `require spec_helper` because it requires Rails. We can just do this:

    require 'calculates_total_price'

    describe "Calculating the price" do
      it "returns 0" do
        CalculatesTotalPrice.of([]).should == 0
      end
    end

Then, when we run rspec, we bring the `models` directory in via: `rspec -I app/models/ spec/models/my_spec.rb`.

Now, we namespace some stuff:

> `calculates_total_price_spec.rb`

    require 'calculates_total_price'

    describe "Calculating the price" do
      it "returns 0" do
        SpeedyShop::CalculatesTotalPrice.of([]).should == 0
      end
    end

> `app/speedy_shop`

    module SpeedyShop
      class CalculatesTotalPrice
        def self.of(these)
        end
      end
    end

Since you don't have to wait a ton of time, you can do the really really simplest thing to pass such as 0.


    describe "Calculating the price" do
      it "returns 0" do
        SpeedyShop::CalculatesTotalPrice.of([stub(:price => 5,), stub(:price => 10)]).should == 15
      end
    end

Take advantage of of duck-typing in Ruby. You don't really need AR at this point, just mock it!

You can also stub out the Service Object in the AR model unit test.

    describe ShoppingCart do
      describe "#total_price" do
        it "returns the sum of the products price" do
          cart = ShoppingCart.create
          SpeedyShop::CalculatesTotalPrice.stub(:of) { 15 }
          cart.total_price.should == 15
        end
      end
    end

Then, we can include things as a module.

If the majority of your app is business logic, that shouldn't take you hours of wasted time.

So, what about your controllers and models and scopes? You still need them to act as your safety net. So for those, use Spork. But just try to extract stuff form the model, controller, etc.

- Set-up for Active Support? `active_support` is still fast enough to be required, too. So just do `require active_support` if you need.
- Gary Bernhardt, he has the thing to see if you need `spec_helper` or not.
- Domain layer? Yeah I guess we use it.
- Class method or instance method? On things like this I would put it on the class, because they are not much state-based.
- Fake AR? I'm not keen on it. You might as well be using Spork, because the effect of that is you want to speed up your dependency on Rails.
- Extracting things out and isolating yourself from the data is better design, I think.
- Integration tests are a scam?
