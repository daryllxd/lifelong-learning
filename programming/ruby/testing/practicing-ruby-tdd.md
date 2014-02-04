## End-to-end testing is essential

Most of the time when I work on application development, I start out by attempting to treat its delivery mechanism as an implementation detail. Thinking this way makes me feel that testing code through the UI isn't especially important, provided that I test-drive my domain objects and keep their surface as narrow as possible.

It is easy to make the case that end-to-end testing can be deferred until later, or that perhaps it is not needed at all. Thinking this way is very tempting, because it frees you from having to think about how to dig down into the delivery mechanism and run your tests through it. Already burdened by the idea of writing more tests than I usually do, I was quick to take that bargain and felt like it was a reasonable tradeoff at the time.

I couldn't have been more wrong. I encountered my first trivial UI bug within 24 hours of shipping the first feature. Several dozen patches later when I had a playable game, I had already sunk several hours into finding and fixing UI defects that I discovered through manual play testing. The wheels finally came off the wagon when I realized that I could not even safely rename methods without playing through the entire game and triggering each of its edge cases.

As predicted, the Blind::UI::Simulator object was not especially easy to implement.  Still, it is hard to argue with results. After introducing this little simulator object, the number of trivial errors I introduced into the system rapidly declined, even though I was still actively changing things.

As I continued on with my study, I experienced similar situations with both a Sinatra application and a command line application, and that is when I realized that you simply can't get away from paying this tax one way or another. If nothing else, working on acceptance tests first helps balance out the illusion of progress in the early stages of a project, and makes it easier to sustain an even pace of development over time.

## [Refactoring is not redesign](https://practicingruby.com/articles/refactoring-is-not-redesign)

The problem I noticed in my own work is that seemingly simple changes often spiral into much more complex modifications. Whenever that happens, it is easy to make bad decisions that can cause progress to grind to a halt. Having a good way to distinguish between what can be accomplished via simple refactorings and what requires careful design consideration seems to be the key to preventing this problem.

#### What is refactoring?

Refactoring in the traditional sense has to do with making small and safe transformations to a codebase without altering its external behavior. Because refactorings are designed to be atomic and almost trivial, you can apply them whenever you feel that they will make life easier for you down the road.

           def belongs_to(parent, params)
    -        mapper.record_class.send(:define_method, parent) do
    -          Object.const_get(params[:class]).find(send(params[:key]))
    +        define_association(parent) do
    +          BrokenRecord.string_to_constant(params[:class])
    +                      .find(send(params[:key]))
             end
           end

           def has_many(children, params)
             table_primary_key = mapper.primary_key

    -        mapper.record_class.send(:define_method, children) do
    -          Object.const_get(params[:class])
    -                .where(params[:key] => send(table_primary_key))
    +        define_association(children) do
    +          BrokenRecord.string_to_constant(params[:class])
    +            .where(params[:key] => send(table_primary_key))
             end
           end

#### Immediate advantages
- The `define_association` helper makes the code reveal its intentions much more clearly by hiding some awkward metaprogramming.
- The `BrokenRecord.string_to_constant` method makes it easy to extend this code so that it handles fully qualified constant names (i.e. `SomeProject::Person`), without the need to add a bunch of extra noise in multiple places.
- Both helper methods cut down on duplication, eliminating the connascence of algorithm that was present in the original code.
- Both helper methods reduce the amount of implementation details that the `belongs_to` and `has_many` methods need to be directly aware of, making them more adaptive to future changes.

The important thing to notice here is that while making this change opens a lot of doors for us, and has some immediate tangible benefits, it does not introduce any observable functional changes, both from the external perspective, and from the perspective of the object's collaborators.

#### What is redesign?

Even though I had no intentions of making BrokenRecord into a library that could be used for practical applications, this design was fundamentally inconsistent with what it means to be an object-relational mapper. The lack of abstraction made any sort of query optimization impossible, and also prevented the possibility of introducing support for multiple database backends.

In addition to these concerns about future extensibility, the current design made it much harder to test this code, and much harder to do some common queries without directly hijacking the global reference to the underlying database adapter.

__Because this object had come into existence as a result of a broad-based integration test rather than a series of focused unit tests, I was hesitant to perform an extraction without writing a few more tests first.__

Thinking about the problem a little more, I noticed that the changes I wanted were deeper than just putting together an internal object to hide some implementation details and reduce coupling.

#### Taking a TDD-friendly approach to redesign

