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

## Comments

Comments are not like Schindler’s List. They are not “pure good.” Indeed, comments are, at best, a necessary evil. If our programming languages were expressive enough, or if we had the talent to subtly wield those languages to express our intent, we would not need
comments very much—perhaps not at all.

he proper use of comments is to compensate for our failure to express ourself in code. Note that I used the word failure. I meant it. Comments are always failures. We must have them because we cannot always figure out how to express ourselves without them, but their use is not a cause for celebration.

So when you find yourself in a position where you need to write a comment, think it through and see whether there isn’t some way to turn the tables and express yourself in code. Every time you express yourself in code, you should pat yourself on the back. Every time you write a comment, you should grimace and feel the failure of your ability of expression.

Inaccurate comments are far worse than no comments at all. They delude and mislead. They set expectations that will never be fulfilled. They lay down old rules that need not, or should not, be followed any longer.

Truth can only be found in one place: the code. Only the code can truly tell you what it does. It is the only source of truly accurate information. Therefore, though comments are sometimes necessary, we will expend significant energy to minimize them.

Clear and expressive code with few comments is far superior to cluttered and complex code with lots of comments. Rather than spend your time writing the comments that explain the mess you’ve made, spend it cleaning that mess.

	// Check to see if the employee is eligible for full benefits
	if ((employee.flags & HOURLY_FLAG) && (employee.age > 65))

or

	if (employee.isEligibleForFullBenefits())

It takes only a few seconds of thought to explain most of your intent in code. In many cases it’s simply a matter of creating a function that says the same thing as the comment you want to write.

#### Good Comments

- Legal Comments (Copyright)
- Informative Comments 

		// Returns an instance of the Responder being tested.
		protected abstract Responder responderInstance();

	Better to just use a good function name here.

		// format matched kk:mm:ss EEE, MMM dd, yyyy 
		Pattern timeMatcher = Pattern.compile(
		"\\d*:\\d*:\\d* \\w*, \\w* \\d*, \\d*");

	In this case the comment lets us know that the regular expression is intended to match a time and date that were formatted with the SimpleDateFormat.format function using the specified format string. Still, it might have been better, and clearer, if this code had been moved to a special class that converted the formats of dates and times. Then the comment would likely have been superfluous.

- Explanation of Intent
- Warning of Consequences: `# bla bla is not thread safe...`
- TODO Comments

#### Bad Comments

- Mumbling: If you decide to write a comment, then spend the time necessary to make sure it is the best comment you can write. 
- Redundant Comments
- Mandated Comments: It is just plain silly to have a rule that says that every function must have a javadoc, or every variable must have a comment. Comments like this just clutter up the code, propa- gate lies, and lend to general confusion and disorganization.
- Journal Comments
- Noise Comments: `Default constructor`, `The day of the month`, 

Don’t Use a Comment When You Can Use a Function or a Variable.

Closing Brace Comments: Sometimes programmers will put special comments on closing braces. Although this might make sense for long functions with deeply nested structures, it serves only to clutter the kind of small and encapsulated functions that we prefer. So if you find yourself wanting to mark your closing braces, try to shorten your functions instead.

Commented-out code: We have source control to remember this shit.

HTML Comments: Suck ass.

Nonlocal Information: If you must write a comment, then make sure it describes the code it appears near. Don’t offer systemwide information in the context of a local comment.

Inobvious Connection: The connection between a comment and the code it describes should be obvious. If you are going to the trouble to write a comment, then at least you’d like the reader to be able to look at the comment and the code and understand what the comment is talking about.

	/*
	* start with an array that is big enough to hold all the pixels * (plus filter bytes), and an extra 200 bytes for header info */
	this.pngBytes = new byte[((this.width + 1) * this.height * 3) + 200];

What is a filter byte? Does it relate to the +1? Or to the *3? Both? Is a pixel a byte? Why 200? The purpose of a comment is to explain code that does not explain itself.

Function Headers: Short functions don’t need much description. A well-chosen name for a small function that does one thing is usually better than a comment header.

