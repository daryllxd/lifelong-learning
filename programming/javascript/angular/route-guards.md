# Angular Authentication: Using Route Guards
[Reference](https://medium.com/@ryanchenkie_40935/angular-authentication-using-route-guards-bf7a4ca13ae3)

- Angular's route guards are interfaces which can tell the router whether or not it should allow navigation to a requested route.
- Implementation wise, they check for a `true` or `false` return value from a class which implements the given guard interface.
- Consider: checking JSON Web tokens and expiring them when the token is expired.
