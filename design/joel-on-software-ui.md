## [Controlling Your Environment Makes You Happy](http://www.joelonsoftware.com/uibook/chapters/fog0000000057.html)

I think most programmers' fear of UI programming comes from their fear of doing UI design. They think that UI design is like graphics design: the mysterious process by which creative, latte-drinking, all-dressed-in-black people with interesting piercings produce cool looking artistic stuff. Programmers see themselves as analytic, logical thinkers: strong at reasoning, weak on artistic judgment. So they think they can't do UI design.

So that's what days were like. A bunch of tiny frustrations, and a bunch of tiny successes. But they added up. Even something which seems like a tiny, inconsequential frustration affects your mood. Your emotions don't seem to care about the magnitude of the event, only the quality.

Years later, when I got to college, I learned about an important theory of psychology called Learned Helplessness, developed by Dr. Martin E. P. Seligman. This theory, backed up by years of research, is that a great deal of depression grows out of a feeling of helplessness: the feeling that you cannot control your environment.

The more you feel that you can control your environment, and that the things you do are actually working, the happier you are. When you find yourself frustrated, angry, and upset, it's probably because of something that happened that you could not control: even something small. The space bar on your keyboard is not working well. When you type, some of the words are stuck together. This gets frustrating, because you are pressing the space bar and nothing is happening. The key to your front door doesn't work very well. When you try to turn it, it sticks. Another tiny frustration. These things add up; these are the things that make us unhappy on a day-to-day basis. Even though they seem too petty to dwell on (I mean, there are people starving in Africa, for heaven's sake, I can't get upset about space bars), nonetheless they change our moods. 

Right, Pete. We know better. His feelings come despite the fact that the Macintosh really is quite easy to use -- for Mac users. It's totally arbitrary which key you press to close a window. The Microsoft programmers, who were, presumably, copying the Mac interface, probably thought that they were adding a cool new feature by letting you resize windows by dragging any edge. The MacOS 8.0 programmers probably thought they were adding a cool new feature when they let you move windows by dragging any edge.

The point is, does the UI respond to the user in the way in which the user expected it to respond? If it didn't, the user is going to feel helpless and out of control, the same way I felt when the wheels of the dough bathtub didn't turn the way I pushed them, and I bumped into a wall. Bonk.

UI is important because it affects the feelings, the emotions, and the mood of your users. If the UI is wrong and the user feels like they can't control your software, they literally won't be happy and they'll blame it on your software. If the UI is smart and things work the way the user expected them to work, they will be cheerful as they manage to accomplish small goals. Hey! I ripped a CD! It just worked! Nice software! Wooooooooooo!

Thus, the cardinal axiom of all user interface design:

*A user interface is well-designed when the program behaves exactly how the user thought it would.*

## [Figuring Out What They Expected](http://www.joelonsoftware.com/uibook/chapters/fog0000000058.html)

When a new user sits down to use a program, they do not come with a completely clean slate. They have some expectations of how they think the program is going to work. If they've used similar software before, they will think it's going to work like that other software. If they've used any software before, they are going to think that your software conforms to certain common conventions. They may have intelligent guesses about how the UI is going to work. This is called the user model: it is their mental understanding of what the program is doing for them.

The program, too, has a "mental model," only this one is encoded in bits and will be executed faithfully by the CPU. This is called the program model, and it is The Law. As we learned in Chapter One, if the program model corresponds to the user model, you have a successful user interface.

Let's look at one example. In Microsoft Word (and most word processors), when you put a picture in your document, the picture is actually embedded in the same file as the document itself. You can create the picture, drag it into the document, then delete the original picture file, but the picture will still remain in the document.

Now, HTML doesn't let you do this. HTML documents must store their pictures in a separate file. If you take a user who is used to word processors, and doesn't know anything about HTML, and sit them down in front of a nice WYSIWYG HTML editor like FrontPage, they will almost certainly think that the picture is going to be stored in the file. Call this user model inertia, if you will.

If you're designing a program like FrontPage, you've just found your first UI problem. You can't really change HTML. Something has to give to bring the program model in line with the user model.

