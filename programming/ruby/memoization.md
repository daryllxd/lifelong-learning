## The Basics of Ruby Memoization
[link](http://gavinmiller.io/2013/basics-of-ruby-memoization/)

- Perform some work, store the work result, use the work result for future calls.
- In `def current_user User.find(session[:user_id]) end`, you will see cache hits many times, which means that Rails is returning the cached results of the SQL query. So we know that there are multiple calls to `current_user` occurring.
- Simple memoization: `def @current_user ||= User.find(session[:user_id])`, to confirm that it worked `User` should not get hit multiple times.

#### Memoize when you have:

- Duplicated database calls
- Expensive calculations
- Repeated calculations that don't change

#### Do not use when you have methods that take params.

```
# incorrect memoization
  def full_name(first_name, last_name)
    @full_name ||= "#{first_name} #{last_name}"
  end

  puts full_name('Billy', 'Bob')
# => "Billy Bob"

  puts full_name('Sally', 'Sue')
# => "Billy Bob"
```

#### Do not use when you have methods that use instance variables.

- We save `@full_name` on the first `@first_name` call, even if `@first_name` is changed, `@full_name` has already been memoized.

```
  def full_name
    @full_name ||= "#{@first_name} #{@last_name}"
  end

  @first_name = 'Billy'
  @last_name = 'Bob'

  puts full_name
  # => "Billy Bob"

  @first_name = 'Sally'
  @last_name = 'Sue'

  puts full_name
  # => "Billy Bob"
```

## Advanced Memoization in Ruby
[link](http://gavinmiller.io/2013/advanced-memoization-in-ruby/)

```
@current_user ||= if ...
                  else ...
                  end
@current_user ||= begin ...
                  end
```

Conditional assignment will run if the variable `@foo` is falsey. If so, then wrap it in `if_defined?`.

`@current_user ||= {calculation } if_defined? @current_user

Memoizing with parameters can be done, but it has to be like a hash:

```
class A
  def initialize
    @results = {]
  end

  def expensive_operation(p1)
    return @results[p1] unless @results[p1].nil? # Access value at "cached" p1 key

    @results[p1] = begin ... end                 # Populate hash for p1 key
  end
end
```

