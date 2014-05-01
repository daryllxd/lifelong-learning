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
- *Each example's description begins with a verb, not _should_.* Readability is important!

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

It's easier to omit validations than you might imagine. *More importantly, if you think about what validations should have _while_ writing tests, you are more likely to remember to include them.*

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

> *models/contact.rb*

    def name
      [firstname, lastname].join(' ')
    end

> *spec/models/contact_spec.rb*

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

- *Use active, explicit expectations.* Use verbs to explain what an examples' results should be. Only check for one result per example.
- *Test for what you expect to happen and for what you expect to not happen.*
- *Test for edge cases.*
- *Organize your specs for good readability.*

#### Generating tests

Out of the box, Rails provides a means of quickly generating sample data called _fixtures_. This is a YAML file.

Problem: Fixtures can be easily broken, and Rails bypasses Active Record when it loads fixture data into your test database. This means that validations are ignored. Bad!

Factories are simple, flexible, building blocks for testing data. Con: Even DHH said that factories are a primary cause of slow test suites.

> *spec/factories/contacts.rb*

    FactoryGirl.define do
      factory :contact do
        firstname "John"
        lastname "Doe"
        sequence(:email) { |n| "johndoe#{n}@example.com" }
      end
    end

Filenames for factories aren't as particular as for specs, just store them in `spec/factories/`. Convention is: `spec/factories/contacts.rb` for the Contact model.

Update the code. (The created contact doesn't persist.)

    describe Contact do
      it "has a valid factory" do
        expect(FactoryGirl.build(:contact)).to be_valid
      end

      it "is invalid without a firstname" do
        contact = FactoryGirl.build(:contact, firstname: nil)
        expect(contact).to have(1).errors_on(:firstname)
      end

#### Association and Inheritance in Factories

> *spec/factories/phones.rb*

    FactoryGirl.define do
      factory :phone do
        association :contact
        phone { '123-555-1234' }
        phone_type 'home'

        factory :home_phone do
          phone_type 'home'
        end

        factory :work_phone do
          phone_type 'work'
        end

        factory :mobile_phone do
          phone_type 'mobile'
        end

      end
    end

> *spec/models/phones_spec.rb*

    describe Phone do
      it "does not allow duplicate phone numbers per contact" do
        contact = create(:contact)

> You have to explicitly tell the phone to share the same contact.

        create(:home_phone, contact: contact, phone: "785-555-1234")
        mobile_phone = build(:mobile_phone, contact: contact, phone: "785-555-1234")

        expect(mobile_phone).to have(1).errors_on(:phone)
      end

      it "allows two contacts to share a phone number" do
        create(:home_phone, phone: "785-555-1234")
        expect(build(:home_phone, phone: "785-555-1234")).to be_valid
      end
    end

#### Generating more realistic fake data + Advanced associations/ Factory Girl callbacks

> spec/factories/contacts.rb

    require 'faker'

    FactoryGirl.define do
      factory :contact do

> User ffaker to generate fake data

        firstname { Faker::Name.first_name }
        lastname { Faker::Name.last_name }
        sequence(:email) { Faker::Internet.email }

> After build callback to populate stuff

        after(:build) do |contact|
          [:home_phone, :work_phone, :mobile_phone].each do |phone|
            contact.phones << FactoryGirl.build(:phone, phone_type: phone, contact: contact)
          end
        end
      end
    end

> Test if they have 3 phone numbers. spec/models/contact_spec.rb.

    it "has three phone numbers" do
      expect(create(:contact).phones.count).to eq 3
    end

> Add a verification to the number of phones. app/models/contact.rb

    validates :phones, length: { is: 3 }

While generating associations with factories is an easy way to ramp up tests, it's also an easy feature to abuse and often a culprit when test suites' running times slow to a crawl. When that happens, it's better to remove associations from factories and build up test data manually, or do PORO.
