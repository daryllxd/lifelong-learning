> Generate integration test and run it

    $ rails generate integration_test static_pages
    $ rspec spec/requests/static_pages_spec.rb

> Automated tests with Guard

    $ bundle exec guard init rspec
    $ bundle exec guard             # drown in pussy

> BASED HARTL's `Guardfile`

    require 'active_support/inflector'

    guard 'rspec', all_after_pass: false do
      .
      .
      .
      watch('config/routes.rb')
      # Custom Rails Tutorial specs
      watch(%r{^app/controllers/(.+)_(controller)\.rb$}) do |m|
        ["spec/routing/#{m[1]}_routing_spec.rb",
         "spec/#{m[2]}s/#{m[1]}_#{m[2]}_spec.rb",
         "spec/acceptance/#{m[1]}_spec.rb",
         (m[1][/_pages/] ? "spec/requests/#{m[1]}_spec.rb" :
                           "spec/requests/#{m[1].singularize}_pages_spec.rb")]
      end
      watch(%r{^app/views/(.+)/}) do |m|
        (m[1][/_pages/] ? "spec/requests/#{m[1]}_spec.rb" :
                          "spec/requests/#{m[1].singularize}_pages_spec.rb")
      end
      watch(%r{^app/controllers/sessions_controller\.rb$}) do |m|
        "spec/requests/authentication_pages_spec.rb"
      end
      .
      .
      .
    end

> SPORK IS IN THE HOUSE

    gem 'spork-rails', '4.0.0'
    gem 'guard-spork', '1.5.0'
    gem 'childprocess', '0.3.9'

    $ bundle install
    $ bundle exec spork --bootstrap

> `let` to create temp vars.

    let(:found_user) { User.find_by(email: @user.email) } # memoized value

## FactoryGirl

    gem "factory_girl_rails", "4.2.1"

>spec.factories.rb

    FactoryGirl.define do
      factory :user do
        name                  "Michael Hartl"
        email                 "michael@example.com"
        password              "foobar"
        password_confirmation "foobar"
      end
    end

    let(:user) { FactoryGirl.create(:user) }

    describe "profile page" do
      let(:user) { FactoryGirl.create(:user) }
      before { visit user_path(user) }

      it { should have_content(user.name) }
      it { should have_title(user.name) }
    end

## Tests for user signup

    visit signup_path
    fill_in "Name", with "Example User"
    click_button "Create my account"

> Invalid data

    visit signup_path
    expect { click_button "Create my account" }.not_to change (User, :count)

> Valid data

    describe "with valid information" do
       before do
         fill_in "Name",         with: "Example User"
         fill_in "Email",        with: "user@example.com"
         fill_in "Password",     with: "foobar"
         fill_in "Confirmation", with: "foobar"
       end

       it "should create a user" do
         expect { click_button submit }.to change(User, :count).by(1)
       end
     end

> Test for making sure you have the alert after user is created

    describe "after saving the user" do
      before { click_button submit }
      let(:user) { User.find_by(email: 'user@example.com') }

      it { should have_title(user.name) }
      it { should have_selector('div.alert.alert-success', text: 'Welcome') }
    end

## Authentication

> Failure

    describe "with invalid information" do
      before { click_button "Sign in" }

      it { should have_title('Sign in') }
      it { should have_selector('div.alert.alert-error') }
    end

> Success

    describe "with valid information" do
      let(:user) { FactoryGirl.create(:user) }
      before do
        fill_in "Email",    with: user.email.upcase
        fill_in "Password", with: user.password
        click_button "Sign in"
      end

      it { should have_title(user.name) }
      it { should have_link('Profile',     href: user_path(user)) }
      it { should have_link('Sign out',    href: signout_path) }
      it { should_not have_link('Sign in', href: signin_path) }
    end












