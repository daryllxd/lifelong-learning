## Creational Design Patterns
[Reference](https://practicingruby.com/articles/creational-design-patterns)

- Singleton: for global state/behavior, configuration data, logging support, other similar needs. You have this in Daryllxd Growler.
  - No `new` method, but there is an `instance` method.
  - Real benefit: the instance is lazy evaluated, and enforces the single instance limitation.
- Multiton:
  - Once instance of an object for each unique key in use, limiting the objects that need to be created.
  - For Prawn, since the initialization cost for a font is high, you have some kind of mapping mechanism which is mapped to singletons.

``` ruby
class Font
  def [](name)
    instances[name] ||= new(file_names[name]) # Get the stored one or create a new instance of the Font in the mapping
  end
end
```

- Factory Method: An abstraction on top of object creation so that directly working with its constructor is no longer necessary.
- Abstract Factory: You have concrete object factories, but you have abstract factories.

