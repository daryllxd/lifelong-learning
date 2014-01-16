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
				flaggCells.add(cell);
		return flaggedCells; 
	}




























