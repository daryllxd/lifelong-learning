# Introduction

- Either manager (with direct reports) or technical leader without reports (staff engineer).
- What did people above "senior" do all day?
- Pillars of staff engineer:
  - Big-picture thinking.
  - Execution of projects.
  - Levelling up the engineers you work with.
- Human skills:
  - Communication and leadership
  - Navigating complexity
  - Putting your work in perspective
  - Mentorship, sponsorship, and delegation
  - Framing a problem so that other people care about it
  - Acting like a leader whether you feel like one or not

## Chapter 1 - What Would You Say You Do Here?

- Why do titles matter? We want to help people understand they are progressing and communicating an expected competency level to the outside world.
- Local maximum: "The best decision for a single group which may not be the best decision when you take a broader view".
- Usually, the murky/difficult parts of the project involve spelunking through legacy code, negotiating with busy teams that don't want to change anything, and divining the intentions of engineers who left years ago.
- One way to keep a project moving is to have someone who feels ownership for the whole thing, rather than any of its individual parts.
- Staff engineers: responsible for ensuring resulting systems are robust and fit well with the technology landscape.
- You are not a manager, but you are a leader. "Someone should do something here" - that someone is you.
- As your compensation increases and your time becomes more expensive, the work you do is expected to be more valuable and have a greater impact.
- Leadership: Reviewing other engineers' code, teaching, quietly raising everyone's game, setting technical direction.
- Technical role - reviews of code or designs should be instructive for your colleagues and should make your codebase or architecture better.
- You know you're supposed to be working on things that are impactful and valuable. But what are those high-impact work that you should be doing? "You create it!"
- Discipline needed in any job in the world:
  - Core technical skills - coding, cooking, whatever
  - Product management - figuring out what needs to be done and why, and maintaining a narrative about that work
  - Project management - the practicalities of achieving that goal, removing chaos, tracking the tasks, noticing what's blocked, and making sure it gets unblocked
  - People management - turning a group of people into a team, building their skills, mentoring etc.
- Aligning on scope, shape, and primary focus:
  - Here are my goals for this year.
  - Here are some sample activities that I will do.

## Chapter 2 - Three Maps

- Paying attention - being alert to facts that affect your projects or organization. Know which emails you need to read and which meetings you need to go to.
- Being new is the best opportunity you'll have to get a complete outsider view, but as a staff engineer, you should try to have this perspective all the time.
- Every staff engineer team is a part of their own "staff engineer team" in addition to their own team.
- Company culture
  - How much autonomy will I have?
  - Will I feel included?
  - Will it be safe to make mistakes?
  - Will I be part of the decisions that affect me?
  - How difficult will it be to make progress on my projects?
  - Are people nice?
- Top-down: Top makes decisions.
- Bottom-up: Employees and teams feel empowered to make their own decisions.
- High-trust cultures that emphasize information flow have better software delivery performance.
- Ex: Migrating a system fell on three teams, and it became an "I don't know, you should ask x".

## Chapter 3 - Creating the Big Picture

- Technical vision/strategy - the current state of the world, challenges to overcome, and a clear path forward for addressing those challenges.
- Ex: Engineering teams have a lack of tooling, too many incidents, and poor deployments. Fix: Free up time for DevOps.
- Checklist:
  - We need this.
  - I know the solution will be boring and obvious.
  - There isn't an existing effort.
  - There's organizational support.
  - We agree on what we're creating.
  - The problem is solvable (by me).
  - I'm not lying to myself on any of the above.
- What will future you wish that present you had done?
- Work on your story: You'll know the direction is well understood if people continue to stay on course when you're not in the room to influence their decisions.

## Chapter 4 - Finite Time

- "If I start this work, what am I not doing instead?"
- Needs: Energy, credibility, quality of life, skills, and social capital.
- Skill increases:
  - Deliberately setting out to learn something - taking a class, buying a book, hacking on a toy project.
  - Working with someone who is really skilled.
  - Learning by doing.

