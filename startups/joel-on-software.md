## Things You Should Never Do, Part I
[Link](http://www.joelonsoftware.com/articles/fog0000000069.html)

Netscape 6.0 made the single worst strategic mistake that any software company can make:

__They decided to rewrite the code from scratch.__

We're programmers. Programmers are, in their hearts, architects, and the first thing they want to do when they get to a site is to bulldoze the place flat and build something grand. We're not excited by incremental renovation: tinkering, improving, planting flower beds.

There's a subtle reason that programmers always want to throw away the code and start over. The reason is that they think the old code is a mess. And here is the interesting observation: they are probably wrong. The reason that they think the old code is a mess is because of a cardinal, fundamental law of programming:

__It’s harder to read code than to write it.__

This is why code reuse is so hard. This is why everybody on your team has a different function they like to use for splitting strings into arrays of strings. They write their own function because it's easier and more fun than figuring out how the old function works.

__The idea that new code is better than old is patently absurd. Old code has been used. It has been tested. Lots of bugs have been found, and they've been fixed. There's nothing wrong with it.__ It doesn't acquire bugs just by sitting around on your hard drive. Au contraire, baby! Is software supposed to be like an old Dodge Dart, that rusts just sitting in the garage? Is software like a teddy bear that's kind of gross if it's not made out of all new material?

Back to that two page function. Yes, I know, it's just a simple function to display a window, but it has grown little hairs and stuff on it and nobody knows why. Well, I'll tell you why: those are bug fixes. One of them fixes that bug that Nancy had when she tried to install the thing on a computer that didn't have Internet Explorer. Another one fixes that bug that occurs in low memory conditions. Another one fixes that bug that occurred when the file is on a floppy disk and the user yanks out the disk in the middle. That LoadLibrary call is ugly but it makes the code work on old versions of Windows 95.

Each of these bugs took weeks of real-world usage before they were found. The programmer might have spent a couple of days reproducing the bug in the lab and fixing it. If it's like a lot of bugs, the fix might be one line of code, or it might even be a couple of characters, but a lot of work and time went into those two characters.

When you throw away code and start from scratch, you are throwing away all that knowledge. All those collected bug fixes. Years of programming work.

You are throwing away your market leadership. You are giving a gift of two or three years to your competitors, and believe me, that is a long time in software years.

You are putting yourself in an extremely dangerous position where you will be shipping an old version of the code for several years, completely unable to make any strategic changes or react to new features that the market demands, because you don't have shippable code. You might as well just close for business for the duration.

You are wasting an outlandish amount of money writing code that already exists.

Is there an alternative? The consensus seems to be that the old Netscape code base was really bad. Well, it might have been bad, but, you know what? It worked pretty darn well on an awful lot of real world computer systems.

When programmers say that their code is a holy mess (as they always do), there are three kinds of things that are wrong with it.

First, there are architectural problems. The code is not factored correctly. The networking code is popping up its own dialog boxes from the middle of nowhere; this should have been handled in the UI code. These problems can be solved, one at a time, by carefully moving code, refactoring, changing interfaces. They can be done by one programmer working carefully and checking in his changes all at once, so that nobody else is disrupted. Even fairly major architectural changes can be done without throwing away the code. On the Juno project we spent several months rearchitecting at one point: just moving things around, cleaning them up, creating base classes that made sense, and creating sharp interfaces between the modules. But we did it carefully, with our existing code base, and we didn't introduce new bugs or throw away working code.

A second reason programmers think that their code is a mess is that it is inefficient. The rendering code in Netscape was rumored to be slow. But this only affects a small part of the project, which you can optimize or even rewrite. You don't have to rewrite the whole thing. When optimizing for speed, 1% of the work gets you 99% of the bang.

Third, the code may be doggone ugly. One project I worked on actually had a data type called a `FuckedString`. Another project had started out using the convention of starting member variables with an underscore, but later switched to the more standard "`m_`". So half the functions started with "`_`" and half with "`m_`", which looked ugly. Frankly, this is the kind of thing you solve in five minutes with a macro in Emacs, not by starting from scratch.

It's important to remember that when you start from scratch there is absolutely no reason to believe that you are going to do a better job than you did the first time. First of all, you probably don't even have the same programming team that worked on version one, so you don't actually have "more experience". You're just going to make most of the old mistakes again, and introduce some new problems that weren't in the original version.

The old mantra build one to throw away is dangerous when applied to large scale commercial applications. If you are writing code experimentally, you may want to rip up the function you wrote last week when you think of a better algorithm. That's fine. You may want to refactor a class to make it easier to use. That's fine, too. But throwing away the whole program is a dangerous folly, and if Netscape actually had some adult supervision with software industry experience, they might not have shot themselves in the foot so badly.

## The Law of Leaky Abstractions
[Link](http://www.joelonsoftware.com/articles/fog0000000069.html)

It is what computer scientists like to call an abstraction: a simplification of something much more complicated that is going on under the covers. As it turns out, a lot of computer programming consists of building abstractions. What is a string library? It's a way to pretend that computers can manipulate strings just as easily as they can manipulate numbers. What is a file system? It's a way to pretend that a hard drive isn't really a bunch of spinning magnetic platters that can store bits at certain locations, but rather a hierarchical system of folders-within-folders containing individual files that in turn consist of one or more strings of bytes.

I said that TCP guarantees that your message will arrive. It doesn't, actually. If your pet snake has chewed through the network cable leading to your computer, and no IP packets can get through, then TCP can't do anything about it and your message doesn't arrive. If you were curt with the system administrators in your company and they punished you by plugging you into an overloaded hub, only some of your IP packets will get through, and TCP will work, but everything will be really slow.

This is what I call a leaky abstraction. TCP attempts to provide a complete abstraction of an underlying unreliable network, but sometimes, the network leaks through the abstraction and you feel the things that the abstraction can't quite protect you from. This is but one example of what I've dubbed the Law of Leaky Abstractions:

#### __All non-trivial abstractions, to some degree, are leaky.__

Abstractions fail. Sometimes a little, sometimes a lot. There's leakage. Things go wrong. It happens all over the place when you have abstractions. 

#### Examples:
- Something as simple as iterating over a large two-dimensional array can have radically different performance if you do it horizontally rather than vertically, depending on the "grain of the wood" -- one direction may result in vastly more page faults than the other direction, and page faults are slow. 
- The SQL language is meant to abstract away the procedural steps that are needed to query a database, instead allowing you to define merely what you want and let the database figure out the procedural steps to query it. __But in some cases, certain SQL queries are thousands of times slower than other logically equivalent queries.__ A famous example of this is that some SQL servers are dramatically faster if you specify "where a=b and b=c and a=c" than if you only specify "where a=b and b=c" even though the result set is the same. You're not supposed to have to care about the procedure, only the specification. But sometimes the abstraction leaks and causes horrible performance and you have to break out the query plan analyzer and study what it did wrong, and figure out how to make your query run faster.
- __Even though network libraries like NFS and SMB let you treat files on remote machines "as if" they were local, sometimes the connection becomes very slow or goes down, and the file stops acting like it was local, and as a programmer you have to write code to deal with this.__ The abstraction of "remote file is the same as local file" leaks. Here's a concrete example for Unix sysadmins. If you put users' home directories on NFS-mounted drives (one abstraction), and your users create .forward files to forward all their email somewhere else (another abstraction), and the NFS server goes down while new email is arriving, the messages will not be forwarded because the .forward file will not be found. The leak in the abstraction actually caused a few messages to be dropped on the floor.
- C++ string classes are supposed to let you pretend that strings are first-class data. They try to abstract away the fact that strings are hard and let you act as if they were as easy as integers. Almost all C++ string classes overload the + operator so you can write s + "bar" to concatenate. But you know what? __No matter how hard they try, there is no C++ string class on Earth that will let you type "foo" + "bar", because string literals in C++ are always char*'s, never strings.__ The abstraction has sprung a leak that the language doesn't let you plug.

__One reason the law of leaky abstractions is problematic is that it means that abstractions do not really simplify our lives as much as they were meant to.__ When I'm training someone to be a C++ programmer, it would be nice if I never had to teach them about `char*`'s and pointer arithmetic. It would be nice if I could go straight to STL strings. But one day they'll write the code "foo" + "bar", and truly bizarre things will happen, and then I'll have to stop and teach them all about `char*`'s anyway. Or one day they'll be trying to call a Windows API function that is documented as having an OUT LPTSTR argument and they won't be able to understand how to call it until they learn about char*'s, and pointers, and Unicode, and wchar_t's, and the TCHAR header files, and all that stuff that leaks up.

__The law of leaky abstractions means that whenever somebody comes up with a wizzy new code-generation tool that is supposed to make us all ever-so-efficient, you hear a lot of people saying "learn how to do it manually first, then use the wizzy tool to save time." Code generation tools which pretend to abstract out something, like all abstractions, leak, and the only way to deal with the leaks competently is to learn about how the abstractions work and what they are abstracting. So the abstractions save us time working, but they don't save us time learning.__

And all this means that paradoxically, even as we have higher and higher level programming tools with better and better abstractions, becoming a proficient programmer is getting harder and harder.

Indeed, the abstractions we've created over the years do allow us to deal with new orders of complexity in software development that we didn't have to deal with ten or fifteen years ago, like GUI programming and network programming. And while these great tools, like modern OO forms-based languages, let us get a lot of work done incredibly quickly, suddenly one day we need to figure out a problem where the abstraction leaked, and it takes 2 weeks. And when you need to hire a programmer to do mostly VB programming, it's not good enough to hire a VB programmer, because they will get completely stuck in tar every time the VB abstraction leaks.

The Law of Leaky Abstractions is dragging us down.

## The Joel Test: 12 Steps to Better Code
[Link](http://www.joelonsoftware.com/articles/fog0000000043.html)

1. __Do you use source control?__
2. __Can you make a build in one step?__ More steps = more errors
3. __Do you make daily builds?__ Breaking builds are so common that we want a pre-build always, so you can fix it anyway.
4. __Do you have a bug database?__ A minimal useful bug database must include the following data for every bug:

	- complete steps to reproduce the bug
	- expected behavior
	- observed (buggy) behavior
	- who it's assigned to
	- whether it has been fixed or not

5. __Do you fix bugs before writing new code?__ Easier to fix bugs that you just got than a few months down the line. Also better for fighting competition.
6. __Do you have an up-to-date schedule?__
7. __Do you have a spec?__ Code with no spec behind it usually sucks.
8. __Do programmers have quiet working conditions?__ It's ridiculously easy to break flow in a programmer.
9. __Do you use the best tools money can buy?__ Long compile time = distractions. Small monitor = sucks for debugging GUI code. Image manipulation program needed for modifying pix etc.
10. __Do you have testers?__ Testers are too cheap to skimp on.
11. __Do new candidates write code during their interview?__
12. __Do you do hallway usability testing?__