#### Ugly Code for a Prime Generator

	/**
	* This class Generates prime numbers up to a user specified
	* maximum. The algorithm used is the Sieve of Eratosthenes.
	* <p>
	* Eratosthenes of Cyrene, b. c. 276 BC, Cyrene, Libya --
	* d. c. 194, Alexandria. The first man to calculate the
	* circumference of the Earth. Also known for working on
	* calendars with leap years and ran the library at Alexandria.
	* <p>
	* The algorithm is quite simple. Given an array of integers
	* starting at 2. Cross out all multiples of 2. Find the next
	* uncrossed integer, and cross out all of its multiples.
	* Repeat untilyou have passed the square root of the maximum
	* value. *
	* @author Alphonse
	* @version 13 Feb 2002 atp */

	import java.util.*;

	public class GeneratePrimes {
	/**
	* @param maxValue is the generation limit. */

	public static int[] generatePrimes(int maxValue) {
		if (maxValue >= 2) // the only valid case {
			// declarations
			int s = maxValue + 1; // size of array boolean[] f = new boolean[s];
			int i;

			// initialize array to true. for (i = 0; i < s; i++)
			f[i] = true;

			// get rid of known non-primes 
			f[0] = f[1] = false;

			// sieve
			int j;
			for (i = 2; i < Math.sqrt(s) + 1; i++) {
				if (f[i]) // if i is uncrossed, cross its multiples.{
					for (j = 2 * i; j < s; j += i)
						f[j] = false; // multiple is not prime
				} 
			}

			// how many primes are there? int count = 0;
			for (i = 0; i < s; i++) {
				if (f[i])
				count++; // bump count.
			}

			int[] primes = new int[count];

			// move the primes into the result
			for (i = 0, j = 0; i < s; i++){
				if (f[i]) 
					primes[j++] = i;
			}

			// if prime
			return primes; // return the primes 
			}
			else // maxValue < 2
			return new int[0]; // return null array if bad input.
		} 
	}

#### Refactored Version

	/**
	 * This class Generates prime numbers up to a user specified
	 * maximum. The algorithm used is the Sieve of Eratosthenes. 
	 * Given an array of integers starting at 2:
	 * Find the first uncrossed integer, and cross out all its
	 * multiples. Repeat until there are no more multiples 
	 * in the array.
	 */

 	public class PrimeGenerator {
		private static boolean[] crossedOut;
		private static int[] result;

		public static int[] generatePrimes(int maxValue) {
			if (maxValue < 2)
				return new int[0];
			else {
				uncrossIntegersUpTo(maxValue); 
				crossOutMultiples(); 
				putUncrossedIntegersIntoResult(); 
				return result;
			}
	 	}

	 	private static void uncrossIntegersUpTo(int maxValue) {
			crossedOut = new boolean[maxValue + 1];
			for (int i = 2; i < crossedOut.length; i++)
				crossedOut[i] = false; 
		}

		private static void crossOutMultiples() {
			int limit = determineIterationLimit(); 
			for (int i = 2; i <= limit; i++)
				if (notCrossed(i))
					crossOutMultiplesOf(i);
		}

		private static int determineIterationLimit() {
			// Every multiple in the array has a prime factor that 
			// is less than or equal to the root of the array size, 
			// so we don't have to cross out multiples of numbers 
			// larger than that root.
			double iterationLimit = Math.sqrt(crossedOut.length);
			return (int) iterationLimit; 
		}

		private static void crossOutMultiplesOf(int i) {
			for (int multiple = 2*i; multiple < crossedOut.length; multiple += i)
				crossedOut[multiple] = true; 
		}

		private static boolean notCrossed(int i) {
			return crossedOut[i] == false; 
		}

		private static void putUncrossedIntegersIntoResult() {
			result = new int[numberOfUncrossedIntegers()];
				for (int j = 0, i = 2; i < crossedOut.length; i++)
					if (notCrossed(i))
						result[j++] = i;
		}

		private static int numberOfUncrossedIntegers() {
			int count = 0;
			for (int i = 2; i < crossedOut.length; i++)
				if (notCrossed(i)) 
					count++;
			
			return count; 
		}
	}

## Formatting

First of all, let’s be clear. Code formatting is important. It is too important to ignore and it is too important to treat religiously. Code formatting is about communication, and communication is the professional developer’s first order of business.

Perhaps you thought that “getting it working” was the first order of business for a professional developer. I hope by now, however, that this book has disabused you of that idea. The functionality that you create today has a good chance of changing in the next release, but the readability of your code will have a profound effect on all the changes that will ever be made. The coding style and readability set precedents that continue to affect maintainability and extensibility long after the original code has been changed beyond recognition. Your style and discipline survives, even though your code does not.

