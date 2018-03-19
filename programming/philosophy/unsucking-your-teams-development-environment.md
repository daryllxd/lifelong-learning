## Unsucking Your Team's Development Environment
[link](http://zachholman.com/talk/unsucking-your-teams-development-environment/)

We've thought a lot about the onboarding process, and how to onboard people to the team. Previously, this was 1 week, now we can do it in 20 minutes. We boot every single app internally in 20 minutes. We want new hires to ship something at the end of the week, and if you're waiting for some environment setup, that's a problem.

*The app.* Every app should have a one-liner install, no matter how complex it is. Even large projects can have a tutorial-style script. That's kind of a small thing in hindsight, but that's also a big thing.

Things suck less: Bundler, Rbenv, Homebrew, Foreman. Try to leverage these cool tools and figure out if you can automate these.

App bootstrap: How do we go from a clean machine to everything you possibly need.

- Dependency checks (Do you have MySQL, PostgreSQL, Redis).
- Migrations (No more `rake db:migrate`).
- Bundler.
- Asset compilation (404 and 505 pages are just pages we generate).

To make this faster, we just check the checksum of the Gemfile and assets. If there is a difference, go, if not, then don't. Put this in `script/server` and `script/console` and `script/ci`. Designers love this because they can get things to work. Developers love this.

`replicate-repo`: It's a support script that loads production data locally. For us, it's `replicate-repo`, but it can be `replicate-user` or something else. This just `belongs_to` and `has_one` associations to your own database.

Automate boring support tasks. It's a hard problem with a lot of stuff that can be automated.

`ci-build`. We can set environment variables, we can clean the work directory we can do the Bootstrap again. We can just put this straight in your Git repo. *Use computers to do things.*

*The stack.* Machines should actually be expendable. Machine setups should be automated. The setup:

- Get a laptop.
- Run a one-liner.
- Have a beer.
- Hack.

`$ gh-setup <project>` to pull down the repository, and you manage everything from there. This is about 50 services and apps.

Installs: Dropbox, Homebrew, Chrome, 1Password, MySQL, Node, Redis, Riak, Postgres, RBenv, Config: Full-disk encryption, VPN screen locks, etc.

We do this via Puppet. I don't really care about the technology, I just care that it works. We also auto-report any failure to Github issues. This just logs the issue in your name.

*The deploy.* Don't handle your own deploys. We have two components: `Hubot` and `Heaven`. It's basically `Hubot deploy Github to production` or `deploy Github to production/fe` or `deploy Smoke to ESL2.EE1`. We sometimes deploy a branch to production to just a server, and if everything works, deploy to master.

Heaven helps on deploy locking. Once CI passes, lock builds etc. This is important because we want to continuously ship stuff out.

*The company.* Take away the bullshit. Just being an employee adds a lot of overhead. Sites, logins, reports, payroll, terms, names, communication. To this this, we try to OAuth everything. We just have people worry about their authentication. Otherwise, we build Helpers. Ex: App called Team. It's a way to tell people what they're working on. It's also a way for users to figure out what they're upset about. You can write a guide, on the first day, you can go through the guide and you get to know what the company is. We have TVs in the office which we plug stuff into and show other people.

*Automate everything.* We have zero managers because we automate things as much as possible. *Long-term benefit will always outweigh short-term cost.*
