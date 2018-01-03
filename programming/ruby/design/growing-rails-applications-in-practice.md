## Growing Rails Applications in Practice

### 2. Controllers

- Controllers are awkward.
  - Implementing custom mappings between a model and a screen requires too much controller code. Ex: working on multiple models, or a form with additional fields not contained in the model.
  - Hard to test (request, params, sessions).
  - No clear guidelines.
- Consistent controller design.
  - Controllers should be short, DRY, and easy to read.
  - Provide the minimum amount of glue code.
  - As much as possible, build against a standard, proven blueprint.

``` ruby
class NotesController
  # We only read or change a single model. If an update involves multiple models, then you need some orchestrating model to do that. Glue code = in the model.

  def index
    load_notes
  end

  def show
    load_note
  end

  def new
    build_note
  end

  def create
    build_note
    save_note or render('new')
  end

  def edit
    load_note
    build_note
  end

  def update
    load_note
    build_note
    save_note or render('edit')
  end

  def destroy
    load_note
    @note.destroy
    redirect_to notes_path
  end

  private

  # A lot of the work is delegated to the helper methods
  def load_notes
    @notes ||= note_scope.to_a
  end

  def load_note
    @note ||= note_scope.find(params[:id])
  end

  def build_note
    @note ||= note_scope.build
    @note.attributes = note_params
  end

  def save_note
    if @note.save
      redirect_to @note
    end
  end

  # Strong parameters to whitelist. Authorization does not belong in the model
  def note_params
    note_params = params[:note]
    note_params ? note_params.permit(:title, :text, :publuished) : {}
  end

  # This method guards access to the `Note` model, and so we have a central place to control which recrords the controller can show, list, or change.
  # Very big chance that we have to implement some kind of restriction or whatever so we can do Note.where(user: current_user)
  def note_scope
    Note.all
  end
end
```

- Controllers should handle:
  - Security (authentication/authorization)
  - Parsing/white-listing parameters
  - Loading/instantiating the model
  - Deciding which view to render
- Controllers should contain the minimum amount of glue to translate between the request, your model, and the response.

### 3. Relearning ActiveRecord

- AR is easy to misuse.
- You can change the API of the AR::Base to work in validations and callbacks.
- Pros:
  - Manipulating a record does not automatically commit changes to the db, instead, the record is put into a "dirty" state.
  - You can just leverage AR's error tracking.
  - You can use `state_machine` and `paper_trail`.

### 4. User interactions without a database

- Ex: Sign in form, search form, payment form like in Stripe.

``` ruby
# ActiveModel
class SignIn < PlainModel
  attr_accessor :email
  attr_accessor :password

  validate :validate_user_exists
  validate :validate_password_correct

  def user
    User.find_by_email(email) if email.present?
  end
end
```

- Because AM mimics AR, we can do:
  - Attributes setting from the params.
  - Validations via `validates`.
  - An object can be "saved", where an action is performed.
  - You can also do `form_for(SignIn.new)`.

``` ruby
class PlainModel
  include ActiveModel::Model
  include ActiveSupport::Callbacks
  include ActiveModel::Validations::Callbacks

  define_callbacks :save

  def save
    if valid?
      run_callbacks :save { true }
    else
        false
    end
  end
end
```

``` ruby
class AccountMerge < ActiveType::Object
  attribute :source_id, :integer
  attribute :target_id, :integer

  validates :source_id, presence: true
  validates :target_id, presence: true

  belongs_to :source, class_name: 'Account'
  belongs_to :target, class_name: 'Account'

  after_save :transfer_credits
  after_save :transfer_subscriptions
  after_save :destroy_source
  after_save :send_notification
end
```

With an ActiveModel, the controller can now fit into the same control flow as any other controller in your application.

### 5. Dealing with Fat Models

- Why? You have these use cases:
  - A new user signs up through the registration form: validations, accessors for passwords, callback to send e-mail, callback to set default attributes, protection for sensitive attributes, code to encrypt passwords.
  - An existing user signs in with her email and password. Method to look up a user by email or username, method to compare password/encrypted password.
  - A user wants to reset her lost password. Code to generate tokens, recovery link.
  - A user logs in via Facebook. Code to authenticate via OAuth.
  - A user edits their profile. Validation for password strength, callbacks, validations.
  - An admin edits a user from the back-end. Access control, code to disable a user account, admin flag.
  - Other models.
  - Background tasks. Scopes, methods to perform that task.
- We want:
  - `PasswordRecovery`, `AdminUserForm`, `RegistrationForm`, `ProfileForm`, `FacebookConnect`.
  - You need to place it into a place of your choice, or it will infest an existing class.
  - Changing records on the Rails console.

### 6. A home for interaction-specific code.

- Core models:
  - No validations that are supposed to happen on just a particular form.
  - No virtual attributes to support forms that do not map 1:1 to your database tables.
  - Callbacks that fire for only a particular user case.
  - Access control.
  - Helper methods for rendering complex views.

``` ruby
class User
end

class User::AsSignUp < User
  # sign up related things
end

Then in the controller, you can have `User::AsSignUp` (previously `User`).
```

### 7. Extracting Service Objects

- AM is good for user-facing forms, but if its the type of code that doesn't see the user, you can just use a simple PORO/service object.
- Ex: searching. Create a `Note::Search` class which houses the search-related code. If new requirements appear, then you have a home for the code to do that.
- You don't just move code around, but you have multiple, loosely coupled components.
  - Less side effects.
  - Less validations and callbacks.
  - Easier to navigate through code. Many small classes, vs a huge class with many purposes.

### 8. Organizing Large Codebases with Namespaces

### 9. Taming Stylesheets

### 10. On Following Fashions

- Trust that the default MVC style of Rails will carry you a long way if you are well-organized and consistent in your design decisions.

### 11. Surviving the Upgrade Pace of Rails

- Gems increase the cost of upgrades.
- Upgrades are when you pay for monkey patches.

### 12. Owning Your Stack

- When you add a gem or technology, you now own that component.
  - You are responsible for its behavior under load, security, upgrading, maintaining, dependencies.

### 13. The Value of Tests
