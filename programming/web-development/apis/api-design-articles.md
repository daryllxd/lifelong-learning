## 5 Golden Rules for Great Web API Design
[Reference](https://www.toptal.com/api-developers/5-golden-rules-for-designing-a-great-web-api)

- Since programmers have technical sophistication, they are likely to be as critical of your API as you would be of theirs, and they will enjoy critiquing it.
- API designers: "what does this need to do", API users: "how can I spend the bare minimum of effort to get what I need out of this API?"
- *Ask yourself the questions you would ask if you were your own user.*

### Rules

- *Documentation.* Easy part: the methods themselves. Great docu: usage examples and tutorials. This is what helps the user understand your API and where to start. Better if you have practical stuff rather than just list the classes/methods. Good examples: Twilio, Django, Mailchimp.
- *Stability/Consistency.* Facebook always deprecates their APIs. Do versioning so people can rely on version 1 working and can upgrade to any subsequent version when they're ready to do so.
- APIs need to be internally consistent.
- *Flexibility.* Few APIs will support a variety of output formats, but will only support specifying the format in the URL itself. Allow a variety of input formats (POST variables and JSON at least).
- *Security.* Nobody should inspect the calls to your API, steal the token from your user, and use it for themselves. Make sure that only authorized users an run commands like deleting
- *Ease of adoption.* It should work the first time, every time. Language-specific libraries.

# Project Guidelines
[Reference](https://github.com/elsewhencode/project-guidelines#9-api)

- Resource, collection, URLs. Resource: has data, gets nested, and there are methods that operate against it. Collection: a group of resources. URL: identifies the online location of resource or collection.
- Plural to nouns in collections.
- Verbs for non-resources. Only use nouns in your resource URLs.
