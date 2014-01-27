## [Reddit Thread](http://www.reddit.com/r/ruby/comments/1uk9d8/how_do_you_test_security_on_your_rails_apps_i/)

High Value: Payments, confidential information need more attention.

Low hanging fruit: Make sure that you're authenticating and authorizing users for each controller request. Check esp. for AJAX APIs.

CanCan/Pundit for resource authorization.

Use brakeman as a part of the CI infrastructure.

Codeship for Heroku.

Authentication, authorization, logging, crypto.

Static analysis: Brakeman, klockwork, HP Fortify. Dynamic: W3AF, Burp, IBM appscan, HP webinspect.

Check RCs that have been tagged with security.

User generated content has to have sanitized input. External programs, have t obe careful.

Gemcanary, Rubysec.
