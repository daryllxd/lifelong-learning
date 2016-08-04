## Programming Elixir

- Immutability--running multiple threads accessing one array, not sure what the state the array would be at a certain point (in most languages, methods receive an array by reference).
- Elixir: everything is immutable. *Once a variable references a list such as [1,2,3], you know it will always reference those same values until you rebind the variable.*
- This fits in nicely with the idea that programming is about transforming data. When we update [1,2,3], we don't hack it in place. Instead we transform it into something new.
