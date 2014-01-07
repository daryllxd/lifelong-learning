## Animation, Direct Manipulation & Feedback

## [The psychology of user interface](http://whydoeseverythingsuck.com/2008/01/psychology-of-user-interface-part-i.html)

Spatial visualization is the ability of an individual to “see” things in their mind that do not exist in an easily “minds eye visible” form. This could be anything from being able to clearly imagine how an object might look if you manipulated it a certain way to just being able to hold a complex math word problem in your head.

Good interface design is in large part the development of an interface that does not aggressively engage the part of the brain engaged in spatial visualization.

It is true that more people with more limited spatial visualization skills will be able to use your software if its demands in this area are more limited. But even people with advanced spatial visualization skills are slowed down by the need to visualize the framework of the system instead of the underlying information, which limits their ability to focus on the actual problem the software is designed to solve.

Direct manipulation is really all about making stuff obvious to the user. Its about making things physical, and almost tactile. It is about making all our software suck just a little less. 

#### action-at-a-distance

Action-at-a-distance is the concept of manipulating something in front of you and having it change something somewhere else out of your immediate view. For example, imagine picking up a fork and having it knock a book off the bookshelf in your bedroom. That would be an unpredictable and unexpected outcome.

There are two problems with action-at-a distance. The first is the unexpected result of the action. But the second more troubling aspect of it is that even after you might be expected, through experience, to know that lifting the fork knocks the book off the bookshelf, you need to *remember* that the book will be knocked off the bookshelf every time because you will have no cue that it happened.

This is where spatial visualization comes in. Because while some people will be able to remember the linkage between the fork and the book, many more will not remember and even more will *never even understand* that that lifting the fork knocks the book off the bookshelf because they could not visualize it. These people will never understand your software. There are lots of these people, and most of them are not dummies.

#### Direct manipulation

Direct manipulation is really just a fancy sounding expression for making things as “physical” as you can. When you modify something all of the important effects of that manipulation should be at the surface of your interface. A simple example of this might be a commerce program where, when you change the items in your shopping cart, it immediately recalculates the cost of the items in the basket and displays that on the screen. Better yet, the idea of a scroll bar in a text editor. When you move the scroll bar, the text changes.

Another element of direct manipulation is hinting. For example, when a drawing program shows the outline of what you are dragging, and turns the cursor into an X to show that dropping the item there wont work, that is hinting.

#### I love widgets

One of the things that I most enjoyed doing in my early software writing years, was creating “widgets”, or on screen software objects within my applications, that mimicked some aspect if the information model, to make it easy for people to explore and manipulate the information.

For example, imagine being able to click on a magnifying glass tab in the corner of an icon on your desktop and having a mini viewer instantly zoom open along side the icon that would allow you to browse the document. This kind of thing would feel very physical. It is the antithesis of the web page model.

#### Freedom schmeedom

Too much choice is bad. In life, in politics, in products, in relationships, and indeed in user interfaces. People need guidance. People need to be managed... told what to do. In the old days, this issue manifested itself in a different way than it does today. But this is not because we are smarter today, but because things generally suck so badly that we have a more limited set of ways to overwhelm the user. But somehow, designers still seem to figure out how to do it.

In prehistoric times, apps would have zillions of tools and no mechanism for understanding the context for using those tools. Photoshop is a good example of one of these prehistoric apps, because, from a UI perspective, Photoshop sucks.

In Photoshop you have a massive array of tools. There are no noobie level affordances. No tools jump out and tell you what you should be doing with them. You are just expected to memorize how stuff works. And damn it, you're gonna like it.

It is the epitome of blank slate design. You must stare at an empty page with a collection of nondescript tools and figure out how use it.

But there is still an important lesson here. I am dumbfounded by the number of websites and web applications that refuse to tell me what to do. If you have a website, I want you to tell me what is important. If you have an application, I want you to tell me what my first steps should be. I NEED HELP.

There is nothing worse than going to a website and spending five minutes and having no idea what the product they are selling is or how to find out. There is nothing worse than going to a web app and finding a sea of command options of seemingly equivalent importance. You see, if you don't tell me what to do or where to go, or what my first steps should be, I am lost to you. And I will just leave your page going, wow, that *really* sucked.

## [Animated Transitions](http://designinginterfaces.com/patterns/animated-transition/)

What: Smooth out a startling or dislocating transition with an animation that makes it feel natural.

Use when: Users move through a large virtual space, such as an image, spreadsheet, graph, or text document. They might be able to zoom in to varying degrees, pan or scroll, or rotate the whole thing. This is especially useful for information graphics, such as maps and plots.

Why: All of these transformations can disrupt a user’s sense of where she is in the virtual space. But when the shift from one state to another is visually continuous, it’s not so bad. In other words, you can animate the transition between states so that it looks smooth, not discontinuous. This helps keep the user oriented. We can guess that it works because it more closely resembles physical reality—when was the last time you instantly jumped from the ground to 20 feet in the air?

When done well, Animated Transitions bolster your application’s cool factor. They’re fun.

How: The animations should be quick and precise, with little or no lag time between the user’s initiating gesture and the beginning of the animation. Limit it to the affected part of the screen; don’t animate the whole window. And keep it short. My preference would be to keep it well under a second, and research shows that 300 milliseconds might be ideal for smooth scrolling. Test it with your users to see what’s tolerable.

If the user issues multiple actions in quick succession, such as pressing the down arrow key many times to scroll, combine them into one animated action. Otherwise, the user might sit there through several seconds’ worth of animation as the punishment for pressing the down arrow key 10 times. Again: keep it quick and responsive.

- Brighten and dim
- Expand and collapse
- Fade in, fade out, and cross-fade
- Self-healing
- Slide
- Spotlight

## [When the UI Is Too Fast](http://www.nngroup.com/articles/too-fast-ux/)

99% of all usability problems related to response times are caused by user interfaces being too slow, 

while young users are notoriously impatient, even older users won’t linger long on a slow site

Making such a mistake once might be excused as an example of the inherent problem in gestural interfaces — that people sometimes touch a spot that’s a bit off the target.

But this user hit the wrong target several times. Why? The intended target kept moving without her noticing it because the tablet was continually scanning the airwaves and adding or removing entries on its list of available WiFi networks.

When the screen changes in the proverbial blink of an eye, users might blink and miss the change. Or, as in my WiFi example, they might not be looking at that particular part of the screen during the brief interval in which the change occurs.

Rapid screen updates are great when they’re the result of user-initiated actions. As long as users do something, they know to look for the result. 

A second class of usability problems occurs when users do notice a rapid change, but can’t understand what happened quickly enough. This often happens in carousel, rotators, and other auto-forwarding design elements. Once you decide that something might be of interest, it’s yanked off the screen — replaced by something you don’t want.

This is particularly problematic for slower users, such as international customers who don’t read your language well or old or disabled users who might need extra time dealing with the user interface and are thus disproportionally harmed by rapidly changing screens.

Let’s establish a simple usability principle: avoid taunting the customers.

And, to circle back to the beginning, it’s important to remember that, as problems go, being too fast is far less common than being too slow. Whether fast or slow, the point is to pay attention to the time aspect of the user experience. After all, a key differentiator of interaction design compared to most other forms of design is that we deal with time-changing phenomena.





























