## Railscasts #394 STI and Polymorphic Associations

Currently, we have this:

> a/m/user.rb

    class User < ActiveRecord::Base
      has_many :tasks, dependent: :destroy

      attr_accessible :username, :email, :password, :password_confirmation

      validates_presence_of :username, :email, :password_digest, unless: :guest?
      validates_uniqueness_of :username, allow_blank: true
      validates_confirmation_of :password

      # override has_secure_password to customize validation until Rails 4.
      require 'bcrypt'
      attr_reader :password
      include ActiveModel::SecurePassword::InstanceMethodsOnActivation
      
      def self.new_guest
        new { |u| u.guest = true }
      end
      
      def move_to(user)
        tasks.update_all(user_id: user.id)
      end
      
      def name
        guest ? "Guest" : username
      end
    end

The problem is that some fields (username, email, password) are not required when you are a guess and we perform checks on them always (on the name method, on new_guest method). When the application grows this check will be used more and more in the User model. So you might as well use STI here.

#### Using Single Table Inheritance

    $ rg migration add_type_to_users type
    $ rg migration remove_guest_from_users guest:boolean
    $ rdm

STI means you have a `type` column to the DB which stores the name of the class for each record, to differentiate behavior.

Then, split user class and create Guest and Member class. Modify modify.

    class User < ActiveRecord::Base
      has_many :tasks, dependent: :destroy
    end

    class Guest < User
        ... do guest things
    end

    class Member < User
        ... do member things
    end

Code is cleaner, but the UsersController needs to handle two things now, Member or Guest.

    class UsersController < ApplicationController
      def new
        @user = Member.new
      end

      def create
        @user = params[:member] ? Member.new(params[:member]) : Guest.new
        if @user.save
          current_user.move_to(@user) if current_user && current_user.guest?
          session[:user_id] = @user.id
          redirect_to root_url
        else
          render "new"
        end
      end
    end

We get error on the routing (`undefined members_path`) because when we create a `Member` model it will look for a `:members` resource instead. 

We can either: add a `:members` resources and set it up to that it redirects to the users controller
  
    resources :members, controller: users

, or just make `:members` and `:guests` controllers.

    resources :members  # Delete user controller and add members controller
    resources :guests   # Same here

    class MembersController < ApplicationController
      def new
        @user = Member.new
      end

      def create
        @user = Member.new(params[:member])
        if @user.save
          current_user.move_to(@user) if current_user && current_user.guest?
          session[:user_id] = @user.id
          redirect_to root_url
        else
          render "new"
        end
      end
    end

    class GuestsController < ApplicationController
      def create
        guest = Guest.create!
        session[:user_id] = guest.id
        redirect_to root_url
      end
    end

[TODO] this. I don't really understand everything.

## Ruby Science: Single Table Inheritance (STI)

Rails provides a mechanism for storing instances of different classes in the same table, called Single Table Inheritance. 

Rails will take care of most of the details, writing the class’s name to the type column and instantiating the correct class when results come back from the database.

#### Symptoms
- You need to change from one subclass to another.
- Behavior is shared among some subclasses but not others.
- One subclass is a fusion of one or more other subclasses.

> a/m/question.rb

    def switch_to(type, new_attributes)
        attributes = self.attributes.merge(new_attributes)
        new_question = type.constantize.new(attributes.except('id', 'type')) 
        new_question.id = id
    
        begin Question.transaction do
            destroy
            new_question.save!
        end

        rescue ActiveRecord::RecordInvalid 
        end

        new_question
    end

#### This is difficult because:

- You need to worry about common `Question` validations.
- You need to make sure validations for the old subclass are not used.
- You need to make sure validations for the new subclass are used.
- You need to delete data from the old subclass, including associations.
- YOu need to support data from the new subclass.
- Common attributes need to remain the same.

#### Solutions
- If you're using STI to reuse common behavior, use *Replace Subclasses with Strategies*.
- If you're using STI so you can easily refer to severaldifferentclasses in the same table, switch to using a polymorphic association instead.
