## What Makes a Pragmatic Progammer?
- Early adopter/fast adapter.
- Inquisitive.
- Critical thinker.
- Realistic. Understand how difficult a problem is.
- Jack of all trades. You try to be familiar with a broad range of technologies and environments.

## 1—A Pragmatic Philosophy

#### The Cat Ate My Source Code
- Responsibility is something you actively agree to. You make a commitment to ensure that something is done right, but you don't necessarily have direct control over every aspect of it.
- When you do accept the responsibility for an outcome, you should expect to be held accountable for it.
- Don't blame someone or something else, or make up an excuse. Don't blame all the problems on a vendor, a programming language, management, or your coworkers. Any and all of these may play a role, but it is up to you to provide solutions, not excuses.

#### Software Entropy
- When disorder increases in software, programmers call it "software rot."
- Even if you are a team of one, your project's psychology can be a very delicate thing. Despite the best laid plans and the best people, a project can still experience ruin and decay during its lifetime.
- One broken window, left unrepaired for any substantial length of time, instills in the inhabitants of the building a sense of abandonment—a sense that the powers that be don't care about the building.
- If there is insufficient time to fix it properly, then board it up. Perhaps you can comment out the offending code, or display a "Not Implemented" message, or substitute dummy data instead.
- One broken window—a badly designed piece of code, a poor management decision that the team must live with for the duration of the project— is all it takes to start the decline.
- If you find yourself working on a project with quite a few broken windows, it's all too easy to slip into the mindset of "All the rest of this code is crap, I'll just follow suit."

### Stone Soup and Boiled Frogs
- The villagers are tricked by the soldiers, who use the villagers' curiosity to get food from them.
- But more importantly, the soldiers act as a catalyst, bringing the village together so they can jointly produce something that they couldn't have done by themselves—a synergistic result.
- Work out what you can reasonably ask for. Develop it well.
- Once you've got it, show people, and let them marvel.
- Then say "of course, it would be better if we added…." Pretend it's not important.

#### Good-Enough Software
- The scope and quality of the system you produce should be specified as part of that system's requirements.
- Often you'll be in situations where trade-offs are involved. Surprisingly, many users would rather use software with some rough edges today than wait a year for the multimedia version.
- But artists will tell you that all the hard work is ruined if you don't know when to stop. If you add layer upon layer, detail over detail, the painting becomes lost in the paint.
- Don't spoil a perfectly good program by overembellishment and over-refinement. Move on, and let your code stand in its own right for a while.

#### Your Knowledge Portfolio
- Your knowledge becomes out of date as new techniques, languages, and environments are developed. Changing market forces may render your experience obsolete or irrelevant. Given the speed at which Web-years fly by, this can happen pretty quickly.
- As the value of your knowledge declines, so does your value to your company or client. We want to prevent this from ever happening.

#### Your Knowledge Portfolio
- Invest regularly. Just as in financial investing, you must invest in your knowledge portfolio regularly.
- Diversify. The more different things you know, the more valuable you are. As a baseline, you need to know the ins and outs of the particular technology you are working with currently. But don't stop there.
- Buy low, sell high. Learning an emerging technology before it becomes popular can be just as hard as finding an undervalued stock, but the payoff can be just as rewarding.
- Review and rebalance. This is a very dynamic industry. That hot technology you started investigating last month might be stone cold by now. Maybe you need to brush up on that database technology that you haven't used in a while.

#### Goals
- Learn at least one new language every year.
- Read a technical book each quarter. 
- Read nontechnical books, too. Computers are used by people—people whose needs you are trying to satisfy.
- Experiment with different environments. If you've worked only in Windows, play with Unix at home.
- Stay current. Subscribe to trade magazines and other journals.

#### Care and Cultivation of Gurus
- Know exactly what you want to ask, and be as specific as you can be.
- Frame your question carefully and politely. Remember that you're asking a favor; don't seem to be demanding an answer
- Once you've framed your questioned, stop and look again for the answer.
- Start learning a new language this week, or start reading a new book.
 
