## Ruby style guide
[Reference](http://shopify.github.io/ruby-style-guide/)

- Make all lines of your methods operate on the same level of abstraction.
- Code in a functional way.
- Do not program defensively.
- Do not mutate arguments unless that is the purpose of the method.
- Do not monkey patch core classes when writing libraries.
- UTF-8 as the source file encoding.
- When chaining methods on multiple lines, indent successive calls by one level of indentation.

### Exceptions

``` ruby
raise 'message' over raise RuntimeError, 'message'

raise SomeException, 'msg' over raise SomeException.new('msg')
```

- Don't return from an `ensure` block.

### Collections

``` ruby
hash.key(:test) and hash.value(:test) over hash.has_key?(:test) and hash.has_value?(:test)
```
