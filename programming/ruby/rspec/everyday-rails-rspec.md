# Philosophy
  
- Tests should be reliable.
- Tests should be easy to write.
- Tests should be easy to understand.
- We do not focus on speed.
- We do not focus on being overtly DRY.

## Gemzorz: 

    rspec-rails: Rails wrapper for rspec
    factory_girl_rails: Replaces fixtures with factories.
    faker: Generates names, emails addresses, other placeholders for factories.
    capybara: Makes it easy to programmatically simulate your users' interactions with your web application.
    database_cleaner: Helps make sure each spec run in RSpec begins with a clean state
    launchy: Opens your default web browser on demand to show you what your application is rendering.
    selenium_webdriver: Lets you do JS-based browser interactions with capybara

`rspec-rails` and `factory_girl_rails` are used in both the development and test environments, specifically by generators. The others are only used when you actually run your specs, so they're not necessary to load in development.

This also ensures that gems used solely for generating code or running tests aren't installed in your production environment when you deploy to your server.

To make sure there is a db to talk to: `$ bundle exec rake db:create:all`.

#### Installing RSpec

    $ bundle exec rails generate rspec:install

#### Generators

Thanks to the beauty of Railsties, just by loading `rspec-rails` and `factory_girl_rails`, Rails' stock generators will no longer generate the default Test::Unit files in tests, they'll generate RSpec files in `spec`.

You can manually specify settings for Rails' stock generators:

> config/application.rb

    config.generators do |g|
      g.test_framework :rspec,

> Generate a fixture for each model, using a Factory Girl factory

        fixtures: true,

> Skip generating view specs (we use feature specs in this book)

        view_specs: false,

> Skip helper specs

        helper_specs: false,

> Skip routing specs (for simple apps this is okay)

        routing_specs: false,
        controller_specs:true,

> We skip integration tests in spec/requests for now

        request_specs: false

> Generate factories instead of fixtures.

      g.fixture_replacement :factory_girl, dir: "spec/factories"
    end

#### Alvays be cloning

Every time you use `rake db:migrate`, you need to mirror that change in your database with `rake:db:test:clone`. Unknown db error = you havne't cloned yet.

This is chainable with rake `db:migrate:db:test:clone` or you can use the shortcut `rmigc` to run a migration and clone the database with a single command.

## Model Specs

A model spec should include tests for the following:

- The model's create method, when passed attributes, should be valid.
- Data that fail validations should not be valid.
- Class and instance methods perform as expected.

`Contact` model:

    describe Contact do
      it "is valid with a firstname, lastname, and email"
      it "is invalid without a firstname"
      it "is invalid without a lastname"
      it "is invalid without an email address"
      it "is invalid with a duplicate email address"
      it "returns a contact's full name as a string"

Best practices:

- It describes a set of expectations of what the `Contact` model should look like.
- Each example only expects one thing. Firstname, lastname, and email validations are tested separately, so even if an example fails, I know it's because of what specific validation.
- Each example is explicit.
- __Each example's description begins with a verb, not _should_.__ Readability is important!

When we add models via `model` or `scaffold`, the model spec file will be added automatically.

#### The new RSpec syntax

> Old
    
    it "is true when true" do
      true.should_be true
    end

> New syntax

    it "is true when true" do
      expect(true).to be_true
    end

Use the new syntax only, bitches!

    describe Contact do
      it "is valid with a firstname, lastname, and email" do
        contact = Contact.new(
          firstname: "Aaron",
          lastname: "Sumner",
          email: "tester@example.com")
        expect(contact).to be_valid
      end
    end

#### Testing validations

    it "is invalid without a firstname" do
      expect(Contact.new(firstname: nil)).to have(1).errors_on(:firstname)
    end

It's easier to omit validations than you might imagine. __More importantly, if you think about what validations should have _while_ writing tests, you are more likely to remember to include them.__

Testing duplicate email:

    describe Contact do
      it "is invalid with a duplicate email address" do
        contact = Contact.create(
          firstname: "Joe",
          lastname: "Tester",
          email: "tester@example.com")
        contact = Contact.new(
          firstname: "Joey",
          lastname: "Tester",
          email: "tester@example.com")
        expect(contact).to have(1).errors_on(:email)
      end
    end

We needed to persist the first contact in order to make the second contact not pass.

#### Testing instance methods

> models/contact.rb

    def name
      [firstname, lastname].join(' ')
    end

> spec/models/contact_spec.rb

    it "returns a contact's full name as a string" do
      contact = Contact.new(firstname: "John", lastname: "Doe")
      expect(contact.name).to eq "John Doe"
    end

RSpec prefers `eq` to `==` to indicate an expectation of equality.

#### Testing class methods and scopes

    def self.by_letter(letter)
      where("lastname LIKE ?", "#{letter}%").order(:lastname)
    end

    it "returns a sorted array of results that match" do
      smith = Contact.create(firstname: "John", lastname: "Smith")
      jones = Contact.create(firstname: "Tim", lastname: "Jones")
      johnson = Contact.create(firstname: "John", lastname: "Johnson")

> We are also testing the sort order

      expect(Contact.by_letter("J")).to eq [johnson, jones]
      expect(Contact.by_letter("J")).to_not include smith
    end

#### DRYer specs with describe, context, before, after

While describe/context are interchangeable, I use it like this: describe outlines general functionality and context outlines a specific state.

    describe Contact
      describe "filter last name by letter" do
        before :each do
          # initialize the guys, they have to be instance vars at this point.
        end

        context "matching letters" do
          # matching examples
        end
        
        context "non-matching letters" do
          # non-matching examples
        end

`before` means this is run before `each` example within the describe, but not outside of that block.

Some developers prefer to user methods names for the descriptions of the nested describes, but I don't do it, because I believe the label should define _the behavior of the code_ and not _the name of the method_.

Regarding DRYness, optimize for readability. If you find yourself scrolling up and down a large spec file, consider duplicating your test data setup within smaller `describe` blocks.

#### Summary

- __Use active, explicit expectations.__ Use verbs to explain what an examples' results should be. Only check for one result per example.
- __Test for what you expect to happen and for what you expect to not happen.__
- __Test for edge cases.__
- __Organize your specs for good readability.__