#### Communicate!
- It's not just what you've got, but also how you package it. Having the best ideas, the finest code, or the most pragmatic thinking is ultimately sterile unless you can communicate with other people.
- Know What You Want to Say. Write an outline. Then ask yourself, "Does this get across whatever I'm trying to say?" Refine it until it does.
- Know Your Audience  
- There is no excuse today for producing poor-looking printed documents. Modern word processors (along with layout systems such as LaTeX and troff) can produce stunning output.
- If possible, involve your readers with early drafts of your document.

## 2—A Pragmatic Approach

#### The Evils of Duplication

- Programmers are constantly in maintenance mode. Our understanding changes day by day. New requirements arrive as we're designing or coding.

__How Does Duplication Arise?__

- At the coding level, we often need to have the same information represented in different forms. Maybe we're writing a client-server application, using different languages on the client and server, and need to represent some shared structure on both.
- Often the answer is to write a simple filter or code generator.
- Class definitions can be generated automatically from the online database schema, or from the metadata used to build the schema in the first place. The code extracts in this book are inserted by preprocessor each time we format the text.
- Unfortunately, they are never taught why code needs comments: bad code requires lots of comments.
- The DRY principle tells us to keep the low-level knowledge in the code, where it belongs, and reserve the comments for other, high-level explanations.
- On the other hand, perhaps the hardest type of duplication to detect and handle occurs between different developers on a project.
- We feel that the best way to deal with this is to encourage active and frequent communication between developers.

#### Orthogonality
- Two or more things are orthogonal if changes in one do not affect any of the others. In a well-designed system, the database code will be orthogonal to the user interface: you can change the interface without affecting the database, and swap databases without changing the interface.
- We want to design components that are self-contained: independent, and with a single, well-defined purpose.
- Changes are localized, so development time and testing time are reduced. It is easier to write relatively small, self-contained components than a single large block of code. Simple components can be designed, coded, unit tested, and then forgotten—there is no need to keep changing existing code as you add new code.
- An orthogonal approach also promotes reuse. If components have specific, well-defined responsibilities, they can be combined with new components in ways that were not envisioned by their original implementors.
- When you bring in a toolkit (or even a library from other members of your team), ask yourself whether it imposes changes on your code that shouldn't be there.
- Avoid global data. Every time your code references global data, it ties itself into the other components that share that data.

#### Project Teams
- When teams are organized with lots of overlap, members are confused about responsibilities. Every change needs a meeting of the entire team, because any one of them might be affected.
- Our preference is to start by separating infrastructure from application. Each component gets its own subteam. Each obvious division of application functionality is also divided.
- You can see how much a project is orthogonal by the number of people needed to be discussing each change that is requested.

#### Reversibility
- There is always more than one way to implement something, and there is usually more than one vendor available to provide a third-party product.
- Ex: the project starts as client-server, then they want a stand-alone version, and then, they want to make it n-tier. There are no final decisions.

#### Tracer Bullets: [TODO]

#### Prototypes and Post-it Notes
- You can prototype: Architecture, new functionality in an existing system, structure, third-party tools, performance issues, user interface design.
- Ignore these:
- Correctness: You may be able to use dummy data where appropriate.
- Completeness: The prototype may function only in a very limited sense, with only one preselected piece of input data and one menu item.
- Robustness: Error checking is incomplete or missing entirely.
- Style: Ugly, no comments and no documentation. Documentation on the experience with the prototype, but little on the prototype system itself.
- Implement them with a very high-level language.
- Make sure that everyone understands that you are writing disposable code.
- If the purpose of the prototype code may be misinterpreted, you may be better off with tracer bullets.

#### Domain Languages
- You should consider ways of moving your project closer to the problem domain. By coding at a higher level of abstraction, you are free to concentrate on solving domain problems, and can ignore implementation details.
- With a mini-language, you would be ale to issue an error message using the vocabulary of the domain.
- For years, Microsoft has been using a data language that can describe menus, widgets, dialog boxes, and other Windows resources.
- You can use your own imperative languages to ease program maintenance.

