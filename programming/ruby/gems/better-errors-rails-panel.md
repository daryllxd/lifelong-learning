# RailsCasts #402 Better Errors & RailsPanel

`better_errors`: It's just so useful, this makes the exception page nicer. Put in development so users won't see your implementation.

You add the `binding_of_caller` gem so you can have a REPL and see the local and instance variables in the code. You can see things in the stack trace too.

You can click the file to edit the file.

When debugging JS stuff, you can go to `localhost:3000/__better_errors` to see the last error recorded.

RailsPanel: Install in chrome, then add `meta_request` to the Gemfile development group. This shows: METHOD, DB 
