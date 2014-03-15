# Planning

Each project has one visionary: one person only and he protects the concept of the idea. Over weeks, the original idea is going to be compromised. People come up with ideas but if you don't believe the core, the idea will be broken.

Customers are good at describing their problems and are terrible at describing their solutions. It is almost good to blantantly disregard their solution.

Get out of the building. Talk to the customers where they live.

Too often the first thing that people do is to put a landing page. We believe that that's wrong. If you're going to spend PR effort to drive people towards a landing page that collects email addresses, that's wasted effort. Just ask them to sign up to working software. You don't need to build an audience via a landing page. Build a landing page via reputation.

Start blogging about the area of your solution. When you're finally ready to launch, you can sign up the audience. We've developed this through our own experiences. The people who put their email addresses are the same people who'd sign up on day 1 anyway.

A landing page sets an expectation that you are going to launch. But how if you aren't going to launch lol. That effort is wasted. Just build great software and build reputation.

First step, sketching. Written specifications are wasted effort. Put your pen to use actually sketching what the UI is going to look like. The majority of what happens in the software is manifested in the UI anyway. As the UI moves form sketch to screen, you are working in the same medium, the UI.

It's harder for us to look both a picture and think we are misunderstanding each other. It is important that everyone has to be together in the user sketches. You'll end up building software that not everyone understands. 

Sketches are not an artifact which are going to serve beyond that initial process. Everyone just needs something as a starting point. Because sketches are rudimentary, we can discard things easier. 

Whenever there is a question, we try to answer things as soon as possible but we can say that "okay we will worry about this in a bit". Relax a bit. Instead of fighting the change, embrace it. Keep your process as lightweight and as flexible as possible, because things will change based on feedback.

# Team

Technical co-founder, freelancer/firm, or build app yourself? Technical co-founder, don't try to just find this guy for cheap labor. You want to be in businesss with this person, this has to be someone that you would probably marry, hehe. You'll be with them for the business's duration.

Advantage of firm over freelancer, you have everyone needed to build and launch the business for you. Firm will coordinate the process, not the freelancer.

You probably should learn to dev and design. Is it feasible though? You can learn to program and hire a freelance designer.

The roles are broken into visionary, developer, and designer. Visionary will be hustling/selling to users/customers. Visionary should be saying "no" the most. Visionary protects the design. Bridge should be built between design and development. We want to bridge the middle of that gap as possible, but it's hard to find people who know both. We advocate pairing designers/developers together. This will make the software you build better and faster.

Splits: Graphic design/Usability. HTML/CSS/JS (Front-end coding). Ruby/DB/Ops (Backend).

- Concern of designer only: Graphics.
- Concern of dev only: Ruby, Database, Ops.
- Concern of both: HTML/JS/CSS/Usability.

# Design

The way the app works and the way it looks. Design takes time. Research, experimenting, and revising. You want to have a hypothesis on your experiments.

__Functionality trumps style, especially in the early stages of the application.__ Better to find something people love using rather than something they love to look at. Simplifying something is hard.

Say "No". If someone has a great idea, say no to the idea at first, and let the idea come back. If it's a good idea, it's not going to be forgotten. You'll do it eventually. You'll get to it eventually. By eliminating features right off the bat, you can create simple stuff. 

__No software projects fail because they aren't complicated enough.__

# What doesn't work?

- Unclear vision or audience.
- Design by committee - one core visionary only. If that person is continuously beholden to different people on how things should work, you end up with a mess on the page. Ideally the designer and the visionary is the same person.
- Design by preference. This is hard to do because you do it unknowingly. Don't think if it is preferable for you, but think if it is preferable for the audience. 
- Talk in problems, not solutions. If a widget isn't usable, don't say "it's fixable in this way", say the problem you see. Remember that people aren't good at identifying solutions, they are good at identifying problems.
- __Write it down so it's not forgotten.__ We juggle a lot of things in our head. We say things that "may be possible." The only things that get down are things that the team writes down. If it's not on the project plan, it's not going to get done.
- Write things down using User stories (As a ... I want to ... so that I can ...). These have to do things for the revenue. If you build a bunch of stuff that is not tied to revenue, pick a step.

