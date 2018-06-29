# Data Structures for Coding Interviews
[Reference](https://www.interviewcake.com/article/python/data-structures-coding-interview)

## RAM

- RAM: Where variables are stored. Memory is faster but has less space, while storage is slower but has more space.
- The memory controller has direct access to each shelf of RAM.
- Computers are faster when reading memory addresses that are close to each other.
- *When the processor asks for the contents of a given memory address, the memory controller also sends the contents of a handful of nearby memory addresses, and the processor puts all of it in the cache.*

## Numbers

- Storing fractions: store two numbers, the numerator and the denominator.
- Decimals: two numbers, the number with the decimal point taken out and the position where the decimal point goes.
- Negative numbers: reserve the leftmost bit for the sign of the number, 0 for positive and 1 for negative.
- Integer overflow: When you're trying to represent 256 in an 8th bit unsigned integer. At worst, the computer computes the correct answer but throws out the 9th bit. Python automatically allocates more bits to store the larger number.
- Integers are usually fixed width unless you're told otherwise. Variable-size numbers exist, but they're only used in special cases.

## Arrays

- Looking up the contents in an array is O(1) time. But this only works if each item is the same size and the array is uninterrupted in memory.
- The trade-off: arrays have fast lookups, but each item in the array needs to be the same size, and you need a big block of uninterrupted free memory to store the array.

## Strings

- To store characters instead of numbers, define a mapping (encoding) between numbers and characters.
- Pointers: Put the strings wherever in memory, than have each element hold the *address* in memory of the corresponding string, until the terminator value.
- Advantages:
  - Items don't have to be the same length.
  - We don't need enough uninterrupted free memory to store all our strings next to each other. We can place each of them separately, wherever there's space in the RAM.
- Disadvantages:
  - Not cache-friendly, because the values are scattered randomly around the RAM.
- Dynamic array;
  - Resizes when it runs out of space.
  - It can:
    - Make a new, bigger array, usually twice as big. You can't extend the existing one, because that memory might already be taken.
    - Copy each of the old array to the new array.
    - Free up the old array.
    - Append.
  - O(n) notation: Is sort of amortized/cancelled out, because append doubles each time?
  - No need to specify the size ahead of time, but appends can be expensive.

## Linked Lists

- O(1) insert, we just have to tweak some pointers for the append.
- Faster prepends (O(1)) for linked list (for an array, they need to move all the contents so its O(n)).
- Strings are usually in an array, because they are O(1) time lookups.
- LL: faster prepends and faster appends, but slower lookups.

## Hash tables

- Hashing function to create a link to the values.
- There can be collisions, but they are very rare.
