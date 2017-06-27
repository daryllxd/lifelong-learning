## RubyConf 2016 - Keyword Args — the killer Ruby feature you aren't using by Guyren G. Howe
[Reference](https://www.youtube.com/watch?v=4e-_bbFjPRg)

``` ruby
def foo(x, y=3, *rest, opt2:, opt1: nil, **c, &block)

Positional required
Positional optional
Positional arg splat
Kwarg required
Kwarg argument
Kwarg splat
Block
```

- Keyword arg can refer to an earlier keyword arg for its value.
- Positional args before kwargs, if your last positional arg is a hash, Ruby can get confused.
- Clearer: Unless you work with `Net::HTTP.new('server', 732, 'other_server.com', 872, 'admin', 'monkey123')`, you won't know what this is.
- Programming Ruby book: because we all use the conventions in this book, it is easy for us to communicate with other Ruby programmers. Problem is, it's an old (15 years) book.

``` ruby
Net::HTTP.new(
  server: 'server.com',
  port: '732',
  proxy: 'other_server.com'
)
```

- The clear advantage to kwargs = they are more flexible.
- Adding arguments to easier in kwargs.
- "Loose coupling" and "dependency injection".
- "Context funnel": Receive contexts with this type of method signature:

``` ruby
def (required_argument, **context) -> This context can be passed and passed in the call chain.
```
