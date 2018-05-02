# Query Objects
[link](https://github.com/infinum/rails-handbook/blob/master/Design%20Patterns/Query%20Objects.md)

#### Model solution

``` ruby
class Article < ActiveRecord::Base
  scope :published, -> { where(published: true)  }

  def with_view_count_greater_than(min_view_count)
    where('view_count > ?', min_view_count)
  end

  def with_author_with_first_name_like(first_name)
    joins('LEFT OUTER JOIN users ON users.id = articles.author_id')
      .where('users.first_name LIKE ?', "#{first_name}%")
  end
end
```

# Essential Ruby On Rails patterns — part 2: Query Objects
[Reference](https://medium.com/@blazejkosmowski/essential-rubyonrails-patterns-part-2-query-objects-4b253f4f4539)

- As a rule of thumb, if scope interacts with more than one column and/or joins in other tables, it should be considered to be moved to query object — as a side-effect we can limit amount of scopes defined in our models to a necessary minimum.
- Naming convention: suffix query name with `Query`, so we are constantly aware that we're dealing with a query, not an AR descendant. Pluralized name?
- `.call` name for the relation.
- Accept that relation like object as a first object.
- Provide a way to add extra options.
- Group them in namespaces.
- Example:

``` ruby
module Users
  class WithRecentlyCreatedProjectQuery
    DEFAULT_RANGE = 2.days

    def self.call(relation = User.all, time_range: DEFAULT_RANGE)
      relation.
        joins(:projects).
        where('projects.created_at > ?', time_range.ago).
        distinct
    end
  end
end
```
