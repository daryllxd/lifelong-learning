# 16: Action Mailer

By default Rails will try to send email via SMTP (port 25) of localhost. If you are running Rails on a host that has an SMTP daemon running and it accepts SMTP email locally, you don't have to do anything else in order to send mail. If you don't have SMTP available on localhost, you have to decide how your system will send email.

When not using SMTP directly, the main options are to use sendmail or give Rails information on how to connect to an external mail server.

    $ rails generate mailer LateNotice # creates app/mailers/late_notice.rb, app/views/late_notice.rb, spec/mailers/late_notice_spec.rb

    class LateNotice < ActionMailer::Base
      default from: "from@example.com"
    end

1. Create the public mailer methods such as `def late_timesheet()`.
2. Assign variables that will be needed by the email message template.
3. Call the `mail` method, which is conceptually similar to the render method used in controllers.

## Other methods

- `attachments`. `attachments["myfile.zip"] = File.read("/myfile.zip")`, `attachments.inline["logo.png"] = File.read("/logo.png")`
- `headers`.
- `mail`. Sets up the email that will get sent. It accepts a hash of headers that a `Mail::Message` will accept and allows an optional block. If no block is specified, views will be used to construct the email with the same name as the method in the mailer. If a block is specified, these can be customized.

