# Designing Great APIs -- Learning from Jony Ive, Orwell, and the Kano Model

API has two users: Machines and developers.

Machines: Want speed and so and so. Developers: Want a good API design.

George Orwell - Politics and the English Language. Programmers take abstract ideas and make them into concrete knowledge.

Good writing is a symptom of good thinking. Ex: The name of the Patriot Act was written intentionally to obscure, why not just call it the "Expanded Surveillance Act".

## Orwell's stuff:

1. Never use a metaphor, simile, or other figure of speech which you are used to seeing in print.
2. Never use a long word when a short one will do.
3. If it is possible to cut a word out, always cut it out.
4. Never use the passive when you can use the active.
5. Never use a foreign phrase, a scientific word, or a jargon word if you can think of an everyday English equivalent.
6. Break any of these rules sooner than say anything outright barbarous.

# Five Guiding Principles

1. Minimalism: In the Zencoder API there are 150 things that you can pass. But you can send a single parameter and it chooses smart defaults about resolution and bitrate and other stuff.
2. A good API will get out of the way. Just like good language will get out of the way. Ex: Use REST. If you use an API that isn't REST, then you immediately ask what is rest. Be consistent, we know `401 Unauthorized` and `403 Forbidden`.
3. Design for extremes. How would a power user use this product? Or how would a Windows user use an API? Or how would someone who doesn't even know about APIs use this product? How would a user use your API under huge usage (people do infinite loops to test the API). How would people who think they know how to program but really don't use your app?
4. Be predictable.
5. Excite users.

## Dieter Rams

Dieter Ram's juicer, as described by Jonathan Ive, was like the best juicer ever.

Good design makes a product useful: They make things functional.

Good design is beautiful. You know what sucks? Hungarian notation.

Good design makes something understandable. If user has invalid API key, don't return 500 error, don't just return 401 error, add an error message of `api_key not found`, or `api_key may not include spaces`, for validation. Or why not do `api_key not found. Please log in to example.com/account/api to retrieve your API key.`

Other: If they forgot the comma in the request, why not add a validator, such as `JSON is not valid, Syntax error unexpected TSTRING, expecting '}'`.

Good design is honest. When you have 200 OK, don't put an error cause it succeeded. 

For APIs, just start with a namespace of `https://api.example.com/v1`. When you have to make a change, at least its versioned.

BTW, GUIDs are better primary keys than incrementing numbers.

Ex: `curl https://api.stripe.com/v1/charges -u my_api_key -d amount=20 -d currency=usd -d customer=12093155

This is the Stripe API for charging customers. It is like super predictable. API to know who is accessing, amount, the currency, and the customer who will be charged.

# The Kano Model

There are four different ways to classify a product or a feature.

**Basic needs, need to have.** If you don't have a basic need, people are going to be dissastisfied. If you do have it, people are not going to care. In API design, a basic need is uptime. If your service is down, everyone cares. If your service is up, then people don't even think about it.

Performance needs (one-dimensional): If you don't have them, people are upset. If you are average, people don't notice, if you are good, people love it. In API design, speed, quality (ex: video resolution in transcoding), cost.

Indifferent: People don't care. Ex: Non-core features, undocumented features.

Delighters: Attractive and exciting. If you don't have these, people don't care. If you have these, people are interested. In our API design, it is the `API builder`. Good support is also a delight feature. Other examples: Intelligent defaults, documentation that is actually populated with your account, an API wrapper like a Ruby library, request logs.

Good APIs: Stripe, Twilio, SendGrid.

