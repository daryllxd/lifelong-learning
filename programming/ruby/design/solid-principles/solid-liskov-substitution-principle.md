# Weekly Iteration 15: Single Responsibility Principle

"A class should have only one reason to change."

Why? Clarity. Optimize for readability first.

First, you can remove everything that is not related to `ActiveRecord` in `ActiveRecord` models.

Second, classes that are readable are better. We can remove the token creation thing and turn it into a decorator.

    class TokenizedModel < SimpleDelegator
      def save
        __getobj__.token ||= SecureRandom.urlsafe_base64
        __getobjt__.save
      end

      def to_param
        __getobj__.token
      end
    end

This has nothing to do with AR models which is good. Secondly, we can write easier tests for created classes.

    describe Invitation do
      describe '#to_param' do
        it 'returns a token after saving' do
          invitation = create(:invitation)
          expect(invitation.token).to be_present
        end

        it 'returns a unique token for each invitation' do
          invitation = create(:invitation)
          other_invitation = create(:invitation)

          expect(invitation.token).not_to eq(other_invitation.token)
        end
      end
    end

This test is sort of slow because it is full stack. We can have a faster test like this:

    describe TokenGenerator do
      describe '#generate' do
        it 'returns a token' do
          generator = TokenGenerator.new

          expect(generator.token).to be_present
        end

        it 'returns a unique token' do
          generator = TokenGenerator.new

          expect(generator.token).not_to eq(generator.token)
        end
      end
    end

This depends on literally nothing except for passed parameters in any time. This is an example of tests driving cleaner design.

A trend with SOLID is that classes have just one reason to change. Dave Thomas says that that's just his method for code quality--how easy is it to change?

In a lot of ways, to make things easier to change, you want things to be done in isolation.

You can just write the two things that you care about in your head and in your test.

The principle defines that there should be one reason to change (one responsibility).

In `Invitation`, we change it when we find a bug in our email validation, we change it when we change the logic of setting a token, and we change it when we change our invitation method, we change the deliver method, we also change it when we need to change our persistence model.

Every piece of a class should be strongly related to each other. Bad examples: `module Utils`, `application_helper`, `ApplicationController`.

The `Address` model was not very cohesive, in some regards it is but it isn't that cohesive.

This is an example of a cohesive address model:

    class Email
      def initialize(string)
        @string = string
      end

      def valid?
        @string =~ something
      end

      def domain
        @string.split('@').last
      end

      def to_s
        @string
      end
    end

Literally everything has to do with email and it just involves one variable. Everything has to do with email and one piece of state. If a class isn't highly cohesive, then it doesn't follow SRP.

You'll just discover that "oh yeah that's the method for the thing."

The issue is that you sometimes keep on moving responsibilities. SRP shows me which classes are responsibility magnets. Check out the gem `churn`, you'll figure out what classes are the ones that change the most, and most probably those are responsibility magnets. *These classes are magnets for bugs.*

In every Rails app, we try to follow separation of concern. 3 ways:

- Logic about modelling and business logic
- Logic about presenting data to the user
- Logic about UI and control flow

We separate these concerns by default, but by doing that, we find it hard to follow Tell, Don't Ask. We value SRP higher than TDA, because if we follow TDA, we will violate SRP by putting view code in a controller whenever controllers make a decision.

You kind of have to figure out the middle ground to know which one matters.

We often ignore TDA during the view. That's just how it is in MVC.

