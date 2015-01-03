## Tom Stuart -- Refactoring Ruby with Monads
[link](https://www.youtube.com/watch?v=J1jYlPtkrqQ)
[link](http://codon.com/refactoring-ruby-with-monads)

What is a Stack? It's a kind of value with these operations: `#push`, `#pop`, `#top`, `#empty`, `.empty` (creates an empty stack). (Assume immutable).

Example implementation of an `ArrayStack`:

    ArrayStack = Struct.new(:values) do
      def push(value)
        ArrayStack.new([value] + values)
      end

      def top
        values.first
      end

      def pop
        ArrayStack.new(values.drop(1))
      end

      def empty?
        values.empty?
      end

      def self.empty
        new([])
      end
    end

Example implementation of a `LinkedListStack`:

    LinkedList = Struct.new(:top, :pop) do
      def push(value)
        LinkedListStack.new(value, self)
      end

      def empty?
        pop.nil?
      end

      def self.empty
        new(nil, nil)
      end
    end

We can use these without knowing their implementation, we can define the `size` operator in terms of the operation `each`.