You have two choices. You can try to change the user model. This turns out to be remarkably hard. You could explain things in the manual, but everybody knows that users don't read manuals, and they probably shouldn't have to. You can pop up a little dialog box explaining that the image file won't be embedded, but this has two problems: it's annoying to sophisticated users, and users don't read dialog boxes, either (we'll take more about this in Chapter Six). 

#### How do I know what the user model is?

Just ask them! Pick five random people in your office, or friends, or family, and tell them what your program does in general terms. ust ask a bunch of users where they think the thumbnails are going to be stored. Of course, many of them won't know or won't care, or they won't have thought about 	this, but if you ask a lot of people, you'll start to see some kind of consensus. The popular choice is the best user model, and it's up to you to make the program model match it.

*If your program model is nontrivial, it's probably not the user model.*

An important rule of thumb is that user models aren't very complex. When people have to guess how a program is going to work, they tend to guess simple things, rather than complicated things. 

Sit down at a Macintosh. Open two Excel spreadsheet files and Word document file. Almost any novice user would guess that the windows were independent. They look independent:

 The user model says that clicking on Spreadsheet 1 would bring that window to the front. What really happens is that Spreadsheet 2 comes to the front, a frustrating surprise for almost anybody:	

As it turns out, Microsoft Excel's program model says that "you have these invisible sheets, one for each application, and the windows are 'glued' to those invisible sheets. When you bring Excel to the foreground, all other windows from Excel will move forward, too."

Riiiight. Invisible sheets. What are the chances that the user model included the concept of invisible sheets? Probably about zero. So new users will be surprised by this behavior.

Another example from the world of Microsoft Windows is the Alt+Tab key combination which switches to the "next" window. Most users would probably assume that it simply rotates among all available windows. If you have window A, B, and C, with A active, Alt+Tab should take you to B. Alt+Tab again would take you to C. Actually, what happens is that the second Alt+Tab takes you back to A. The only way to get to C is to hold down Alt and press Tab twice. It's a nice way to toggle between two applications, but almost nobody figures it out, because it's a slightly more complicated model than the rotate-among-available-windows model.

It's hard enough to make the program model conform to the user model when the models are simple. When the models become complex, it's even more unlikely. So pick the simplest possible model.


## [Choices](http://www.joelonsoftware.com/uibook/chapters/fog0000000059.html)

When you go into a restaurant and you see a sign that says "No Dogs Allowed," you might think that sign is purely proscriptive: Mr. Restaurant doesn't like dogs around, so when he built the restaurant he put up that sign. 

If that was all that was going on, there would also be a "No Snakes" sign; after all, nobody likes snakes. And a "No Elephants" sign, because they break the chairs when they sit down.

The real reason that sign is there is historical: it is a historical marker that indicates that people used to try to bring their dogs into the restaurant.

Most prohibitive signs are there because the proprietors of an establishment were sick and tired of people doing X, so they made a sign asking them to please not. If you go into one of those fifty year old ma-and-pa diners, like the Yankee Doodle in New Haven, the walls are covered with signs saying things like "Please don't put your knapsack on the counter," more anthropological evidence that people used to put their knapsacks on the counter a lot. By the age of the sign you can figure out when knapsacks were popular among local students. 

Sometimes they're harder to figure out. "Please do not bring glass bottles into the park" must mean that somebody cut themselves stepping on broken glass while walking barefoot through the grass once, and it's a good bet they sued the city.

Software has a similar archaeological record, too: it's called the Options dialog. Pull up the Tools | Options dialog box and you will see a history of arguments that the software designers had about the design of the product. Should we automatically open the last file that the user was working on? Yes! No! There is a two week debate, nobody wants to hurt anyone's feelings, the programmer puts in an #ifdef in self defense while the designers fight it out. Eventually they just decide to make it an option.

Either way, you wind up with things like what is unequivocally the most moronic "wizard" dialog in the history of the Windows operating system. This dialog is so stupid that it deserves some kind of award. A whole new category of award. It's the dialog that comes up when you try to find something in Help:

