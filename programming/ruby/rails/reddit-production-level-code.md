# What is Production Level Rails Code?
[link](http://www.reddit.com/r/rails/comments/1wxt7k/what_is_production_level_rails_code/)

Al Rubin:

- Well-tested, when you have users/customers, every change can have a negative impact on the success of your project.
- Optimized. Intelligent caching, ensuring proper DB indices, using background jobs, being thread-conscious, optimizing your AR calls, paying attention to how assets are being served (minified/combined/sprites).
- Security. Can a jackass change the URL or tweak params being passed into a form? Rails handles a lot of this by default but if you're sloppy you can become susceptible to easy hacks. Are admin tools properly locked down via Cancan? How are roles established?
- Infrastructure. Can you scale up easily? What happens if your application code is running on multiple load-balanced servers? How do you collect feedback/bugs from users?

Rurouni Jones:

- Technically monitored. Do we have an exception notification system/monitor response times and memory usage? (Airbrake, New Relic, Loggly, etc.)
- Business analysis. Are you keeping track of key metrics? (Google Analytics)
- Automated. Can you spin up a new box in one click? Capistrano + Chef + Puppet + Docker.

Tim Archer:

- Production-level server?
- Redundancy built in to my production environment?
- Production-ready database service? (Does database data get backed up?)
- SSL?
- Do I have the ability to view and search my app logs? (Log entries/paper trail)
- Do I have good exception tracking and resolving set up?
- Do we have real time historical insight into the app's performance?
