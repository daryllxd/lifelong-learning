## Query Objects
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

