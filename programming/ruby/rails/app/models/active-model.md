## ActiveModel: Make Any Ruby Object Feel Like ActiveRecord
[link](http://yehudakatz.com/2010/01/10/activemodel-make-any-ruby-object-feel-like-activerecord/)

ActiveModel API: The interface that models must adhere to in order to gain compatibility with ActionPack's helpers.

To ensure model compliance, ActiveModel comes with a module called `ActiveModelLint` that you can include into your test cases to test compliance with the API.

#### AM Modules

*The Validations System.*

    class Person
      include ActiveModel::Validations

      validates_presence_of :first_name, :last_name

      attr_accessor :first_name, :last_name
      def initialize(first_name, last_name)
        @first_name, @last_name = first_name, last_name
      end
    end

The validations system calls `read_attribute_for_validation` to get the attribute, but by default, it aliases that method to `send`, which supports the standard Ruby attribute system of `attr_accessor`.

*Others*

- `AttributeMethods`: Makes it easy to add attributes that are set.
- `Callbacks`: ActiveRecord-style lifecycle callbacks.
- `Dirty`: Support for dirty tracking.
- `Naming`: default implementations of `model.model_name`.
- `Observing`: AR-style observers.
- `StateMachine`: Simple state-machine implementation for models.
- `Translation`: Core translation support.

## RailsCasts 219: Active Model

When you think of moving things from tables to non-tables you have to consider your requirements and make sure that your really don't want to store the data from the form in a database as there are often good side-effects to doing this.

AM: Everything that is in AR but isn't specific to the database backend.

- `ActiveModel::Conversion`: Provides the `to_key` methods.
- `ActiveModel::Naming`: `extend`, not include, since it has class methods.
- `ActiveModel::Lint::Tests`: Shows the methods that the model needs to respond to in order for it to work as it should.
