    $ rails generate rspec:install # Add spec/spec_helper and .rspec

    $ bundle exec rspec

    # Run only model specs
    bundle exec rspec spec/models

    # Run only specs for AccountsController
    bundle exec rspec spec/controllers/accounts_controller_spec.rb

    RSpec generators can also be run independently.
    $ rails generate rspec:model widget # will create a new spec file in spec/models/widget_spec.rb.

    scaffold
    model
    controller
    helper
    view
    mailer
    observer
    integration
