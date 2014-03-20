# Thoughtbot Playbook
[Link](http://playbook.thoughtbot.com/#converge)

Time: 40 hours/week, 32 hours for clients and 8 hours on "investment time".

Consulting: Sales -> Design -> Develop -> Shipping -> Monitoring -> Iterating

Investment: OSS, Learn Prime, write a blog post, contribute to dotfiles, technical research, product design sprint, volunteer as mentor

## Product design sprint

`Understand -> Diverge -> Converge -> Prototype -> Test and learn`

We want to turn false confidence into validated confidence before beginning an expensive build.

1. *Prep Work:* The clients schedule 5 real humans for the tests we'll do in the last phase. Research using Quora, Google Analytics, interviews, survey
2. *Understand:* Sticky notes, practice the client's pitch to the investors.
3. *Diverge:* Where will users come from? We sketch 10+ user flows and user interfaces.
4. *Converge:* Identify the best ideas: We identify assumptions and solve conflicts.
5. *Prototype:* Real text, not lorem ipsum. Squarespace, Bourbon+Neat+Bitters, Invision. Learn these tools during Investment time.
6. *Test and Learn:* Web app first version is in 4-6 weeks. Mobile (via HockeyApp)

## Platforms
For designers/developers, what's best for us? Open source with strong community, the tools make the des/devs happy, the tools make it easy to create and iterate quickly.

RoR is fast to market and have a low cost of ownership because they are highly conventional. Codebases look similar to each other.

Big overlap among agile and Ruby communities. So TDD, OOD, and DRY. OSS: HTML, CSS, JS, Unix, Vim, PGSQL.

IE 9, FF, Chrome, Safari.

Mobile web app over native because all modern smart phones can render HTML, so we can expose API.

Ruby for server-side, CoffeeScript for client-side, Objective C/Cocoa for mobile.

Redis: Used for storing transient, high read/write data like activity feeds, tags, background jobs, sessions, tokens, and counters. Redis provides tremendous speed from in-memory operations and point-in-time snapshots of our dataset.

Redis to Go on production Redis DBs.

Laptop Setup: [Laptop github script](https://github.com/thoughtbot/laptop).

## Planning
- Frequent release.
- Daily standups: Every morning, we get together as a team for 10 minutes at 10 AM. We talk about what we did yesterday, what we're going to do today, and if anything is blocking us. We resolve blockers or help the person after standup.
- Trello for project management.
    + Next Up
    + In progress
    + Code review
    + Testing on staging
    + Ready for production
    + Live (this week)
    + Live (last week)
    + Live (last last week)
- Weekly retrospective: On Monday, everyone meets in-person for 30 minutes. We celebrate success, identify and address areas for improvement.

#### Planning Meeting (Thursday, 30 min)
- Do cx like the product?
- We are aggressive in cutting features, budgets, and schedules.
- Few software projects fail because they aren't complicated enough. Saying "no" means keeping the software we're building as simple as possible. Every line of code we write is an asset and a liability.
- Simple software, once launched, is better suited to meeting the demands of customers. Complex software, if it ever even launches, is not as able to respond to customer demands quickly.

## Designing

Everyone has Moleskine notebooks so we can put our ideas to paper whenever they hit us. HTML/CSS wireframes are built using Bourbon and Neat.

Design should be ahead of development.

#### UI
- Put outcomes first.... not how pretty the app is
- Affordances
- Context near to platform
- Consistent across the application

#### Visual
- Alignment using Grids
- Emphasis
- Consistency (buttons, links, headers look alike)
- Whitespace (elegant)

Typefaces from Typekit and typography.com.

Usability tests: They find people on Craigslist and ask them to come over.

## Developing

The majority of our development practices were first detailed in Kent Beck's classic Extreme Programming Explained: Embrace Change and in Gerald Weinberg's The Psychology of Computer Programming. We've tried its practices and found that using most of the practices most of the time improves the quality of our work and happiness of our team.

#### Use thoughtbot style guide
- Be consistent.
- Don't rewrite existing code to follow this guide.
- Don't violate a guideline without a good reason.
- A reason is good when you can convince a teammate.

Acceptance tests: Run the code against the app, fail first then it has to pass after. Run the code on the CI server to make sure the accpetance test still passes in an environment that matches the production env.

Push the code to the staging env and the dev/cx rep smoke test it in the browser.

When CI is green and other des/dev/clients are satisfied, push to production.

#### Code Review

Create a local feature branch based off master.
When feature is complete and tests pass, stage the changes.
When you've staged the changes, commit them.
Write a good commit message.
Share your branch.
Submit a GitHub pull request.
Ask for a code review in Campfire.
A team member other than the author reviews the pull request. They follow Code Review guidelines to avoid miscommunication.
They make comments and ask questions directly on lines of code in the GitHub web interface or in Campfire.
When satisfied, they comment on the pull request "Ready to merge."
Rebase interactively. Squash commits like "Fix whitespace" into one or a small number of valuable commit(s). Edit commit messages to reveal intent.
View a list of new commits. View changed files. Merge branch into master.
Delete your remote feature branch.
Delete your local feature branch.

Test-Driven Development moves code failure earlier in the development process. It's better to have a failing test on your development machine than in production. It also allows you to have tighter feedback cycles.

#### Code Review Benefits

The whole team learns about new code as it is written.
Mistakes are caught earlier.
Coding standards are more likely to be established, discussed, and followed.
Feedback from this style of code review is far more likely to be applied.
No one forgets context ("Why did we write this?") since it's fresh in the author's mind.

#### CI

We have a test suite that each dev runs on their own machine.
When they commit their code to a shared version control repository, the tests are run again, "integrated" with code from other developers.

When we write the fix and commit to version control again, we'll get a "passing build" alert in Campfire and via email. Click the alert and we see the passing build.

A solid test suite is an absolute requirement for a web application in our opinion. However, one major problem with test suites is that they get slow as they get large.

CI can ease the pain by distributing the test runs in parallel. We've had 45 minute test suites cut down to 2 minutes using this technique.

Travis CI for open source projects, TTDium for private repos.

## Production

#### Checklist

Are we on the Heroku Cedar stack?
Are we using a concurrent web server? See how to set up Unicorn.
Are long-running processes such as email delivery being run in background jobs? See how to set up Delayed Job.
Are there redundant (at least two) web and background processes running?
Are we using SSL? See "SSL Certificates" section below.
Are API requests being made via a separate subdomain (api.example.com)? Even if the same app, this gives us architectural flexibility in the future.
Is Ruby 2.1.0 defined in the Gemfile? See how to set it up.
Is config stored in environment variables? See Foreman.
Are deploys done manually at a scheduled time when teammates are fresh and available if something goes wrong?
Do deploys follow a well-documented script?
Are we sending logs to a remote logging service? See How to Splunk with Heroku.
Are we using a Heroku "Yanari" database or higher? See Heroku production databases.
Are we backing up our production database? See PG Backups.
Are we monitoring performance and uptime? See New Relic.
Are we tracking errors? See Airbrake.

DNSimple to buy and maintain domain names.

SSL: Buy a wildcard cert from DNSimple.

Hosting: Heroku. File uploads: Amazon. CDN: Fastly.

Performance monitoring: NewRelic.

Performance fixing: Amazon server cluster, gzip, Asset pipeline, SQL query caching, database indexing, eager loading, HTTP caching.

Error tracking: Airbrake.

Transactional email: Sendgrid. (Confirmations, follow ups, free trial is expiring, messaging)

Payment processing: Stripe, Balanced.

## Measuring

Dave McClure's AARRR framework (Acquisition, activation, retention, revenue, referral)

- Activation: visitor finds the product desirable enough to try, is able to use it and get to aha moment in shortest time possible
- Retention: user regularly uses product, it is doing the job they hired it for, customer is happy
- Revenue: user pays for product
- Acquisition: we know where our users come from, are able to try new channels, run tests, and kill or double-down on different channels
- Referral: users refer other users, the ideal acquisition channel

Segment.io to capture events. Put one JS library on the web-apps, one ruby library on the server-side fw, and one iOS SDK. API endpoint is on AWS.

Biz analytics do not need to be realtie. So we user Delayed Job and IronWorker.

Subscription Metrics: Monthly recurring revenue, active subscriptions, lifetime value, churn per-plan, monthly and anually.

#### To raise money:
- LTV is 3x-5x CAC
- 10-30% month-over-month growth in MRR (monthly recurring revenue)
- 5-7% annual churn

## Sales

- Someone contacts us.
- We have them fill out our new project form.
- We have a phone call or have them come into the office.
- Qualify/disqualify: are we a good fit for the client?
- Qualify/disqualify: is the client a good fit for us?
- Understand the client's vision.
- Agree to the outcomes we're trying to achieve.
- Estimate iterations.
- Schedule people for iterations.
- Sign the contract.
- Pay us for the first iteration.
- We begin work.

Extreme programming: Cx is always available. This means face-to-face, on site.

Roles: We want to be t-shaped.

We need to know the client's budgets.

Pricing:  Per person, per week rate. Project management: Trello, Chat: Campfire, VCS: Github.

#### Typical Projects
- "Product design sprint", 2 people, 1 week
- "Zero to Version 1", 2 people, 4 weeks
- "Fill a gap until an internal team is hired", 2 people, 3 months
- "Staff augmentation with existing internal team", 3 people, 6 months
- "Maintenance team", retainer per month

## Contract

We store contracts in Dropbox and have a series of folders for pending, current, past, and lost clients.

The consulting proposal and contract contains:

- A one-page summary of the expected work.
- Our weekly rate.
- Net 15 payment terms.
- Payment for the first two weeks is required to start working.
- After the first two weeks, invoices will go out once a week on Saturday mornings for the prior week's work.
- Agreement that the client owns the week's source code once they've paid their weekly invoice.
- Agreement that both parties won't use materials which break someone else's copyright.
- Agreement that both parties won't publish things to the web hosting provider which are abusive or unethical.
- Agreement that the contract is mutually "at-will" and either side can decide - to stop work at the end of a week.
- A page for signatures.

Invoices: Freshbooks, Stripe. 5% commission on the seller of the sales process.

#### Hiring

Meet at: Github, user groups, Dev Bootcamp, Authentic Jobs, SO Careers.

Interviewing: Inbox, Code/Portfolio review, Non-technical interview, Technical interview, Office visit.

Character strengths: Enthusiasm, focus, composure, gratitude, curiosity, optimism, grit, emotional intelligence, humor, appreciation of beauty.

## Operations

- Outsource things which are super important but we are not excellent at.
- Spend time selecting a vendor and occasionally spend time reevaluating other vendors.
- Automate repetitive tasks.
- Try to avoid building internal tools. It requires time and money to build and makes us reliant on ourselves when things don't work.
- Our problems are not unique. We will try manual processes first. When we do build something, it is usually after using other things for years.

Every full-time employee gets an American Express corporate card for business expenses. We've hired trustworthy people. Use your best judgement on how much to spend and what is a business expense. It saves time and treats people like adults.

We use Google Docs for our editable documents.

We prefer Google Docs because they are:

Easily sharable by URL. Everyone has a browser, not everyone has MS-Office or OpenOffice installed.
Always up to date with the latest edits.
Enable real-time collaboration, like group meeting notes.
Autosaved to the cloud, so no worrying about backup.
Are as easy to find as Googling something.
Without document type versioning (e.g. xls vs. xlsx).
Cheap.

#### Meetings

We over-communicate with clients in-person and online to avoid having scheduled meetings. Every problem arises from poor communication.

When we need to meet for a discussion, we aim for 30 minutes spent in-person.

When working remotely, Google Hangouts are indispensable as the "next best thing". They are easy to set up, sharable by URL, and let us get a look at whoever we're talking to.

## Sharing

Blog: Some writers use the rule "spend 90% of your time on the headline and 10% on the article." Some fast-growing media companies require their authors write 25 headlines before publishing.

Write the post in Markdown in the our blog's GitHub repo. Add tags to the post. The tags link to Learn and are also converted to keyword meta tags.

When you're ready for feedback from the team, move the card to "In Review" list and share the Trello card's URL with the team in Campfire. Make changes based on their feedback and your judgement.

Promote the post on Hacker News, Reddit, RubyFlow, or other appropriate social bookmarking sites for the content.

Link to the post from your Google+ profile in order to set up Google Authorship.

Consider using Buffer to schedule two or three tweets for the post over the next 24 hours. Folks in Asia, Australia, Europe, Africa, and the Americas will be more likely to see it. Use different interesting parts of the post to highlight in each tweet.

#### Open Source

The leader doesn't necessarily do the bulk of the actual work; responsibilities include:

Understand the underlying code and goal of the library
Review and merge pull requests
Respond to and close issues
Push new releases of gems when appropriate
Encourage people to take on useful tasks for the library
Blog, tweet, and otherwise advertise new releases and tips

very thoughtbot developer, designer, and apprentice has commit access to our open source repositories. Some guidelines:

You may want to check with the project leader to see what would be most useful, or whether or not they're on board with your idea.
Send pull requests rather than committing straight to master.
Try helping out with existing pull requests or bug reports.
Documentation patches are a great way to get familiar with a project.
Got an idea for a new library? Found something useful in a client project that you think is reusable? Great! Some guidelines:

Extractions are more likely to be useful than Brave New World ideas, because you're extracting something that has already proven useful once.
If you create a new library, you're expected to lead it, at least for the beginning of its life. Make sure you have time to maintain it.
Try not to duplicate something that's already been done well. Look around to make sure your problem hasn't already been solved.
Fixing bugs that affect client projects or introducing small features that would really help a client project is fine during client time. Most open source work should be conducted during investment time.
Think about whether your idea makes more sense as a pull request to an existing project.