The first problem with this dialog is that it's distracting. You are trying to find help in the help file. You do not, at that particular moment, give a hoot whether the database is small, big, customized, or chocolate-covered. In the meanwhile, this wicked, wicked dialog is giving you little pedantic lectures that it must create a list (or database). There are about three paragraphs there, most of which are completely confusing. There's the painfully awkward phrase "your help file(s)". You see, you may have one or more files. As if you cared at this point that there could be more than one. As if it made the slightest amount of difference. But the programmer who worked on that dialog was obviously distressed beyond belief at the possibility that there might be more than one help file(s) and it would be incorrect to say help file, now, wouldn't it?

Don't even get me started about how most people who want help are not the kinds of people who understand these kinds of arcana. Or that even advanced users, programmers with PhDs in Computer Science who know all about full text indexes, would not be able to figure out what they are really being asked to choose from.  

To add insult to injury, this isn't even a dialog... it's a wizard (the second page of which just says something like "thank you for submitting yourself to this needless waste of your time," to paraphrase). And it's pretty obvious that the designers had some idea as to which choice is best; after all, they've gone to the trouble of recommending one of the choices.

Which brings us to our second major rule of user interface design:

*Every time you provide an option, you're asking the user to make a decision.* People like having choices but only for things that they care about. I really do not care about what type of help file I want to see. Users care about a lot less than you might think: software is used to accomplish a task. They care about the task only. They expect designers to make decisions for them on the things that they don't really care about.

_It is the height of arrogance for a software designer to inflict a choice like this on the user simply because the designer couldn't think hard enough to decide which option is really better. Design is the art of making choices._

Ex: Trash can. You need to make choices on its dimensions: heavy enough to not be blown away, light enough for the trash collector, and small enough to not get in the way of people in the sidewalk.

Remember that if you accidentally reconfigure something, you most probably can't reconfigure it back. And most people reinstall if they do not understand what the heck just happened.

*Each time you provide an option, you're asking the user to make a decision.* That means they will have to think about something and decide about it. It's not necessarily a bad thing, but, in general, you should always try to minimize the number of decisions that people have to make.

And there's another category of choice that people like: the ability to change the visual look of things, without really changing the behavior. Everybody loves WinAmp skins; everybody sets their desktop background to a picture. Since the choice affects the visual look without affecting the way anything functions, and since users are completely free to ignore the choice and get their work done anyway, this is a good use of options.

## [Affordances and Metaphors](http://www.joelonsoftware.com/uibook/chapters/fog0000000060.html)

If a user does not have a concrete expectation of how the program works, then you have to find ways to give the user clues. A common way is to use metaphors. Ex: Desktop metaphor. You have folders with files on them which you can drag around. These remind people of real folders and real desks.

Bad ex: MS Word zoom in. The magnifying glasses (good metaphors) were used for Print Preview and Hyperlink. Zooming in is at the bottom right corner, whut.

Bad ex: "My Briefcase." Whut

Affordances: Thingies that make you think: "Ok, this is what you do." Ex: Push the metal plate to open the door, 3D clickable buttons, tabs.

## [Consistency and Other Hobgoblins](http://www.joelonsoftware.com/articles/fog0000000061.html)

The main programs in the Microsoft Office suite, Word and Excel, were developed from scratch at Microsoft, but others were bought from outside companies, notably FrontPage (bought from Vermeer) and Visio, bought from Visio. The thing these two programs have in common? They were originally designed to look and feel just like Microsoft Office applications.

In fact Vermeer and Visio seem to have copied the Office UI mainly because it was expedient: it was easier and quicker than reinventing the wheel.

It's hard to overestimate just how much consistency helps people to learn and use a wide variety of programs. Before GUIs, every program reinvented the very fundamentals of the user interface. Even a simple operation like "exit" which every program had to have was completely inconsistent. In those days people made a point of memorizing, at the very least, the exit command of common programs so they could exit and run a program they understood. 

Not only that, but small inconsistencies in things like the default typing behavior (overwrite or insert) can drive you crazy. I've gotten so used to Ctrl+Z meaning "undo" in Windows applications that when I use Emacs I am constantly minimizing the window (Ctrl+Z) by mistake.

If consistency is so obviously beneficial, why am I wasting your time and mine evangelizing it? Unhappily, there is a dark force out there that fights against consistency, and that is the natural tendency of designers and programmers to be creative.

