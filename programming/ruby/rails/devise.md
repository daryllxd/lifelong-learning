## Devise

Devise is a flexible authentication solution for Rails based on Warden. 

10 modules:

- Database Authenticable: Encrypts and stores a password in the db to validate the authenticity of a user while signing in.
- Omniauthable: Adds OAuth
- Confirmable: Email with confirm
- Recoverable: Reset user pw
- Registrable: Handle signing up users
- Rememberable: Manages genrating and clearning a token for remembering the user from a saved cookie.
- Trackable: Tracks sign in count, timestamps, IP
- Timeoutable: Expires sessions that have no activity.
- Validatable: Provide validation of email and pw.
- Lockable: Lock account after failed number of sign-ins.

#### Getting started

    gem 'devise'
    $ rg devise:install
    $ rg devise MODEL # it is usually user
    $ rdm
    config.action_mailer.default_url_options = { host: 'localhost:3000' }

# Learning Devise for Rails

## Devise – Authentication Solution for Ruby on Rails

#### What Pageantus Needs

- Database Authenticatable: This module will encrypt and store a password in the database to validate the authenticity of a user while signing in. The authentication can be done both through POST requests or HTTP Basic Authentication. This is the basic module to perform authentication with Devise.
- Omniauthable: Attach OmniAuth support to Devise. By turning this module on, your application will allow the user to sign in with external accounts such as Facebook and Twitter.
- Registerable: You can control whether or not your application provides the registration mechanism by using this module. This module is also used to allow users to edit and destroy their accounts.
- Recoverable: There are times when users forget their passwords and need to recover it. This module is the answer for that need. Devise will allow the user to reset passwords and it will send the user the instructions via e-mail.
- Trackable: For certain websites, the sign-in tracker is very useful. The data can be very helpful to retrieve some information. If you choose Devise to handle your authorization mechanisms, you will be able to do it. Devise provides this module to track sign-in processes, so a user can collect information regarding sign-in count, timestamps, and the IP address.
- Validatable: This module provides the basic validation for e-mail and password. The validations can be customized, so you're able to define your own validations.

#### After `rg devise:install`
- Created `c/i/devise.rb`, used as the Devise main configuration file.
- Created `c/locales/devise.en.yml` as an internationalization file.

### After `rg devise tao`

- Generates a `tao` class with the devise modules.
- Generate a migration where in the `tao` table is created.
- Generate a test file.
- Generate a fixture file (but if you have factory_girl it generates that).
- Modifies `c/routes.rb` to add the `devise` DSL thing.

> `user.rb`

    class User < ActiveRecord::Base
       # Include default devise modules. Others available
       # are:
       # :token_authenticatable, :encryptable,
       # :confirmable, :lockable, :timeoutable and
       # :omniauthable
       devise :database_authenticatable, :registerable,
       :recoverable, :rememberable, :trackable,
       :validatable
    end

#### Hello Devise

    class HomeController < ApplicationController
        before_filter :authenticate_user!
    end

Basically what happens here is that this method is already known to devise. It performs a check if you are logged in first. What hapens is that it will automatically ask you to log in whenever you go to that page.

    before_filter :authenticate_user! only: [:index, :new]

#### New methods

- `current_user`: SE
- `user_signed_in?`: A bit SE as well.
- `user_session[:hello] = "world"`: A session variable that contains the subset of RoR session data.