## [So What, Exactly, Is the Purpose of a Rails Controller?](http://techiferous.com/2013/04/so-what-exactly-is-the-purpose-of-a-rails-controller/)

Receive and HTTP request, translate it to something the app understands. Not your job to make the HTML. You just make the HTTP.

Controller/view are interfaces to the app. Model layer has domain concepts, logic, behavior. Just call commands on the model layer.

## [Object Oriented Rails – Writing better controllers](http://pivotallabs.com/object-oriented-rails-writing-better-controllers/)


> Horrible

    class RegistrationController < ApplicationController
      def create
        user = User.where(username: params[:username]).first
        user ||= User.new.tap do |new_user|
          new_user.username = params[:username]
          new_user.save!
        end
        render json: user
      end
    end

    class User
      validates_uniqueness_of :username
    end


> Logic does not belong to a controller. Nearly impossible to test this without having a ton of stubs and mocks. Good indicator of doing it wrong: `User.any_instance` in your specs.

    class User
      validates_uniqueness_of :username

      def self.register(username)
        user = User.where(username: username).first
        user ||= User.new.tap do |new_user|
          new_user.username = username
          new_user.save!
        end
      end
    end

    class RegistrationController < ApplicationController
      def create
        user = User.register(params[:username])
        render json: user
      end
    end



