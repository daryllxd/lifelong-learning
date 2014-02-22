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
