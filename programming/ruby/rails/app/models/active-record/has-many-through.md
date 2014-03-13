## `has_many_through`, Part I

The `has_many :through` association allows you to specify a one-to-many relationship indirectly via an intermediate join table. In fact, you can specify more than one such relationship via the same table, which effectively makes it a replacement for `has_and_belongs_to_many`. The biggest advantage is that the join table contains full-fledged model objects complete with primary keys and ancillary data.

Migrations:

    create_table "books" do |t|
        t.column "title", :string
        t.column "isbn", :string
        t.column "year", :integer
    end

    create_table "contributors" do |t|
        t.column "name", :string
    end

    create_table "contributions" do |t|
        t.column "book_id", :integer
        t.column "contributor_id", :integer
        t.column "royalty", :float
    end

Model classes:

    class Book < AR::Base
        has_many :contributions, :dependent => true
        has_many :contributors, :through => :contributions
    end
    class Contributor < AR::Base
        has_many :contributions, :dependent => true
        has_many :books, :through => :contributions
    end
    class Contribution < AR::Base
        belongs_to :book
        belongs_to :contributor
    end

`Contribution` is dependent on both the `book` and the `contributor`, since it doesn't make sense for a contribution to exist without having both of these columns in the table. 

#### Queries:

    Contributor.find(1).books.first.year
    Book.find_by_year(1996).contributors.first.name
    Book.first.contributions.size
    Contributor.first.contributions.royalty
    Contributor.first.find_by_year(1996).title

## New Association Goodness in Rails 1.1, part 2

Assume that the old table `contributions` has a `role` folder, where the contributor can be an author, editor, etc.

In order to access contributors by role, we can do this:

    class Contributor < AR::Base
        has_many :contributions, :dependent => true
        has_many :books, :through => :contributions do
            def by_role(role)
                find(:all, :conditions => ["contributions.role = ? ", role])
            end
        end
    end

So we can do this: `books = josh.books.by_role("author")` which looks for the books where Josh contributed but only those where he contributed as an author.

## The other ways `:through`
 
Use the `:source` option instead of a `:class_name` to specify the associated model when the default model isn't what you want.

    class Meal < AR::Base
        has_many :dishes
        has_many :ingredients, :through => :dishes
    end
    class Dish < AR::Base
        belongs_to :meal
        has_many :ingredients
    end
    class Ingredient < AR::Base
        belongs_to :dish
    end

If you want to go shopping, `@meal.ingredients` gets your shopping list.

If you want something else, though...

    class Meal < AR::Base
        has_many :dishes
        has_many :ingredients, :through => :dishes
        has_many :meats, :through => :dishes, :source => :ingredients, :conditions => "ingredients.kind = 'meat'"
        has_many :veggies, :through => :dishes, :source => :ingredients, :conditions => "ingredients.kind = 'vegetable'"
    end

- http://blog.hasmanythrough.com/2006/2/28/association-goodness
- http://blog.hasmanythrough.com/2006/2/28/association-goodness
