## Memento
[link](http://www.brownfort.com/2015/01/memento-design-pattern-ruby/)

Memento - used to keep track of the object, we have the power to rollback the state of an object.

- Originator: Object we want to keep track of. It knows how to export its current state and restore to a given state.
- Caretaker: Uses the originator object. It creates and manipulates the originator object. It also saves and restores the state of originator object. State database = array or hash.
- Memento: Mediates between Originator and Caretaker. The Memento returns a new memento object (state information) to Caretaker whenever Caretaker asks for the current state.
    class Originator
      attr_accessor :color
      def initialize(color)
        @color = color
      end

      def get_state
        Memento.new(@color)
      end

      def restore_state(memento)
        @color = memento.state
      end
    end

    class Memento
      attr_reader :state
      def initialize(state)
        @state = state
      end
    end

    class Caretaker
      def self.demo
        state_database = []

        originator = Originator.new("RED")
        puts originator.color
        state_database.push(originator.get_state)

        originator.color = "GREEN"
        puts originator.color
        state_database.push(originator.get_state)

        originator.color = "BLUE"
        puts originator.color
        state_database.push(originator.get_state)

        originator.restore_state(state_database.pop)
        puts originator.color

        originator.restore_state(state_database.pop)
        puts originator.color

        originator.restore_state(state_database.pop)
        puts originator.color
      end
    end

    Caretaker.demo
