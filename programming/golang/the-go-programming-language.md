# The Go Programming Language

- From C: Expression syntax, control flow, basic data types, call-by-value parameter passing, pointers, and C's emphasis on programs that compile to efficient machine code.
- Package syntaxes.
- Communicating sequential processes (CSP). A program is a parallel composition of processes that have no shared state; the processes communicate and synchronize using channels.
- With constant pressure to add features and options and configurations, and to ship code quickly, it's easy to neglect simplicity, even though in the long run simplicity is the key to good software.
- Few features:
  - *No numeric conversions, no constructors/destructors, no operator overloading, no default parameter values, no inheritance, no generics, no exceptions, no macros, no function annotations, no thread-local storage.*
  - Type system: it's there, but smaller than other languages.
- Built-in data types and it's expected to work without explicit initialization or implicit constructors. Go's aggregate types hold their elements directly, requiring less storage and fewer allocations and pointer indirections.
- Go's standard library: "batteries included". Provides building blocks and APIs for I/O, text processing, graphics, cryptography, networking, distributed apps, standard file formats and protocols.

# 1. Tutorial

- `go run helloworld.go`
- `go build helloworld.go` => compiles to something that can be run (`hello`)
- Package where it belongs to, then which packages that it imports, then declaration.
- Can't import something and not use it (!!!).
- `gofmt` tool rewrites code into the standard format.
