# What technical details should a programmer of a web application consider before making the site public?
[link](http://programmers.stackexchange.com/questions/46716/what-technical-details-should-a-programmer-of-a-web-application-consider-before)

*Interfaces and User Experience*

- Test against Gecko/Firefox, Webkit/Safari, Chrome, supported IE browsers, Opera, different operating systems.
- Staging: Have one or more test or staging environments available to implement changes to architecture. Have an automate way of deploying changes.
- No unfriendly errors.
- Don't put users' email addresses in plain text.
- Add `rel="nofollow"` to user-generated links to avoid spam.
- Redirect after a POST to prevent a refresh from submitting it again.

*Security*

- OWASP development guide.
- SQL injection.
- Never trust user input.
- Hash passwords using salt.
- Use SSL/HTTPS.
- Prevent session hijacking/XSS/CSRF.

*Performance*

- Implement caching if necessary.
- Optimize images.
- Gzip/deflate content.
- CSS image sprites.
- Split components (such as static content) across domains.
- Favicon at the file root. *Browsers will automatically request it.*

*Bug fixing*

- Understand you'll spend 20% of your time coding and 80% of it maintaining, so code accordingly.
- Set up a good error reporting solution.
- Document how the application works for future support staff.
- Acceptance test using frameworks like Selenium.
