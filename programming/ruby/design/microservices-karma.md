# How we build microservices at Karma
[link](https://blog.yourkarma.com/building-microservices-at-karma)

Backend API, frontend application. Backend = responsible for handling orders from the store, usage accounting, user management, device management. Frontend = dashboard for users to API.

We noticed that if the whole backend API is monolithic, it doesn't work well because everything gets entangled.

Ex: We have users, devices, and a store. When a user buys a device from the store, if it's in one application, it's easy for user-related code to end up in the store and device APIs, and pretty soon the store API is going behind the back of the device API and changing stuff.

## Problems with separating the monolith into libraries:

1. *Scaling.* When you want to scale, you have to scale the entire API at once. In the case of Karma, we need the device and user APIs to scale much faster than the store API.
2. *Versioning.* With the library approach, a single dependency can hold the entire application back. Because the code is spread across multiple projects, we don't have to update everything at once. We can leave older APIs running, and upgrade them when we have meaningful changes to make.
3. *Multiple languages and frameworks.* We can experiment with Go/Clojure, because our services expose REST APIs. Communication isn't a problem, it's just HTTP in the end.

## How we got started

We started out with one big app in the backend, and we split off pieces when it made sense. By just going ahead and building the app, it was obvious when we needed boundaries between aspects of the app. Every time we encountered something that clearly looked like it should be a separate piece, we turned it into a service.

For instance: We started out with a "store" in the larger app, then we split off handling and shipping, then we split shipping, tracking a shipment is different from shipping it out in the first place. 3 APIs: first processes orders, second sends orders to the fulfillment center, third tracks packages sent out by FedEx.

A microservice works best when it has one responsibility (we wrap most of our third-party dependencies to make sure we don't have to think about them in other parts of the app). Changes to other parts of the system don't necessitate a rewrite of other parts.

## What our architecture looks like now

Two ways our microservices communicate: HTTP requests, message queue. First, just HTTP and Sinatra in the backend. The services pass messages through URL requests to one another. This works great for things that need to happen right now, but becomes exponentially more complicated the more services you have talking to each other.

After the order is received, the store might need to talk to the invoice or metrics or mailer API.

We used the Amazon Simple Notification Service for publishing events, and Amazon Simple Queue Service to store th events. Microservices then can take jobs off a queue, process them, and delete them if successful.

When a new microservice is deployed, it includes a configuration file which describes which types of messages it wants to listen to, and what types of messages it wants to publish. We have an in-house tool we use called Fare which reads this configuration and sets up the approximate SQS and SNS queues.

When an order comes in, an event is published saying "an order has been placed, here are the details." The shipment app listens to the messaging system, sees an order take place, looks at the details, and says, "Okay, I need to send two boxes to this person." Any other services interested in an order happening can do whatever they need to with the even in their own queues, and the store API doesn't need to worry about it.

We still use HTTP requests when we need an immediate response, like for logins. If a service is asking, it probably needs an immediate response. If it's telling, it probably won't need a response, just fire and forget.

## Challenges we've faced

Biggest challenge. With a regular web app, an end-to-end test is easy: click and see what changes in the database. In our case, actions and eventual results are so far from one another that it's difficult to see exact cause and effect. A problem might bubble up from a chain, but where in the chain did it go wrong?

## Comments

Simple Workflow (SWF). With SWF, your order process would start a "process order" workflow that would have several concurrent activities. Activity workers pull activity tasks from an SWF queue, akin to your current workers pulling work from an SQS queue. That code change would be minimal and trivial.

The hardest part to get my mind around was the decision tasks. Decisions are the brains behind your workflow, and effectively turn into a set of rules, "When an order is placed, start an activity to process payment", then "when payment has been processed, start an activity to generate an invoice and another activity to ship the product". The deciders centralize your workflow logic in one location, while leaving your activities decoupled on different machines.

You wouldn't have one activity for each interaction, but anything that would require multiple activities (order processing, renewals, warranty claims, etc) would be a good fit for SWF. I've been working with a company that performs document processing, and we use a hybrid approach. The job to process the documents goes through SWF, spawning 6-10 activities to represent the different stages of the job and count aggregation, but the actual job processing is done through a cluster feeding out of an SQS queue. The SQS queue will push several hundred thousand messages as the job is processed, and the workflow will track the job through completion making decisions about retries and what comes next.

You should take a look at the actor model (Akka for example). Each actor contains business logic of a specific service, and you can distribute actors between servers in such a way that each actor communicates through a queue with other actors. It's basically a real-time "workflow management solution" for a large-scale system.

As we find more and more things to extract from our old "monolith", we do them, one by one, at a point in time that seems appropriate. For instance, a couple months ago we launched a new design of our website, store and dashboard. This was the ideal moment to split them out even further. So what we have now is a year and a half in the making and we still are extracting parts.

How do you handle service to service authentication and authorisation when backend services need to talk to each other? App-specific API tokens for each backend service. So if the fulfillment backend talks to package tracking and store backends, it will have unique API tokens for each.

To what extent do you try and replicate production on a local machine for production? What does your inner development and testing loop look like? As much as possible. Every developer has the full stack of apps installed. Most of the backend apps are just Sinatra apps, and those will spin up when needed (with Pow) so you don't waste a ton of memory for backend apps you're not working on, while always having those ready that you do need.

Local automated testing is done in isolation per app, where you mock out the responses of the other backend apps.

Do all of the individual services talk to the same datastore and share access to the same objects? For example does the shipping service just read addresses from the users datastore in order to know where to ship to? If so do the services share a library (gem) that provides models?

We separate the data layer too. Each service has its own database (or none at all). Each microservice chooses what to expose. The same principle applies as in object oriented programming: data is private and exposure is minimal. We use the gem Faraday to connect to other microservices. We don't try to let the data behave like ActiveRecord. We sometimes apply the repository pattern, but since microservices are often small and simple, we usually don't bother. About sharing data: we try not to have every service having to connect to get user related data. So we need to give the shipment information all the information it needs, because it will not ask for any data by itself.

