## SOA Series Part 1: The What, the Why, and the Rules of Engagement
[link](https://techblog.livingsocial.com/blog/2014/05/06/soa-the-what-the-why-and-the-rules-of-engagement/)

Most shops lose sight of the tipping point where their applications become unmanageable in their complexity, due to the technical debt accrued in the early phases of their business lifecycle.

*Software service: It is a piece of software functionality and its associated set of data for which it is the system of record.* Ex: Amazon AWS service offerings, Google's services portfolio.

When done right, services have much smaller codebases than monolithic applications. This is like using SRP on an application design level. *They implement a self-contained, well-defined, and well-documented set up functionality, which they expose only via versioned APIs.* They are the true system of record for all data they access from a data store. *No other service or application has direct read or write access to the underlying data store. This will achieve true decoupling and transparency of the implementation details of data storage from information access.*

You can design your services to be scaled by their traffic pattern: read-intensive API endpoints can be cached independently from write-intensive functionality. You can also more naturally separate cache expiry based on the tolerance for staleness of information based on your individual endpoints, or even by particular clients requesting information (information about descriptive text on any given inventory item should in cases have a higher tolerance for staleness than the number of items left to be purchased.

#### Why Should I Care?

You should care because if your goal is to have an application that is successful, then there will be a point in the life of your software application where it will have to undergo change. Possible changes: admin interface, mobile version of the site, business metrics reports, public API access.

*It's not a question of if you will need to invest in changing your application, but when to make the change and how expensive it will be.*

#### The Rules of Engagement

1. *Customer-facing applications cannot directly touch any data store.*

Consumer-facing applications will be a mere mashup of data retrieved from authoritative systems-of-record, and they will never have a database. Such systems-of record will always be a service application with well-defined, versionable interfaces. Apart from the fact that some nasty security issues will be easier to address this way (SQL injection should be a thing of the past), different consumer-facing apps that work on the same information exposed by the owning service will be able to evolve independently, regardless of changes in the underlying data schemas of your datastore.

2. *No service accesses another service’s data store.*

Similarly, all inter-service interactions should happen through well defined, versioned APIs. While a service has ownership to of the data for which it is itself the system of record (including direct read and write access), it can only access other information via the dependent authoritative services.

3. *Every service has at least a development and a production instance.*

No developer should ever need to run any system other than the ones under development on their personal development machine. Dependent services should have standard, well-known URIs for server instances to which all consuming applications point by default.

4. *Invest in making spinning up new services trivial.*

Make everyone happy by having a small accepted list of technologies to support. Invest in creating templates for service code. And, last but not least, introduce rules and guidelines for your interfaces: consider the use of an Interface Definition Language to define APIs, and think about the structure of your RESTful interfaces (what consistent error status codes will you expose, what is in the headers, versus URI parameters, how will authentication / authorization work, etc.).

These rules stem from more than a decade of combined personal experience (both from the ground up, as well as via refactoring existing monoliths).