The mistake I've made in the past when it comes to redesigning internal objects is that I tended to make my changes recursively, often without introducing new tests as I went. So for example, I might take a helper object that had gotten too complex and break it into two objects, testing both objects only indirectly through some higher level test. That kind of change would often reveal to me that I wanted to extract even more classes or methods, or possibly even change the protocols between the low-level collaborators in the system.

Sooner or later, I would end up with a complicated web of internal objects that were all being tested through a single use case at the high level, and so any defects I introduced became very hard to track down. Even though my tests were protecting external defects from creeping into the system, I had negated the design and debugging benefits that come along with doing TDD more rigorously.

I realized that I could redesign systems by introducing new components from the bottom up, cutting over to the new implementation only when it was ready to be integrated.

Throughout the process of building better internals from the bottom up, I was able to make these kinds of revisions to several objects, and also introduced a couple more internal objects to help out with various things. Sooner or later, I reached the point where I was ready to create an object that could serve as a drop-in replacement for the original BrokenRecord::Table object (the one I renamed RecordTable).

#### Reflections

If I had not taken this more disciplined approach and instead followed my old ways, I probably would have ended up in about the same place design-wise, but it would have come at a much higher cost. I would have had fewer tests, spent more time debugging trivial errors, and probably would have cut corners in places out of impatience or frustration. The overall codebase would have still been quite brittle, and future changes would be harder to make rather than easier. Taking that less disciplined approach might have allowed me to implement this particular set of changes a little faster, but my past experiences have taught me that I always end up having to pay down my techinical debt sooner or later.

## Mock objects deeply influence design

Before this study, I knew that I rarely used mock objects in my tests, but I didn't clearly understand why that was the case. When asked to explain my preferences, I typically would offer some vague argument about keeping things simple, and then go on to complain about test brittleness. Because I knew many other people who shared the same view, I assumed my line of reasoning was mostly coherent. This left me with no desire to dig any deeper than what my own experiences had taught me.

After years of somewhat blissful ignorance, I finally started to second guess myself after watching Greg Moeck's excellent talk at RubyConf 2011, which was aptly named Why You Don't Get Mock Objects. This talk pointed out that the reason why most Rubyists tend to dislike mock objects is because they try to shoehorn them into existing workflows rather than adopting the form of TDD that mocks are meant to promote.

Throughout the entire 90 day period of my study, I found myself using mock objects only once, even though I had thought about using them in many places. Towards the end, I realized that I still didn't quite understand how mocks were meant to be used, and so I decided to study them properly. This inevitably lead me to the excellent Mock Roles, Not Objects paper, which was written in 2004 by the developers who had pioneered the concept of mock-based testing. In addition to being a solid introduction to the topic in general, the paper lays out a number of practical guidelines for avoiding the common problems that can arise from using mocks incorrectly. In particular, the authors proposed the following rules:

- Only mock types you own.
- Don't use getters.
- Be explicit about what should not happen.
- Specify as little as possible in a test.
- Don't use mocks to test boundary objects.
- Don't add behavior to mocks.
- Only mock your immediate neighbors.
- Don't create too many mocks.
- Inject all dependencies.

By programming in this style, the promise is that the benefits of mock objects will be maximized and their drawbacks minimized. The interesting thing is that while several of these heuristics are meant to improve the testability of code, nearly as many have a direct influence on software design in general. Taken together, the following four points strongly favor responsibility-centric design:

- Don't use getters.
- Only mock your immediate neighbors.
- Don't create too many mocks.
- Inject all dependencies.

These guidelines will almost certainly lead to code that is more testable, and should also lead to code that is easier to change. If you think about these heuristics a little bit, you'll find they conveniently map onto the following software design principles:

- Tell, don't ask
- The law of Demeter
- Single responsibility
- Dependency inversion

__Testing a codebase via mock objects is easy when these design principles are followed, and challenging when they are not.__ In that sense, mock objects can be used as a smoke test for the overall design of a project, which is useful in its own right. However, most mockists claim that the technique actually inspires better design, rather than simply helping you find areas in your code that suffer from bad design.

The way I tend to approach design is to choose a very small vertical slice of functionality and develop an imaginary example of how I expect that feature to work. This technique is consistent with the outside-in way of doing things, but my next steps bring me in a completely different direction. Rather than starting with my interface and then using mock objects to allow me to discover collaborators iteratively until I reach the lowest-level objects in my system, I build things bottom up instead.

To sum up the overall point of this lesson: mock objects facilitate a particular design style, and if you're not using that approach in your projects, you probably will not experience their benefits.



