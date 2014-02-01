## Basic controller specs

#### Why test controllers?
- Controllers are classes with methods, too.
- Controller specs can often be written more quickly that their integration spec counterparts.
- Controller specs usually run more quickly than integration specs.

#### Why not test controllers?
- Controller should be skinny, so testing them is fruitless.
- Controller specs are still slower than specs of Rails models and POROs.
- One feature spec can accomplish the work of multiple controller specs.

#### Controller testing basics

Scaffolds, when done correctly, are a great way to learn coding techniques.

A controller spec is broken down by controller method-each example is based of a single actions and, optionally, any parameters passed to it. Here's a simple example:

    it "redirects to the home page upon save" do
      post :create, contact: FactoryGirl.attributes_for(:contact)
      expect(response).to redirect_to root_url
    end

Similiarities to earlier specs:

- The description of the example is written in _explicit, active language._
- _The example only expects one thing:_ After the post request is processed, a redirect should be returned to the browser.
- _A factory generates test data to pass to the controller method._

New things to look at:

- _The basic syntax of a controller spec_-its HTTP method (post), controller method(:create), and, optionally, parameters being passed to the method.
- `sttributes_for`: Generates a hash of attributes, not an object.

#### Organization

> spec/controllers/contact_controller_spec.rb

    describe ContactsController do

      describe 'GET #index' do
        context 'with params[:letter]' do
          it "populates an array of contacts starting with the letter"
          it "renders the :index template"
        end

        context 'without params[:letter]' do
          it "populates an array of all contacts"
          it "renders the :index template"
        end
      end

      describe 'GET #show' do
        it "assigns the requested contact to @contact"
        it "renders the :show template"
      end

      describe 'GET #new' do
        it "assigns a new Contact to @contact"
        it "renders the :new template"
      end

      describe 'GET #edit' do
        it "assigns the requested contact to @contact"
        it "renders the :edit template"
      end

      describe 'POST #create' do
        context "with valid attributes" do
          it "saves the new contact in the database"
          it "redirects to contacts#show"

        context "with invalid attributes" do
          it "does not save the new contact in the database"
          it "re-renders the :new template"
        end
      end

      describe 'PATCH #update' do
        context "with valid attributes" do
          it "updates teh contact in the database"
          it "redirects to the contact"
        end

        context "with invalid attributes do"
          it "does not update the contact"
          it "re-renders the #edit template"
        end
      end

      describe 'DELETE #destroy' do
        it "deletes the contact from the database"
        it "redirects to users#index"
      end
    end

#### Setting up test data

> Create an invalid contact using inheritance.

      factory :invalid_contact do
        firstname :nil
      end

#### Testing GET requests

    describe 'GET #show' do

> Make sure that a persisted contact is found by the controller method and properly assign to the specified instance variable. Use assigns() to check that the value is waht we expect to see.

      it "assigns the requested contact to @contact" do
        contact = create(:contact)
        get :show, id: contact
        expect(assigns(:contact)).to eq contact
      end

> Make sure the contact form is rendered.

      it "renders the :show template" do
        contact = create(:contact)
        get :show, id: contact
        expect(response).to render_template :show
      end

    end

### Key Concepts
- The basic DSL for interacting with controller methods: Each HTTP verb has its own method which expects the controller method name as a symbol (her, `:show`), followed by any params (`id: contact`).
- Variables instantiated by the controller method can be evaluated using `assigns(:variable_name)`.
- The finished product returned from the controller method can be evaluated through response.