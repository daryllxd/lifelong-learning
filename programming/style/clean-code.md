## Clean Code

We will never be rid of code, because code represents the details of the requirements. At some level those details cannot be ignored or abstracted; they have to be specified. And specifying requirements in such detail that a machine can execute them is programming. Such a specification is code.

Have you ever been significantly impeded by bad code? If you are a programmer of any experience then you’ve felt this impediment many times. Indeed, we have a name for it. We call it wading. We wade through bad code. We slog through a morass of tangled brambles and hidden pitfalls. We struggle to find our way, hoping for some hint, some clue, of what is going on; but all we see is more and more senseless code.

We’ve all looked at the mess we’ve just made and then have chosen to leave it for another day. We’ve all felt the relief of seeing our messy program work and deciding that a working mess is better than nothing. We’ve all said we’d go back and clean it up later. Of
course, in those days we didn’t know LeBlanc’s law: Later equals never.

You will not make the deadline by making the mess. Indeed, the mess will slow you down instantly, and will force you to miss the deadline. The only way to make the deadline—the only way to go fast—is to keep the code as clean as possible at all times.

>I like my code to be elegant and efficient. The logic should be straightforward to make it hard for bugs to hide, the dependencies minimal to ease maintenance, error handling complete according to an articulated strategy, and per- formance close to optimal so as not to tempt people to make the code messy with unprinci- pled optimizations. Clean code does one thing well. - Bjarne Stroustrup

Bjarne also mentions that error handing should be complete. This goes to the disci- pline of paying attention to details. Abbreviated error handling is just one way that pro- grammers gloss over details. Memory leaks are another, race conditions still another. Inconsistent naming yet another. The upshot is that clean code exhibits close attention to detail.

Bjarne closes with the assertion that clean code does one thing well. It is no accident that there are so many principles of software design that can be boiled down to this simple admonition. Writer after writer has tried to communicate this thought. Bad code tries to do too much, it has muddled intent and ambiguity of purpose. Clean code is focused. Each function, each class, each module exposes a single-minded attitude that remains entirely undistracted, and unpolluted, by the surrounding details.

>Clean code is simple and direct. Clean code reads like well-written prose. Clean code never obscures the designer’s intent but rather is full of crisp abstractions and straightforward lines of control. - Grady Booch, author of Object Oriented Analysis and Design with Applications

>Clean code can be read, and enhanced by a developer other than its original author. It has unit and acceptance tests. It has meaningful names. It provides one way rather than many ways for doing one thing. It has minimal depen- dencies, which are explicitly defined, and pro- vides a clear and minimal API. Code should be literate since depending on the language, not all necessary information can be expressed clearly in code alone. - Big” Dave Thomas, founder of OTI, godfather of the Eclipse strategy

Dave asserts that clean code makes it easy for other people to enhance it. This may seem obvious, but it can- not be overemphasized. There is, after all, a difference between code that is easy to read and code that is easy to change.

Code, without tests, is not clean. No matter how elegant it is, no matter how readable and acces- sible, if it hath not tests, it be unclean.

>I could list all of the qualities that I notice in clean code, but there is one overarching quality that leads to all of them. Clean code always looks like it was written by someone who cares. There is nothing obvious that you can do to make it better. All of those things were thought about by the code’s author, and if you try to imagine improvements, you’re led back to where you are, sitting in appreciation of the code someone left for you—code left by some- one who cares deeply about the craft. - Michael Feathers, author of Working Effectively with Legacy Code

>In recent years I begin, and nearly end, with Beck’s rules of simple code. In priority order, simple code:

> - Runs all the tests;
  - Contains no duplication;
  - Expresses all the design ideas that are in the system;
  - Minimizes the number of entities such as classes, methods, functions, and the like.

> Of these, I focus mostly on duplication. When the same thing is done over and over, it’s a sign that there is an idea in our mind that is not well represented in the code. I try to figure out what it is. Then I try to express that idea more clearly.

> Expressiveness to me includes meaningful names, and I am likely to change the names of things several times before I settle in. I also look at whether an object or method is doing more than one thing. If it’s an object, it probably needs to be broken into two or more objects. If it’s a method, I will always use the Extract Method refactoring on it, resulting in one method that says more clearly what it does, and some submethods saying how it is done.

> After years of doing this work, it seems to me that all programs are made up of very similar elements. I can implement the functionality now with something simple, say a hash map, but since now all the references to that search are covered by my little abstraction, I can change the implementation any time I want. I can go forward quickly while preserving my ability to change later.

