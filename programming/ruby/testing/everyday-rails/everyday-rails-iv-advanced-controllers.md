## Advanced Controller Specs

Once you uncomment the `before_action` to authenticate ContactsController, everything will break. We need a way to mimic the authorization process in the controller specs to continue.

We also need to detect the logged-in user's role. We test this at the controller level.

#### Testing the admin and user roles

First, create a new factory for users.

> spec/factories/users.rb

    FactoryGirl.define do
      factory :user do
        email { Faker::Internet.email }
        password 'secret'
        password_confirmation 'secret'

> Child factory for admin access.

        factory :admin do
          admin true
        end
      end
    end

> Test controller via spec/controllers/contacts_controller_spec.rb. Wrap all the existing spec examples inside a `describe` and mimic logging in as an administratrao.

    describe "administrator access" do
      before :each do
        user = create(:admin)
        session[:user_id] = user.id
      end

      describe "GET #index" do
        it "populates an array of contacts"
          get :index
          expect(assigns(:contacts)).to match_array [@contact]
        end

        it "renders the :index template" do
          get :index
          expect(response).to render_template :index
        end
      end

      describe "GET #show" do
        it "assigns the requested contact to @contact" do
          get :show, id: @contact
          expect(assigns(:contact)).to eq @contact
        end

        it "renders the :show template" do
          get :show, id: @contact
          expect(response).to render_template :show
        end
      end
    end

> Simulating a user login is essentially the same as an admin

    before :each do
      user = create(:user)
      session[:user_id] = user.id
    end

#### Testing the guest role

    describe "guest access" do

      describe "GET #new do
        it "requires login"
          get :new
          expect(response).to redirect_to login_url
        end
      end

      describe "GET #edit" do
        it "requires login"
          contact = create(:contact)
          get :edit, id: contact
          expect(response).to redirect_to login_url
        end
      end

      describe "POST #create" do
        it "requires login"
          post :create, id: create(:contact), contact: attributes_for(:contact)
          expect(response).to redirect_to login_url
        end
      end

      describe "PUT #update" do
        it "requires login"
          post :update, id: create(:contact), contact: attributes_for(:contact)
          expect(response).to redirect_to login_url
        end
      end

      describe "DELETE #destroy" do
        it "requires login"
          delete :destroy, id: create(:contact)
          expect(response).to redirect_to login_url
        end
      end

#### Controller spec cleanup

> spec/controllers/contacts_controller_spec.rb: RSpec shared examples.

    shared_examples("public access to contacts") do
      describe "GET #index" do

        it "populates an array of contacts"
          get :index
          expect(assigns(:contacts)).to match_array [@contact]
        end

        it "renders the :index template" do
          get :index
          expect(response).to render_template :index
        end
      end

      describe "GET #show" do
        it "assigns the requested contact to @contact" do
          get :show, id: @contact
          expect(assigns(:contact)).to eq @contact
        end

        it "renders the :show template" do
          get :show, id: @contact
          expect(response).to render_template :show
        end
      end
    end

Then include them in any describe or contact block.

    describe "guest_access" do
      it_behaves_like "public access to contacts"
    end

    describe "admin access to contacts" do
      before :each do
        set_user_session(create(:admin))
      end

      it_behaves_like "public access to contacts"
      it_behaves_like "full access to contacts"
    end

#### Helper Macros

> spec/support/login_macros.rb

    module LoginMacros
      def set_user_session(user)
        session[:user_id] = user.id
      end
    end

> Automatically include it in spec_helper.rb

    Dir[Rails.root.join("spec/support/**/*.rb")].each { |f| require f }

    RSpec.configure do |config|
      ...

      config.include LoginMacros
    end

> Example test

    describe "admin access" do
      before :each do
        set_user_session create(:admin)
      end
      ...

#### Custom RSpec matcher

> spec/support/matchers/require_login.rb

    RSpec::Matchers.define :require_login do |expected|

> This is what we expect to happen when you replace to expect(something). Need to load full path.

      match do |actual|
        expect(actual).to redirect_to Rails.application.routes.url_helpers.login_path
      end

> Write helper messags for both matching and non-matching.

      failure_message_for_should do |actual|
        "expected to require login to access the method"
      end

      failure_message_for_should_not do |actual|
        "expected not to reqire login to access the method"
      end

      description do
        "redirect to the login form"
      end
    end

> spec/controllers/contacts_controller_spec.rb

    describe "GET #new" do
      it "requires login"
        get :new
        expect(response).to require_login
      end
    end

## Feature specs

Dependencies: `faker`, `capybara`, `database_cleaner`, `launchy`.

> spec/features/uses_spec.rb

    feature "User management" do
      scenario "adds a new user" do
        admin = create(:admin)

        visit_root_path
        click_link "Log In"
        fill_in "Email" with admin.email
        fill_in "Password" with admin.password
        click_button "Log In"

        visit root_path
        expect{
          click_link "Users"
          click_link "New User"
          fill_in "Email", with: "newuser@example.com"
          find("#password").fill_in "Password", with: "secret123"
          find("#password_confirmation").fill_in "Password confirmation", with: "secret123"
          click_button "Create User"
        }.to change (User, :count).by(1)

        expect(current_path).to eq users_path
        expect(page).to have_content "New user created"
        within "h1" do
          expect(page).to have_content "Users"
        end
        expect(page).to have_content "newuser@example.com"
      end
    end

#### Refactoring

> spec/support/login_macros.rb

    module LoginMacros
      def sign_in(user)
        visit_root_path
        click_link "Log In"
        fill_in "Email" with admin.email
        fill_in "Password" with admin.password
        click_button "Log In"
      end
    end

