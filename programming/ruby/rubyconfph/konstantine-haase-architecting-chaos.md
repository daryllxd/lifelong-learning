- black font on white text
- practice and practice and practice

# Architecting Chaos

Crucial thingie: Does the feature in 1.0 still work on 2.0 (aka "works on my machine")

CI - Integrating all the time, which leads to a culture of shipping (deploying x times a day vs. x times a month)

Travis CI - the "build passing thing in Github". Use the free dynos on Heroku to run the CI stuff

Started with single app controlling VirtualBox via resque

Github -> Listener, queues shit on Redis.

Problem = people, people seem to like speaking for the product, but we want to have as many people working on the project because someone might do something amazing.

When you don't create quote by `_why`.

# Michael Reinsch

Linode - Pick one based on KVM.
AWS
Engine Yard - Built on AWS
Heroku - Dynos are isolated containers for instances

Why should developers care? Because the web application environment is your product, not your dev machine.

So have a Plan B.

# Keeping it Robust
- NewRelic, Logentries, Sentry for exception notifications, KISSmetrics for usage, A/B testing.
- Rails memory leaks: unicorn-worker-killer gem.

## Continuous Deployment
- Automate deployment trigger
- Rolling deploy/zero-downtime deploy
- nginx/unicorn
- linode/capistrano
- opsworks -> chef

Heroku rolling deploys - need to google, 2 dynos