#### Vertical Formatting

How big are most Java source files? It turns out that there is a huge range of sizes and some remarkable differences in style. So the average file size in the FitNesse project is about 65 lines, and about one-third of the files are between 40 and 100+ lines. The largest file in FitNesse is about 400 lines and the smallest is 6 lines.

What does that mean to us? It appears to be possible to build significant systems (FitNesse is close to 50,000 lines) out of files that are typically 200 lines long, with an upper limit of 500. Although this should not be a hard and fast rule, it should be considered very desirable. Small files are usually easier to understand than large files are.

#### The Newspaper Metaphor

Think of a well-written newspaper article. You read it vertically. At the top you expect a headline that will tell you what the story is about and allows you to decide whether it is something you want to read. The first paragraph gives you a synopsis of the whole story, hiding all the details while giving you the broad-brush concepts. As you continue down- ward, the details increase until you have all the dates, names, quotes, claims, and other minutia.

We would like a source file to be like a newspaper article. The name should be simple but explanatory. The name, by itself, should be sufficient to tell us whether we are in the right module or not. The topmost parts of the source file should provide the high-level concepts and algorithms. Detail should increase as we move downward, until at the end we find the lowest level functions and details in the source file.

A newspaper is composed of many articles; most are very small. Some are a bit larger. Very few contain as much text as a page can hold. This makes the newspaper usable. If the newspaper were just one long story containing a disorganized agglomeration of facts, dates, and names, then we simply would not read it.

#### Variable Declarations

Variables should be declared as close to their usage as possi- ble. In rare cases a variable might be declared at the top of a block or just before a loop in a long-ish function. 

Instance variables, on the other hand, should be declared at the top of the class. This should not increase the vertical distance of these variables, because in a well-designed class, they are used by many, if not all, of the methods of the class.

Dependent Functions. If one function calls another, they should be vertically close, and the caller should be above the callee, if at all possible.

Vertical Ordering. In general we want function call dependencies to point in the downward direction. That is, a function that is called should be below a function that does the calling.2 This creates a nice flow down the source code module from high level to low level.

As in newspaper articles, we expect the most important concepts to come first, and we expect them to be expressed with the least amount of polluting detail. We expect the low-level details to come last.

#### Horizontal Formatting

Indeed, every size from 20 to 60 represents about 1 percent of the total number of lines. That’s 40 percent! Perhaps another 30 percent are less than 10 characters wide. Remember this is a log scale, so the linear appearance of the drop-off above 80 char- acters is really very significant. Programmers clearly prefer short lines.

This suggests that we should strive to keep our lines short. The old Hollerith limit of 80 is a bit arbitrary, and I’m not opposed to lines edging out to 100 or even 120. But beyond that is probably just careless.

#### Indentation

A source file is a hierarchy rather like an outline. To make this hierarchy of scopes visible, we indent the lines of source code in pro- portion to their position in the hiearchy. Statements at the level of the file, such as most class declarations, are not indented at all. Methods within a class are indented one level to the right of the class. Implementations of those methods are implemented one level to the right of the method declaration. Block implementations are implemented one level to the right of their containing block, and so on.

Don't break the indentation for short `if`, `while`, or short functions, you probably put it back in anyway.

## Objects and Data Structures

#### Data Abstraction

> Concrete Point
	
	public class Point{
		public double x;
		public double y;
	}

> Abstract Point

	public interface Point {
		double getX();
		double getY();
		void setCartesian(double x, double y);
		double getR();
		double getTheta();
		double setPolar(double r, double theta);
	}

The beautiful thing about Listing 6-2 is that there is no way you can tell whether the implementation is in rectangular or polar coordinates. It might be neither! And yet the interface still unmistakably represents a data structure.

Listing 6-1, on the other hand, is very clearly implemented in rectangular coordinates, and it forces us to manipulate those coordinates independently. This exposes implementa- tion. Indeed, it would expose implementation even if the variables were private and we were using single variable getters and setters.

Hiding implementation is not just a matter of putting a layer of functions between the variables. Hiding implementation is about abstractions! A class does not simply push its variables out through getters and setters. Rather it exposes abstract interfaces that allow its users to manipulate the essence of the data, without having to know its implementation.

