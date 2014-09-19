# Send Email with Rails
[link](http://railsapps.github.io/rails-send-email.html)

Three types of email:

- Company email: Gmail or Google apps for business.
- Email sent from the app ("transactional email"): ESP (email service provider) such as Mandrill or SendGrid.
- Broadcast email for newsletters or announcements. You may want to consider using a dedicated service for mass emailing. You get features such as management of unsubscribe and templates to design attractive messages. MailChimp.

If you are using the Devise `confirmable` module to send email, modify `config/initializers/devise.rb` to set the `config.mailer_sender` option for the return email address for messages that Devise sends from the application.

## Configuring ActionMailer

> `c/e/development.rb`

    config.action_mailer.default_url_options = { :host => 'localhost:3000' }
    config.action_mailer.delivery_method = :smtp
    # change to true to allow email to be sent during development
    config.action_mailer.perform_deliveries = false
    config.action_mailer.raise_delivery_errors = true
    config.action_mailer.default :charset => "utf-8"

## Using Mandrill

> `/c/e/production.rb`

    config.action_mailer.smtp_settings = {
      :address   => "smtp.mandrillapp.com",
      :port      => 25,
      :user_name => ENV["MANDRILL_USERNAME"],
      :password  => ENV["MANDRILL_API_KEY"]
    }
