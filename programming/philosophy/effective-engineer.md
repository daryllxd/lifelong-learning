# What Google Taught Me About Scaling Engineering Teams
[Reference](http://www.effectiveengineer.com/blog/what-i-learned-from-googles-engineering-culture)

- "Testing on the Toilet": The strength of Google's engineering culture is to efficiently disseminating a consistent and opinionated set of best practices to a large organization.
- *Dedicate engineering resources towards shared tools and abstractions.* Protocol Buffers, MapReduce, BigTable were all invested in by Google. Dedicated tools = improvements to engineering productivity.
- *Invest in reusable training materials to onboard new engineers.* Training documents: covered the core abstractions at the company, highlighted relevant snippets of the codebase, and then validated understanding through a few implementation exercises. "Things you have to read first re: this codebase."
- *Standardize on coding conventions.* Linter.
- *Increase code quality through code reviews.* Having code reviews required/enforced for every change slows down things but optimizes for code quality.
- Having the right data can solve problems. Logging and data infrastructure.
- Automate testing, so you can scale your code.

# How to Build a Good Onboarding Process for New Hires at a Startup
[Reference](http://www.effectiveengineer.com/blog/how-to-build-a-good-onboarding-process-for-new-hires-at-a-startup)

- Onboarding: you can direct the learning and the activity of a new hire towards what the team believes most. The initial time investment to build a good onboarding program will pay off dividends with each additional hire.
- What we did well:
  - *Ramp up a new employee as soon as possible.* Assign each new engineer a mentor who's responsible for the person's success. Then, build a shared understanding where it's acceptable, and encourage mentors/employees to spend time to train new employees. It's a higher priority to get them ramped up than to get my other work done.
  - *Impart the startup's culture and values.* Getting things done, being data-driven, working well as a team, building high quality products. First day activities: enough time to set up the development environment, make a code change, run tests, and commit the change on the first day.
  - *Expose the employee to the breadth of fundamentals needed to succeed.* 10 talks: codebase, git's data model, testing expectations, demoed debugging/profiling tools, covered topics that might be important.
    - Codelab: a document that explains why a core abstraction was created, shows how it's used, walks through relevant parts of the codebase, and the provides a set of exercises to validate understanding.
  - *Socially integrate.*

# What Makes A Good Engineering Culture
[Reference](http://www.effectiveengineer.com/blog/what-makes-a-good-engineering-culture)

- *Optimize for iteration speed.*
  - This means giving engineers and designers flexibility and autonomy to make day-to-day decisions without asking for permission.
  - Continuous deployment: supports rapid validation, high test coverage to reduce build and site breakages, fast unit test to encourage people to run them, fast and incremental compiles and reloads to reduce development time.
  - When changes see live traffic quickly, people are more excited about features.
  - If the team is indecisive, the individual's efforts will flounder.
- *Push relentlessly toward automation.*
  - Scale for "minimal operational burden." If it is possible, try to get 1 million users per engineer.
  - Measure anything and measure everything.
- *Build the right software abstractions.*
  - Google: MapReduce, SSTable, Protocol Buffers. Facebook: Thrive, Scribe, and Hive. Memcached, Redis, MongoDB means  there's less need to build custom storage and caching systems.
- *Develop a focus on high code quality with code reviews.*
  - Peer pressure of someone will review the code and committing poorly written code is a strong deterrent against hacky, unmaintainable, or untested code.
  - Quora: different standards for model or controller code and view code.
- *Maintain a respectful work environment.*
  - Encouraging debate in brainstorming actually helps to avoid groupthink and generates more effective ideas.
  - If you criticize something, criticize the ideas, not the person.
- *Build shared ownership of code.*
  - Engineers are free from the sense that they're stuck on certain projects and encourages them to work on a diversity of projects, which helps to keep work interesting and boosts employee learning and motivation.
- *Invest in automated testing.*
  - Testing and validation are most easily done by the original code authors when the code is fresh in their mind.
- *Allot 20% time.*
- *Build a culture of learning and continuous improvement.*
  - Tech talks, documenting processes, ensuring everyone has the algorithms, systems, and product skills necessary for success.
- *Hire the best.*
