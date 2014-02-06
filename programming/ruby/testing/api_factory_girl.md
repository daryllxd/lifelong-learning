## Defining factories

    # This will guess the User class
    FactoryGirl.define do
      factory :user do
        first_name "John"
        last_name  "Doe"
        admin false
      end

      # This will use the User class (Admin would have been guessed)
      factory :admin, class: User do
        first_name "Admin"
        last_name  "User"
        admin      true
      end
    end

__It is highly recommended that you have one factory for each class that provides the simplest set of attributes necessary to create an instance of that class.__ If you're creating ActiveRecord objects, that means that you should only provide attributes that are required through validations and that do not have defaults. Other factories can be created through inheritance to cover common scenarios for each class.