Here, in a few short paragraphs, Ron has summarized the contents of this book. No duplication, one thing, expressiveness, tiny abstractions. 

> You know you are working on clean code when each routine you read turns out to be pretty much what you expected. You can call it beautiful code when the code also makes it look like the language was made for the problem. - Ward Cunningham, inventor of Wiki, inventor of Fit, coinventor of eXtreme Programming.

Ward expects that when you read clean code you won’t be surprised at all. Indeed, you won’t even expend much effort. You will read it, and it will be pretty much what you expected. It will be obvious, simple, and compelling. Each module will set the stage for the next. Each tells you how the next will be written. Programs that are that clean are so profoundly well written that you don’t even notice it. The designer makes it look ridicu- lously simple like all exceptional designs.

He says that beautiful code makes the language look like it was made for the problem! So it’s our responsibility to make the language look simple! Language bigots everywhere, beware! It is not the language that makes programs appear simple. It is the programmer that make the language appear simple!

#### We Are Authors

The next time you write a line of code, remember you are an author, writing for readers who will judge your effort. You might ask: How much is code really read? Doesn’t most of the effort go into writing it?

Indeed, the ratio of time spent reading vs. writing is well over 10:1. We are constantly reading old code as part of the effort to write new code.

Because this ratio is so high, we want the reading of code to be easy, even if it makes the writing harder. Of course there’s no way to write code without reading it, so making it easy to read actually makes it easier to write.

You cannot write code if you cannot read the sur- rounding code. The code you are trying to write today will be hard or easy to write depending on how hard or easy the surrounding code is to read. So if you want to go fast, if you want to get done quickly, if you want your code to be easy to write, make it easy to read.

#### The Boy Scout Rule

> Leave the campground cleaner than you found it.

If we all checked-in our code a little cleaner than when we checked it out, the code simply could not rot. The cleanup doesn’t have to be something big. Change one variable name for the better, break up one function that’s a little too large, eliminate one small bit of duplication, clean up one composite if statement.

Can you imagine working on a project where the code simply got better as time passed? Do you believe that any other option is professional? Indeed, isn’t continuous improvement an intrinsic part of professionalism?

## Meaningful Names

#### Use Intention-Revealing Names

	public List<int[]> getThem() {
		List<int[]> list1 = new ArrayList<int[]>(); 
		for (int[] x : theList)
			if (x[0] == 4)
				list1.add(x);
		return list1; 
	}

hy is it hard to tell what this code is doing? There are no complex expressions. Spacing and indentation are reasonable. There are only three variables and two constants mentioned. There aren’t even any fancy classes or polymorphic methods, just a list of arrays (or so it seems).

The problem isn’t the simplicity of the code but the implicity of the code (to coin a phrase): the degree to which the context is not explicit in the code itself. The code implic- itly requires that we know the answers to questions such as:

1. What kinds of things are in theList?
2. What is the significance of the zeroth subscript of an item in theList?
3. What is the significance of the value 4?
4. How would I use the list being returned?

Each cell on the board is represented by a simple array. We further find that the zeroth subscript is the location of a status value and that a status value of 4 means “flagged.” Just by giving these concepts names we can improve the code considerably:

	public List<int[]> getFlaggedCells() {
		List<int[]> flaggedCells = new ArrayList<int[]>(); 
		for (int[] cell : gameBoard)
			if (cell[STATUS_VALUE] == FLAGGED)
				flaggedCells.add(cell);
		return flaggedCells; 
	}

We can go further and write a simple class for cells instead of using an array of ints. It can include an intention-revealing function (call it isFlagged) to hide the magic num- bers. It results in a new version of the function:

	public List<Cell> getFlaggedCells() {
		List<Cell> flaggedCells = new ArrayList<Cell>(); 
		for (Cell cell : gameBoard)
			if (cell.isFlagged())
				flaggedCells.add(cell);
		return flaggedCells; 
	}

#### Avoid Disinformation

Programmers must avoid leaving false clues that obscure the meaning of code. We should avoid words whose entrenched meanings vary from our intended meaning. For example, hp, aix, and sco would be poor variable names because they are the names of Unix plat- forms or variants. Even if you are coding a hypotenuse and hp looks like a good abbrevia- tion, it could be disinformative.

