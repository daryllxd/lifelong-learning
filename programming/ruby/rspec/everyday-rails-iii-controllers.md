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

#### Index method

> spec/controllers/contacts_controller_spec.rb

    describe 'GET #index' do
      context 'witj params[:letter]' do

> Test to make sure an array of contacts matching the first-letter search is created and assigned to @contacts. match_array looks for an array's contents, but not their order.

        it "populates an array of contacts starting with the letter" do
          smith = create(:contact, lastname: 'Smith')
          jones = create(:contact, lastname: 'Jones')
          get :index, letter: 'S'
          expect(assigns(:contacts)).to match_array([smith])
        end

> Test to make sure that `index.html.erb` is rendered when letter "S" is passed in. `response` is used to render the view template.

        it "renders the :index template" do
          get :index, letter: 'S'
          expect(response).to render_template :index
        end
      end

> Repeat test 1 but without params. Make sure that everything is returned.

      context 'without params[:letter]' do
        it "populates an array of all contacts" do
          smith = create(:contact, lastname: 'Smith')
          jones = create(:contact, lastname: 'Jones')
          get :index
          expect(assigns(:contacts)).to match_array([smith, jones])
        end

> Repeat test 2, make sure the `index.html.erb` is still rendered, even without params passed.

        it "renders the :index template" do
          get :index
          expect(response).to render_template :index
        end
      end
    end

Stick with the repetition first, hehehe.

> GET new and GET edit are sort of the same:

    describe 'GET #new' do
      it "assigns a new Contact to @contact" do
        get :new
        expect(assigns(:contact)).to be_a_new(Contact)
      end

      it "renders the :new template" do
        get :new
        expect(response).to render_template :new
      end
    end

    describe 'GET #edit' do
      it "assigns the requested contact to @contact" do
        contact = create(:contact)
        get :edit, id: contact
        expect(assigns(:contact)).to eq contact
      end

      it "renders the :edit template" do
        contact = create(:contact)
        get :edit, id: contact
        expect(response).to render_template :edit
      end
    end

#### Testing POST requests

We need to pass the equivalent of params[:contact] or the contents of the form in which a user would enter a new contact.

> This is why we have `attributes_for`, we don't pass in the object itself, but its hash values.

    it "does something upon post#create" do
      post :create, contac: attributes_for(:contact)
    end

> spec/controllers/contacts_controller_spec.rb

    describe "POST #create" do
      before :each
        @phones = [
          attributes_for(:phone),
          attributes_for(:phone),
          attributes_for(:phone)
        ]
      end

> We pass in an entire HTTP request as a Proc, results are evaluated before and after. "Expect this code to do, or not do something."

      context "with valid attributes" do
        it "saves the new contact in the database" do
          expect{
            post :create, contact: attributes_for(:contact, phones_attributes: @phones)
          }.to change(Contact, :count).by(1)
        end

        it "redirects to contacts#show" do
          post :creates, contact: attributes_for(:contact, phones_attributes: @phones)
          expect(response).to redirect_to contact_path(assigns[:contact])
        end
      end

      context "with invalid attributes" do
        it "does not save the new contact in the database" do
          expect{
            post :create, contact: attributes_for(:invalid_contact)
          }.to_not change(Contact, :count)
        end

        it "re-renders the :new template" do
          post :creates, contact: attributes_for(:invalid_contact)
          expect(response).to render_template :new
        end
      end

#### Testing PATCH Requests (Older Rails versions will use PUT though.)

    describe 'PATCH #update' do

> Since we're updating an existing contact, we need to persist something first.

      before :each do
        @contact = create(:contact, firstname: "Law", lastname: "Smith")
      end

      context "with valid attributes" do
        it "locates the requested contact" do
          patch :update, id: @contact, contact: attributes_for(:contact)
          expect(assigns(:contact)).to eq(@contact)
        end

> We cannot use `expect` here because we need to actually check that the object's attributes have persisted.

        it "changes @contact's attributes" do
          patch :update, id: @contact, contact: attributes_for(:contact, firstname: "Larry", lastname: "Smith")
          @contact.reload

          expect(@contact.firstname).to eq("Larry")
          expect(@contact.lastname).to eq("Smith")
        end

        it "redirects to the updated contact" do
          patch :update, id: @contact, contact: attributes_for(:contact)
          expect(response).to redirect_to @contact
        end
      end

      context "with invalid attributes" do

        it "does not change the contact's attributes" do
          patch :update, id: @contact, contact: attributes_for(:contact, firstname: "Larry", lastname: nil)
          @contact.reload

          expect(@contact.firstname).to_not eq("Larry")
          expect(@contact.lastname).to eq("Smith")
        end

        it "redirects to the updated contact" do
          patch :update, id: @contact, contact: attributes_for(:contact)
          expect(response).to redirect_to @contact
        end
      end
    end

#### Testing DELETE requests

    describe 'DELETE #destroy' do
      before :each do
        @contact = create(:contact)
      end

      it "deletes the contact" do
        expect {
          delete :destroy, id: @contact
        }.to change (Contact, :count).by(-1)
      end

      it "redirects to contacts#index" do
        delete :destroy, id: @contact
        expect(response).to redirect_to contacts_url
      end
    end

#### Testing non-CRUD methods

    describe 'PATCH hide_contact' do
      before :each do
        @contact = create(:contact)
      end

> This is the same with the update method, except we're not passsing a set of user-entered attributes.

      it "marks the contact as hidden" do
        patch :hide_contact, id: @contact
        expect { @contact.reload.hidden? }.to be_true
      end

      it "redirects to contacts#index" do
        patch :hide_contact, id: @contact
        expect(response).to redirect_to contacts_url
      end
    end

#### Testing nested routes [TODO]

#### Testing non-HTML controller output

We need to test exporting contacts to a CSV file (`link_to 'Export, contacts_path(format: :csv)`).

> controller

    def index
      @contacts = Contact.all

      respond_to do |format|
        format.html # index.html.erb
        format.csv do
          send_data(Contact.to_csv(@contacts))
            type: 'text/csv; charset=iso-8859-1; header=present',
              disposition: 'attachment, filename=contacts.csv'
        end
      end
    end

> Test this by verifying the data type.

    describe 'CSV output' do
      it "returns a CSV file" do
        get :index, format: :csv
        expect(response.headers['Content-Type']).to have_content 'text/csv'
      end

      it "returns content" do
        create(:contact, firstname: "Aaron", lastname: "Sumner", email: "aaron@sample.com")
        get :index, format: :csv
        expect(response.body).to have_content 'Aaron Sumner,aaron@sample.com'
      end
    end

> Ideally though, you should test generating CSV content at the model.

    it "returns comma separated values" do
      create(:contact, firstname: "Aaron", lastname: "Sumner", email: "aaron@sample.com")
      expect(Contact.to_csv).to match /Aaron Sumner, aaron@sample.com/
    end