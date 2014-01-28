## BDDinRails

RSpec’s extension library for Rails, rspec-rails, extends the Rails testing framework by offering separate classes for spec’ing Rails models, views, controllers, and even helpers, in complete isolation from one another.

#### BDD cycle 

1. Start with a scenario.
2. Run the scenario with Cucumber.
3. Step definition, write with Cucumber, make it fail.
4. View implementation with Red-green-refactor with RSpec.
5. Controller with Rspec.
6. Objects with Rspec.
7. Cucumber again.

#### Rspec parts.

- `spec`: Directory for the specs.
- `.rspec`: Options.
- `spec/spec_helper`: Used to load and configure rspec.
- `autotest/discover.rb`: Used by Autotest to discover what type of Autotest to load.

#### Cucumber parts.

- `config/cucumber.yml`: Used to store profiles that provide control over what features and scenarios to run.
- `script/cucumber`: Feature runner.
- `features/step_definitions`: Step definitions.
- `features/step_definitions/web_steps.rb`: For webapps, Webrat.
- `features/support`: Holds any Ruby code that needs to be loaded to run the scenarios.
- `features/support/env.rb`: Bootstraps and configures the Cucumber runner environment.
- `features/support/paths.rb`: Support for mapping descriptive page names used in the scenario steps.
- `lib/tasks/cucumber.rake`: Adds `rake cucumber`.

Do this shit.

    $ rake db:migrate
    $ rake db:test:prepare
    $ rake spec
    $ rake cucumber

## Cucumber with Rails [TODO]

## Simulating the Browser with Webrat [TODO]

## Automating the Browser with Webrat and Selenium

## Rails Views

#### Writing View Specs
