## 3.1: The Basic Tools

#### The Power of Plain Text
- Our base material isn’t wood or iron, it’s knowledge.
- Instead of Field9=467abe, try DrawingType=UMLActivityDrawing.
- Think HTML ,SGML, XML. Plain text tends to be at a higher level than a straight binary encoding, which is usually derived directly from the implementation.

#### Drawbacks
- It takes more space.
- It may be computationally more expensive to interpret and process a text file.
- Binary data may be more obscure than plain text, but it is no more secure. If you worry about users seeing passwords, encrypt them.

#### Advantages
- Insurance against obsolescence: As long as the data survives, you’ll have a chance to use it, period.
- Leverage: Virtually every tool in the computing universe operates, and can operate, on plain text. Unix works on the philosophy of small tools who can do their work well.
- Easier testing
 
#### Shell Games
- The workbench is the command shell. From the shell prompt, you can invoke your full repertoire of tools, and from the shell, you can lunch applications, debuggers, browsers, editors, and utilities.

#### Power Editing
- Use one editor only!
- Configurable: Fonts, colors, window sizes, keystroke bindings
- Extensible: You can teach it new languages.
- Programmable: You can program it to learn complex, multistep tasks.

#### Source Code Control
- A Source code control system (SCCS) does more than undo mistakes. A good SCCS will let you track changes, and answer questions as to who made changes in this line of code, etc.
- Always use SCCS, even if your code is a prototype, and even if your code isn’t source code. You have product builds that are automatic and repeatable.

#### Debugging
- Embrace the fact that debugging is just problem solving, and attack it as such. Fix the problem, not the blame.
- Resist the urge to fix the symptoms you see, it’s more likely that the actual fault may be several steps removed from what you are observing. 
- Make sure you are working on code that compiled cleanly.

#### Debugging Strategies
- The best way to start fixing a bug is to make it reproducible.
- Second, trace the variables and do some rubber ducking.

#### Text Manipulation
- A set of Perl scripts took a plain text file containing a database schema definition and from it generated:
- The SQL statements to create the database
- Flat data files to poplate a data dictionary
- C code libraries to access the database
- Scripts to check db integrity
-  Web pages containing schema descriptions
- An XML version of the schema
- Test data generation
- Generating web documentation.

#### Code Generators
- Passive code generators can create source files, can perform conversions, and can produce lookup tables and other resources that are expensive to compute at runtime.

## Chapter 4: Pragmatic Paranoia

#### Design by Contract
- A contract defines your rights and responsibilities, as well as those of the other party. There is also an agreement concerning repercussions if either party fails to abide by the contract.
- Every function and method in a software system must do something, so the routine should have some expectation of the state of the world, and then it is able to make a statement about the state of the world when it concludes.
- Preconditions: Verify the routine’s requirements.
- Postconditions: Verify the state of the world when the routine is done.
- Class invariants: A class ensures that this condition is always true from the perspective of a caller. Ex: “Nodes must be in increasing order.” If all the routine’s preconditions are met by the caller, the routine shall guarantee that all postconditions and invariants will be true whne it completes.
- Ex: In a debit card transaction switch, a major requirement was that the user of a debit card should never have the same transaction applied to their account twice.

#### Assertive Programming
- If it can’t happen, use assertions to ensure that it won’t. But don’t use assertions in place of real error handling.
When to Use Exceptions
- Exceptions should be reserved for unexpected events. Assume an uncaught exception, if the answer to “will this code run if this doesn’t work”, then throw an exception.
- If a file “should have been there”, then throw an exception. But if you are asking the user to input a file in and the file is not there, then just show an error.

##Chapter 5: Bend or Break

#### Decoupling and the Law of Demeter
- Organize your code into cells (modules) and limit the interaction between them. If one module gets compromised and has to be replaced, the other modules should be able to carry on.
- When we ask an object for a particular service, we’d like the services to be performed on our behalf. We do not want the object to give us a third-party object that we have to deal with to get the required services.

		public void plotDate(Date aDate, Selection aSelection) { TimeZone tz =
		aSelection.getRecorder().getLocation().getTimeZone(); ...
		}