If you're creating a document editing program of some sort, it better look an awful lot like Microsoft Word, down to the accelerators on the menu items that you have in common. Some of your users will be used to Ctrl+S for save; some of them will be used to Alt+F,S for save, and still others will be used to Alt,F,S (releasing the Alt key) . Another group will look for the floppy disk in the top left area of the program and click it. All four better work, or your users are going to get something that they didn't want.

Even if you think (as the Netscape 6.0 engineers clearly do) that Alt+Left is not a good shortcut key for "Back", there are literally millions of people out there who will try to use Alt+Left to go back, and if you refuse to do it on some general religious principle that Bill Gates is the evil smurf arch-nemesis Gargamel, then you are just gratuitously ruining your program so that you can feel smug and self-satisfied, and your users will not thank you for it.

To create a good program with a usable user interface, you're going to have to leave your religion at the door, thank you. Microsoft may not be the only company to copy: if you're making an online bookstore, you should probably make sure that your web site is at least semantically the same as Amazon. Amazon keeps your shopping cart around for 90 days. You might think that you are extra-smart and empty the cart after 24 hours. If you do this, there will be Amazon customers who put stuff in your shopping cart and come back two weeks later expecting it to still be there. When it's gone, you've lost a customer.

If you're making a high end photo editor for graphics professionals, I assure you that 90% of your users are going to know Adobe Photoshop, so you better behave a heck of a lot like Photoshop in the areas where your program overlaps. If you don't, people are going to say that your program is hard to use, even if you think it's easier to use than Photoshop, because it's not behaving the way they expect it to.

Fine, so, it's stunningly beautiful, but the O with a line through it (which actually means "no") reminds me of "OK," and the standard on Windows is to have OK on the left, so I wind up hitting the wrong button a lot. The only benefit to having funny symbols instead of "OK" and "Cancel" like everyone else is that you get to show off how creative you are. If people make mistakes because of Kai's creativity, well, that's just the price they have to pay for being in the presence of an artist. (Another problem with this "dialog" is that it doesn't have a standard title bar which can be used to move the dialog around on the screen. So if the dialog gets in the way of something you want to see in order to answer the question in the dialog, you are out of luck.)

Now, there's a lot to be gained by having a slick, cool-looking user interface. Good graphical design like Kai is pleasing and will attract people to your program. The trick is to do it without breaking the rules. You can change the visual look of dialogs, a bit, but don't break the functionality.

