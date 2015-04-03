## RailsConf 2014 - Deploying Rails is Easier Than it Looks by Ben Dixon
[link](https://www.youtube.com/watch?v=hTofBnxyBUU)

Heroku makes deploying your code super easy. And because Heroku has made it super easy, it's easy to not learn it.

PaaS = Platform as a service = something like Heroku. VPS = Virtual Private Server = A Linux Server in the Cloud.

How does `rails server` become a production setup?

VPS: Has a web server (Nginx, Apache), app server (Unicorn, Thin, WEBrick), and a database server. Same as development server (you own computer is your web/app/database server.

If the request was for a static file (static file means anything that goes in the Rails asset pipeline or anything you might find in `public`, the web server will send that file directly. If that request is for a dynamic page, then it will get passed to an app sever.

When you run `rails s` in development, you run an instance of an app server. The web server passes requests to this, the app server generates a response, and this is returned to the user. (This is Thin, WEBrick, Puma, Unicorn).

Database server: MySQL, PostgreSQL, MongoDB, and these can stay in the same server.

#### Why?

- More bang for your buck
- Background jobs--you can have lots and lots of them.
- As with any new skill, you will have to put in time to learn it. Compare to market rates, it sort of make sense financially.
- Your infrastructure becomes another one of your tools for making cool stuff.

What not to do? Google "How to Setup a Rails VPS" and type the commands in, since you can't replicate the same thing if it goes wrong.

What you want is a configuration management tool: It automates the commands you would type in to setup a server. *Once you've done it once, doing it again is trivial.*

Chef will allow you to choose a set of roles a server will have (app, database, Redis, etc.) Configuration Management is the DRY for setting up servers.

The problem with just entering commands in a server is that there is no audit trail. With a configuration management utility, you make some sort of audit trail.

#### What about deployment?

- Add Capistrano gems.
- `cap install`
- Modify `Capfile`.
- Modify `deploy.rb`.
- Modify `production.rb` to point to correct server.
- `be cap production setup_config`.
- `be cap production:database`: Creating a database.
- `be cap production deploy`. Migrations, assets, restarting the apps.

#### What about when it breaks?

- Try self-help tools: "here's what to do in case this problem happens". This is where configuration management tools can help.
- Use monitoring tools e.g. Monit.
- Exception handling, exception notifiers.
- Ex: If Redis is not working, restart it, if still not, restart it.

#### Suggested First Stack:

- Nginx
- Unicorn (helps in zero-downtime deployment)
- PostgreSQL
- Monit (It's tiny, and uses little memory.)
- Chef Solo + Knife for server provisioning. (This is built on top of Chef Server which will allow you to deploy in complicated formations.)
- Capistrano 3. While more documentation exists for 2, Capistrano 3 builds directly over Rake, which makes the learning curve shallower.
- VPS: Digital Ocean or Linode. Get 1GB, 512Mb is not worth the hassle.

