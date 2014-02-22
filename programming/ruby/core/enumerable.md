## Enumerable

> The `Enumerable` mixin provides collection classes with several traversal and searching methods, and with the ability to sort. The class must provide a method `each`, which yields successive members of the collection.

#### Filtering

`all?`: Returns true if block never returns false or nil.
    
    %w[ant bear cat].all? { |word| word.length >= 3 } #=> true

`any?`: Returns true if block HAS a true
    
    %w[ant bear cat].any? { |word| word.length >= 4 } #=> true

`chunk`: Better to use if the array is sorted. Literally creates chunks nung mga magkakatabi na pasok sa condition.

`detect(ifnone = nil){|obj| block }`: Return first match, if no object matches, call ifnone. Aliased as find.

`find_all{|obj| block}`: Filter out all that follows the condition.
    
    (1..10).find_all { |i| i % 2 == 0 } # Get all evens

`find_index(value), find_index {|obj| block }`: Returns the index of the first matcher.

`first, first(n)` (aliased as `take(n)`): Get first n elements.

`grep(pattern)`: Returns an array of very element for which Pattern === element.

    IO.constants.grep(/SEEK/) #=> [:SEEK_SET, :SEEK_CUR, :SEEK_END]

`include?(obj)`: Return if enum contains obj, equality is tested via `==`.

`reject{ |obj| block }`: Return all elements for which the given block returns false.

`partition { |obj| block }`: Returns two arrays, the first containing the elements of enum for which the block evaluates to true, the second containing the rest.

`select { |obj| block }`: Return array containing elements who satisfy condition.

`take_while { |arr| block }`: Pass element to the block until the block returns `nil` or `false`, then stops iterating and returns an array of all prior elements.

    a = [1, 2, 3, 4, 5, 0]
    a.take_while { |i| i < 3 }   #=> [1, 2]

#### Iterate over

`collect` (aliased as `map`): Returns a new array with the results of the block once for every element in the enum.

`collect_concat` (Aliased as `flat_map`): Returns a new array with the concatenated results of running block once.
    
    [1, 2, 3, 4].flat_map { |e| [e, -e] } #=> [1, -1, 2, -2, 3, -3, 4, -4]

`cycle(n=nil){}`: Continuously call the block for each element of enum repeatedly n times or forever if none or nil is given as n. If no block is given, an enumerator is returned.

    [a, b, c].cycle { |x| puts x }  # print, a, b, c, a, b, c,.. forever.
    [a, b, c].cycle(2) { |x| puts x }  # print, a, b, c, a, b, c.

`each_cons(n){}`: Iterate the given block for each element and the next n elements.
    
    (1..10).each_cons(3) { |a| p a }
    # outputs below
    [1, 2, 3], [2, 3, 4], ... [8, 9, 10]

`each_slice(n){}`: Iterate over each slice of `<n>` elements. If no block is given, return an enumerator.
    
    (1..10).each_slice(3){|a| p a} [1, 2, 3] [4, 5, 6] [7, 8, 9] [10]

`each_with_index`: each but has an index passed in

`each_with_object(obj){|elem, obj| a << i * 2}`: Iterate over the given block for each element with an arbitrary object, and reutrn the initially given object.
    
    (1..10).each_with_object([]) { |i, a| a << i*2 }
    [2, 4, 6 ... 20]

>What happens is that the object a, which is initially a [], has each of the indices multiplied by 2 appended to i.

`reverse_each(*args){ |item| block }` # Builds a temporary array and traverses that array in reverse order.

#### Finding out something

`count`, `count {|obj| block }`: Count objects that qualify

`max`, `max{ |a, b| block }`: Return the object in enum using the comparator.

`minmax {|a, b| block }`, `minmax_by { |a, b| block }`: Return 2 element array which contains the minimum and maximum value in the enumerable.

`none?[{ |obj| block }]`: Return `true` if the block never returns `true` for all elements.

    %w{ant bear cat}.none? { |word| word.length == 5 } #=> true
    [nil].none?                                        #=> true

`one?[{ |obj| block }]`: Return `true` if the block returns `true` exactly once.

#### Perform operation

    (1..7).to_a ????

`inject(initial){ |memo, obj| block }`: My personal favorite! So verbatim that shit. :)

Combines all elements of enum by applying a binary operation, specified by a block or a symbol that names a method or operator.

If you specify a block, then for each element in enum the block is passed an accumulator value (memo) and the element. If you specify a symbol instead, then each element in the collection will be passed to the named method of memo. In either case, the result becomes the new value for memo. At the end of the iteration, the final value of memo is the return value for the method.

If you do not explicitly specify an initial value for memo, then the first element of collection is used as the initial value of memo.
    
    # Sum some numbers
    (5..10).reduce(:+)                             #=> 45
    # Same using a block and inject
    (5..10).inject { |sum, n| sum + n }            #=> 45
    # Multiply some numbers
    (5..10).reduce(1, :*)                          #=> 151200
    # Same using a block
    (5..10).inject(1) { |product, n| product * n } #=> 151200
    # find the longest word
    longest = %w{ cat sheep bear }.inject do |memo, word|
       memo.length > word.length ? memo : word
    end
    longest                                        #=> "sheep"

`reduce(initial){ |memo, obj| block }`: Near to reduce.

    # Sum some numbers
    (5..10).reduce(:+)                             #=> 45
    # Same using a block and inject
    (5..10).inject { |sum, n| sum + n }            #=> 45

`sort { |a, b| block }`, `sort_by`: Return a sorted array, block should return -1, 0, and +1, depending on the comparison between a and b.

    %w(rhea kea flea).sort          #=> ["flea", "kea", "rhea"]
    (1..10).sort { |a, b| b <=> a }  #=> [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]

`zip(arg, ...)`: An array of array.

    a = [ 4, 5, 6 ]
    b = [ 7, 8, 9 ]

    [1, 2, 3].zip(a, b)      #=> [[1, 4, 7], [2, 5, 8], [3, 6, 9]]
    [1, 2].zip(a, b)         #=> [[1, 4, 7], [2, 5, 8]]
    a.zip([1, 2], [8])       #=> [[4, 1, 8], [5, 2, nil], [6, nil, nil]]

#### Grouping
    
`group_by{|obj| block}`: Groups the collection by result of the lock and returns a hash wehre the keys are the evaluated result from the block and the values are arrays of elements in the collection that correspond to the key.

    (1..6).group_by { |i| i%3 }   #=> {0=>[3, 6], 1=>[1, 4], 2=>[2, 5]}

#### Delete stuff

`drop(n)`: Drop first n elements and return the rest in an array.

`drop_while{|arr| block}`: Drop element up to, but not including, the first element for which the block returns nil or false and returns an array containing the remaining elements.

    a = [1, 2, 3, 4, 5, 0]
    a.drop_while { |i| i < 3 }   #=> [3, 4, 5, 0]

#### Misc

`lazy`. Read this shit muna.

`to_a`, `to_h`: Conversion and shit to hashes.

WTF

each_entry (PI this)
slice_before()