Consider Listing 6-3 and Listing 6-4. The first uses concrete terms to communicate the fuel level of a vehicle, whereas the second does so with the abstraction of percentage. In the concrete case you can be pretty sure that these are just accessors of variables. In the abstract case you have no clue at all about the form of the data.

> Concrete Vehicle

	public interface Vehicle {
		double getFuelTankCapacityInGallons(); 
		double getGallonsOfGasoline();
	}

> Abstract Vehicle

	public interface Vehicle {
		double getPercentFuelRemaining();
	}

In both of the above cases the second option is preferable. We do not want to expose the details of our data. Rather we want to express our data in abstract terms. This is not merely accomplished by using interfaces and/or getters and setters. Serious thought needs to be put into the best way to represent the data that an object contains. The worst option is to blithely add getters and setters.

#### Data/Object Anti-Symmetry

These two examples show the difference between objects and data structures. __Objects hide their data behind abstractions and expose functions that operate on that data. Data struc- ture expose their data and have no meaningful functions.__ Go back and read that again. Notice the complimentary nature of the two definitions. They are virtual opposites.

> Procedural code (code using data structures) makes it easy to add new functions without changing the existing data structures. OO code, on the other hand, makes it easy to add new classes without changing existing functions.

> Procedural code makes it hard to add new data structures because all the functions must change. OO code makes it hard to add new functions because all the classes must change.

In any complex system there are going to be times when we want to add new data types rather than new functions. For these cases objects and OO are most appropriate. On the other hand, there will also be times when we’ll want to add new functions as opposed to data types. In that case procedural code and data structures will be more appropriate.

Mature programmers know that the idea that everything is an object is a myth. Some- times you really do want simple data structures with procedures operating on them.

#### The Law of Demeter

There is a well-known heuristic called the Law of Demeter2 that says a module should not know about the innards of the objects it manipulates. As we saw in the last section, objects hide their data and expose operations. This means that an object should not expose its internal structure through accessors because to do so is to expose, rather than to hide, its internal structure.

More precisely, the Law of Demeter says that a method f of a class C should only call the methods of these:

- C
- An object created by f
- An object passed as an argument to f
- An object held in an instance variable of C

The method should not invoke methods on objects that are returned by any of the allowed functions. In other words, talk to friends, not to strangers.

The following code3 appears to violate the Law of Demeter (among other things) because it calls the getScratchDir() function on the return value of getOptions() and then calls getAbsolutePath() on the return value of getScratchDir().

	final String outputDir = ctxt.getOptions().getScratchDir().getAbsolutePath();

Chains of calls like this are generally considered to be sloppy style and should be avoided [G36]. It is usually best to split them up as follows:

	Options opts = ctxt.getOptions();
	File scratchDir = opts.getScratchDir();
	final String outputDir = scratchDir.getAbsolutePath();

Whether this is a violation of Demeter depends on whether or not ctxt, Options, and ScratchDir are objects or data structures. If they are objects, then their internal structure should be hidden rather than exposed, and so knowledge of their innards is a clear viola- tion of the Law of Demeter. On the other hand, if ctxt, Options, and ScratchDir are just data structures with no behavior, then they naturally expose their internal structure, and so Demeter does not apply.

This confusion sometimes leads to unfortunate hybrid structures that are half object and half data structure. They have functions that do significant things, and they also have either public variables or public accessors and mutators that, for all intents and purposes, make the private variables public, tempting other external functions to use those variables the way a procedural program would use a data structure.

[TODO]

## Error Handling

[TODO]

## Boundaries

## Unit Tests

## Classes

We like to keep our variables and utility functions private, but we’re not fanatic about it. Sometimes we need to make a variable or utility function protected so that it can be accessed by a test. For us, tests rule. If a test in the same package needs to call a function or access a variable, we’ll make it protected or package scope. However, we’ll first look for a way to maintain privacy. Loosening encapsulation is always a last resort.

The first rule of classes is that they should be small. The second rule of classes is that they should be smaller than that. With classes we use a different measure. We count responsibilities.

The name of a class should describe what responsibilities it fulfills. In fact, naming is probably the first way of helping determine class size. If we cannot derive a concise name for a class, then it’s likely too large. The more ambiguous the class name, the more likely it has too many responsibilities. For example, class names including weasel words like Processor or Manager or Super often hint at unfortunate aggregation of responsibilities.

