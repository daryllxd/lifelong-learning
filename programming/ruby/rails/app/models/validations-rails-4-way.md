# Validations

Whenver possible, you should set validations for your models declaratively by using the AR class methods.

`validates_acceptance_of`: For checkbox things. `validates_acceptance of :privacy, :terms_of_service`. You can keep this in the database or not, for auditing or other reasons. Not accepting = no record created.

    class Cancellation < AR::Base
        validates_acceptance_of :account_cancellation, accept: 'YES'
    end

User would have to type the word _YES_ in order for the cancellation object to be valid.

`validates_confirmation_of`: This creates a virtual attribute for the confirmation value and compares the two attributes to make sure they match in order for the model to be valid.

    validates_confirmation_of :password

UI would need to include extra text fields marked with a `confirmation` suffix.

`validates_format_of`: Use a Ruby Regex. For Regexes you could separate them so easier to test.

    validates_format_of :name, with: SUPER_REGEX
    SUPER_REGEX = #{DOMAIN}|#{NUMERIC_IP}
    DOMAIN = ...
    NUMERIC_IP = ...

`validates_inclusion_of`/`validates_exclusion_of`

    validates_inclusion_of :gender, in: %w(m f), message: "O RLY?"
    validates_exclusion_of :username, in: %w(admin superuser), message: "Naughty!"

`validates_length_of` - can show error messages

    validates_length_of, :username, minimum: 5
    validates_length_of, :username, within: 5..20
    validates_length_of, :account_number, is: 16
    validates_length_of, :account_number, is: 16, wrong_length: "should be %{count} characters long"

`validates_numericality_of`

    validates_numericality_of :account_number, only_integer:true
    :equal_to, :greater_than....

`validates_inclusion_of`: Use this for checkboxes. Because blank is different from false.

    validates_inclusion_of :protected, in: [true, false]

`validates_uniqueness_of`: This works by querying for a matching record in the database, and if a record is returned, the validation fails.

    validates_uniqueness_of :username
    validates_uniqueness_of :line_two, scope: [:line_one, :city, :zip]

*This is no foolproof due to a potential race condition between the SELECT query that checks for duplicates and the `INSERT` or `UPDATE` which persists the record. An AR exception could be handled as a result. To fix, use a unique index constraint in the database.*

Constraint on lookup

    validates_uniqueness_of :title, conditions: -> { where.not(published_at: nil) }

When the model is saved, AR will query for title against all articles in the database that are published. If no results are returned, the model is valid.

#### `validates_with`

Used to develope a suite of custom, reusable validation classes.

To implement, extend `AR::Validator` and implement the `validate` method.

    class EmailValidator < ActiveRecord::Validator
        def validate()
            record.errors[:email] << "is not valid" unless
                record.email =~ REGEX
            end
        end
    end

    class Account
        validates_with EmailValidator
    end

`RecordInvalid`: When a validation on a band (`save!`) fails, prepare to rescue `ActiveRecord::RecordInvalid`. Validation failures will cause `RecordInvalid` to be raised.

#### Validation Options

`:message` - all methods have this option so you can override the default error message format. `count`, `model`, `attribute`, and `value` are always available.

    validates_uniqueness_of :username, message: "%{value} is already taken"
    validates_uniqueness_of :username, message: "%{model} is already taken"

`:on` - by default, validations are run on save (both create and update operations). So you can limit on create or on update.

    validates_uniquness_of :email, on: :create

This is helpful if you don't have a facility to change the email address anyway.

#### Conditional Validation

We have `:if` and `:unless` options to determine at runtime whether a validation has to be run or not.

Argument types

- Symbol: The name of a method to invoke as a symbol. (Most common option)
- String: A snipper of Ruby code to `eval` can be useful tbut this is actually slow.
- A block of code to be `instance_eval`'d, so that `self` is the current record.

Sample: The `if` and the method are symbols. They are executed when they need to be.

    validates :card_number, presence: true, if: :paid_with_card?

    def paid_with_card?
        payment_type == "card"
    end

#### Optional Validation from Controller

> We want to execute the validation only if we are really updating the password, say in an updating page, and when being created.

What happens is we can set up a variable to store whether "user is coming from the password change page" and not just randomly updating crap.

    validates_presence_of :password, if: :should_validate_password?

    def should_validate_password
        updating_password ||new_record?
    end

> Controller

    @user.updating_password = true
    @user.save

- `validates_absence_of`
- `validates_each`
- option `allow_blank`, `allow_nil`
- option `strict`
