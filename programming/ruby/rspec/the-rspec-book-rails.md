## BDD in Rails

__In the context of this book, the single most important concept expressed directly in Rails is that automated testing is a crucial component in the development of web applications.__ Rails was the first web development framework to ship with an integrated full-stack testing framework. This lowered the barrier to entry for those new to testing and, in doing so, raised the bar for the rest of us.

`rspec-rails` extends the Rails testing framework by offering separate classes for spec’ing Rails models, views, controllers, and even helpers, in complete isolation from one another.

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

## Cucumber with Rails

#### Step Definition Styles

Cucumber helps us describe behavior in business terms, the steps shouldn’t express technical details. __`Given I’m logged in` as an administrator could apply to a CLI, client-side GUI, or web-based application.__

- __Automated Browser__: Access the entire Rails MVC stack in a real web browser by driving interactions with Webrat API and Selenium. Fully integrated but slowest.
- __Simulated Browser__: Access the entire MVC stack using Webrat, no JS.
- __Direct Model Access__: Access AR models directly, bypassing routing, controllers, views. Fastest but least integrated.

If there is any JavaScript or Ajax, add scenarios that use the Automated Browser approach in their Whens and Thens for the happy path and critical less common paths.

Edge cases: Use Direct Model Access for everything. We look more unit test-ish but scenarios are about communication.

#### Direct Model Access

These execute quickly, but they are unlikely to catch bugs beyond RSpec. They catch regressions if the logic inside the models is broken in any way.

> Initial (failing) testes

    Given /^a movie$/ do
      @movie = Movie.create!
    end

    When /^I set the showtime to "([^"]*)" at "([^"]*)"$/ do |date, time|
      @movie.update_attribute(:showtime_date, Date.parse(date))
      @movie.update_attribute(:showtime_time, time)
    end

    Then /^the showtime description should be "([^"]*)"$/ do |showtime|
      @movie.showtime.should eq(showtime)
    end

> Create the model to make the tests pass.

    class Movie < ActiveRecord::Base
      
      def showtime
        "#{formatted_date} (#{formatted_time})"
      end
      
      def formatted_date
        showtime_date.strftime("%B %d, %Y")
      end
      
      def formatted_time
        showtime_time.strftime("%l:%M%p").strip.downcase
      end
      
    end

## Simulating the Browser with Webrat

Rare to use DMA style, we usually augment Simulated Browser scenarios already.

Simulated Browser style is the default approach for implementing `Whens` and `Thens` for a Rails app because it's a good balance between speed and integration.

Usually, `Given` uses DMA and Simulated Browser happens elsewhere.
    
    # Instantiate the shit
    Given /^a genre named Comedy$/ do 
      @comedy = Genre.create!(:name => "Comedy")
    end

#### Webrat

    When /^I create a movie Caddyshack in the Comedy genre$/ do
      visit movies_path
      click_link "Add Movie"
      fill_in "Title", :with => "Caddyshack"
      select "1980", :from => "Release Year"
      check "Comedy"
      click_button "Save"
    end

Webrat is like a fast, invisible browser with a DSL.

#### Filling up (in????) the form

    # Simulate GET requests.
    visit movies_path 

    # Clicking links, locate links via id and title values.
    click_link "Comedy"

Cucumber has parameterized step definitions already. Ex: It has `When /^I click the "(.+)" button$/ do |button_text| end`.

    # Filling up the effing forms. Done via id, name, and <label> text.
    fill_in "Title", :with => "Caddyshack" # field's label text
    fill_in "movie_title", :with => "Caddyshack" # field's id
    fill_in "movie[title]", :with => "Caddyshack" # field's name

Preferred method: label text, so it doesn't change when the application changes.

    # Checking the shit
    check "Comedy"
    uncheck "Save as draft"

    # Choose radio
    choose "Premium"

    # Select from select drop-downs
    select "1980"
    select "1980", :from => "Release Year"

    # Cumbersome select
    When /^I select October 1, 1984 as my birthday$/ do 
      select "October", :from => "birthday_2i"
      select "1", :from => "birthday_3i"
      select "1984", :from => "birthday_1i"
    end

    # Webrat fix methodes
    select_date Date.parse("April 26, 1982")
    select_time Time.parse("3:30PM")
    select_datetime Time.parse("January 23, 2004 10:30AM")

    # Attaching files, default MIME type
    attach_file "Photo", "#{Rails.root}/spec/fixtures/vacation.jpg"

    # Different MIME type
    attach_file "Photo", "#{Rails.root}/spec/fixtures/vacation.jpg", "image/jpeg"

    # Setting hidden fields
    set_hidden_field "user_id", :to => @bob.id

    # Clicking le buttones
    click_button "save_button" # Use id
    click_button "save" # Use the name attribute
    click_button "Apply Changes" # Use its text (value attribute)

    # Submitting the form
    submit_form "quick_nav" # Use the form's id value

    # Reloading the page
    reload

#### Specify outcomes

    # Make sure you see it is in the content
    response.should contain("Thank you!")
    # Regex possible
    response.should contain(/Hello/i)

    # Image selectors
    response.should have_selector("img.photo")
    response.should have_selector("img.photo", :src => photo_path(@photo))
    # Counts of images
    response.should have_selector("img.photo", :count => 5)

    # When you need to see the text inside the contain
    response.should have_selector("#nav li.selected", :content => "Messages")

    # Nesting
    Then /^the Vacation photo should be third in the album$/ do 
      response.should have_selector("#album li:nth-child(3)") do |li|
        li.should have_selector("img", :src => photo_path(@vacation_photo))
        li.should contain("Vacation Photo")
      end 
    end

#### Working Within a Scope

Sometimes targeting fields by a label isn’t accurate enough. Each row of the form would have its own `<label>` for the genre name, but using Webrat’s `fill_in( )` method would always manipulate the input field in the first row.

Use `within()` to scope all the contained form manipulations to a subset of the page.

    When /^I fill in Horror for the second genre name$/ do  
      within "#genres li:nth-child(2)" do
        fill_in "Name", :with => "Horror"
      end 
    end

#### Locating Form Fields

    field_labeled("Email").value.should == "robert@example.com"
    field_labeled("I agree to the Terms of Service").should_not be_checked
    field_named("user[email]").value.should == "robert@example.com"
    field_with_id("user_email").value.should == "robert@example.com"

#### HTTP Stuff

    # the page URL should contain the album SEO keywords
    current_url.should =~ /vacation-photos/

    # I'm browsing the site using Safari
    header "User-Agent", "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_5_6; en-us)"

    # When /^I request the users list using API version 2.0$/ do
      header "X-API-Version", "2.0"
      visit users_path
    end

#### When Things Go Wrong: `save_and_open_page()`

## Automating the Browser with Webrat and Selenium

Need Selenium when the app has rich client-side interactions built with JavaScript.

    gem "webrat", ">= 0.7.2"
    gem "database_cleaner", ">= 0.5.2"
    gem "selenium-client", ">= 1.2.18"

[TODO]

## Rails Views

#### Writing View Specs