### Questions to ask yourself about projects:

- Energy: How many things are you already doing?
- Energy: Does this kind of work give or take energy?
- Energy: Are you procrastinating?
  - Reflect - what was worth the effort to you, and think about how many more things like this you see at the company you're in that you really want to change just as much as that one.
- Quality of life: Do you enjoy this work?
- Quality of life: How do you feel about the project's goals?
- Credibility: Does this project use your technical skills?
  - Can you implement something that other people have already failed at, or make it tractable for other people?
- Credibility: Does this project use your leadership skills?
- Social capital: Is this the kind of work that your company and your manager expects at your level?
  - Managing up: What are your boss's priorities?
- Social capital: Will this work be respected?
  - If you're working on something that other people consider to be important, then that builds goodwill/they'll be more inclined to help you.
- Skills: Will this project teach you something you want to learn?
  - What stories do you want to be able to tell on your future resume?
- Skills: Will the people around you raise your game?
- **You won't succeed unless you can defend your time.**

## Chapter 5 - Leading Big Projects

- The reason a project is difficult isn't because of technology, but because you're dealing with ambiguity, unclear directions, or legacy systems whose behavior you can't predict.
- **It's normal to feel overwhelmed when you're beginning a project. That feeling of discomfort is called learning.**
- Ambiguity is the nature of the work. If it wasn't messy and difficult, they wouldn't need you. So you're doing something hard and you might make mistakes, but someone has to. The job here is to be the person brave enough to make, and own, the mistakes.
- **Pragmatic Programmer: We find that often the only way to determine the timetable for a project is by gaining experience on that same project.** Practice estimating and keep a log of how that's going.
- The Art of Travel - the frustration of learning new information that doesn't connect to anything you already know.
- **Wrong is better than vague.**
  - Be clear about who or what is doing the action for every single verb. Instead of "the payload will be unpacked", use "the `ParseComponent` will unpack the payload".
  - It's fine to use a few extra words or even repeat yourself if it means avoiding ambiguity.
    - "We only have 2 boxes left. To solve this, we should order more."
    - "We only have 2 boxes left. To solve this shortage, we should order more."

### Technical pitfalls

- It's a brand new problem (but it isn't)
- "This looks easy!"
- Building for the present, not for when the company grows
- Building for the distant, distant future
- "Every user just needs to..." - parts of the solution that change user behavior will be difficult and needs to be part of the design.
- "We'll figure the difficult part later"
- Solving small problems but making the bigger problem harder
- Discussing the smallest decisions the most

### Should you code on the project?

- Writing code is rarely the highest leverage thing you can spend your time on.

## Chapter 6 - Why Have We Stopped?

- Blocked by an "approver" - make the thing you need as small as possible. Structure your request so it's easy to say yes to, with as little reading needed as possible.
- Making things easier for the other person:
  - Spell out what you need.
  - "Three bullets and a call to action" technique: 3 bullet points detailing the issue at hand, and one CTA.
- **Nobody wants to use software. They want to catch a Pokemon.**

## Chapter 7 - You're a Role Model Now (Sorry)

- "I don't want to be a role model!" Like it or not, you're setting your engineering culture.
- Being competent
  - Know things
  - Build experience/do technical things.
  - Don't rush your prime learning years.
  - Show that you're learning - publicly.
- Be self-aware
  - True confidence comes from having done the work for long enough that you've learned to trust yourself.
  - What you don't know - "ELI5".
- Have high standards
  - Seek out constructive criticism - ask for code review, design review, and peer evaluations.
- Be reliable: "X is going to be in that meeting, so I don't need to go."
  - Drive meetings: If the group is passive, distracted, we can do "OK, let's get started".
  - Describe the culture that you're aiming to build, and use that as a reference.
- Optimise for maintenance, not creation.
- The degree to which other people want to work with you is a direct indication of how successful you'll be in your career as an engineer. Be the engineer that everyone wants to work with.

## Chapter 7 - Good Influence at Scale





The Art of Travel
