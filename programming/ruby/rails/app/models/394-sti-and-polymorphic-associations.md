## #394 STI and Polymorphic Associations

#### STI

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

