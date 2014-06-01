# DAS 7: Growing a Test Suite

Why did we edit the previous test and instantiate a `null_object`? Better to just have 1 case for each of the `if` blocks.

    class Walrus
      attr_reader :energy

      def initialize
        @energy = 0
      end

      def receive_gift!(gift)
        if gift.edible?
          gift.digest!
          @energy += 100
        end
      end
    end

    describe Walrus do

> We make a direct mock expectation that a method is called, and that something has changed.

      it "gains energy by eating food" do
        cheese = stub(:edible => true)
        cheese.should_receive(:digest!)
        expect do
          subject.receive_gift!(cheese)
        end.to change { subject.energy }.by 100
      end

      it "ignores non-edible things" do
        shoes = stub(:edible? => fasle)
        expect do
          subject.receive_gift!(shoes)
        end.not_to change { subject.energy }
      end
    end

# DAS 10: Fast Tests with and Without Rails

Rails has a nasty startup time. It makes writing fast tests difficult.

`bundle check` then `bundle install` means you don't hit the Gem index.

Test speed are dependent on the Gemfile!

It is always faster to run the specs without the `spec_helper`.


    class ANiceWalk
      def self.for(person)
        raise CantWalkWithoutPets.new if person.pets.empty? # Put the guard at the start
        person.update_attributes(:happiness => 20)
      end
    end

> Tests

    require 'a_nice_walk'

    describe ANiceWalk do
      context 'without a pet' do
        it 'is impossible' do
          alice = stub(pets: [])
          expect do
            ANiceWalk.for(alice)
          end.to raise_error CantWalkWithoutPets
        end
      end

      context 'ith a pet' do
        it 'mkes the walker happy' do
          alice = stub(pets: [stub])
          alice.should_receieve(:update_attributes).with(happiness: 20)
          ANiceWalk.for(alice)
        end
      end
    end

In isolated specs, the specs should be really big at first! BTW to figure out how long the specs are, don't run `rake` because it loads Rails twice. Faster also if `rspec spec` as opposed to `bundle exec rspec spec`. The reason they run fast because they run outside of Rails (without `spec_helper`).

Better to speed up tests by not requiring `spec_helper` as opposed to performance tools like Spork.

# DAS 22: Test Isolation and Refactoring

    class ConfirmsTransparentRedirect
      def self.confirm!(query_string)
        confirmation = BraintreeWrapper::TransparentRedirect.confirm(query_string)
        if confirmation.has_a_credit_card?
          build_credit_card(confirmation)
        else
          CreditCard.new
        end
      end

      def self.build_credit_card(confirmation)
        CreditCard.new.tap do |cc|
          cc.token = confirmation.token
          cc.country_name = confirmation.country_name
          cc.zip_code = confirmation.postal_code
        end
      end
    end

# DAS 32: Performance of Different Test Sizes

- Behavior spec (`page.should_have content`): 705ms
- Controller spec (`response.body.should contain`): 186ms
- View spec (just check the rendering): 36ms
- Model spec: 3ms

Use `active_support` for the `1.day.ago`.

The spec times are exponential. These are exponential without the feature spec.
