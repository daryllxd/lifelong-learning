# Planning

- Project has just one visionary, he protects the idea.
- Cx good at describign problems, horrible at describing solution. Just disregard the solution, lol.
- Landing page sucks. Sign up people to working software, not landing page. Audience is built via reputation, not landing page.
- Start blogging about the area of your solution, this is where you get your audience. People who give you their emails are the same peopel who'd sign up on day 1, anyway.
- Landing page sets expectation of launch, but what if you aren't going to launch, just build software/reputation.
- Sketch stuff. Written specs are wasted effort. The things software does are in UI anyway. And its harder to misunderstand pictures/UI.
- Whenever there is a question, think if you can answer it or if you can do "answer this later".

# Design

- F(x) > style. Better find something people love rather than something they love to look at.
- Say no if someone has a great idea. Let the idea come back, it will if it's any good.
- *No software projects fail because they aren't complicated enough.*

# What doesn't work?

- Unclear vision or audience.
- Design by committee - one core visionary only. If that person is continuously beholden to different people on how things should work, you end up with a mess on the page. Ideally the designer and the visionary is the same person.
- Design by preference. This is hard to do because you do it unknowingly. Don't think if it is preferable for you, but think if it is preferable for the audience. 
- Talk in problems, not solutions. If a widget isn't usable, don't say "it's fixable in this way", say the problem you see. Remember that people aren't good at identifying solutions, they are good at identifying problems.
- *Write it down so it's not forgotten.* We juggle a lot of things in our head. We say things that "may be possible." The only things that get down are things that the team writes down. If it's not on the project plan, it's not going to get done.
- Write things down using User stories (As a ... I want to ... so that I can ...). *These have to do things for the revenue.* If you build a bunch of stuff that is not tied to revenue, pick a step.

Sketches -> user stories -> wireframes (HTML/CSS). *Initial version is greyscale, cause we want hierarchy, not color. We want placement of items, and real text.* Wireframe in 1 day.

List of good UX:

- Ruthelessly cut features
- Usability testing: Silverback, $30/hour. Get top 3 bad things, get 3 people. 
- As much real data as possible. You aren't sure if you will solve the problems you want.

*The stage of the MVP is it is viable for you to use it yourself.* Keep your process light and flexible, get your software in front of the users.

Then we sketch on how the user first cause we didn't think we can go to wireframe.

Keep iterations as tight as possible because things will change. We do weekly iterations. We instigate change on a *weekly* basis. We can build more successful software faster.

# Development

Server-side: Web server (The thing that actually sends your page to the user.) + App server (Where your app is.) + DB server.

We default to web platform, not Silverlight/Flash which is a plugin. For mobile we do web too because it is effort. 

DB: PostgreSQL, Redis, MongoDB. RDBMS: PG. K-V: Redis. Non-RDBMS: MongoDB.

- RDBMS: Rows and Columns, Excel-ish.
- Non-RDBMS: Just put stuff in there and retrieve it later. Mongo uses JS and JSON to get data. Ex: Airbrake stores error data which we don't know what came from. The user accounts are in RDBMS.
- K-V: Single key to a single value. Fast lookup. Redis is very good at retrieving things quickly. Ex: Caching layer. Or the "top 10 projects." Redis only stores keys and values so it is very fast.

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

Performance monitoring: NewRelic RPM. Airbrake to see wth is happening when errors occur.

Now we have a landing page at this point. We need a marketing website, not just something to collect email addresses. We recommend this building directly on the application.

Every product should have a blog to build reputation. The blog is where you talk about the product. This is where you can answer questions on that blog.

Twitter is for one-to-one contact with the cx. The blog and Twitter are inbound marketing. These are about getting found. These are things that build reputation to make people find you rather than you finding them.
