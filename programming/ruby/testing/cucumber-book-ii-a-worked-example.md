## Step Definitions: On the Inside

#### Sketching Out the Domain Model

When we start to build a new system, we like to work directly with the domain model. This allows us to iterate and learn quickly about the problem we’re working on without getting distracted by user interface gizmos.

Notice that we’re defining the class right here in our steps file. Don’t worry— it’s not going to stay here forever, but it’s most convenient for us to create it right here where we’re working. Once we have a clear idea of how we’re going to work with the class, then we can refactor and move it to a more permanent home. We’re also converting the amount captured from the Gherkin step as a string into a number before we pass it into the domain model.

There’s something else in the wording that bothers us. In the step, we talk about my account, which implies the existence of a protagonist in the scenario who has a relationship to the account, perhaps a Customer. This is a sign that we’re probably missing a domain concept. However, until we get to a scenario where we have to deal with more than one customer, we’d prefer to keep things simple and focus on designing the fewest classes we need to get this scenario running. So, we’ll park this concern for now.

Notice that we’re just sketching out the interface to the class, rather than adding any implementation to it. This way of working is fundamental to out- side-in development. We try not to think about how the Account is going to work yet but concentrate on what it should be able to do.

#### Removing Duplication with Transforms

Transforms work on captured arguments. Each transform is responsible for converting a certain captured string and turning it into something more meaningful.

    Transform /^\d+$/ do |number| 
        number.to_i
    end

#### Adding Custom Helper Methods to the World

Just before it executes each scenario, Cucumber creates a new object, __the World__. The step definitions for the scenario execute in the context of the World, effectively as though they were methods of that object. Just like methods on a regular Ruby class, we can use instance variables to pass state between step definitions.

We can use sucky instance variables and the problem is that if you don’t set them, they just return nil. We hate nils, because they creep around your system, causing weird bugs that are hard to track down.

To add custom methods to the World, you define them in a module and then tell Cucumber you want them to be mixed into your World.

> features/step_definitions/steps.rb

    module KnowsMyAccount
      def my_account
        @my_account ||= Account.new
      end
    end

    World(KnowsMyAccount)

> *.feature

    my_account.deposit(amount)
    my_account.balance.should eq(amount),
    "Expected the balance to be #{amount} but it was #{my_account.balance}"

#### Customizing the World

The main way you’ll use the World is by extending it with modules of code that support your step definitions by performing common actions against your system:

    module MyCustomHelperModule 
        def my_helper_method
        end 
    end

    World(MyCustomHelperModule)

Remember that a new world is created for each scenario, so it is destroyed at the end of the scenario. This helps isolate scenarios from one another, because any instance variables set during one scenario will be destroyed along with the world in which they were created when the scenario ends.

__Pushing some of the details down into our World module means the step definition code is at a higher level of abstraction.__ This makes it less of a mental leap when you come into the step definitions from a business-facing scenario, because the code doesn’t contain too much detail.

#### Organizing the Code

- The application’s domain model classes should go into a lib directory in the root of the project.
- The KnowsTheDomain module can move into its own file (`features/support/world_extensions.rb`).
- The transform can also move into its own file (`features/support/transforms.rb`).
-  The steps file can be split to organize the step definitions better. This is arguably unnecessary for a project with only three step definitions, but we’ll do it anyway to illustrate how we’d do this on a bigger project.

#### Booting the Cucumber Environment

When Cucumber first starts a test run, before it loads the step definitions, it loads the files in a directory called `features/support`.

Just like `features/step_definitions`, Cucumber will load all the Ruby files it finds in `features/support`.

The file `features/support/env.rb` is always the very first file to be loaded when Cucumber starts a test run. You use it to prepare the environment for the rest of your support and step definition code to operate. Loading our applica- tion is pretty fundamental to the test run, so move the require statement into your very first features/support/env.rb file.

Re: splitting the step definitions: one file per domain entity.

## Support Code

The `features/support` is the lowest level of your test code, where it connects or couples to your actual application. If this coupling is well-engineered, your tests will be a pleasure to modify as your project grows. If the coupling is too tight, your tests will be brittle and break any time anything moves.

