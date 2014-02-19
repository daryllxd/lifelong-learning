## Enumerable

> The `Enumerable` mixin provides collection classes with several traversal and searching methods, and with the ability to sort. The class must provide a method `each`, which yields successive members of the collection.

Filtering

    all? # Returns true if block never returns false or nil.
    %w[ant bear cat].all? { |word| word.length >= 3 } #=> true

    any? # Returns true if block HAS a true
    %w[ant bear cat].any? { |word| word.length >= 4 } #=> true

    chunk # Better to use if the array is sorted. Literally creates chunks nung mga magkakatabi na pasok sa condition.

    detect(ifnone = nil){|obj| block } # Return first match, if no object matches, call ifnone.

Iterate over

    collect - Returns a new array with the results of the block once for every element in the enum.

    collect_concat (also called flat_map) # Returns a new array with the concatenated results of running block once.
    [1, 2, 3, 4].flat_map { |e| [e, -e] } #=> [1, -1, 2, -2, 3, -3, 4, -4]

    cycle(n=nil){} # Continuously call the block for each element of enum repeatedly n times or forever if none or nil is given as n. If no block is given, an enumerator is returned.
    a.cycle { |x| puts x }  # print, a, b, c, a, b, c,.. forever.
    a.cycle(2) { |x| puts x }  # print, a, b, c, a, b, c.

    each_cons(n){} # Iterate the given block for each element and the next n elements.
    (1..10).each_cons(3) { |a| p a }
    # outputs below
    [1, 2, 3], [2, 3, 4], ... [8, 9, 10]
    

Finding out something

    count
    count {|obj| block } # Count objects that qualify

Delete stuff

    drop(n) # Drop first n elements and return the rest in an array.

    drop_while{|arr| block} # Drop element up to, but not including, the first element for which the block returns nil or false and returns an array containing the remaining elements.