Do not refer to a grouping of accounts as an accountList unless it’s actually a List. The word list means something specific to programmers. If the container holding the accounts is not actually a List, it may lead to false conclusions.1 So accountGroup or bunchOfAccounts or just plain accounts would be better.

Beware of using names which vary in small ways. How long does it take to spot the subtle difference between a XYZControllerForEfficientHandlingOfStrings in one module and, somewhere a little more distant, XYZControllerForEfficientStorageOfStrings? The words have frightfully similar shapes.

Spelling similar concepts similarly is information. Using inconsistent spellings is dis- information. With modern Java environments we enjoy automatic code completion. We write a few characters of a name and press some hotkey combination (if that) and are rewarded with a list of possible completions for that name. It is very helpful if names for very similar things sort together alphabetically and if the differences are very obvious, because the developer is likely to pick an object by name without seeing your copious comments or even the list of methods supplied by that class.

A truly awful example of disinformative names would be the use of lower-case L or uppercase O as variable names, especially in combination. The problem, of course, is that they look almost entirely like the constants one and zero, respectively.

#### Make Meaningful Distinctions

It is not sufficient to add number series or noise words, even though the compiler is satisfied. If names must be different, then they should also mean something different.

	public static void copyChars(char a1[], char a2[]) {
		for (int i = 0; i < a1.length; i++) {
			a2[i] = a1[i];
		}
	}

This function reads much better when source and destination are used for the argument names.

Noise words are another meaningless distinction. Imagine that you have a Product class. If you have another called ProductInfo or ProductData, you have made the names dif- ferent without making them mean anything different. Info and Data are indistinct noise words like a, an, and the.

Note that there is nothing wrong with using prefix conventions like a and the so long as they make a meaningful distinction. For example you might use a for all local variables and the for all function arguments.3 The problem comes in when you decide to call a vari- able theZork because you already have another variable named zork.

Noise words are redundant. The word variable should never appear in a variable name. The word table should never appear in a table name. How is NameString better than Name? Would a Name ever be a floating point number? If so, it breaks an earlier rule about disinformation. Imagine finding one class named Customer and another named CustomerObject. What should you understand as the distinction? Which one will represent the best path to a customer’s payment history?

	getActiveAccount();
	getActiveAccounts();
	getActiveAccountInfo();

How are the programmers in this project supposed to know which of these functions to call?

#### Use Searchable Names

One might easily grep for MAX_CLASSES_PER_STUDENT, but the number 7 could be more troublesome. Searches may turn up the digit as part of file names, other constant defini- tions, and in various expressions where the value is used with different intent

Likewise, the name e is a poor choice for any variable for which a programmer might need to search. It is the most common letter in the English language and likely to show up in every passage of text in every program. In this regard, longer names trump shorter names, and any searchable name trumps a constant in code.

My personal preference is that single-letter names can ONLY be used as local vari- ables inside short methods. The length of a name should correspond to the size of its scope.

One difference between a smart programmer and a professional programmer is that the professional understands that clarity is king. Professionals use their powers for good and write code that others can understand.

#### Class Names and Method Names

Classes and objects should have noun or noun phrase names like Customer, WikiPage, Account, and AddressParser. Avoid words like Manager, Processor, Data, or Info in the name of a class. A class name should not be a verb.

Methods should have verb or verb phrase names like postPayment, deletePage, or save. Accessors, mutators, and predicates should be named for their value and prefixed with get, set, and is according to the javabean standard.4

#### Pick One Word per Concept

Pick one word for one abstract concept and stick with it. For instance, it’s confusing to have fetch, retrieve, and get as equivalent methods of different classes. How do you remember which method name goes with which class? Sadly, you often have to remember which company, group, or individual wrote the library or class in order to remember which term was used. Otherwise, you spend an awful lot of time browsing through headers and previous code samples.

Likewise, it’s confusing to have a controller and a manager and a driver in the same code base. What is the essential difference between a DeviceManager and a Protocol- Controller? Why are both not controllers or both not managers? Are they both Drivers really? The name leads you to expect two objects that have very different type as well as having different classes.

##### Add Meaningful Context

Imagine that you have variables named firstName, lastName, street, houseNumber, city, state, and zipcode. Taken together it’s pretty clear that they form an address. But what if you just saw the state variable being used alone in a method? Would you automatically infer that it was part of an address?