We should also be able to write a brief description of the class in about 25 words, without using the words “if,” “and,” “or,” or “but.” How would we describe the SuperDashboard? “The SuperDashboard provides access to the component that last held the focus, and it also allows us to track the version and build numbers.” The first “and” is a hint that SuperDashboard has too many responsibilities.

#### The Single Responsibility Principle

The Single Responsibility Principle (SRP)2 states that a class or module should have one, and only one, reason to change. This principle gives us both a definition of responsibility, and a guidelines for class size. Classes should have one responsibility—one reason to change.

The seemingly small SuperDashboard class in Listing 10-2 has two reasons to change. First, it tracks version information that would seemingly need to be updated every time the software gets shipped. Second, it manages Java Swing components (it is a derivative of JFrame, the Swing representation of a top-level GUI window). No doubt we’ll want to update the version number if we change any of the Swing code, but the converse isn’t nec- essarily true: We might change the version information based on changes to other code in the system.

Trying to identify responsibilities (reasons to change) often helps us recognize and create better abstractions in our code. We can easily extract all three SuperDashboard methods that deal with version information into a separate class named Version.

	public class Version {
		public int getMajorVersionNumber() 
		public int getMinorVersionNumber() 
		public int getBuildNumber()
	}

The problem is that too many of us think that we are done once the program works. We fail to switch to the other concern of organization and cleanliness. We move on to the next problem rather than going back and breaking the overstuffed classes into decoupled units with single responsibilities.

At the same time, many developers fear that a large number of small, single-purpose classes makes it more difficult to understand the bigger picture. They are concerned that they must navigate from class to class in order to figure out how a larger piece of work gets accomplished.

#### Cohesion

Classes should have a small number of instance variables. Each of the methods of a class should manipulate one or more of those variables. In general the more variables a method manipulates the more cohesive that method is to its class. A class in which each variable is used by each method is maximally cohesive.

The strategy of keeping functions small and keeping parameter lists short can some- times lead to a proliferation of instance variables that are used by a subset of methods. When this happens, it almost always means that there is at least one other class trying to get out of the larger class. You should try to separate the variables and methods into two or more classes such that the new classes are more cohesive.

#### Maintaining Cohesion Results in Many Small Classes

Just the act of breaking large functions into smaller functions causes a proliferation of classes. Consider a large function with many variables declared within it. Let’s say you want to extract one small part of that function into a separate function. However, the code you want to extract uses four of the variables declared in the function. Must you pass all four of those variables into the new function as arguments?

Not at all! If we promoted those four variables to instance variables of the class, then we could extract the code without passing any variables at all. It would be easy to break the function up into small pieces.

Unfortunately, this also means that our classes lose cohesion because they accumulate more and more instance variables that exist solely to allow a few functions to share them. But wait! If there are a few functions that want to share certain variables, doesn’t that make them a class in their own right? Of course it does. When classes lose cohesion, split them!

So breaking a large function into many smaller functions often gives us the opportu- nity to split several smaller classes out as well. This gives our program a much better orga- nization and a more transparent structure.

(Code Sample)

Program is longer.

- Refactored program used longer, more descriptive variable names.
- The refactored program used function and class declarations as a way to add commentary to the code.
- Whitespace/formatting

Three Responsibilities

- Main program is contained in the PrimePrinter class all by itself. Its responsibility is to handle the execution environment. It will change if the method of invocation changes.
- `RowColumnPagePrinter` knows all about to format a list of numbers into pages with a certain number of rows and columns. If formatting is changed, then this is the class that would be affected.
- `PrimeGenerator` class knows how to generate a list of prime numbers. It is not be meant to be instantiated. It is just a useful scope in which its variables can be declared and kept hidden.

#### Organizing for Change

	abstract public class Sql {
		public Sql(String table, Column[] columns)
		abstract public String generate();
	}

	public class CreateSql extends Sql {
		public CreateSql(String table, Column[] columns) 
		@Override public String generate()
	}

	public class SelectSql extends Sql {
		public SelectSql(String table, Column[] columns) 
		@Override public String generate()
	}

	public class InsertSql extends Sql {
		public InsertSql(String table, Column[] columns, Object[] fields) 
		@Override public String generate()
		private String valuesList(Object[] fields, final Column[] columns)
	}

