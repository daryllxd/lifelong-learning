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

