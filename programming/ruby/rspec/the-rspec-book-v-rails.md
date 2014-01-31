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

A view spec is a collection of code examples fro a particular view template. View examples are inherently state-based.

In most cases, we're interested in the semantic content only, except for forms, we need these to be rendered correctly.

> spec/views/messages/show.html.erb_spec.rb

    require 'spec_helper'
    describe "messages/show.html.erb" do
      it "displays the text attribute of the message" do render
          rendered.should contain("Hello world!")
      end
    end

#### `render(), rendered(), and contain()`

- `render`: Render the file passes to the outermost describe() block.
- `rendered()`: Return rendered content.
- `contain()`: SE bitch.

At this point there is no controller yet, so the responsibility is on the view spec itself.

Use `assign()` to provide data (mock) to the view.

    it "displays the text attribute of the message" do
        assign(:message, double("Message", :text => "Hello world!"))
        render
        rendered.should contain("Hello world!")
    end

#### Shit to glean

- __Directory organization__: The structure for view specs mimics the structure in `app/views`. `specs/views/messages/` will be for view templates found in `app/views/messages/`.
- __File naming__: View specs are named after the template they provide examples for with an `_spec.rb` appended to the filename. `index.html.erb` has a corresponding `index.html.erb_spec.rb`.
- __Always require spec_helper.rb__: Every view spec will need to require the `spec_helper.rb` file.
- __Describing view specs__: The `describe()` is important, because it uses the path to the view minus the `app/views/` portion. DRY.

#### Mocking Models

[TODO]

## Rails Controllers

A controller spec is a collection of examples of the expected behavior of actions on a single controller. Whereas views are inherently state-based, controllers are naturally interaction-based.

We can test controllers by themeselves since controllers don't render views and we have mocks/stubs to simulate a model.

__A simple guideline for a controller is that it should know what to do but not how to do it. Controllers that know too much about the how become responsible for too many things and as a result become bloated, messy, and hard to understand.__

    describe MessagesController do 
      describe "POST create" do

> Test for controller is divided into 3 parts: making the POST create do creating a new message, saving the message, and redirecting to the index. Assign :message as the "mock model".

        let(:message) { mock_model(Message).as_null_object }

> Make a new model and put it into the message variable

        before do
          Message.stub(:new).and_return(message)
        end

> Why is should_receive and post :create duplicated here? One has a message and one doesn't. My assumption is that the tests are each `it` is done independently of each other. So "creates" tests the sending of the create request and "saves" tests the saving????

        it "creates a new message" do 
          Message.should_receive(:new).with("text" => "a quick brown fox").and_return(message)
          post :create, :message => { "text" => "a quick brown fox" }
        end

        it "saves the message" do 
          message.should_receive(:save) 
          post :create
        end

> Assuming a post request gets through, the response should redirect.

        it "redirects to the Messages index" do
          post :create
          response.should redirect_to(:action => "index")
        end 
      end
    end

#### Context paths

    context "when the message saves successfully" do
      it "sets a flash[:notice] message" do
        post :create

> Test to confirm that a flash message shows up.

        flash[:notice].should eq "The message was saved successfully."
      end

      it "redirects to the Messages index" ...
    end

#### When save() fails

    context "when the message fails to save" do 
      it "assigns @message" do
        message.stub(:save).and_return(false)
        post :create
        assigns[:message].should eq(message)
      end

      it "renders the new template"
    end

[TODO]

#### What We Just Did

The `create()` action we just implemented is typical in Rails apps. The controller passes the params it receives to the model, delegating the real work.

By specifying the interactions with the model instead of the result of the model’s work, we are able to keep the spec and the implementation simple and readable.

__Directory organization__: The directory structure for controller specs parallels the directory structure found in `app/controllers/`.

__File naming__: Each controller spec is named after the controller it provides examples for, with `_spec.rb` appended to the filename. `sessions_controller_spec.rb` = `sessions_controller.rb`.

__Always require spec_helper.rb__.

__Example group names__: The docstring passed to the outermost describe() block in a controller spec typically includes the type of request and the action the examples are for.

Focus on one example at a time. Once each examples passed, we looked for and extracted any duplication to a `before` block, allowing each example to stay focused, clear, and DRY.

#### ActionController::TestCase

- __`assigns()`__: We use assigns to access a hash.
- __`flash()`__: We use flash to access a hash, which we use to specify messages we expect to be stored in the flash.
- __`post()`__: We use the post method to simulate a POST request. 1st: Name of action. 2nd: K-V pairs for the params, 3rd: K-V pairs for the session.

        # no params or session data
        post :create

        # with params
        post :create, :id => 2

        # with params and session data
        post :create, { :id => 2 }, { :user_id => 99 }

- __`xml_http_request() and xhr()`__: Another argument, the type of request to make.

        # no params or session data
        xhr :get, :index

        # with params
        xhr :get, :show, :id => 2

        # with params and session data
        xhr :get, :show, { :id => 2 }, { :user_id => 99 }

- __`render_template`__: We use the `render_template()` method to specify the template we expect a controller action to render.

      # this will expand to "messages/new" in a MessagesController spec
      response.should render_template("new").

- __`redirect_to`__.
      
      # relying on route helpers
      response.should redirect_to(messages_path)

      # relying on ActiveRecord conventions
      response.should redirect_to(@message)

      # being specific
      response.should redirect_to(:controller => "messages", :action => "new")

#### Isolation from View Templates

By default, controller specs do not render view templates. 

When we stub out the model layer as well, we can drive out controllers in complete isolation from the code in our views and models. 

This keeps the controller specs lean and reduces the noise involved with managing a web of dependencies in the view or the model.

It also provides quick fault isolation. You’ll always know that a failing controller spec means that the controller is not behaving correctly.

__The one slight rub is that the view templates do need to exist even though we don’t render them.__

#### Specifying ApplicationController

Do this for stuff that needs to happen every request.

> spec/controllers/application_controller_spec.rb

    require 'spec_helper'
      describe ApplicationController do
        describe "handling AccessDenied exceptions" do
          it "redirects to the /401.html (access denied) page" do 
            get :index
            response.should redirect_to('/401.html')
          end 

        end
      end