The code in each class becomes excruciatingly simple. Our required comprehension time to understand any class decreases to almost nothing. The risk that one function could break another becomes vanishingly small. From a test standpoint, it becomes an easier task to prove all bits of logic in this solution, as the classes are all isolated from one another.

Equally important, when it’s time to add the update statements, none of the existing classes need change! We code the logic to build update statements in a new subclass of Sql named UpdateSql. No other code in the system will break because of this change.

#### Isolating from Change

Dependencies upon concrete details create challenges for testing our system. If we’re building a Portfolio class and it depends upon an external TokyoStockExchange API to derive the portfolio’s value, our test cases are impacted by the volatility of such a lookup. It’s hard to write a test when we get a different answer every five minutes!

Instead of designing Portfolio so that it directly depends upon TokyoStockExchange, we create an interface, StockExchange, that declares a single method:

	public interface StockExchange { 
		Money currentPrice(String symbol);
	}

We design TokyoStockExchange to implement this interface. We also make sure that the constructor of Portfolio takes a StockExchange reference as an argument:

	public Portfolio {
		private StockExchange exchange;
		public Portfolio(StockExchange exchange) {
			this.exchange = exchange; 
		}
		...
	}

Now our test can create a testable implementation of the StockExchange interface that emulates the TokyoStockExchange. This test implementation will fix the current value for any symbol we use in testing. If our test demonstrates purchasing five shares of Microsoft for our portfolio, we code the test implementation to always return $100 per share of Microsoft. Our test implementation of the StockExchange interface reduces to a simple table lookup.

If a system is decoupled enough to be tested in this way, it will also be more flexible and promote more reuse. The lack of coupling means that the elements of our system are better isolated from each other and from change. This isolation makes it easier to under- stand each element of the system.

By minimizing coupling in this way, our classes adhere to another class design princi- ple known as the Dependency Inversion Principle (DIP).5 In essence, the DIP says that our classes should depend upon abstractions, not on concrete details.

__Instead of being dependent upon the implementation details of the TokyoStock- Exchange class, our Portfolio class is now dependent upon the StockExchange interface.__

## Systems

First, consider that construction is a very different process from use. 

_Software systems should separate the startup process, when the application objects are constructed and the dependencies are “wired” together, from the runtime logic that takes over after startup._

Unfortunately, most applications don’t separate this concern. The code for the startup process is ad hoc and it is mixed in with the runtime logic. Here is a typical example:

	public Service getService() { 
		if (service == null)
			service = new MyServiceImpl(...); // Good enough default for most cases?
		return service;
	}

This is the LAZY INITIALIZATION/EVALUATION idiom, and it has several merits. We don’t incur the overhead of construction unless we actually use the object, and our startup times can be faster as a result. We also ensure that null is never returned.

#### Factories

Sometimes, of course, we need to make the application responsible for when an object gets created. For example, in an order processing system the application must create the LineItem instances to add to an Order. In this case we can use the ABSTRACT FACTORY2 pattern to give the application control of when to build the LineItems, but keep the details of that construction separate from the application code.

#### Dependency Injection

In the context of dependency management, an object should not take responsibility for instantiating depen- dencies itself. Instead, it should pass this responsibility to another “authoritative” mecha- nism, thereby inverting the control. Because setup is a global concern, this authoritative mechanism will usually be either the “main” routine or a special-purpose container.

JNDI lookups are a “partial” implementation of DI, where an object asks a directory server to provide a “service” matching a particular name.

	MyService myService = (MyService)(jndiContext.lookup(“NameOfMyService”));

The invoking object doesn’t control what kind of object is actually returned (as long it implements the appropriate interface, of course), but the invoking object still actively resolves the dependency.

True Dependency Injection goes one step further. The class takes no direct steps to resolve its dependencies; it is completely passive. Instead, it provides setter methods or constructor arguments (or both) that are used to inject the dependencies.

#### Scaling Up

It is a myth that we can get systems “right the first time.” Instead, we should imple- ment only today’s stories, then refactor and expand the system to implement new stories tomorrow. This is the essence of iterative and incremental agility. Test-driven develop- ment, refactoring, and the clean code they produce make this work at the code level.

But what about at the system level? Doesn’t the system architecture require preplan- ning? Certainly, it can’t grow incrementally from simple to complex, can it?

> Software systems are unique compared to physical systems. Their architectures can grow incrementally, if we maintain the proper separation of concerns.

[TODO]

































