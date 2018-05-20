# Making sense of ActiveRecord joins, includes, preload, and `eager_load`
[Reference](http://blog.scoutapp.com/articles/2017/01/24/activerecord-includes-vs-joins-vs-preload-vs-eager_load-when-and-where)

# Preload, Eagerload, Includes and Joins
[Reference](https://blog.bigbinary.com/2013/07/01/preload-vs-eager-load-vs-joins-vs-includes.html)

- Joins:
  - Filtering records, not accessing records from a relationship.
  - Ex: fetching blog posts with a comment authored by Derek.
    - `Post.joins(:comments).where(:comments => {author: 'Derek'}).map { |post| post.title }`
    - You don't access the comments table.
  - Does not prevent N+1, because you don't load the data from the relationship.
  - This overrides joins applied by `includes` or `eager_load`.
  - Brings assoc data using `INNER JOIN`.
    - Avoid duplication by using `DISTINCT` (`User.joins(:posts).select('distinct users.*').to_a`). And if you want to use attributes from the `posts` table, you need to include them in the SELECT statement when joining.

- `includes`
  - Prevents N+1, because it loads all the records of the parent and all of the records referenced as arguments in the `includes` method.
  - AR doesn't make a decision on whether one query or a single join query based on performance is faster. If two queries are being used,
  - Return all `Post` records with a `Comment` by Derek, and just those comments. `Post.includes(:comments).references(:comments).where(comments => {author: 'Derek'}).map { |post| post.comments.size }`
  - You can `includes` the nested relationships too.

- `preload`
  - I use `preload` versus `includes` if I know using a LEFT OUTER JOIN to load a relationship is slower.

- `eager_load`
  - If `includes` is slow using two separate queries, this can force a single query. You can then check performance then.
  - Loads all associations using `LEFT OUTER JOIN`.
