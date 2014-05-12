# Weekly Iteration 17: Liskov Substitution Principle

    class Signup
      def initialize(attributes)
        @attributes = attributes
      end

      def save
        account = Account.create!(@attributes[:account])
        account.users.create!(@attributes)
      end
    end

When you make subclasses, your interactions have to be the same as the superclass. Make sure you follow the contract or you will have problems.

For the receipt, you could probably just make a `NullReceipt`..