An awful lot of programmers have tried to reimplement various common Windows controls, from buttons to scrollbars to toolbars and menu bars (the Microsoft Office team's favorite thing to reimplement). Netscape 6.0 goes so far as to reimplement every single common Windows control. This usually has some unforeseen bad effects. The best example is with the edit box. If you reimplement the edit box, there are an awful lot of utilities that you don't even know about (like Chinese language editing add-ins, and bidirectional versions of Windows that support right-to-left text) that are going to stop working because they don't recognize your non-standard edit box. Some of the reviewers of the preview release of Netscape 6.0 noticed that the URL box, using a non-standard Netscape edit control, does not support common edit control features like right clicking to get a context menu.

## [Designing for People Who Have Better Things To Do With Their Lives](http://www.joelonsoftware.com/uibook/chapters/fog0000000062.html)

When you design user interfaces, it's a good idea to keep two principles in mind: 

Users don't have the manual, and if they did, they wouldn't read it.
In fact, users can't read anything, and if they could, they wouldn't want to.

What does it mean to make something easy to use? One way to measure this is to see what percentage of real-world users are able to complete tasks in a given amount of time. For example, suppose the goal of your program is to allow people to convert digital camera photos into a web photo album. If you sit down a group of average users with your program and ask them all to complete this task, then the more usable your program is, the higher the percentage of users that will be able to successfully create a web photo album. To be scientific about it, imagine 100 real world users. They are not necessarily familiar with computers. They have many diverse talents, but some of them distinctly do not have talents in the computer area. Some of them are being distracted while they try to use your program. The phone is ringing. WHAT? The baby is crying. WHAT? And the cat keeps jumping on the desk and batting around the mouse. I CAN'T HEAR YOU!

Quite the contrary, they are probably highly intelligent, or maybe they are accomplished athletes, but vis-à-vis your program, they are just not applying all of their motor skills and brain cells to the usage of your program. You're only getting about 30% of their attention, so you have to make do with a user who, from inside the computer, does not appear to be playing with a full deck.

First of all, they actually don't have the manual. There may not be a manual. If there is one, the user might not have it, for all kinds of logical reasons: they're on the plane; they are using a downloaded demo version from your web site; they are at home and the manual is at work; their IS department never gave them the manual. Even if they have the manual, frankly, they are simply not going to read it unless they absolutely have no other choice. With very few exceptions, users will not cuddle up with your manual and read it through before they begin to use your software. In general, your users are trying to get something done, and they see reading the manual as a waste of time, or at the very least, as a distraction that keeps them from getting their task done.

The very fact that you're reading this book puts you in an elite group of highly literate people. Yes, I know, people who use computers are by and large able to read, but I guarantee you that a good percentage of them will find reading to be a chore. The language in which the manual is written may not be their first language, and they may not be totally fluent. They may be kids! They can decipher the manual if they really must, but they sure ain't gonna read it if they don't have to. Users do just-in-time manual reading, on a strictly need-to-know basis.

The upshot of all this is that you probably have no choice but to design your software so that it does not need a manual in the first place. 

A great example of this is Intuit's immensely popular small-business accounting program QuickBooks. Many of the people who use this program are small business owners who simply have no idea what's involved in accounting. The manual for QuickBooks assumes this and assumes that it will have to teach people basic accounting principles. There's no other way to do it. Still, if you do know accounting, QuickBooks is easy to use without the manual.

*In fact, users don't read anything.*

This may sound a little harsh, but you'll see, when you do usability tests, that there are quite a few users who simply do not read words that you put on the screen. If you pop up an error box of any sort, they simply will not read it. This may be disconcerting to you as a programmer, because you imagine yourself as conducting a dialog with the user. Hey, user! You can't open that file, we don't support that file format! Still, experience shows that the more words you put on that dialog box, the fewer people will actually read it.

When I worked on Juno, the UI people understood this principle and tried to write short, clear, simple text. Sadly, the CEO of the company had been an English major at an Ivy League college; he had no training in UI design or software engineering, but he sure thought he was a good editor of prose. So he vetoed the wording done by the professional UI designers and added lots of his own verbiage. A typical dialog in Juno looks like this:

In reality, when you run a usability test on this kind of thing, you'll find that

advanced users skip over the instructions. They assume they know how to use things and don't have time to read complicated instructions
most novice users skip over the instructions. They don't like reading too much and hope that the defaults will be OK
the remaining novice users who do, earnestly, try to read the instructions (some of whom are only reading them because it's a usability test and they feel obliged) are often confused by the sheer number of words and concepts. So even if they were pretty confident that they would be able to use the dialog when it first came up, the instructions actually confused them even more.

Now, Juno was obviously micro-managed beyond all reason. More to the point, if you're an English major from Columbia, then you are in a whole different league of literacy than the average Joe, and you should be very careful about wording dialogs that look helpful to you. 

Shorten it, dumb it down, simplify, get rid of the complicated clauses in parentheses, and usability test. But do not write things that look like Ivy League faculty memos. Even adding the word "please" to a dialog, which may seem helpful and polite, is going to slow people down: the increased bulk of the wording is going to reduce, by some measurable percentage, the number of people who read the text.

She was hitting No, and then she was kind of surprised that Juno hadn't exited. The very fact that Juno was questioning her choice made her immediately assume that she was doing something wrong. Usually, when programs ask you to confirm a command, it's because you're about to do something which you might regret. She had assumed that if the computer was questioning her judgment, then the computer must have been right, because, after all, computers are computers where as she was merely a human, so she hit "No."

Is it too much to ask people to read 11 lousy words? Well, apparently. First of all, since exiting Juno has no deleterious effects, Juno should have just exited without prompting for confirmation, like every other GUI program in existence. But even if you are convinced that it is crucial that people confirm before exiting, you could do it in two words instead of 11: "Exit Now?"

## [Designing for People Who Have Better Things To Do With Their Lives, Part Two](http://www.joelonsoftware.com/uibook/chapters/fog0000000063.html)

Tog invented the concept of the mile high menu bar to explain why the menu bar on the Macintosh, which is always glued to the top of the physical screen, is so much easier to use than menu bars on Windows, which appear inside each application window. When you want to point to the File menu on Windows, you have a target about half an inch wide and a quarter of an inch high to acquire. You must move and position the mouse fairly precisely in both the vertical and the horizontal dimensions.

But on a Macintosh, you can slam the mouse up to the top of the screen, without regard to how high you slam it, and it will stop at the physical edge of the screen - the correct vertical position for using the menu. So, effectively, you have a target that is still half an inch wide, but a mile high. Now you only need to worry about positioning the cursor horizontally, not vertically, so the task of clicking on a menu item is that much easier.

Based on this principle, Tog has a pop quiz: what are the five spots on the screen that are easiest to acquire (point to) with the mouse? The answer: all four corners of the screen (where you can literally slam the mouse over there in one fell swoop without any pointing at all), plus, the current position of the mouse, because it's already there.

The principle of the mile-high menu bar is fairly well known, but it must not be entirely obvious, because the Windows 95 team missed the point completely with the Start push button, sitting almost in the bottom left corner of the screen, but not exactly. In fact, it's about 2 pixels away from the bottom and 2 pixels from the left of the screen. So, for the sake of a couple of pixels, Microsoft literally "snatches defeat from the jaws of victory", Tog writes, and makes it that much harder to acquire the start button. It could have been a mile square, absolutely trivial to hit with the mouse. For the sake of something, I don't know what, it's not. God help us.

*Users can't control the mouse very well.*

I don't mean this literally. What I mean is, you should design your program so that it does not require a tremendous amount of mouse-agility to use it right. Top six reasons:

Sometimes people are using sub-optimal pointing devices, like trackballs, trackpads, and the little red thingy on a ThinkPad, which are harder to control than true mice.
Sometimes people are using mice under bad conditions: a crowded desk; a dirty trackball making the mouse skip; or the mouse itself is a $5 clone which just doesn't track right.
Some people are new to computers and have not yet developed the motor skills to use mice accurately.
Some people literally will never have the motor skills to use mice precisely, and never will. They may have arthritis, tremors, carpal tunnel; they may be very young or very old; or any other number of disabilities.
Many people find that it is extremely difficult to double-click without slightly moving the mouse. As a result they often drag things around on their screen when they mean to be launching applications. You can tell these people because their desktops are a mess because half the time they try to launch something, they wind up moving it instead.
Even in the best of situations, using the mouse a lot feels slow to people. If you force people to perform a multi-step operation using the mouse, they may feel like they are being stalled which in turn makes the UI feel unresponsive, which, as you should know by now, makes them unhappy.
In ye olden days when I worked on Excel, laptops didn't come with pointing devices built in, so Microsoft made a clip-on trackball that clipped to the side of the keyboard. Now, a mouse is controlled with the wrist and most of the fingers. This is much like writing, and you probably developed very accurate motor skills for writing in elementary school. But a trackball is controlled entirely with the thumb. As a result, it's much harder to control a trackball to the same degree of accuracy as a mouse. Most people find that they can control a mouse to within one or two pixels, but can only control a trackball to within 3 or 4 pixels. On the Excel team, I always urged people to try out their new UIs with the trackball, instead of only with a mouse, to see how it would feel to people who are not able to get the mouse to go exactly where they want it.

One of the UI elements which bothers me the most is the dropdown combo list box. That's the one that looks like this:



When you click on the down arrow, it expands:



Think about how many detailed mouse clicks it's going to take to choose, say, Times New Roman. First, you have to click on the down arrow. Then, using the scroll bar, you have to carefully scroll until Times New Roman is in view. Many of these dropdowns are carelessly designed to show only two or three items at a time, so this scrolling is none too easy, especially if you have a lot of fonts. It involves either carefully dragging the thumb (with such a small range of movement, it's probably unlikely that this will work), or clicking repeatedly on the second down arrow, or trying to click in the area between the thumb and the down area -- which will eventually stop working when the thumb gets low enough, annoying you even further. Finally, if you do manage to get Times New Roman into view, you have to click on it. If you miss, you get to start all over again. Now multiply by 10, if, say, you want to use a fancy font for the first letter in each of your chapters, and you're really unhappy. 

The poxy combo dropdown control is even more annoying because there's such an easy solution: just make the dropdown long enough to contain all of the options. 90% of the combo boxes out there don't even use all available space to drop down, which is a sin. If there is not enough room between the main edit box and the bottom of the screen, the dropdown should grow up until it fits all the items, even if it has to go all the way from the top of the physical screen to the bottom of the physical screen. And then, if there are still more items than fit, let the combo scroll automatically as the mouse approaches the edge, rather than requiring the poor user to mess with a teensy weensy scrollbar.

Furthermore, don't make me click on the little tiny arrow to the right of the edit box before you pop up the combo: let me click anywhere on the combo box. This expands the click target about tenfold and makes it that much easier to acquire the target with the mouse pointer.

Let's look at another problem with mousing: edit boxes. You may have noticed that almost every edit box on the Macintosh uses a fat, wide, bold font called Chicago which looks kind of ugly and distresses graphic designers to no end. Graphic designers (unlike UI designers) have been taught that thin, variable spaced fonts are more gracious, look better, and are easier to read. All this is true. But graphic designers learned their skills on paper, not on the screen. When you need to edit text, monospace has a major advantage over variable spaced fonts: it's easier to see and select narrow letters like "l" and "i". I learned this lesson after watching a sixty year old man in a usability test painfully trying to edit the name of his street, which was something like Fillmore Street. We were using 8 point Arial, so the edit box looked like this:



Notice that the I and the Ls are literally one pixel wide. The difference between a lower case I and a lower case L is literally one pixel. (Similarly, it is almost impossible to see the difference between "RN" and "M" in lower case, so this edit box might actually say Fillrnore.)

There are very few people who would notice if they mistyped Flilmore or Fiilmore or Fillrnore, and even if they did, they would have a heck of a time trying to use the mouse to select the offending letter and correct it. In fact, they would even have a hard time using the blinking cursor, which is two pixels wide, to select a single letter. Look how much easier it would have been if we had used a fat font (shown here with Courier Bold)



Fine, OK, so it takes up more space and doesn't look as cool to your graphic designers. Deal with it! It's much easier to use; it even feels better to use because as the user types, they get sharp, clear text, and it's so much easier to edit.

Here's a common programmer thought pattern: there are only three numbers: 0, 1, and n. If n is allowed, all n's are equally likely. This thought pattern comes from the belief (probably true) that you shouldn't have any numeric constants in your code except for 0 and 1. (Constants other than 0 and 1 are referred to as "magic numbers". I don't even want to go into the gestalt of that.)

