# Systems design explains the world: volume 1
[Reference](https://apenwarr.ca/log/20201227)

- "Systems design" is a branch of study that tries to find universal architectural patterns that are valid across disciplines.
- Novice to junior - can fix bugs. Junior to senior - can implement a whole design with little supervision. Senior to staff - can produce designs based on business problems with basically no management. Staff to senior staff - bigger business problems.
- Maxing out - people who maxed out as a senior engineer didn't seem to want to or to be staff engineer. Also, there were people who are better at translating business problems than at fixing bugs.
- People who are good at translating business problems into designs, but aren't good at deep technical knowledge/bug fixes would not be promoted.
- Executives in a tech company need a different skill set than a programmer, and rising through the ranks doesn't prepare you for that job at all.
- Systems design is invisible to people who don't know how to look for it.
- Every hierarchy-free/flat control system just moves the central control around until you can't see it anymore. Human structures all have leaders, whether implicit or explicit, and explicit ones tend to be more diverse. Even things like democracy - it depends on someone enforcing your right to vote. Capitalism - someone enforces the rules of a "free" marketplace.
- In centralised vs distributed systems - at least make sure the control structure is explicit. When it's explicit, you can debug it.
- Chicken-egg problems appear when building software or launching products - things that are not useful to you unless other people use it.
- Console makers - they are good at this, they:
  - Subsidise the cost of early console sales.
  - Make backward compatible things.
  - They have games that are mostly the same but "look better".
  - Make compatible gamepads between generations.
  - Create "exclusive launch titles".
- If your company has a chicken-egg problem, and you don't have a concrete plan for solving it, then investors should not invest in your company.
- Second system effect:
  - An initial product starts small and is built, hacks get designed around it, engineers figure out a new design, and say "we have to do it right this time". This almost never works.
  - Ex: IPv6, Python 3.
  - The project takes longer than expected. The new design does solve the architectural problems in the original, but it creates new problems. Development time will be split between maintaining the old system and launching the new system. PMs are likely to shut down the older system to force users to switch to the new one.
  - Solution: Just try to refactor, even if it seems more incremental.
- Innovator's dilemma:
  - All large companies are heavily optimised to discard ideas that aren't as profitable as their existing core business.
  - This optimisation will create something like Intel vs Apple, where the crappy chip will eventually overcome the incumbent chip.
  - Ex: distributed version control were amusing toys until disks were big enough and networks were fast enough, and then they wiped out everything else.
- *If you're a startup and you think you have a truly disruptive innovation, then that's great news for you. It's a perfect answer to that awkward investor question, "What if [big company] decides to do this too?" because the honest truth is "their own politics will tear that initiative apart from the inside."*

## Hacker News
[Reference](https://news.ycombinator.com/item?id=25552267)

- Questions of systems design are anyway not answerable by appeal to a formal theory, at least not yet, so like most gray questions of life, they are not ones where one should take a fixed stand. There are too many unpredictable or emergent effects of an answer to such questions.
- I think that some aspect of systems thinking (such as defining requirements, or breaking complex problems down at a high level) should be included in all engineering disciplines, but I agree that it's definitely a field more suited to being something you transition to instead of starting in. Mostly just because of the volume of general knowledge required to understand the whole system.
- The main things I've learned over 40 years:
  - Rewrites will fail. Whether they're called that, or called "lift and shift" or called "refactoring".
  - The reason they fail is because the focus is entirely on the technology, not the users and how they use the systems
  - *Understanding business systems and users and how they interact is vital. Business processes haven't changed, accounting hasn't changed, company hierarchies and competitive markets haven't changed.*
  - ***What has changed is that where people used to be the "API" for a process touchpoint, now that is likely to be another system, and will have its own API which expresses how it sees the process. Trying to "force" those systems to interact with yours in the way you want is a fools errand.***
  - Abstraction is really important when defining business domains. "Sales" vs "Fulfilment", "Payment" vs "Charging", "Data" vs "Information", etc.
   - Software can't solve all of the possible implementations of the business domain abstractions. You have to set constraints to limit the number of "configuration" elements. Things like "Sales are always retail to end user consumers so that we don't have to deal with VAT exclusive invoicing".
  - Those constraints need to be agreed to by the product owners/managers of the domain. Otherwise, every potential requirement will add yet another "knob" to the control of the domain, yet another testing path etc.
- In my experience, "systems design" has nothing to do with climbing the career ladder, except in a narrow sense of "architecture astronauts claiming credit for 'designing' the work their teammates actually designed and implemented. Most people get promoted by inventing useful or at least measurable new tech.

# No Idea - Glue
[Reference](https://noidea.dog/glue)

- I want to be clear that I'm not saying 100% of your work needs to be promotable work. It's good to build auxiliary skills and expand your horizons, and it's important for everyone to do their fair share of taking out the garbage. But a large percentage of your work should be the thing you're evaluated on. If someone's doing very little of their core job, they are hurting their career. If you're their manager and letting them do that, you are letting them hurt their career.
- If you can handle giving feedback, coaching, or people - then you should be a manager.
- If you can put yourself inside the shoes of your customer - then you're a product manager.
- *I advise people to choose deliberately. Choose a role that you'll feel successful and happy and proud to say you do, and that will teach you skills you want. Do a job you’re excited by. You will learn to get good at it by doing it.* I feel like we don't admit it often enough enough that most of the time, we won't do a job well on day one. The vast majority of our learning happens on the job.
- It's not fair, but our industry biases are set up so that you really need to have a solid engineering resume before you take a non-engineering role.
- First off, there needs to be a long-overdue career conversation between this engineer and her manager. She needs to ask direct questions like "Will I get promoted next round?" "What work do I need to do to get promoted?" "Is this senior engineer work?”
- Second: a job title. If she and her manager want her to continue doing a lot of glue work, is there a title that gives her tech credibility? Can she become technical lead or something? People expect a lead to do a ton of glue.
- Third, she needs artifacts of her work that show her impact and tell the story. Due to her work and her technical judgement, this thing happened.
- Her manager should be telling the same story. If you see this situation, where a glue person is the only reason something launched, publicly give them credit! And not for helping, but for leading.
- She should be creating and saving artifacts that back up this narrative: design proposals, meeting notes, group emails, crucial points where she made the thing happen.
- If you’re not getting promoted for glue work, stop doing glue work. I would advise her to -- temporarily -- do EXACTLY the thing on the job ladder, even if it means letting more important things drop.
- If you're a senior person, please, show the junior people in your organisation that you're learning and how you're doing it. Be public about what you're learning.
