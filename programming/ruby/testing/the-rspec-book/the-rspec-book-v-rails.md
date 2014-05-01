## BDD in Rails

*In the context of this book, the single most important concept expressed directly in Rails is that automated testing is a crucial component in the development of web applications.* Rails was the first web development framework to ship with an integrated full-stack testing framework. This lowered the barrier to entry for those new to testing and, in doing so, raised the bar for the rest of us.

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

Cucumber helps us describe behavior in business terms, the steps shouldn’t express technical details. *`Given I’m logged in` as an administrator could apply to a CLI, client-side GUI, or web-based application.*

- *Automated Browser*: Access the entire Rails MVC stack in a real web browser by driving interactions with Webrat API and Selenium. Fully integrated but slowest.
- *Simulated Browser*: Access the entire MVC stack using Webrat, no JS.
- *Direct Model Access*: Access AR models directly, bypassing routing, controllers, views. Fastest but least integrated.

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

    # Webrat fix methods
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

Sometimes targeting fields by a label isn't accurate enough. Each row of the form would have its own `<label>` for the genre name, but using Webrat's `fill_in( )` method would always manipulate the input field in the first row.

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

- *Directory organization*: The structure for view specs mimics the structure in `app/views`. `specs/views/messages/` will be for view templates found in `app/views/messages/`.
- *File naming*: View specs are named after the template they provide examples for with an `_spec.rb` appended to the filename. `index.html.erb` has a corresponding `index.html.erb_spec.rb`.
- *Always require spec_helper.rb*: Every view spec will need to require the `spec_helper.rb` file.
- *Describing view specs*: The `describe()` is important, because it uses the path to the view minus the `app/views/` portion. DRY.

#### Mocking Models

[TODO]

## Rails Controllers

A controller spec is a collection of examples of the expected behavior of actions on a single controller. Whereas views are inherently state-based, controllers are naturally interaction-based.

We can test controllers by themeselves since controllers don't render views and we have mocks/stubs to simulate a model.

*A simple guideline for a controller is that it should know what to do but not how to do it. Controllers that know too much about the how become responsible for too many things and as a result become bloated, messy, and hard to understand.*

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

*Directory organization*: The directory structure for controller specs parallels the directory structure found in `app/controllers/`.

*File naming*: Each controller spec is named after the controller it provides examples for, with `_spec.rb` appended to the filename. `sessions_controller_spec.rb` = `sessions_controller.rb`.

*Always require spec_helper.rb*.

*Example group names*: The docstring passed to the outermost describe() block in a controller spec typically includes the type of request and the action the examples are for.

Focus on one example at a time. Once each examples passed, we looked for and extracted any duplication to a `before` block, allowing each example to stay focused, clear, and DRY.

#### ActionController::TestCase

- *`assigns()`*: We use assigns to access a hash.
- *`flash()`*: We use flash to access a hash, which we use to specify messages we expect to be stored in the flash.
- *`post()`*: We use the post method to simulate a POST request. 1st: Name of action. 2nd: K-V pairs for the params, 3rd: K-V pairs for the session.

        # no params or session data
        post :create

        # with params
        post :create, :id => 2

        # with params and session data
        post :create, { :id => 2 }, { :user_id => 99 }

- *`xml_http_request() and xhr()`*: Another argument, the type of request to make.

        # no params or session data
        xhr :get, :index

        # with params
        xhr :get, :show, :id => 2

        # with params and session data
        xhr :get, :show, { :id => 2 }, { :user_id => 99 }

- *`render_template`*: We use the `render_template()` method to specify the template we expect a controller action to render.

      # this will expand to "messages/new" in a MessagesController spec
      response.should render_template("new").

- *`redirect_to`*.
      
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

*The one slight rub is that the view templates do need to exist even though we don’t render them.*

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

[TODO]

#### What We’ve Learned

- Controllers coordinate the interaction between the user and the
application and should know what to do but not how to do it.
- Specifying the desired interaction helps us to discover objects with well-named methods to encapsulate the real work.
- Controller specs use a custom example group provided by the `rspec-rails` library.
- Controller specs live in a directory tree parallel to the controllers themselves, there is a naming convention: `spec/controllers/my_controller_spec.rb`.
- Use `redirect_to()` to confirm redirects.
- Use `render_template()` to confirm the template being rendered.
- Use the `assigns()` method to confirm the instance variables assigned for the view.
- Use the `flash()` method to confirm the flash messages.
- Use `mock_model()` and `stub_model()` to isolate controller specs from the database and underlying business logic of your models.

## Rails Models

When we work outside in, we discover model interfaces in Cucumber step definitions, view specs and views, and controller specs and con- trollers. These are the places we write the code we wish we had, and letting them guide us results in model interfaces that best suit the needs of the application.

RSpec offers a specialized ExampleGroup for specifying models.

> spec/models/message_spec.rb

    require 'spec_helper'

    describe Message do 
      before(:each) do
        @message = Message.new(:title => "foo", :text => "bar", :recipient => mock_model("User"))
      end

      it "is valid with valid attributes" do 
        @message.should be_valid
      end

      it "is not valid without a title" do 
        @message.title = nil 
        @message.should_not be_valid
      end

      it "is not valid without a recipient" do 
        @message.recipient = nil 
        @message.should_not be_valid
      end

