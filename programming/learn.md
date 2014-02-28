
2-26
> Prefer Git over SVN because branches are so cheap so it is easier to do the workflow of doing stuff in the branch then moving to master afterwards.
> Arranging models: includes, constants, attrs, validations, relationships, `accepts_nested_attributes_for`
> Feels good to regex the rework summarization thing.
> Read up on replacing conditional with polymorphism. This will def help on the authorizations and differing user levels in Radiograph. Learned on how views are interpolated by Rails' AR.
> Read up on STI vs. polymorphism on modelling inherited classes. Though I took a long time it is worth it, I think.
> Read up on CanCan but I'm not going to use it yet. Primarily because there are not yet that many features.
> There is such a thing as an abstract AR::Base class.
> Model generators also create a migration
> Delegates make methods available across models.
> to create a table: rails generate migration CreatePosts
> attr_accessible is so that we can't let users update values
> Don't forget the confirm thing on the link_to when you have to delete: `link_to "Delete", post_path(@post), :method => :delete, :confirm => "Are you sure?"`
> Active Record: Post.find(478, 1134) to get the posts in a range. Then Post.find(100..105.to_a to get the posts in the reverse ragnge.)
> Rake task in lib/tasks to do stuff. In learn.
> ActiveRecord stuff: order, the `find_each` and `find_in_batches` to do some chunking, 
> Remember eager loading, `Post.includes(:user).limit(10)`, not `Post.limit(10)` because the latter will have n+1 database queries.
> Default scope and unscoped.
> Post.minimum("comments")
> To get the last in a strng, you have to do `.[-1]`.
> When variables are assigned, the variables must be on the left, follow by an equal sign, followed by the value.
> The `**` is used for exponents. `2 ** 3 #=> 8`.
> Integer division = you end up dropping the decimals.
> Assigning things to true = you get an error because it is a reserved word.
> `a.ord` to get the ordinal number.
> `120.chr` to get the character value.
> To sub the first 2 letters of a string: `"String".sub(/^../, "Change")`
> `"String".scan(/\d+/){ |x| puts x }` for looking for styuff
> Splitting an string to an array: `.split`, `.scan(/\w+/)`, `%w`.
> Hash deleting a key: `x.delete(:a)`.

2-27
> Declare layout at top of the controllers
> Nearly all of the controllers serve as the gatekeeper to the models. Just a few (home) direct traffic and stuff.
> The helpers are used only for view things. Each helper can be accessed from different parts of the app.
> Be generous in splitting out partials on the view.
> Faker::Name.name kasi!
> No needto put delegate if it doesnt make sense.
> The render thing
> Including modules in controller specs.
> Using `let` in specs.
> The controller spec was failing because of devise!
> Rebinding tmux.
> Add cdpath to the shell.
> Seth Prietsbach: THere are a lot of things to solve. As aparent you should push your kids, you are their life coach.

2-28
> Hirb
> The basics of Vim, vimtutor to lesson 2.



WTF is Git rebase

create m/user.rb, name, email

rails generate model Document title:string, body:string, approver:references(user)


user has_many :documents, as: approver

document belongs_to :user
