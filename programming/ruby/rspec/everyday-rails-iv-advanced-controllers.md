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
