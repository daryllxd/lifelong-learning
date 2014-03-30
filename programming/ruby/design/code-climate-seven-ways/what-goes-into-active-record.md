# What Goes Into Active Records
Destroy All Software! 36-37

Goal: Things that wrap the database in thin ways and hide the database details from outside.

What I don't want: Application logic. Pretty much anything with a conditional.

## Stuff that belongs

- AR relationships: You don't gain anything by putting this in a mixin. You don't decrease coupling but you reduce locality of the code.
- Devise stuff: Removing this = Added complexity.
- `attr_accessible` 
- They belong because they are methods called directly on the AR Class.

      def paid_for_by_someone_else?
        payer_relationships.any?
      end

This is a very thin wrapper around checking if there is someone has paid for. The problem is that we are not looking for the array of payers but we are looking if someone has paid for the account. So stubs:

    stub(:payer_relationships => [stub]) # not relevant

> Good

    stub(:paid_for_by_someone_else? => true) # more relevant

Better showing of goal and intent of the goal to test. That's the goal for an AR class. I'm providing that thin layer over the database, and the goal of the layer is to provide terminology that is a closer match to the application logic, than thinking of database concerns. Basically "what I want from the database".

Validations: You can't really take it out.

Mutation method: `pay_through`. Can be across multiple other fields as well.

Wrapper method, such as the `paid_for_by_someone_else` method. The goal is to provide an interface to the database fields so you are not coupling to the names of the fields and the natures of the relationships.

Simple stuff only. No conditionals.

Query method such as `newest_subscriber`. DO NOT CALL WHERE OUTSIDE OF AN AR CLASS. You couple yourself to the database fields.

Create methods.

## Stuff That Doesn't Belong

- AR callbacks such as `before_create` and `before_save`. They are a bad idea because we try to hit the BrainTree API every time a user is created. Every time a test creates a user, it stubs out the Braintree API call, so you have to stub this using `fake_braintree`. Higher level domain logic about users are created are not needed in the system.
- `add_one_month_of_credit!` straddles the boundary between mapping to db and application logic. The logic of computing the date is extracted to something outside the class, and the attribute updating is left.  

      def pay_through(paid_through_date)
        self.paid_through_date = paid_through_date
        self.save!
      end

    We need to include the save so that when we stub the method, we just do one action. Compare

      user = stub
      user.should_receive(:paid_through_date).with(Date.today)
      user.should_receive(:save!)

    With:

      user = stub
      user.should_receive(:pay_through).with(Date.today)

    We are also not coupling through to a database as in example 1. We are just presenting the idea that a user can pay through something, given a date as opposed to the actual naming of the field.

- `next_billing_date`, which is used only in the view, will be moved to a presenter.

