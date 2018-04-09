# Check if a value exists in an array in Ruby
[Reference](https://stackoverflow.com/questions/1986386/check-if-a-value-exists-in-an-array-in-ruby)

- You can use `*` to check array membership in a `case` expression.

``` ruby
case element
when *array
  ...
else
  ...
end
```

- Use `Set` when calling it an `include?` on an equivalent Array.
- There is an `in?` method in `ActiveSuport`.
- The methods to find elements in an array:

``` ruby
array.include?(element) # preferred method
array.member?(element)
array.to_set.include?(element)
array.to_set.member?(element)
array.index(element) > 0
array.find_index(element) > 0
array.index { |each| each == element } > 0
array.find_index { |each| each == element } > 0
array.any? { |each| each == element }
array.find { |each| each == element } != nil
array.detect { |each| each == element } != nil
```

# Advantages of Set in Ruby
[Reference](https://stackoverflow.com/questions/36548938/advantages-of-set-in-ruby)

- When doing an `include?`, Set and Hash is way more efficient than Array.
- Set also has things like `superset?`, `intersect?`, `subset?`.
- Arrays:
  - Can have duplicated elements
  - Maintains order
  - Can be iterated over in order
  - Searching for element is slower
  - Maintaining uniqueness of elements is slow
- Sets:
  - Can't have duplicated elements
  - Don't have ordering
  - Searching for element is fast, and unique
- ***If you want to enforce uniqueness and you don't need any ordering - sets are your best choice. When you don't really care about uniqueness and ordering is important - Array is your choice.***

# 7 daily use cases of Ruby Array
[Link](http://blog.8thcolor.com/en/2014/02/7-daily-use-cases-of-ruby-array/)

1. Check if one Array has all elements of another? `array_of_imported_emails - existing_emails`.empty?
2. Elements common to both arrays? `first_array & second_array`
3. Merging two Arrays without duplicating entries? `first | second`
4. Sort by a key, ex: location? `data.sort_by {|hsh| hsh[:location]}`
5. Keep a product unique with respect to one attribute? `products.uniq &:category_id`
6. Filter an Array with a String? `books.grep(/[Rr]ails/)`
7. How to always get an array?

Need to return [], [1], or [1,2]. Always an array.

    def method
       ...
       [*products] or Array(products)
    end


Get last element:  A[-1] or A.last

#### Construction:

## Array.new(initial size, default object) (default object is the same object referenced)

## Create an array with separate objects: a block can be passed instead
## Multi-dimensional: Array.new(3) {Array.new(3)}
## If you don't od this, then you will have the same value for all the elements of the array

#### Accessing

    a = [1, 3, 5, 7, 9]

    # Ranges: Two periods = include ending
    a[1..3] = [3, 5, 7]
    # Three periods = don't include ending
    a[1...3] = [3, 5]

    arr[2], arr[2, 4], arr[-9, 3], arr[1..4]
    arr.at(0) #this won't raise an error

    arr.fetch(100) => raises an error if out of bounds
    arr.first, arr.last

    arr.take(3) => returns the first n elements
    arr.drop(3) => gets all ofthe elements after n elements have been dropped

#### Obtaining Information

    arr.length, count, size = same thing
    arr.empty? => check if empty
    arr.include?('konqueror') => check if item is included

#### Adding

    arr << 5
    arr.push(5), arr << 5 => add to end
    arr.unshift(0) => add to any position
    arr.insert (3, 'apple') => add at position 3

#### Removing

[What is the easiest way to remove the first element from an array?](http://stackoverflow.com/questions/3615700/ruby-what-is-the-easiest-way-to-remove-the-first-element-from-an-array)

    head, *tail = [1, 2, 3, 4, 5]
    #==> head = 1, tail = [2, 3, 4, 5]

    arr.pop => remove last element and returns it
    arr.shift => retrieve and remove the first item
    arr.delete_at(index) => deletes
    arr.delete(delete somewhere)
    [1,2,3,4,5,6,7,8,9].delete_if{|i| i % 2 == 0}         # delete if
    arr.compact and arr.compact! => removes ni value
    arr.uniq and arr.uniq! => removes duplicates

#### Iterating

    arr.each {|a|} => leaves the array unchanged
    arr.reverse_each {|a|} => reverse order
    arr.map and arr.map! => modifies array

#### Selection

    arr.select {|a| a > 3}
    arr.reject {|a| a > 3}
    arr.drop_while {|a| a < 4}
    arr.delete_if
    arr.keep_if

#### Updating

    a = [1, 3, 5, 7, 9]
    a[2, 2] = 'cat' -> [1, 3, "cat", 9] #The 2 elements at the 2 position become 'cat'
    a[2, 0] = 'dog' -> [1, 3, "dog", "cat", 9] #Since 0, replace 2 position with 'dog'
    a[1, 1] = [9, 8, 7] -> [1, 9, 8, 7, "dog", "cat", 9] #Replace 1 position (length 1) with the array
    a[0..3] = [] -> ["dog", "cat" 9] #Clear from 0 to 3 (inclusive)
    a[5..6] = 99, 98 -> ["dog", "cat", 9, nil, nil, 99, 98] #Pad with null if elements in begin don't exist yet

#### Destructive
    arr.select! {|a| a > 3}
    arr.reject!

#### Public instance methods
    ary & other_ary => combines the elements common to the two arrays, excluding duplicates

    ary * int => triples the array size and fills
    [1, 2, 3] * 3 => [1, 2, 3, 1, 2, 3, 1, 2, 3]

    ary * str => "join"
    [1, 2, 3] * ',' => "1,2,3"

    ary + other_ary => concatenates the arrays
    ary - other_ary => subtracts the arrays

    arry << obj -> push to end of array, returns the array itself to several appends may be chained together