Thus, for example, programmers tend to think that if your program allows you to open multiple documents, it must allow you to open infinitely many documents (as memory allows), or at least 2^32, the only magic number programmers concede. A programmer would tend to look with disdain on a program which limited you to 20 open documents. What's 20? Why 20? It's not even a power of 2!

Another implication of all n's are equally likely is that programmers have tended to think that if users are allowed to resize and move windows, they should have complete flexibility over where these windows go, right down to the last pixel. After all, positioning a window 2 pixels from the top of the screen is "equally likely" as positioning a window exactly at the top of the screen.

But it's not true. As it turns out, there are lots of good reasons why you might want a window exactly at the top of the screen (it maximizes screen real estate), but there aren't any reasons to leave 2 pixels between the top of the screen and the top of the window. So, in reality, 0 is much more likely than 2.

The programmers over at Nullsoft, creators of WinAmp, managed somehow to avoid the programmer-think that has imprisoned the rest of us for a decade. WinAmp has a great feature. When you start to drag the window near the edge of the screen, coming within a few pixels, it automatically snaps to the edge of the screen perfectly. Which is probably exactly what you wanted, since 0 is so much more likely than 2. (The Juno main window has a similar feature: it's the only application I've ever seen that is "locked in a box" on the screen and cannot be dragged beyond the edge.)

You lose a little bit of flexibility, but in exchange, you get a user interface that recognizes that controlling the mouse precisely is hard, so why should you have to? This innovation (which every program could use) eases the burden of window management in an intelligent way. Look closely at your user interface, and give us all a break. Pretend that we are gorillas, or maybe smart orangutans, and we really have trouble with the mouse.





