Consider the method in Listing 2-1. Do the variables need a more meaningful con- text? The function name provides only part of the context; the algorithm provides the rest. Once you read through the function, you see that the three variables, number, verb, and pluralModifier, are part of the “guess statistics” message. Unfortunately, the context must be inferred. When you first look at the method, the meanings of the variables are opaque.

## Functions

>Fitness

public static String testableHtml(
	PageData pageData,
	boolean includeSuiteSetup
) throws Exception {
	WikiPage wikiPage = pageData.getWikiPage();
	StringBuffer buffer = new StringBuffer();
	if (pageData.hasAttribute("Test")) {
		if (includeSuiteSetup) { 
			WikiPage suiteSetup =
				PageCrawlerImpl.getInheritedPage( SuiteResponder.SUITE_SETUP_NAME, wikiPage
			);
		if (suiteSetup != null) {
			WikiPagePath pagePath = suiteSetup.getPageCrawler().getFullPath(suiteSetup);
			String pagePathName = PathParser.render(pagePath);
			buffer.append("!include -setup .").append(pagePathName) .append("\n");
		} 
	}
	WikiPage setup = PageCrawlerImpl.getInheritedPage("SetUp", wikiPage);
	

Clusterfuck.

>Refactored

	public static String renderPageWithSetupsAndTeardowns( 
		PageData pageData, boolean isSuite
	) throws Exception {
		boolean isTestPage = pageData.hasAttribute("Test");
		if (isTestPage) {
			WikiPage testPage = pageData.getWikiPage();
			StringBuffer newPageContent = new StringBuffer();
			includeSetupPages(testPage, newPageContent, isSuite);
			newPageContent.append(pageData.getContent());
			includeTeardownPages(testPage, newPageContent, isSuite);
			pageData.setContent(newPageContent.toString());
		}
		return pageData.getHtml(); 
	}

Unless you are a student of FitNesse, you probably don’t understand all the details. Still, you probably understand that this function performs the inclusion of some setup and teardown pages into a test page and then renders that page into HTML. If you are familiar with JUnit,2 you probably realize that this function belongs to some kind of Web-based testing framework. And, of course, that is correct. 

#### Small!

The first rule of functions is that they should be small. The second rule of functions is that they should be smaller than that. This is not an assertion that I can justify. I can’t provide any references to research that shows that very small functions are better. What I can tell you is that for nearly four decades I have written functions of all different sizes. I’ve writ- ten several nasty 3,000-line abominations. I’ve written scads of functions in the 100 to 300 line range. And I’ve written functions that were 20 to 30 lines long. What this experience has taught me, through long trial and error, is that functions should be very small.

In the eighties we used to say that a function should be no bigger than a screen-full. Of course we said that at a time when VT100 screens were 24 lines by 80 columns, and our editors used 4 lines for administrative purposes. Nowadays with a cranked-down font and a nice big monitor, you can fit 150 characters on a line and a 100 lines or more on a screen. Lines should not be 150 characters long. Functions should not be 100 lines long. Functions should hardly ever be 20 lines long.

This implies that the blocks within if statements, else statements, while statements, and so on should be one line long. Probably that line should be a function call. Not only does this keep the enclosing function small, but it also adds documentary value because the function called within the block can have a nicely descriptive name.

>FUNCTIONS SHOULD DO ONE THING. THEY SHOULD DO IT WELL. THEY SHOULD DO IT ONLY.

The problem with this statement is that it is hard to know what “one thing” is. Does Listing 3-3 do one thing? It’s easy to make the case that it’s doing three things:

1. Determining whether the page is a test page.
2. If so, including setups and teardowns.
3. Rendering the page in HTML.

So which is it? Is the function doing one thing or three things? Notice that the three steps of the function are one level of abstraction below the stated name of the function. We can describe the function by describing it as a brief TO4 paragraph:

>TO RenderPageWithSetupsAndTeardowns, we check to see whether the page is a test page and if so, we include the setups and teardowns. In either case we render the page in HTML.

After all, the reason we write functions is to decompose a larger concept (in other words, the name of the function) into a set of steps at the next level of abstraction.

#### Reading Code from Top to Bottom: The Stepdown Rule

We want the code to read like a top-down narrative.5 We want every function to be fol- lowed by those at the next level of abstraction so that we can read the program, descending one level of abstraction at a time as we read down the list of functions. I call this The Step- down Rule.

To say this differently, we want to be able to read the program as though it were a set of TO paragraphs, each of which is describing the current level of abstraction and refer- encing subsequent TO paragraphs at the next level down.

#### Switch Statements

The solution to this problem (see Listing 3-5) is to bury the switch statement in the basement of an ABSTRACT FACTORY,9 and never let anyone see it. The factory will use the switch statement to create appropriate instances of the derivatives of Employee, and the var- ious functions, such as calculatePay, isPayday, and deliverPay, will be dispatched poly- morphically through the Employee interface.

My general rule for switch statements is that they can be tolerated if they appear only once, are used to create polymorphic objects, and are hidden behind an inheritance relationship so that the rest of the system can’t see them.

	public abstract class Employee {
		public abstract boolean isPayday();
		public abstract Money calculatePay();
		public abstract void deliverPay(Money pay);
	}

	public interface EmployeeFactory {
	public Employee makeEmployee(EmployeeRecord r) throws InvalidEmployeeType; }

	public class EmployeeFactoryImpl implements EmployeeFactory {
		public Employee makeEmployee(EmployeeRecord r) throws InvalidEmployeeType {
			switch (r.type) {
				case COMMISSIONED:
					return new CommissionedEmployee(r) ;
				case HOURLY:
					return new HourlyEmployee(r);
				case SALARIED:
					return new SalariedEmploye(r);
				default:
					throw new InvalidEmployeeType(r.type);
			} 
		}
	}

#### Use Descriptive Names

It is hard to overestimate the value of good names. Remember Ward’s principle: “You know you are working on clean code when each routine turns out to be pretty much what you expected.” Half the battle to achieving that principle is choosing good names for small functions that do one thing. The smaller and more focused a function is, the easier it is to choose a descriptive name.

Don’t be afraid to make a name long. A long descriptive name is better than a short enigmatic name. A long descriptive name is better than a long descriptive comment. Use a naming convention that allows multiple words to be easily read in the function names, and then make use of those multiple words to give the function a name that says what it does.

#### Function Arguments

The ideal number of arguments for a function is zero (niladic). Next comes one (monadic), followed closely by two (dyadic). Three arguments (triadic) should be avoided where possible. More than three (polyadic) requires very special justification—and then shouldn’t be used anyway.

Arguments are hard. They take a lot of conceptual power.When you are reading the story told by the module, includeSetupPage() is easier to understand than includeSetupPageInto(newPageContent). The argument is at a different level of abstraction than the function name and forces you to know a detail (in other words, StringBuffer) that isn’t particularly important at that point.

Arguments are even harder from a testing point of view. Imagine the difficulty of writing all the test cases to ensure that all the various combinations of arguments work properly. If there are no arguments, this is trivial. If there’s one argument, it’s not too hard. With two arguments the problem gets a bit more challenging. With more than two argu- ments, testing every combination of appropriate values can be daunting.

Output arguments are harder to understand than input arguments. When we read a function, we are used to the idea of information going in to the function through arguments and out through the return value. We don’t usually expect information to be going out through the arguments. So output arguments often cause us to do a double-take.

#### Common Monadic Forms

2 Reasons:

- Asking a question: `boolean fileExists("myFile")`.
- Operating on that argument, transforming it into something else and returning it. Ex: `InputStream fileOpen("MyFile")` transforms a file name `String` into an `InputStream` return value. 

Choose names that make the distinction clear, and always use the two forms in a consistent context.

Try to avoid any monadic functions that don’t follow these forms, for example, `void includeSetupPageInto(StringBuffer pageText)`. Using an output argument instead of a return value for a transformation is confusing. If a function is going to transform its input argument, the transformation should appear as the return value. Indeed, `StringBuffer transform(StringBuffer in)` is better than `void transform-(StringBuffer out)`, even if the implementation in the first case simply returns the input argument. At least it still follows the form of a transformation.

Flags are ugly. Passing a boolean into a function is a truly terrible practice. __It immediately complicates the signature of the method, loudly proclaiming that this function does more than one thing. It does one thing if the flag is true and another if the flag is false!__

Split `render(boolean isSuite)` into `renderForSuite()` and `renderForSingleTest()`.

#### Dyadic Functions

`writeField(name)` is easier to understand than `writeField(output-Stream, name)`. 

Though the meaning of both is clear, the first glides past the eye, easily depositing its meaning. The second requires a short pause until we learn to ignore the first parameter. And that, of course, eventually results in problems because we should never ignore any part of code. The parts we ignore are where the bugs will hide.

Cartesian points (`Point p = new Point(0,0)`) are perfectly reasonable, because they are ordered components of a single value, whereas `output-Stream` and `name` have neither a natural cohesion, nore a natural ordering.

Even obvious dyadic functions like `assertEquals(expected, actual)` are problematic. How many times have you put the actual where the expected should be? The two argu- ments have no natural ordering. The expected,actual ordering is a convention that requires practice to learn.

#### Triads

Functions that take three arguments are significantly harder to understand than dyads. The issues of ordering, pausing, and ignoring are more than doubled. I suggest you think very carefully before creating a triad.

For example, consider the common overload of assertEquals that takes three argu- ments: assertEquals(message, expected, actual). How many times have you read the message and thought it was the expected? I have stumbled and paused over that particular triad many times. In fact, every time I see it, I do a double-take and then learn to ignore the message.

#### Argument Objects

When a function seems to need more than two or three arguments, it is likely that some of those arguments ought to be wrapped into a class of their own. Consider, for example, the difference between the two following declarations:

	Circle makeCircle(double x, double y, double radius);
	Circle makeCircle(Point center, double radius);

Reducing the number of arguments by creating objects out of them may seem like cheating, but it’s not. When groups of variables are passed together, the way x and y are in the example above, they are likely part of a concept that deserves a name of its own.

#### Verbs and Keywords

For example, write(name) is very evocative. Whatever this “name” thing is, it is being “written.” An even better name might be writeField(name), which tells us that the “name” thing is a “field.”

This last is an example of the keyword form of a function name. Using this form we encode the names of the arguments into the function name. For example, assertEquals might be better written as assertExpectedEqualsActual(expected, actual). This strongly mitigates the problem of having to remember the ordering of the arguments.

#### Have No Side Effects

Side effects are lies. Your function promises to do one thing, but it also does other hidden things. Sometimes it will make unexpected changes to the variables of its own class. Sometimes it will make them to the parameters passed into the function or to system glo- bals. In either case they are devious and damaging mistruths that often result in strange temporal couplings and order dependencies.

The `checkPassword` function, by its name, says that it checks the password. The name does not imply that it initial- izes the session. So a caller who believes what the name of the function says runs the risk of erasing the existing session data when he or she decides to check the validity of the user.

This side effect creates a temporal coupling. That is, checkPassword can only be called at certain times (in other words, when it is safe to initialize the session). If it is called out of order, session data may be inadvertently lost. Temporal couplings are con- fusing, especially when hidden as a side effect. If you must have a temporal coupling, you should make it clear in the name of the function. In this case we might rename the function checkPasswordAndInitializeSession, though that certainly violates “Do one thing.”

#### Output Arguments

Arguments are most naturally interpreted as inputs to a function. If you have been pro- gramming for more than a few years, I’m sure you’ve done a double-take on an argument that was actually an output rather than an input. For example:

	appendFooter(s);

Does this function append s as the footer to something? Or does it append some footer to s? Is s an input or an output? It doesn’t take long to look at the function signature and see:

	public void appendFooter(StringBuffer report)

In the days before object oriented programming it was sometimes necessary to have output arguments. However, much of the need for output arguments disappears in OO lan- guages because this is intended to act as an output argument. In other words, it would be better for appendFooter to be invoked as

	report.appendFooter();

In general output arguments should be avoided. If your function must change the state of something, have it change the state of its owning object.

#### Command Query Separation

__Functions should either do something or answer something, but not both. Either your function should change the state of an object, or it should return some information about that object. Doing both often leads to confusion.__

	public boolean set(String attribute, String value);

This function sets the value of a named attribute and returns true if it is successful and false if no such attribute exists. This leads to odd statements like this:

	if (set("username", "unclebob"))

Imagine this from the point of view of the reader. What does it mean? Is it asking whether the “username” attribute was previously set to “unclebob”? Or is it asking whether the “username” attribute was successfully set to “unclebob”? It’s hard to infer the meaning from the call because it’s not clear whether the word “set” is a verb or an adjective.

The author intended set to be a verb, but in the context of the if statement it feels like an adjective. So the statement reads as “If the username attribute was previously set to unclebob” and not “set the username attribute to unclebob and if that worked then. . . .” We could try to resolve this by renaming the set function to setAndCheckIfExists, but that doesn’t much help the readability of the if statement. The real solution is to separate the command from the query so that the ambiguity cannot occur.

	if (attributeExists("username")) { 
		setAttribute("username", "unclebob");
	}

#### Prefer Exceptions to Returning Error Codes

Returning error codes from command functions is a subtle violation of command query separation. It promotes commands being used as expressions in the predicates of if state- ments.

	if (deletePage(page) == E_OK)

On the other hand, if you use exceptions instead of returned error codes, then the error processing code can be separated from the happy path code and can be simplified:

	try {
		deletePage(page);
		registry.deleteReference(page.name);
		configKeys.deleteKey(page.name.makeKey());
	}
	catch (Exception e) {
		logger.log(e.getMessage()); 
	}

#### Extract Try/Catch Blocks

	public void delete(Page page) { 
		try {
			deletePageAndAllReferences(page); 
		}
		catch (Exception e) { 
			logError(e);
		} 
	}

	private void deletePageAndAllReferences(Page page) throws Exception {
		deletePage(page);
		registry.deleteReference(page.name);
		configKeys.deleteKey(page.name.makeKey());
	}

	private void logError(Exception e) {
		logger.log(e.getMessage());
	}

- `delete`: Error processing.
- `deletePageAndAllReferences`: All about the processes of fully deleting a page.
- `logError`: E di yun.

Functions should do one thing. Error handing is one thing. __Thus, a function that handles errors should do nothing else.__ This implies (as in the example above) that if the keyword try exists in a function, it should be the very first word in the function and that there should be nothing after the catch/finally blocks.

#### The Error.java Dependency Magnet

	public enum Error {
		OK,
		INVALID,
		NO_SUCH,
		LOCKED,
		OUT_OF_RESOURCES,
		WAITING_FOR_EVENT;
	}

Classes like this are a dependency magnet; many other classes must import and use them. Thus, when the Error enum changes, all those other classes need to be recompiled and redeployed.

When you use exceptions rather than error codes, then new exceptions are derivatives of the exception class. They can be added without forcing any recompilation or redeployment.

#### Don’t Repeat Yourself

Duplication may be the root of all evil in software. Many principles and practices have been created for the purpose of controlling or eliminating it. Consider, for example, that all of Codd’s database normal forms serve to eliminate duplication in data. Consider also how object-oriented programming serves to concentrate code into base classes that would otherwise be redundant. Structured programming, Aspect Oriented Programming, Compo- nent Oriented Programming, are all, in part, strategies for eliminating duplication. It would appear that since the invention of the subroutine, innovations in software develop- ment have been an ongoing attempt to eliminate duplication from our source code.

#### Structured Programming

Dijkstra said that every function, and every block within a function, should have one entry and one exit. Following these rules means that there should only be one return statement in a func- tion, no break or continue statements in a loop, and never, ever, any goto statements.

While we are sympathetic to the goals and disciplines of structured programming, those rules serve little benefit when functions are very small. It is only in larger functions that such rules provide significant benefit.

So if you keep your functions small, then the occasional multiple return, break, or continue statement does no harm and can sometimes even be more expressive than the sin- gle-entry, single-exit rule. On the other hand, goto only makes sense in large functions, so it should be avoided.

#### How Do You Write Functions Like This?

When I write functions, they come out long and complicated. They have lots of indenting and nested loops. They have long argument lists. The names are arbitrary, and there is duplicated code. But I also have a suite of unit tests that cover every one of those clumsy lines of code.

In the end, I wind up with functions that follow the rules I’ve laid down in this chapter. I don’t write them that way to start. I don’t think anyone could.

#### Conclusion

Every system is built from a domain-specific language designed by the programmers to describe that system. Functions are the verbs of that language, and classes are the nouns. This is not some throwback to the hideous old notion that the nouns and verbs in a require- ments document are the first guess of the classes and functions of a system. Rather, this is a much older truth. The art of programming is, and has always been, the art of language design.

Master programmers think of systems as stories to be told rather than programs to be written. They use the facilities of their chosen programming language to construct a much richer and more expressive language that can be used to tell that story. Part of that domain-specific language is the hierarchy of functions that describe all the actions that take place within that system. In an artful act of recursion those actions are written to use the very domain-specific language they define to tell their own small part of the story.

This chapter has been about the mechanics of writing functions well. If you follow the rules herein, your functions will be short, well named, and nicely organized. But never forget that your real goal is to tell the story of the system, and that the functions you write need to fit cleanly together into a clear and precise language to help you with that telling.



































