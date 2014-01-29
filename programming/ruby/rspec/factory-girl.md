## Documentation

    gem "factory_girl_rails", "~> 4.0"
    gem "factory_girl", "~> 4.0"

> Set it up on rspec and cucumber, so no more `FactoryGirl.something`.

    # rspec
    RSpec.configure do |config|
      config.include FactoryGirl::Syntax::Methods
    end

    # Cucumber (Just paste this in the env.rb file)
    World(FactoryGirl::Syntax::Methods)

> Defining factories: Each factory has a name and set of attributes. The name is used to guess the class of the object by default, but it's possible to explicitly specify it.

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

> Using factories

    # Returns a User instance that's not saved
    user = build(:user)

    # Returns a saved User instance
    user = create(:user)

    # Returns a hash of attributes that can be used to build a User instance
    attrs = attributes_for(:user)

    # Returns an object with all defined attributes stubbed out
    stub = build_stubbed(:user)

    # Passing a block to any of the methods above will yield the return object
    create(:user) do |user|
      user.posts.create(attributes_for(:post))
    end

> Lazy attributes: By default, the attrs are static. Dynamically generated attributes need values assigned by passing a block in.

    factory :user do
      # ...
      activation_code { User.generate_activation_code }
      date_of_birth   { 21.years.ago }
    end

