#### Should I Spec Associations?

Generally speaking, no. Associations should not be added unless they are serving the needs of some behavior. 

Consider an Order that calculates its total value from the sum of the cost of its Items. We might introduce a has_many :items association to satisfy the relevant examples. Since the association is being added to support the calculation that is being specified, there is no need to spec it directly.

The same applies to association options. The :foreign_key or the :class_name options are structural, not behavioral. They’re just part of wiring up the association, and an association that requires them won’t work correctly without them, so there is no need to spec them directly either.

#### What We Just DId

*Directory organization*: Specs in `spec/models/` will be for models in `app/models/`.

*File naming*: `message_spec.rb` for model `Message`.

*`require 'spec helper'`*.

#### Specifying Business Rules

When thinking about models, it’s tempting to jump ahead and think of all of the relationships and functionality we just know they’re going to need. Developing models this way can lead to inconsistent APIs with far too many public methods and relationships, which then become hard to maintain.

Focusing on the behavior first leads to clean, cohesive models, so that’s what we’re going to do. Create a spec for the User model, which describes the behavior of send_message.

> user_spec.rb
    
    describe User do
      describe "#send_message" do
        context "when the user is under their subscription limit" do 
          it "sends a message to another user" do 
            zach = User.create!
            david = User.create!
            msg = zach.send_message(
                :title => "Book Update",
                :text => "Beta 11 includes great stuff!",
                :recipient => david
              )
            david.received_messages.should == [msg]
            msg.title.should == "Book Update"
            msg.text.should == "Beta 11 includes great stuff!"
          end
        end
      end 
    end

> user.rb

    class User < ActiveRecord::Base
      has_many :received_messages, :class_name => Message.name, :foreign_key => "recipient_id" 
      def send_message(message_attrs)
        Message.create! message_attrs
      end 
    end

#### Other outcomes

    context "when the user is under their subscription limit" do
      it "adds the message to the sender's sent messages" do
        zach = User.create!
        david = User.create!
        msg = zach.send_message(
                  :title => "Book Update",
                  :text => "Beta 11 includes great stuff!",
                  :recipient => david
        )
      
      zach.sent_messages.should == [msg] (!!!)
      end
    end

    class User < ActiveRecord::Base
      has_many :received_messages, :class_name => Message.name, :foreign_key => "recipient_id"
      has_many :sent_messages, :class_name => Message.name, :foreign_key => "sender_id" (!!!) some AR jutsu.

      def send_message(message_attrs) 
        sent_messages.create! message_attrs
      end 
    end

#### Tidying up

1. Consolidate the creation of zach and david in one spot.
2. Make them instance variables.
3. Add test to make sure a message is created.

Spec should be green!

    describe "#send_message" do 
      before(:each) do
          @zach = User.create!
          @david = User.create!
      end

      it "creates a new message with the submitted attributes" do 
        msg = @zach.send_message(
            :title => "Book Update",
            :text => "Beta 11 includes great stuff!",
            :recipient => @david
          )
        msg.title.should == "Book Update"
        msg.text.should == "Beta 11 includes great stuff!"
      end

#### Edge Cases

Add case for when the user is over their subscription limit.

    context "when the user is over their subscription limit" do 
      it "does not create a message" do

> The act of sending the message should not change the message count

        lambda {
          @zach.send_message(
            :title => "Book Update",
            :text => "Beta 11 includes great stuff!",
            :recipient => @david
          )
        }.should_not change(Message, :count)
      end 
    end

    def send_message(message_attrs)
      if subscription.can_send_message?
          sent_messages.create message_attrs
      end 
    end

Introduce a before(:each) block inside the context that utilizes a stub to ensure a user can’t send a message.

    context "when the user is over their subscription limit" do 
      before(:each) do
        @zach.subscription = Subscription.new
        @zach.subscription.stub(:can_send_message?).and_return false 
      end

      it "does not create a message" do ...

To solve this, we need to create a Subscription model. Rake db:migrate and rake db:test:prepare, then add a Subscription association (`belongs_to :subscription`).

#### Useful Tidbits

- We can remove the DB hit when we test models. Check `UnitRecord` and `NullDb`.
- Test data buildes: FactoryGirl, Machinist, ObjectDaddy.
- Custom macros

#### Matchers

- be_valid()
- errors_on (`model.should have(:no).errors_on(:title)`, `model.should have(1).error_on(:body)`)
- record and records (`ModelClass.should have(:no).records`)

#### What we learned

- Models refelect the problem domain for which you're providing a software solution.
- Models house the domain logic for an application.
- Models in Rails refer to AR models, though you can create models that are POROs.
- Model specs use a custom example group provided by `rspec-rails`.
- `spec/model/my_model_spec.rb` for testing `app/models/my_model.rb`.
- Focusing on model behavior can save time and effort.
- Use `mock_model` and `stub_model` to isolate controller specs.
- Macros/matchers to extract duplicated shit.
