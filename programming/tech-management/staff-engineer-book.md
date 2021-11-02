# Staff Eng
[Reference](https://staffeng.com/guides/work-on-what-matters)

## Operating at Staff
[Reference](https://staffeng.com/guides/operating-at-staff)

- Much of the work you're doing has a slower feedback cycle.

## Work on What Matters
[Reference](https://staffeng.com/guides/work-on-what-matters)

- Only through pacing your career to your life can you sustain yourself for the long-term.
- Snacking: Easy and low impact tasks. Psychologically rewarding, but other people can do this, too.
  - Psychologically rewarding - self-determine your work, don't do low-effort low-impact quality work.
- Preening:
  - High visibility but not high impact. These are work that is of dubious value, but is recognized in company meetings.
  - This is why you have to be in a company that aligns with your intended personal growth.
  - You do not want to be a vanity hire of a senior leader or to present yourself in the way that a company believes leaders look and act.
- Ghosts:
  - Low impact, high effort.
  - "Fixing something broken" because you're a new hire when it really probably isn't.
- ***Work where there's room and attention.***
  - Swarm to existential problems, but if a problem isn't existential, then you should be skeptical of adding your efforts where everyone's already focused.
  - Effective places to work at: Those that matter to your company but still have enough room to actually do work.
  - At some point, work will need support - you'll want to teach a company to value something that it doesn't care about so that things will be faster.
- Foster growth:
  - Hiring funnel.
- Edit
  - With your organisational privilege, relationships, and the ability to see around corners, you can often shift a project's outcomes by investing the smallest ounce of effort, and this is some of the most valuable work you can do.
- Finishing things - Sometimes just a few tweaks can be done to change a six-month slog into a two-week sprint with almost identical impact.
- What you can accomplish:
  - An intersection of what you're good at and what you genuinely care about.
  - Writing company strategy, convincing a great candidate to join, tackling tech debt, or crafting an API.
- ***Why this matters: Suppose you're interviewing for a new role twenty years into your career. Will the folks interviewing you understand your real impact on any of your previous projects or companies? No, I guarantee they won't. Instead, you'll find yourself judged by a series of surprisingly subjective measures: your accumulated prestige, the titles you've had and companies you've worked at, your backchannel reputation, and how you present in your interview process.***

## Writing engineering strategy
[Reference](https://staffeng.com/guides/engineering-strategy)

- To write an engineering strategy, write five design documents, and pull the similarities out. That's your engineering strategy. To write an engineering vision, write five engineering strategies, and forecast their implications two years into the future. That's your engineering vision.
- Durably useful engineering strategy and vision are the output of iterative, bottom-up organizational learning. As such, all learning contributes to your organization's strategy and vision, but your contribution doesn't have to be so abstract. Even if you're not directly responsible for that work, there are practical steps that you can take to advance your organization's strategy and vision, starting right now.
- You should write design documents for any project whose capabilities will be used by numerous future projects. You should also write design documents for projects that meaningfully impact your users. You should write a design document for any work taking more than a month of engineering time.
- Simple template, gather and review together but write alone.
- ***Good strategies guide tradeoffs and explain the rationale behind that guidance. Bad strategies state a policy without explanation, which decouples them from the context they were made. Without context, your strategy rapidly becomes incomprehensible--why did they decide this?--and difficult to adapt as the underlying context shifts.***
- Writing a strategy document
  - Start where you are.
  - Write the specifics.
  - Be opinionated.
  - Show your work.
- Extrapolate into a vision;
  - Write two to three years out.
  - Ground in your business and your users.
  - Be optimistic rather than audacious.

## Manage technical quality
[Reference](https://staffeng.com/guides/manage-technical-quality)

- If there's one thing that engineers, engineering managers, and technology executives are likely to agree on, it's that there's a crisis of technical quality. One diagnosis and cure is easy to identify: our engineers aren't prioritizing quality, and we need to hire better engineers or retrain the ones we have.
- **In most cases, low technical quality isn't a crisis; it's the expected, normal state. Engineers generally make reasonable quality decisions when they make them, and successful companies raise their quality bar over time as they scale, pivot, or shift up-market towards enterprise users. At a well-run and successful company, most of your previous technical decisions won't meet your current quality threshold. Rather than a failure, closing the gap between your current and target technical quality is a routine, essential part of effective engineering leadership.**
- The problem:
  - **You must balance quality across multiple timeframes, and those timeframes generally have conflicting needs. For example, you'll do very different work getting that critical partnership out the door for next week's deadline versus building a platform that supports launching ten times faster next quarter.**
- **Process rollout requires humans to change how they work, which you shouldn't undertake lightly. Rather than reaching for process improvement, start by donning the performance engineer's mindset. Measure the problem at hand, identify where the bulk of the issue occurs, and focus on precisely that area.**
- Sure, you can roll out a new training program to teach your team how to write better tests, but alternatively, maybe you can just delete the one test file where 98% of test failures happen. That's the unreasonable effectiveness of prioritizing hot spots and why it should be the first technique you use to improve technical quality.
- Best practices:
  - A good process is evolved, rather than mandated.
  - Study how other companies adopt similar practices, document your intended approach, experiment with the practice with a few engaged teams, sand down the rough edges, improve
  - Limit concurrent process rollouts. If you're trying to get teams to adopt multiple new practices simultaneously, you're fighting for their attention with yourself.
- Leverage points: These are impactful:
  - **Interfaces.** Effective interfaces decouple clients from the encapsulated information. Durable interfaces expose all the underlying essential complexity and none of the underlying accidental complexity.
  - **State.** Hardest part of any system to change, and that resistance to change makes stateful systems another critical leverage point.
  - **Data models.** A good data model is rigid: it only exposes what it genuinely supports and prevents invalid states' expression. A good data model is tolerant of evolution over time. Effective data models are not even slightly clever.
- What is our technical strategy/how to align it?
  - Workflows: Deliberate tools create workflows that nurture habits far better than training and documentation.
  - Conway's Law: Organisations build software that reflects their structure.
  - Curate technology change using architectural reviews, investment strategies, and a structured process for adopting new tools.
- Measuring technical quality
  - What percentage of the code is statically typed?
  - How many files have associated tests?
  - What is test coverage within your codebase?
  - How narrow are the public interfaces across modules?
  - What percentage of files use the preferred HTTP library?
  - Do endpoints respond to requests within 500ms after a cold start?
  - How many functions have dangerous read-after-write behavior? Or perform unnecessary reads against the primary database instance?
  - How many endpoints perform all state mutation within a single transaction?
  - How many functions acquire low-granularity locks?
  - How many hot files exist which are changed in more than half of pull requests?
- Technical quality team
  - Small team so relentless on roadmap on impact and ensuring you'll maintain focus on the achievable.
  - Metrics over intuition.
  - **It's a good sign when your team has more available high-impact work than you can take on: if you aren't selective about which projects to take on, then you're not thinking broadly enough. This means you shouldn't necessarily try to grow your technical quality team if you have a backlog. However, if you find that there is critical quality work that you can't get to, then it may be time to explore starting a quality program.**

## Staying aligned with authority
[Reference](https://staffeng.com/guides/staying-aligned-with-authority)

- Junior -> mid -> senior is very predictable, but staff is more complex than preceding title, but is usually navigated with the support of your engineering manager.
- In leadership roles, the support system that got you here will fade away.
- Excellent at "managing up" - this is about increasing bandwidth and reducing friction between you and your manager. Cultivate a deliberate partnership with your manager.

## To lead, you have to follow
[Reference](https://staffeng.com/guides/to-lead-follow)

- Leadership - has an idea of how things OUGHT to be and how things ARE, and they can rely on that distinction to figure out what actions can be done to narrow that gap.
- They care about the gap to attempt those narrowing actions.
- If you see the gap without acting on it, you might be a visionary, but you're inert.
- If you take action without a clear view of the goal, your impact is random, arbitrary, and inefficient.
- You can't be an effective long-term leader until you learn how to follow.
  - Be clear with yourself what your true priorities are, and don't dilute yourself across everything that comes up. **Will what we do here matter to me in six months?** If it won't, take the opportunity to follow.
  - Give support quickly to other leaders.
  - Make your feedback explicitly non-blocking. Ex: "this is a nit".

## Learn to never be wrong
[Reference](https://staffeng.com/guides/learn-to-never-be-wrong)

- Figure out what is the "everyone is right".
- Most effective engineers go into each meeting with the goal of agreeing on the problem at hand, understanding the needs and perspectives, and identifying what needs to happen to align on an approach.
- Listening through questions: Active listening with the goal of understanding the rest of the room's perspectives.
- If in a conversation with an unclear goal, then define the purpose with a "just to confirm, we are talking about".
- Dealing with jerks: including someone they can't be a jerk to in the meeting, and invest into aligning them before the meeting.

## Create space for others
[Reference](https://staffeng.com/guides/create-space-for-others)

- Asking the right questions.
- Be the one to take notes.
- Be the person to pull up someone in the next meeting.
- Decisions:
  - Write down the process of making a decision, rather than making a decision.
  - Gather feedback early on decisions.
  - No need to "drop an opinion to justify seniority".
- Sponsorship: Instead of involving them in your work, make the work theirs.
  - Importantly, when the work becomes theirs, you have to let it be theirs. Counsel, give advice, provide context, but ultimately sponsorship includes letting them take an approach that you wouldn't. It might end up going poorly, and they’ll learn from that -- just like you've learned from your mistakes over your career. It might end up going very well, and then you’ll learn something instead.

## Present to executives
[Reference](https://staffeng.com/guides/present-to-executives)

- Most executives aren't awful. Almost all are outstanding at something, it's just that often that something isn't the topic you're communicating about with them.
- Executives are accustomed to consuming reality preprocessed in a particular way. Any given executive is good at consuming information, but in their way.
  - Some think of pattern matching.
  - Some think of connecting to data or dataset.
- Why are your communicating in the first place?
  - Controlling the sequence in which you present your ideas is the single most important act necessary to clear writing. The clearest sequence is to always give the summarising idea before you give the individual ideas being summarised.
- Format:
  - Situation - What's the relevant context?
  - Complication - Why is the current situation problematic?
  - Question - What is the core question to address?
  - Answer - What is your best answer to the posed question?
- Mistakes to avoid:
  - Never fight feedback. It's common for an executive to have a critical piece of feedback, but to not quite have the right framing to communicate it within the moment. You want them to deliver the feedback anyway, not hold it back and probably forget to give it later.
  - Don't present a question without an answer.
  - Avoid academic-style presentations.
  - Don't fixate on your preferred outcome.

## Getting the title where you are
[Reference](https://staffeng.com/guides/getting-the-title-where-you-are)

- Most technology companies have a "career level", which is intended to be the highest level that most folks achieve.
- Being senior for a long time is okay.
- A staff engineer isn't a better senior engineer, but someone who's moved into fulfilling one of the staff archetypes.
- If pursuing that role is your goal, then you have to take that promotion level as an opportunity to reset your approach to navigating your career.
- Being in the room that makes decisions - how?
- Being visible internally?
- Opportunity is unevenly distributed - better to work where the opportunity is. Work is more visible in the company HQ.
- Management? Taking time to alternate between IC and manager makes you better at both.

## Promotion packets
[Reference](https://staffeng.com/guides/promo-packets)

- What are your staff projects?
  - What did you do? What was the project's impact? What made this project complex?
  - High-leverage ways you've improved the organisation?
  - Quantifiable impact of your projects?
  - Who have you mentored and through what accomplishment?
  - What glue work do you do for the organisation?
  - Which teams and leaders are familiar with and advocates for your work? What do they value about your work?
  - Real or perceived skill or behaviour gaps?
- Bring your manager into the fold: ask what's missing, what to emphasize, and if they'd recommend adding steps to the workflow.
- Promotion packet: Continue to review the promotion packet and use it to steer you towards demonstrating the promotion criteria over time. This is important to do if your direct manager changes.
- What is the promotion packet?
  - Edit the promotion packet with peers.
  - Periodically review the promotion packet with your manager.
  - Performance-oriented 1:1s should be written down, especially since the direct manager could change.

## Getting in the room, and stay there
[Reference](https://staffeng.com/guides/getting-in-the-room)

- To get into the room, you need to bring something useful to the room (context, details, subject matter expertise) that the room doesn't already have. You need to bring something distinct from the current membership.
- A sponsor in the room - they are allocating their social capital towards your inclusion, and their peers will judge them based on your actions within the room.
- Sponsor needs to know why you want to be there.
- Align with manager - what are they trying to do?
- Optimise for the group - optimising widely for others.
- Speaking clearly and concisely.
- Be low friction - if you're known as someone who can navigate difficult conversations,  you're much likely to be involved.
- Come prepared - read up on agenda, prepare for the discussion.
- Volunteer for low-status tasks - take down notes, be available on action items. Prioritise being useful.
- Staying in the room:
  - Figure out if the room role is correct or not.
  - Disagree and commit.
  - Show value in the room.
  - Don't embarrass your sponsor.

## Find your sponsor
[Reference](https://staffeng.com/guides/find-your-sponsor)
