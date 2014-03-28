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

intel emulator HAXM

## So You Want to Each Ruby and Rails

## Money, Sex, and Evolution

Agent-based Modeling with Ruby

Emergent behavior - complex behavior arising from simple rules.

Autonomous agents interacting with each other and the environment

Gosu.

Why the inequality? Hard work/inherent talent/ability? All roids are the same.

EB - Small behaviors ripple towards a bigger effect. Simple local rules bring complex shit.

Simulation suggest small internal factors can be enough to trigger crises that cannot be recovered.

## Ruby Groups: Act Locally, Think Globally

## Happy Teams

- Hire for the Right Fit
- Realistic Planning
- Open Communication
- Daily Status Updates
- Code Review/Pair Programming
- Code Style Guide
- TDD, not just test
- Continuous Integration and Deployment
- Automate: Machine setup, staging server/production server setups, dump data from production to staging, `CodeClimate,` `simplecov`, `rails_best_practices`
- Team Learning Activities: Even stuff like watching Railscasts/Confreaks
- Retrospectives/feedback sessions: *This is the single most effective way to make teams happy.*
- Go home.

# RubyGems
-  

# Rails
- Fork Rails
- Clone your fork into Rails
- Make sure you test against the right thingie
- Don't commit to your master. Create a branch (`git checkout -b run-tests-against-2.1`) (topic branch)
- Then do a `git remote add`.
- `git stash` to stash the change into the repository, `git pop to remove from repo`
- Then do a `git push` to the origin/topic branch. Then you see a new branch, then.
- So you merge from daryll/rails:mybranch to rails/rails:master
- next need to reproduce an issue using a test.