That’s why we created a separation layer between the step definitions and the system using a module of helper methods mixed into the World. This separation layer provides just the decoupling we’ll need as we start to introduce a user interface.

In Extreme Programming Explained [Bec00], Kent Beck gives four criteria for a simple design. Most important first:

1. Passes all the tests
2. Reveals all the intention
3. Contains no duplication
4. Uses the fewest number of classes or methods

Make things more consistent, instead of withdraw/debit, either do withdraw/deposit or debit/credit.

#### Using Hooks

Cucumber supports hooks, which are blocks of code that run before or after each scenario.

> features/support/hooks.rb

    Before do 
        puts "Go!"
    end

    After do
        puts "Stop!"
    end

[TODO]

#### Step Definitions Are Global

When you define a step definition, it is defined globally. There is no way to reduce the scope of a step definition to certain scenarios like you can do with tagged hooks.

People occasionally ask for a way to scope step definitions in a similar way to tagged hooks, such as making When I turn it off invoke one step definition for some scenarios and another one for others.

_Feature-coupled steps is the extreme. The more subtle issue is that the beneficial pressure to grow a ubiquitous language goes away when it becomes too easy to say, “Oh, that’s just another context, I’ll use the same words to mean something different here.”_

When Dan North—the originator of BDD—wrote his first BDD framework, step defi- nitions were coupled to features. He told me the ability to have global step definitions shared across features was one of the improvements Cucumber brought on.

#### Building the User Interface [TODO]

Working outside-in with Cucumber blurs the lines between testing and devel- opment. Always be ready to learn something new about the problem domain, whether you’re deciding on the wording in a Cucumber scenario or choosing the parameters for a method.

## Dealing with Message Queues and Asynchronous Components

Adding asynchronous components into a system introduces a degree of ran- domness, but for our tests to be reliable, we need to ensure that the behavior is completely deterministic.

#### Synchronizing by Listening

Listening for events is the fastest and most reliable way to synchronize your tests with an asynchronous system. __For this technique to work, the system under test has to be designed to fire events when certain things happen.__ The tests subscribe to these events and can use them to create synchronization points in the scenario.

#### Delayed Job

Delayed Job is a popular gem for running background tasks asynchronously.

    module DelayedJobSupport
        def process_all_jobs

> Tell DJ to process all of the jobs in its queue. This is normally done by a background task in production.

            Delayed::Worker.new.work_off(Delayed::Job.count)
            if ENV['FAIL_FAST']
                raise Delayed::Job.first.last_error if Delayed::Job.count > 0
            end
        end
    end

#### Synchronization by Sampling

When it isn’t possible to listen to events from the system, the next best option is to repeatedly poll the system for the state change you’re expecting.

Sampling can result in tests that are a little bit slower than listening, because of the polling interval. The more often you poll the system for changes, the quicker the tests can react and carry on when the system is working as expected. If you poll too frequently, however, you could put excessive load on the system.

#### Implementing the New Architecture [TODO]

## Databases

Almost every system you’ll write Cucumber tests for will have a database of some kind, and it helps to know how to talk to it directly from your test code. You can use ActiveRecord to connect to almost any kind of database and set up or inspect its data from your tests. We’re going to show you how to use the ActiveRecord1 gem to connect to existing databases from just a few lines of Ruby code.

#### Introducing ActiveRecord

    class Account < ActiveRecord::Base 
    end

How does it know which table to look at? ActiveRecord espouses a principle of convention over configuration. This means that the expected name for the database table represented by the Account ActiveRecord class is accounts; if the table were named widgets, we’d call the class Widget. As long as we stick to those conventions, we get a lot of very useful behavior for very little code.

#### Managing Schema Changes with Migrations

ActiveRecord also provides a mechanism for dealing with changes to your database schema, which is great when you’re developing a database. Each incremental change to the schema is defined in a migration script. Each migration has a unique version number, and ActiveRecord stores these version numbers in a special table (schema_migrations) as they are applied to the database, meaning it can always tell which migrations need to be applied to bring a schema up-to-date.

####Reading and Writing to the Database

[TODO]