> spec/features/users_spec.rb

    feature "User management" do
      scenario "adds a new user" do
        admin = create(:admin)
        sign_in :admin
        ...
      end
    end

### Including JS implementations

> spec/features/about_us_spec.rb. Include Selenium for JS stuff.

    feature "About BigCo modal" do

> add js: true

      scenario "toggles display of the modal about display", js: true do
        ...

> Simulate a modal

        click_link "About Us"
        expect(page).to have_content "About BigCo"
        expect(pag).to have_content "BigCo bla bla"

        within "#about_us" do
          click_button "Close"
        end

        expect(page).to_not have_content "About BigCo"
        expect(page).to_not have_content "BigCo bla bla"

      end
    end

Fix Database using Database cleaner and AR [TODO].

Capybara drivers: Poltergeist, capybara-webkit.

## Speeding up specs

#### let() and it()

`let()` caches the value without assigning it to an instance variable, and it is lazily evaluated (doesn't get assigned until a spec calls upon it.)

> spec/controllers/contacts_controllers_spec.rb

    describe ContactsController do
      let (:contact) do
        create(:contact, firstname: "Lawrench", lastname: "Smith")
      end
      ...

`let!` also forces contact to be assigned to each example.

`subject {}` and `it {} ` and `specify {} ` lets you declare a subject to reuse implicitly.

    subject { build(:user, firstname: "John", lastname: "Doe") }
    is { should_be_named "John Doe" }

#### Shoulda

Use `shoulda-matchers` gem in the `:test` group of the Gemfile, you get new matchers.

    subject { Contact.new }
    specify { should validate_presence_of :firstname }

#### Mocks and stubs

A *mock* is a some object that represents a real object, for testing purposes. Test doubles. They are like Factory Girl, except they don't touch the DB.

A *stub* overrides a method call on a given object and returns a predetermined value for it. It is a fake method which will return a real result for the tests.

[TODO]

#### Automation with Guard and Spork

Guard is a filewatcher `bundle exec guard init rspec` to set it up.

- `notification: false`. Specs run on a terminal window instead of receiving pop-ups.
- `all_on_start: false` and `all_on_pass: false`. Run tests before committing changes.
- Run feature specs upon changes to views.
- `bundle exec guard` to start Guard.

> Guardfile

    guard 'rspec', version: 2, cli: '--color --format documentation', all_on_start: false, all_after_pass: false

Guard is not just for watching and running your specs. It can streamline CSS compilation, run Cucumber features, run code metrics, reboot dev servers.

Gemz: Guard, Spork, Zeus, Commands, Spring.

#### Tags

    it "processes a credit card", focus: true do
      ...
    end

    $ bundle exec rspec . --tag focus

> spec_helper

    RSpec.configure do |c|
      c.filter_run focus: true
      c.filter_run_excluding_slow: true
    end

Other speedy solution: Mark a test as `pending` instead of commenting it.

## Testing the Rest

#### Email Delivery: `emailspec`

> spec_helper

    require "email_spec"
    config.include(EmailSpec::Helpers)
    config.include(EmailSpec::Matchers)

    expect(open_last_email).to be_delivered_from sender.email
    expect(open_last_email).to have_reply_to sender.email
    expect(open_last_email).to be_delivered_to recipient.email
    expect(open_last_email).to have_subject message.subject
    expect(open_last_email).to have_body_text message.message

#### File uploads

Rails provides a means of uploading files from `fixtures`, but you can place a dummy file into the `spec/factories` directory.

    FactoryGirl.define do
      factory :user do
        sequence(:username) { |n| "user#{n}" }
        password "secret"
        avatar { File.new("#{Rails.root}/spec/factories/avatar.png") }
      end
    end

[TODO]

##### Testing the time: `timecop` [TODO]

#### Testing web services: Railscasts Fakeweb/VCR

#### Testing rake [TODO]

## Towards TDD

#### Defining a feature: scenarios
- As a user, I want to add a news release so that the world can see how great our company is.
- As a site visitor (guest), I want to read news articles so I can learn more about the company.

> spec/features/news_releases_spec.rb

    feature "News releases" do
      context "as a user" do
        scenario "adds a news release"
      end

      context "as a guest" do
        scenario "reads a news release"
      end
    end

Add content.

> spec/features/news_releases_spec.rb

    feature "News releases" do
      context "as a user" do
        scenario "adds a news release" do
          ... sign in

          expect(page).to_not have_content "BigCo switches to Rails"
          click_link "Add News Release"
          fill_in "Date", with: "2013-07-29"
          fill_in "Title", with "BigCo switches to Rails"
          fill_in "Body", with "BigCo has released ..."
          click_button "Create News Release"

          expect(current_path).to eq news_release _path
          expect(page).to have_content "Successfully created news release."
          expect(page).to have_content "2013-07-29: BigCo switches to Rails"

        end
      end

Then, you can edit spec_helper to run only the focused tests.

    Spork.prefork do
      RSpec.configure do |config|
        config.filter_run focus: true
      end
    end

    feature "News releases", focus: true do

Rails should then complain about not having the path. Better to go with a `scaffold` if you know you add to write a ton of shit later.

    $ rails g scaffold news_release title released_on:data body:text
    $ rake db:migrate db:test:clone

Write the shit first to make the tests pass.

Refactor model and add testing expectations in it.

## Parting Advice
- Practice testing the small things. Test low hanging fruit first.
- Be aware of what you're doing.
- Short spikes are ok: Write production code only after you've written the specs.
- Write a little, test a little is also ok.
- Feature specs first then move to the inner levels.
- Make time for testing
- Use tests to make the code better via the Refactor phase.
