Weirich convention for choosing `{}` and `do...end` in blocks:

- If blocks are evaluated for their result value, do braces.
- If blocks are evaluated for their side effects, do do-end.

## Why OOP?
- This makes apps easier to change.
- Rails is reaching a point in time where a lot of projects are starting to mature.
- Part of the nature of change is that you don't know what is going to change. So don't think too much about what will change and what will not.

## OOP Principles
- Small objects with a single, well-defined responsibility.
- Small methods that only do one thing.
- Limiting the number of types an objects collaborates with.
- Strictly limiting the use of global state and singletons.
- Small object interfaces with simple method signatures.
- Preferring composition over inheritance.

## Yet Another Freaking Blog App

    $ rails new bloog --skip-test-unit --skip-prototype
    #=> root to: "blog#index"
    $ rg controller blog index
    #=> Put @blog title and subtitle in the index.html.erb
    #=> Instantiate @blog in controller
    #=> Create Blog model to have accessors

Add `:entries` to `Blog` so we can keep track of all entries.

    class Blog
        attr_reader :entries

        def initialize # No entries to begin with
            @entries = []
        end
    end

Write the code you want to exist in the controller, before actually writing it in the model.

    def index
        @blog = Blog.new
        post1 = @blog.new_post
        post1.title = "thing"
        post1.body = "thing story"
        post1.publish
    end

Making new entries: Because we want to keep out tests isolated, and we only want to test one model at a time, we make the process by which new posts are created easy to swap out:

    class Blog
        attr_writer :post_source

        private
        def post_source
            @post_source ||= Post.public_method(:new)
        end
    end

WTF is `public_method(:new)`?

This instantiates a `call`-able Method object. This is different from `Post.new` because `Post.new` returns the Post. `public_method(:new)` returns a method, which you can then call new on.

    Post.new is equivalent to Post.public_method(:new).call

To actually execute the new post method though

    class Blog
        def new_post
            Post.new.tap do |p|
                p.blog = self
            end
        end
    end

`tap` means you have a block "act on" the method's caller and return the object called. It's like you can insert the code anywhere without disturbing the data.

### Stubbing out ActiveModel

``` ruby
def stub_module(full_name)
  # If you do ActiveModel::Naming,
  # You create a module ActiveModel, then you create a module ActiveModel::Naming
  full_name.to_s.split(/::/).inject(Object) do |context
    begin
      context.const_get(name)
    rescue NameError
      context.const_set(name, Module.new)
    end
  end
end
```

- On the backlash vs Dependency injection: It's just a way to pass an object's collaborators in from the outside.

### Exhibit Pattern

- Logic in views is almost always bad news.
- This thing lives in the middle of Views and Models. It's like Decorator, but supercharged.
- Pass-through object, it forwards things to the model, and it must know how to use the context to render an appropriate post body partial.
- You have to decide where you put your conditionals in. Easier to put the conditionals in a helper somewhere rather than put them in view code.

``` ruby
require 'delegate'

class PicturePostExhibit < SimpleDelegator
  def initialize(model, context)
    @context = context
    super(model)
  end

  def render_body
    @context.render(partial: "/posts/picture_body", locals: {post: self})
  end
end
```

- On presenters:
  - Class representation of the state of the view. An architecture that uses the Presenter pattern provides view specific data as attributes on an instance of the Presenter.
  - A logical screen structure that is suggestive of the display elements, yet contains no HTML.

- Exhibit Object Characteristics
  - Wraps a single model instance.
  - True decorator: all unrecognized messages are passed through to the underlying object.
  - Brings together a model and a context. Context means either controller or view.
  - Encapsulates

- Skipped this part.

### Making the Data Stick Around

- By inheriting from `AR::Base`, you declare that your model supports `#find`. This supports `:id, :first, :last, :all`.
- Because of this, developers resort to running their unit tests as integration tests (constantly collaborating with the database).
- Stop treating ActiveRecord as the backbone of our model classes and program as if AR was merely a private implementation detail.
- Saving: not in the actual AR object, but in another part.
- Separating out integration tests:
  - Puts a clear divider between the tests that verify that our database interactions are doing what we think they are doing, from the tests that specify what logic our models should implement.
- Stub out database with `NullDB`.
- Data access object: the AR object is kept intentionally "skinny", containing only associations, scopes, and validations. The business model object delegates its storage to the AR object, but handles everything else internally. AR becomes a way to get at the stored data, and nothing more.
- Fig Leaf library: hides methods.

### Default content

``` ruby
before_validation :set_default_body

or we can

def save(*)
  set_default_body
  super
end
```

- Observer pattern: for enabling other objects to be notified on an object's life cycle events.
- JSON representation of a blog post:
- AR `composed_of`?

### Tags

- Skipped

### Respecting controller privacy

### Jealously guarding collections

- Compare:

``` ruby
library.books.find_by_isbn('hehe')

library.borrow_book('hehe', library_card)
```

- When client code accesses an object's children through a collection object, rather than through the parent object, the parent is no longer the mediator. We no longer have the advantages of:
  - Controlling access based on authorization information.
  - The opportunity to preload child objects with a reference back to their parent.
  - The opportunity to keep a list of child objects in the parent.
  - The ability to decide the concrete type of child object to return.

### Toward self-rendering objects

### Scenarios

- You're beginning a new application: work from the outside in.
- You need business objects that don't exist yet in order to flesh out views: use placeholder objects.
- You're writing view templates: respect controller privacy by accessing instance variables using accessor methods.
- A view requires AR-style object to function correctly.
- Use AM to make non-ActiveRecord models compatible with Rails helpers.
- Writing business models.
- Start with plain objects. Leave persistence for later on. Listen to the language of the domain. Organize objects into a roughly tree-like structure with a single root. Models should mediate access to their children.
- An object needs a way to make new instances of a model. Don't hard-code the dependency on another class. Inject a callable factory that the object can use to manufacture objects. Use sensible defaults to keep client code from having to always supply the dependency.
- A model collaborates with another model or a collection of other models. Don't hard code assumptions about the class of a collaborator.
- Tests: isolated from Rails and from classes other than the one under test. Stub out modules and classes that the objects under test reference but don't actually use in the context of the test. Use DI so you can insert stubs. Inject only the minimum required interface.
- Need validations: use AM::Validations.
- Exhibit object for different states of the model.
- Presenter pattern to aggregate the needed models into a single object representing the whole view.
- Need to output similar chunks of HTML in more than 1 view: helper.
- Need to persist a model to the database: Treat AR as a private model dependency.
- Test database query functions correctly: Use an integration test separate from your isolated unit tests.
- Prefer to override AR methods rather than using callbacks.
- You want to add a child collection without adding a new table: use composition.

### Conclusion

- Most of the patterns have already been solved in the Smalltalk book. Likewise, Rails didn't invent web programming patterns, it just stripped away all the ceremony and boilerplate.