- But now the plotting routine is unnecessarily coupled to three classes:Selection, Recorder, and Location. This style increases the number of classes on which our class depends. If Fred makes a change to Location, you have to change your code as well.
- What you want is:

		public void plotDate(Date aDate, TimeZone aTz) { ...
		} 

		plotDate(someDate, someSelection.getTimeZone());

- Rather than digging the hierarchy, just ask for what you need directly.
- Add a method to Selection to get the time zone on our behalf: the plotting routine doesn’t care whetehr the time zone comes from the Recorder or something else. The selection routine should just ask the recorder for its time zone.
The Law of Demeter for functions: Any method of an object should call only methods belonging to: Itself, any parameters that were passed in to the method, any objects It created, or any directly held component objects.
- Classes in C++ with larger response sets are more prone to error than classes with smaller response sets.
- The cost: Your module must delegate and manage any and all subcontractors directly, without involving clients of your module. So you will be writing a large number of wrapper methods that simply forward the request on to a delegate.
- Problem with including a header file, you are unnecessarily making everything that uses a Person class also include the header file for Date. Once this kind of usage, you will find that including one header file ends up including most of the rest of the system.

		public void showBalance(BankAccount acct) { 
		Money amt = acct.getBalance(); 
		printToScreen(amt.printFormat());
		}

- In here the showBalance function is still coupled to the Money class, we should separate it like this:

		void showBalance(BankAccount b) { 
		b.printBalance();
		}

#### Metaprogramming
_No amount of genius can overcome a preoccupation with detail. – Levy’s Eighth Law_

- First, we want to make our systems highly configurarable (not just screen colors, but deeply ingrained items such as the choice of algorithms, database products, middleware technology, and UI style. These items should be implemented as configuration options, not through integration or engineering.
- Use metadata to describe configuration options for an application: tuning parameters, user preferences, the installation directory, etc.
- Under Windows, either an initialization file or entries in the system Registry are typical. 

#### Metadata-Driven Applications
- We want to configure and drive the application via metadata as much as possible. Our goal is to think declaratively and create highly dynamic and adaptable programs.
- Put abstractions in code details in Metadata
- It forces you to decouple your design.
- It forces you to create a more robust/abstract design by deferring details.
- You can customize the application without recompiling it.
- Configuration metadata: plain text

### Temporal Coupling
- Better to have things that can be threaded consumed at the same time than do it serially.

__MVC__

- Model = target object, has no direct knowledge of any views or controllers
- View = a way to interpret the model, it subscribes to changes in the model and logical events from the controller
- Controller = a way to control the view and provide the model with new data

## Chapter 6: While You Are Coding
- Developers who don’t actively think about their code are programming by coincidence (the code might work, but there’s no reason why.

## Chapter 8: Pragmatic Projects
- No broken windows: Do not tolerate broken windows. The team must take responsibility for the quality of the product, supporting developers who understand the no broken windows philosophy.
- Communicate: Great project teams have a distinct personality. People look forward to their meetings because they know they’ll see a well-prepared performance that makes everyone feel good. Generate a brand for the project.
- Don’t repeat yourself: Get a project librarian who will be responsible for coordinating documentation and code repositories.
- Orthogonality: Teams should be split into small teams, each responsible for a particular functional aspect of the system. This only works for a team with responsible developers.
- Automate!
- Give each member the ability to shine in his or her own way.
- Automate installing the IDE for each developer, automate stuff using cron.
- Coding ain’t done till all the tests are done!

#### Tips for Users
- Balloon or ToolTip help
- Keyboard shortcuts
- A quick reference guide
- Colorization
- Log file analyzers
- Automated installation
- Tools to check the system’s integrity
- Ability to run multiple versions of the system for training
- A splash screen customized for their organization