Sketches -> user stories -> wireframes (HTML/CSS). __Initial version is greyscale, cause we want hierarchy, not color. We want placement of items, and real text.__

We want a wireframe in a day. We focus on: User Experience. 

List of good UX:

- Ruthelessly cut features
- Usability testing: Silverback, $30/hour. We don't want every single possible thing that can be improved, the goal is the top 3 things. Get 3 people from the street and record stuff about them. Use iChat so the team can watch live.
- As much real data as possible. You aren't sure if you will solve the problems you want.

__The stage of the MVP is it is viable for you to use it yourself.__ Keep your process light and flexible, get your software in front of the users.

Then we sketch on how the user first cause we didn't think we can go to wireframe.

Keep iterations as tight as possible because things will change. We do weekly iterations. We instigate change on a __weekly__ basis. We can build more successful software faster.

# Development

Server-side: Web server (The thing that actually sends your page to the user.) + App server (Where your app is.) + DB server.

We prefer open-source. Community is more vibrant than closed-source in particular with server stuff.

We default to web platform, not Silverlight/Flash which is a plugin. For mobile we do web too because it is effort. RoR, jQ, JQM, Backbone.js.

DB: PostgreSQL, Redis, MongoDB. RDBMS: PG. K-V: Redis. Non-RDBMS: MongoDB.

- RDBMS: Rows and Columns, Excel-ish.
- Non-RDBMS: Just put stuff in there and retrieve it later. Mongo uses JS and JSON to get data. Ex: Airbrake stores error data which we don't know what came from. The user accounts are in RDBMS.
- K-V: Single key to a single value. Fast lookup. Redis is very good at retrieving things quickly. Ex: Caching layer. Or the "top 10 projects." Redis only stores keys and values so it is very fast.

- Macs because solid as a Unix machine.
- Git/Github.
- Text Editor: Vim.daryll.santos@gmail.com
- Continuous Integration.
- Scheduling: No one knows when things are going to be done. So I just don't make public promises.
- Deadlines: Suck. Don't make promises against the deadline. "Let's see what we can ready for it." Work your deadlines around your schedule.
- Better to have everyone do an estimating thing using the 8-4-2-1 system. This works.
- Pair programming: Two keyboards/mice. One typing person (driver) and one passenger.
- Code reviews: Always. Pull request via Github.
- Rhythm: Day, week, month. We used to do bi-weekly iterations, now we do weekly iterations because we stop time on weekends. Same with day: The day is a natural break.

- Daily standup. (< 10 min)
- Weekly retrospective so fast problem solving. (< 1 hour)
- Sustainable pace. People are clearest and are working their best when they limit themselves. Long hours are unsustainable.
- Building a biz is not a sprint, it's a marathon.
- Pure TDD. This changes the way you write software in the first place. If you think how something is supposed to be architected, you write better software. You also always just have tests.

# Launch!

Servers: Understand the breakdown of the server architecture: Production, staging (exact mirror of production), and development. Deploying to staging: Moving the app to the server. 

Acceptance is not UX. Acceptance means that your stuff works as a user would see it.

We attempt to push to production at least once a week, on a per feature basis. There might be other features that are still in dev, but we want constant dev and constant deployment.

Instead of fearing deployment and fearing change, we embrace it.

It is easier to deploy now so we outsource this to Heroku. Heroku runs on top of AWS. 

The cloud is a new name for something that's been done for a long time: a data center. Images and files are hosted on Amazon S3. They are on the same network so it's faster to transfer between Heroku/AWS.

Performance monitoring: NewRelic RPM. Airbrake to see wth is happening when errors occur.

Now we have a landing page at this point. We need a marketing website, not just something to collect email addresses. We recommend this building directly on the application.

Every product should have a blog to build reputation. The blog is where you talk about the product. This is where you can answer questions on that blog.

Twitter is for one-to-one contact with the cx. The blog and Twitter are inbound marketing. These are about getting found. These are things that build reputation to make people find you rather than you finding them.
