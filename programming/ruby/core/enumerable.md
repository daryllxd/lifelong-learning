## Enumerable

> The `Enumerable` mixin provides collection classes with several traversal and searching methods, and with the ability to sort. The class must provide a method `each`, which yields successive members of the collection.

Filtering

    all? - Returns true if block never returns false or nil.
    %w[ant bear cat].all? { |word| word.length >= 3 } #=> true

    any? - Returns true if block HAS a true
    %w[ant bear cat].any? { |word| word.length >= 4 } #=> true

    chunk - Better to use if the array is sorted. Literally creates chunks nung mga magkakatabi na pasok sa condition.

Doing something with the thing

    collect - Returns a new array with the results of the block once for every element in the enum.

    collect_concat (also called flat_map) - Returns a new array with the concatenated results of running block once.
    [1, 2, 3, 4].flat_map { |e| [e, -e] } #=> [1, -1, 2, -2, 3, -3, 4, -4]

Finding out something

    count
    count {|obj| block }