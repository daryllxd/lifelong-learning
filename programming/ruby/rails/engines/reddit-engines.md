I've used engines in cases where we have a product several clients want, but also want it reskinned and possibly tweaked slightly. So you can coordinate numerous host applications with versions of a core engine that can get a bit complex.

#### Many apps plus
- Faster dev
- Each app manages its own struture
- Each component can be deployed without impacting the others
- Each test is quicker
- Able to handle load balancing per app

#### Many apps downsides
- You end up with a lot of apps
- All are slightly different. Ex: Rspec vs Cucumber features, diff design patterns
- Little standardization between apps.
- Code reuse - duplicate models and logic. Better to have a service-oriented architecture which is what you are doing. 
- Integration tests are hard because you ahve to set up a large number of apps locally and get them all running 

How do you also support the scaling of having all the database access and domain logic go through a simple API?

#### Engines plus
- You can more easily keep all functionality on the same page (testing tools, design patterns, shared models).
- Easier to update bits of functionality iwthout impacting the whole more easily.
- Fewer dependencies on testing setup.

#### Engines minus
- You still have one app, so a bug in one bit takes down the whole
- You lose the ability to scale indiv apps and have to focus on the whole
- You lose loose coupling of many app design (if there are parts with processor intensive computations we can swap it out with Go or Scala or Node).

---
My opinion is that using Engines is the "right" way to use Rails at the moment for Apps with enough separated behavior to make it Monolithic otherwise.

Downsides will be at the data layer. Does the app or engine contain domain logic?

You can have a blank top-level application and contain all your code in Engines, allowing you to remove and add as you wish.
