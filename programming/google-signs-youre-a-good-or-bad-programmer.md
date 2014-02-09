# Signs that you're a good programmer
[Link](https://sites.google.com/site/yacoset/Home/signs-that-you-re-a-bad-programmer)

## 1. The instinct to experiment first

The compiler and runtime can often answer a question faster than a human can. Rather than seek out a senior programmer and ask them "will it work if I do this?", a good programmer will just try it and see if it works before bringing their problem to someone else.

#### Symptoms

- Side projects
- Dabbling in other programming languages, especially ones from a different "family" (procedural, stack-based, concurrent, etc.)
- Knows what you're talking about when you mention "Arduino"
- Old, uncommitted code that duplicates other code's functionality but isn't referenced elsewhere in the project
- A tendency to suggest wacky and unrealistic solutions in meetings
- A cubicle or desk populated with toys that came from ThinkGeek

#### How to acquire this trait

Are you excessively cautious? Are you only comfortable when you have permission? Has anyone ever said that you were passive aggressive? You might consider inviting some friends to visit the local Six Flags or some other roller-coaster park. If you want baptism by fire, then make your first ride the scariest. If you consider yourself ready to get off the kiddie rides you might try your hand at hang gliding and windsurfing, which have the benefit of teaching you what you can and cannot control.

__Much of what makes people timid to experiment is chemical--your brain has a small number of adrenergic receptors, so a little bit of adrenaline excites your fight-or-flight reflexes too much.__ But consider why people grow tolerant to coffee: the caffeine's byproducts force their brain to grow more adenosine receptors. So if you force your brain to grow more adrenaline receptors then the same amount of "fear juice" will trigger a lower percentage of them. __Find some experience that scares the shit out of you, do it a few times, and you will lose your fear of venture on a physical level.__

Note: A programmer who "suggests wacky and unrealistic solutions" is not always a bad programmer. It can be a sign of creative thinking from someone who assumes confirmation or correction will come from somewhere else down the line.

## 2. Emotional detachment from code and design

Code is like kleenex: you use it when it's useful and throw it away when it no longer serves. We all like to think that code-reuse is important, and while it is, it's not meant to be about raising a child. Code doesn't feel. Code doesn't care. Code will turn on you like a Frankenstein monster. Code is just bytes. Code is a liability.

#### Symptoms

- __Almost no committed code that is commented out__
- Willingly throws away weeks or months of work in order to adopt another programmer's superior code
- Puts finger to lips, furrows brow and says "hmm" when faults in their work are pointed out, while looking at the code and not the critic
- Indifferent to the way the IDE wants to auto-format code, uninterested in "tabs-vs-spaces" arguments
- __Refers to it as "the code" rather than "my code", unless accepting blame__
- Has abandoned a design of theirs that was previously used in a successful product
- Doesn't become defensive when the boss mentions that they're looking for an off-the-shelf alternative to what they've been writing for the past few years

#### How to acquire this trait

Konrad Lorenz, the author of On Aggression, suggested that a scientist should begin each day by throwing out one of his pet theories in order to remain sharp. Consider throwing out one of your pet algorithms or design patterns or exquisite one-line Sodoku solvers every morning to remind yourself that it's you who controls the idea, not the idea that controls you.

Find the code that you're the most proud of and delete it, now re-write it from scratch in a different way. Use a "design pattern" that confuses you, or that you hate (e.g.: the Singleton) and figure out how to make it work. If necessary, delete that after you've got it working and try again with a new pattern or language. Not only will you learn that there's More Than One Way To Do It, but you'll learn that your code is transitory. Code, by its nature, is not just inextricably glued to its language, platform, and the APIs it consumes, but written in the form of ephemeral static charges, orientations of magnetic particles, subject to the whims of the market, Moore's Law, and your employer.

##### Other techniques to break the abusive relationship:

- Maintain somebody else's code
- Experience, either by accident or bloody intention, what it's like to lose a week's work to a failed backup or a botched commit and have to re-write it all over again
- Work for start-ups where you'll get laid-off when the second or third round of financing doesn't come through
- Be stupid enough to post your best code on Reddit
- Read the bit about "Destructive pursuit of perfection" further down in this article

## 3. Eager to fix what isn't broken

Programs are infrastructure: they're built to serve a specific need, but needs always change. Good programmers realize that hard-coded values buried in code are bad, that a destoryBaghdad() function is immoral, and that it's a priority to eliminate "code smells". Not for pride. Not for backslapping attaboys from your peers or the authors of methodology books. But because you will itch until it is fixed.

#### Symptoms

- Doesn't take the spec by its word and tries to find out who wrote it and what they were thinking
- Hunts down and talks to the people who will use the program each day
- Owns a book written by a guy called Martin Fowler
- Tends to express extreme like or dislike for popular technologies such as XML, ORM and REST, and has also switched positions on one or more of these in the past
- Likes to use abstraction layers, but doesn't like to add more than one layer on top of what's already in the language or platform
- Talks about "low cohesion"
- At least 10% or more of their commits reduce the line-count of the project without adding new functionality
- Before adding a new feature, checks to see if an existing one can be re-designed to perform both tasks or replaced entirely with a better method

#### How to acquire this trait

The first attempt to solve a program in code will always bear the artifacts of discovery: discovering the true nature of the problem, discovering the features of the platform, and discovering the best way to solve it. The second attempt will be more stable, but might inherit too much cautionary baggage and become a nightmare to extend. And so many programs today are like the Firth of Forth Bridge: disgustingly over-engineered. 

Sometimes it's the developer's first crack at the problem and looks like a lawn mowed by a dog, sometimes it's their second attempt and looks like the dog installed grass-cutting laser turrets every 2 feet. It can take a third try before the designer understands the problem completely and knows how much, or how little they need to do.

Code lets you learn in stages where you don't need to re-write everything from scratch. You re-write pieces after you understand what they need to do and what they'll never need to do, make them simpler, shorter and beautiful.

Go through your home and repair all the annoying things you've been putting off; fix the crooked picture on the wall, unclog the slow draining sink, repair that gutter drainpipe so your basement doesn't flood, buy a UPS and backup drive for your computer and configure them to shut-down/back-up automatically, replace all the incandescents with efficient bulbs, replace that ethernet cable draped down the hallway with WiFi or some proper wall-jacks and conduit, get a real food-dish for your cat instead of that old cheese-dip container.

Next you should go to your last project and read through the code. Think about what each piece does. There's a loop here, some sorting there, a bit of number crunching, screen updates, HTML generation, database CRUD, that sort of thing.

__Now replace the hard-coded HTML with a templating system, get the database CRUD out of your business objects and re-write it to use proper parameterized queries instead of string concatenation, replace all the "writelns" and "MessageBoxes" in your error handlers with a logging framework, refactor code that's trying to borrow methods from other classes, use locale-aware string formatting, stop guessing how big an array should be and use a dynamic collection, delete orphaned code.__

#### Aim for these, in increasing order of importance:

- Code that does the same thing, but is shorter or more efficient
- Code that does the same thing, but uses an appropriate "wheel" built-into the platform instead of reinventing its own
- Code that does the same thing, but is easier to modify for similar needs
- Code that does the same thing, but is easier to read and understand
- Code that doesn't exist

Hit #5 and you can call yourself a Zen Apprentice. Do it for a decade until you do it instinctively and you can call yourself a Zen Master.

## 4. Fascinated by the incomprehensible

I am only just beginning to understand what a Fourier Transform does, but I've been studying them because I have the damn persistent feeling that I could be using them somehow. I don't know what I would use them for yet, but maybe I will someday. What I do know is that what I don't know will cost me in useless labor. 

#### Symptoms

- Visits Lambda The Ultimate on a regular basis
- Knows what ATP synthase is. Has extracted DNA from a banana in their kitchen
- Owns a book with a dragon on the cover, especially if they don't write compilers
- Giggles when someone says the phrase "This is recorded on sticky-tape and rust"
- Shoves through a crowd at a party to get near someone who just used the word "Bayesian"
- Buys drinks for people who work in other industries and seem willing to talk shop when drunk
- Has a habit of boring people to tears explaining something tangentially related to the news, such as the cockpit layout of the Airbus 330
- Has foreign-language versions of popular songs on their iPod
- Envies but doesn't resent people with degrees in something they don't know

#### How to acquire this trait

This tends to start in childhood but can be cultivated in adulthood if you can commit to exploring your horizons. Friends are a major gateway: seek social occasions where you'll bump into people you don't know under circumstances where they'll be unhurried and at ease. This may involve alcohol. Don't try to impress them, don't compete with them, but display your ignorance willingly to see if they lean forward to correct and enlighten you. Then shut your fool trap and listen.

When you hear or read something you don't recognize then Google it or hit Wikipedia. For a programmer an equally superior resource is Ward Cunningham's Wiki, which deserves weeks of your life.

Computer programming has annexed all of the sciences and the feedback loop is so wide it stuns gods. From biology we took Genetic Algorithms. From climatology we took chaos theory. Biologists now use our work to fold proteins. Climatologists now use our simulations to predict armageddon. Everything informs us, and we inform everything. Either probe the unfathomable or retire on a "blub" programmer's salary. 

## 5. Compelled to teach

I once knew someone who thought it was good advice to "never teach everything you know" because they once lost a job after bringing a co-worker up to speed with all their skills. I stared at them with genuine incomprehension. A good manager would never get rid of someone who's not only capable of all their tasks but also demonstrates ability to train new workers. It would be like shooting the goose that lays golden eggs. If you get fired, it's probably for some other reason.

#### Symptoms

- Blogs about their work
- Has an active Wikipedia account
- Unhesitant to pick up a marker and approach a whiteboard
- Commits changes to the repository that consist only of comments
- Lets new hires borrow books that cost them $100 to buy
- Pauses "The Andromeda Strain" at the part about the sliver of paper getting between the bell and the ringer and grins like a madman

#### How to acquire this trait

I can only do this when I'm inspired or "in the mood", and I think that this mood is a product of circumstance, one that's made up of confidence, space, opportunity and provocation. When you're in school your teacher has the space and opportunity already supplied for them and their confidence is hopefully given by their training, but the inspiration is tricky; it's the difference between a good lesson that both the teacher and the student enjoys and a laborious exercise in rote memorization.

Novices in computer programming aren't usually novices in general, because they have lives and friends and family and hobbies and interests that have been going on for even longer. Maybe you do need to bore someone to tears by explaining something that's cool to you, even if it has nothing to do with programming. Maybe you have a younger sibling you can teach the guitar, or your favorite recipe, or how to balance on a pogo stick. Maybe you have a coworker who doesn't know how to ski. It doesn't matter the subject, just that you get a taste of what it's like to program someone else's brain in a positive way.

If you've never taught anything before you will discover, to an embarrassing degree, just how many times you can say "um" and "er" per minute, how badly you're prepared, and how easily you can forget that the student doesn't know details you haven't explained yet.

One of the tricks that worked for me was to volunteer for an opportunity to teach a complex subject (microbiology) to laymen. The first time I tried it I used a Post-It easel and a bunch of markers and tried to draw everything. I was all over the place. It was humiliating. But the audience, fortunately, was friendly.

The next year I tried again, but this time I had an iPad and used Keynote to put together a presentation, which was a lot of fun in itself, but this time the lesson went overwhelmingly more smoothly. I used lots of pictures, very little text, almost no bullet points, a handful of jokes, and just relied on my memory to talk about slides I had designed to provoke my memory more than illustrate anything to the audience.

The experience of doing an awful job the first time informed my next attempt, and now that I've done it three or four more times I find I'm getting slightly better. Not only that, I now know ten times more about the subject because I studied like crazy to help temper my fear of being asked a difficult question. Teaching teaches the teacher.

# Signs that you're a fantastic programmer

I only wish I had these traits and I can only write about them because I've observed them in others. Every now and then I have a moment where I think I'm living one of these, but those moments are rare and cherished. They are also debilitating and brush up against the stereotypes of autistic savants, trading one kind of virtue for another: if you want greatness you have to be prepared to pay.

## 1. Incorruptible patience

#### Symptoms

- Fire alarms provoke annoyance more than panic
- Cannot name any song that just played on the radio or through their headphones
- Is oblivious to how many times their cubicle-mate has gone for coffee, the bathroom, or the hospital
- Unbothered by office politics
- Can predict a bug before the code is ever run

#### How to acquire this trait

__Distractions are a product of imagination.__ The day I wrote this I found myself horribly distracted and annoyed by someone at my gym singing songs in French while I sat in the sauna. The singing moved around outside the sauna and pissed me off. I wished he'd stop because I couldn't concentrate. I pictured a man without concern of others, a douchebag, someone who'd wear a pink shirt and order people around. Then I came out of the sauna and saw it was an old man, chocolate in complexion and as threatening as a worn teddy bear with button eyes. He'd started singing La Vie en rose, which is a song I that I not only loved but that made me wonder, just then, if it was me who'd long since turned into an insufferable asshole.

I don't know how to shut out distractions, but if I had to try I'd guess it'd involve a little bit of deference and so much fascination that it directs your imagination instead of being dictated by it. When I want to be like this I want to take life without taking it personally.

## 2. A destructive pursuit of perfection

The worst optimizations favor profit over beauty, and between the two it's beauty that lasts longer. Perfection isn't the same as obsession, but they're damn close.

#### Symptoms

- Preference for dismissal over compromise
- Contempt for delivery dates
- Substantial refactoring on the eve of a deadline
- Unwilling to accept bonuses, promotion, or stock options for expediency
- Fondness for films directed by Stanley Kubrick

#### How to acquire this trait

__As Tyler Durden says you must know--not fear--know that someday you will die.__ Your nice condo with Ikea furniture is a side effect, not a reward. If you are not a unique, beautiful snowflake then what you create has to be. 

__It's also known as pride in one's work. Remember that emotional detachment from code is a virtue, but this doesn't mean emotional detachment from your work is, too. In fact, another way to become emotionally detached from code is to put your interest into the outcome instead.__ The outcome you should be thinking of is a lady who's going to get fired if she doesn't deliver the output of your program at 4:59pm sharp.

There's a legend about a marketing type who worked for Sam Walton at Wal-Mart and came up with a brilliant campaign to advertise a widget. Sam took a look at the proposal and said something to the effect of "this is great, now take the cost of the campaign and use it to lower the price of the widget instead." According to legend, the widget sold better and made more profit that way than if the campaign had been carried out.

Let the spirit of the story roll around in your head for a while and think about how it'd map to what you do at work. You boss probably isn't like Sam Walton, but perhaps there's a little bit of Sam in you. Is it better to compromise the way others want, or to make the product just a little bit better?

This could be hazardous to your income, it's risky to your stock options, but when you do a job right, when you do things properly, when you complete a project the way it ought to be, then sometimes time absolves all indulgences. Sometimes the boss calls you back to the carpet to apologize to you.

## 3. Encyclopedic grasp of the platform

Most programmers realize the short lifespan of their tools and don't waste much of their lives memorizing what's doomed to be obsolete. But neither do most programmers appreciate how everything in this industry is a derivative of some earlier thing, sharing syntax and constraints that will live well past our own personal expiration dates. __The best programmers have done what Oxford used to insist on: if you learn latin and mathematics then you can fuck all of that other modern nonsense, because you'll have the tools you need to understand anything.__

#### Symptoms

- Can recite from memory all of the includables in the C Standard Library
- Raises a knowing eyebrow when you mention the "500 mile email"
- Has a copy of the OpenDoc Programmer's Guide gathering dust on their shelf
- Can complete any sequence of dialogue from Lord of the Rings, Star Wars, Red Dwarf or Monty Python
- Rapidly identifies a synchronization bug caused by TCP's Sliding Window algorithm
- Recognizes a bug that's caused by a microcode error on the CPU you're testing on
- Has a framed personal check for $2.56 from Donald Knuth

#### How to acquire this trait

Encyclopedic knowledge takes decades to acquire, but every Guru in the world got there by doing roughly the same three things each day:

- Struggling to solve problems they find to be difficult
- Writing about how they solved difficult problems
- Reflecting on how they solved difficult problems

Once upon a time a novice programmer was stumped by a bug that he couldn't figure out. The crash report was full of strange numbers he didn't recognize, like -32,760. Where the hell is that coming from? He hits Ctrl-F and searches all of his code files for "-32760" but it doesn't appear anywhere. Nothing makes any sense. A week goes past during which he goes back to his old college computer-science textbooks, the compiler's manual, everything, and on the last day his glazed eyes rest on a table of numbers. Through the fog of his tired mind he suddenly recognizes one of them: -32,768. He thinks about how remarkable it is that it's so similar to his problem number, and then he notices that this table of numbers is showing the ranges for various integer types and how there can be signed and unsigned versions of both. When the light comes on it's blinding.

Thrilled with his belated insight he writes a blog post about it which disappears into the global ether unread by all but a handful of buddies. That night he lies awake, thinking about that bug and about integer types and the pros and cons of compiler-checked types and so-on.

Ten years later our friend is the lead programmer at the firm, and one day he glances over the shoulder of a junior programmer who's showing evident frustration. Tucked down in the stdout window is a bunch of debugging traces and the number -32,762. The now-guru programmer taps the newbie on the shoulder and says "are you passing an unsigned int16 to code that's expecting a signed int16?"

__If you're not encountering problems that are difficult for you to solve then you need a change of job or hobby or scenery or something. Look for opportunities to work with something new at your job or school, try hacking your Roomba, pick a bug in an open-source project that nobody has touched for months and fix it, try answering tumbleweed questions on StackOverflow that force you to look up something you didn't know.__

__If you could look inside the brain of a guru with a magic magnifying glass you might see clusters of neurons packed around the visual cortex that, like the infamous "Grandmother cells", lie dormant for months but light up when something significant comes into view such as a power of two, or a suspiciously precise delay that points to a DNS timeout, or the signature of the FDIV bug. Those "grandmother cells" can only be made the hard way.__

## 4. Thinks In Code

#### Symptoms

- In casual conversation their readiest metaphors come from programming constructs
- Spends the majority of their time "goofing off", but commits more bug-free code each day than their colleagues
- Glances over your shoulder and points at a bug in your code with their finger
- Correctly diagnoses bugs over the phone while drunk or in bed
- Comes up with their best code while taking a shower*
- When confronted with an obstinate bug, their instinct is to get up and go for a walk
- They suddenly pause and stare into space in the middle of a conversation, then abandon you to hurry back to their terminal with no explanation (AKA "A Columbo Moment" or "Gregory House behavior")

#### How to acquire this trait

Them darn kids and their cell phones, how does a 12 year-old teenage girl tap text messages on a numeric keypad so fast anyway? It can't be genetic, since all those damn brats can do it, no matter their gender or parentage. It can't be upbringing, cuz kids in every social class can do it. So you rule out this and that and what you're left with is an ancient truth: people think in the language they learned to speak. __A teenager's thumbs already know where to go and they think in texting. When writing, typos feel wrong. People who learn multiple spoken languages and use them regularly tend to think in multiple languages, too, after they've practiced for so long that they no longer have to do a translation in their heads first. Rather than read a phrase in Russian and translate it to English in their minds before understanding it, they just understand it in Russian.__

You cannot think "Fire rearward missile" and then translate it to Russian, you must think in Russian.

If you've heard about Sapir-Whorf or read Nineteen Eighty Four and all that jazz then you might already appreciate the implications: words convey ideas, language is thought. Whether that's a syntactic language or a visual or auditory language in your head doesn't matter, it's the way your brain deals with symbols and their rules for manipulation that matter.

__The best book you can read (and perform the exercises of) to acquire this trait is Structure and Interpretation of Computer Programs by Abelson, Sussman and Sussman. It uses Scheme to present its lessons, and even if that's not the language you write programs in it's still one of the best languages to program your brain with. Remember: learn math and latin and you can understand anything.__

__Whether you have this book or not the key is to practice with coding until you can read and reason with it like your native tongue. You can't acquire this trick in 30 days, it may be more like 30 months. You'll know if you've got it when you begin to see in code as well.__

## 5. When In Rome, Does As Romans Do

I don't think I live up to this because I like to use MonoTouch to write iOS apps. I do know Objective-C and can write apps in it, but my heart belongs to LINQ. If I were to suppose an exception to this rule, it would be: "but when in the Roman accounting department, does as accountants do." It is not always wrong to pick a language that fits the domain, even if there's a performance or feature disadvantage from running in an interpreter or other layer. Yet great programmers will never insulate themselves from the hardware and will learn the native language anyway. Every abstraction leaks.

#### Symptoms

- No automatic interest in cross-platform frameworks
- Contemptuous of "language wars"
- Doesn't see a strategic disadvantage in maintaining the same program in multiple languages
- Assumes their own code is the source of a bug before blaming the compiler, library or operating system
- Displays a plush Tux penguin or Android in their cubicle soon after being assigned to a project targeting that platform
- Switches brand of cell phone or tablet in the same circumstance
- Hits a stack of technical manuals before assuming a data-type like double or decimal will do what they think on a new device

#### How to acquire this trait

These guys are as comfortable with platform diversity as they are with having multiple vegetables on the same dinner plate. I said "thinking in code" and "emotional detachment" were virtues, and this is the bonus that comes for free. While these programmers appreciate abstraction they don't automatically appreciate generalization. If there was no advantage to be had in a new platform, then why was it ever created?

__There's a thousand computer languages because there's a thousand classes of problems we can solve with software.__ In the 1980s, after the Macintosh debut, a hundred DOS products were ported to the new mouse-driven platform by clubbing the Alto-inspired UI over the head and brute-forcing the keyboard-driven paradigms of PCs into the Mac's visual atmosphere. Most of these were rejected by Apple or the market, and if they came back for a second try they came back because somebody flipped open the spiral-bound HIG and read it sincerely. 

Maybe Excel needed to emulate Lotus 1-2-3's slash-driven menus. Maybe AutoCAD still needs to host a command line. But the designers of both never neglected the new world and that's why they're still famous today. Objective-C has Categories, C# has Extensions, but they're not quite alike and they're not quite the same. What's a Key-Value Observer to one might be like an Event to the other, which is as informative as saying an opportunity is the same as permission.

__To acquire this trait you have to begin by learning a new platform through both its unique instructions and the way the user interacts with it.__ Much of what's out there is made to be very similar to what you already know so you can start using it quickly (radically different platforms "ahead of their time" tend to fail), but be attentive to what's different. Android phones tend to include more hardware buttons than iPhones. Maybe that's good, maybe that's not, but their users expect programs to use them. Don't disappoint them: neurons are harder to program than transistors.

__New platforms either debut a new language or new conventions that are unique, and at whatever level that is you need to learn a new vocabulary. Even if it looks like they took an existing platform and "tweaked" it, the tweak in question must have significance.__ They say a Big Mac's Special Sauce is just Thousand Island dressing with more sweet pickle.

To manage a single product written to multiple platforms you need to abstract your product, not the platform its delivered to. You do that through elimination, by stripping platform-specific code out of your product's soul. If you can master "Eager to fix what isn't broken" then go bonkers on your code until there's only a few chunks left on the coroner's table; that's the part that stays. 

The simpler it is, the easier to modularize. The easier to modularize, the easier to separate concerns. The easier to separate concerns, the less has to change to fix bugs and add features. The less has to change, the easier to translate those changes to another system. Don't rely on automatic methods--it's like relying on a cat to tie your shoelaces.

## 6. Creates their own tools

#### Symptoms

- Has set up an automated build server
- Has written their own benchmark or specialized profiler
- Maintains an open-source project on GitHub
- Has re-invented LISP at least once
- Knows what a Domain Specific Language is, and has designed and written an interpreter for one
- Extends their IDE/Editor with custom macros
- There's a Radio Shack project enclosure on their desk with a bunch of 7-segment displays showing the number of issues assigned to them in the bug tracker

# Signs that you're destined for more

These are not always the traits of "good" programmers, they're the traits of people who go beyond programming and change industries, some of them are even detrimental to what an employer would consider "good". If any of the following fits you then you should start your own company. I can't say if it'll benefit you to squander a few years in the bowels of a corporate beast to "learn the ropes", because if you exhibit these traits then I doubt it will be worth it. You are Steve Jobs or Bill Gates or their successors, and there's no way to learn these traits either because if you don't have them, then you ain't ever gonna.

## 1. Indifferent to Hierarchy

__Richard Feynman once pointed out that "it doesn't matter who your dad knows", if something is wrong then it's wrong no matter who says its right. Don't fear the consequences to your career, you''ll find another job. Society never wastes real talent.__

#### Symptoms

- Getting into arguments with the CEO
- Quitting on principle
- Organizing teams without permission
- Creating new products after-hours while hiding from the Rent-a-Cops
- Re-organizing the workspace "Peopleware" style, against company policy
- Helps themselves to the boss's private stash of bottled water

## 2. Excited by failure

Most of us learn from failure, but most of us also fear it. Even fewer of us have so much faith in their innate ability to cope and adapt that failure is actually seductive to them, and they must tempt more. They don't deliberately try to fail, they just feel instinctively that failure can be as beneficial to them as it was to Spencer Silver.

#### Symptoms

- Can tell you, step-by-step, what happened on United 232, Air France 447, March 28th 1979, or April 26 1986, and what changed as a result
- Snapped up an HP Touchpad when they went on sale for $100
- Took broken appliances apart as a kid, did not necessarily fix them
- Has tried every pick-up line there is and has the slap-marks on his cheeks to prove it
- Owns schwag from Dr. Koop, Enron, Pets.Com, excite, RIM and Yahoo!
- Founded a second start-up with the essence of their first start-up's failure

## 3. Indifferent to circumstances

_"The mind is its own place, and in itself can make a heaven of hell, a hell of heaven."_

#### Symptoms

- Has transitioned from rags to riches to rags and shows no sign of regret to the latter
- Little or no loyalty to physical location or local traditions
- Disinterested by the outcome of elections
- Stock options and bonuses are ineffective retainment techniques
- Makes the best damn PB&J you've ever tasted, can prepare ramen sous-vide style with a ziplock bag and a space heater
- Cashes-in their 401k to fund their next venture

## 4. Unswayed by obligations

__Obligations are a social construct, and some see them as props for the lazy.__ While that's a dishonest oversimplification, some make it a point to break free and do something different. We'd still be bashing rocks together if they didn't.

#### Symptoms

- Routinely applies for an extension to file taxes
- Antagonistic when asked to maintain code for "backwards-compatability"
- Contemptuous of Girl Scout Cookie order forms left out in the break room
- Dropped out of high-school, university, law or medical school because they didn't see the point anymore
- Has deeply religious parents but doesn't attend church
- Uses the free return-address envelope stickers given out by a cancer charity, frowns when you ask how much they gave

## 5. Substitutes impulse for commitment

Companies are formed to 1: reduce the cost of a transaction, and 2: provide customer support. Our stereotypical "free spirit" isn't very good at the last one, but that's why they sell their stock to The Suits and fly away to build another nest.

#### Symptoms

- Forgets Mother's Day/Valentine's Day/Anniversary but swamps the beloved with overcompensatory gifts shortly afterward
- Tends to give gifts that came from the SkyMall catalog
- Dedicates books/product launches/office buildings to close persons who didn't show-up for the ceremony
- Recruits a steadier person to run day-to-day operations

## 6. Driven by experiences

The biggest programming challenges are still unknown; they're not quite the same as solving P=NP and more like figuring out how to get your customer laid. So somebody reacts boric acid and silicon oil, and that's nice, but it took a toy shop owner to turn it into Silly Putty.

#### Symptoms

- Shows you a birds-eye photo of a woodland creek. When you shrug, they explain that it was taken on the return bounce
- Has opinions on the best parts of the Adirondack Trail
- Shows up at work with welts all over their arms, says it had something to do with a company called "Airsoft"
- Has eaten Ikizukuri or Fugu
- Laughs knowingly at the "strawberry cough" scene in Children of Men
- N.B.: While the toy-shop owner figured out that Silly Putty could be a toy, it took someone who was already $12K in debt to survive the silicone shortages of the Korean War before becoming rich. Not even the most inspired programmers, inventors, or entrepreneurs live in a vacuum. Someone invents it, another figures out what to do with it, and somebody else figures how to turn it into a business. Just look at the gadget you're using to read this article.