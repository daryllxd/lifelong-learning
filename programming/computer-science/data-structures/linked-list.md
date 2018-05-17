# When to use LinkedList over ArrayList?
[Reference](https://stackoverflow.com/questions/322715/when-to-use-linkedlist-over-arraylist?rq=1)

- ArrayList (dynamically resizing array) has more use-cases than LinkedList (doubly-linked list).

- LinkedList: easy to add.
  - get is O(n)
  - add is O(1), easy to add.
  - remove is O(n), n/4 on average.
  - Easy to add.
- ArrayList: easy to get.
  - get(int index) is O(1), easy to get it you have an index.
  - add(E element) is O(1) amortized, but O(n) worst-case since the array must be resized and copied.

- In an AL, insertion goes up to O(n) because all elements past the insertion point must be moved.
- LL: Has both pointers (before/after) per element, so that takes up memory.
