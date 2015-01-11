## Design Patterns in Ruby -- Builder

    class Computer
      attr_accessor :display
      attr_accessor :motherboard
      attr_reader   :drives

      def initialize(display=:crt, motherboard=Motherboard.new, drives=[])
        @motherboard = motherboard
        @drives = drives
        @display = display
      end
    end

Display is either `:crt` or `:lcd`. Motherboard is another object, it has memory and it holds either an ordinary CPU or a turbo processor.

    class CPU; end
    class BasicCPU < CPU; end
    class TurboCPU < CPU; end

    class Motherboard
      attr_accessor :cpu
      attr_accessor :memory_size

      def initialize(cpu=BasicCPU.new, memory_size=1000)
          @cpu = cpu
          @memory_size = memory_size
      end
    end

*The idea of `Builder` is you take this kind of construction logic and encapsulate it in a class all of its own.* The `builder` class takes charge of assembling all of the components of a complex object. Each builder has an interface that lets you specify the configuration of your new object step by step.

    class ComputerBuilder
      attr_reader :computer

      def initialize
        @computer = Computer.new
      end

      def turbo(has_turbo_cpu=true)
        @computer.motherboard.cpu = TurboCPU.new
      end

      def display=(display)
        @computer.display=display
      end

      def memory_size=(size_in_mb)
        @computer.motherboard.memory_size = size_in_mb
      end

      def add_cd(writer=false)
        @computer.drives << Drive.new(:cd, 760, writer)
      end

      def add_dvd(writer=false)
        @computer.drives << Drive.new(:dvd, 4000, writer)
      end

      def add_hard_disk(size_in_mb)
        @computer.drives << Drive.new(:hard_disk, size_in_mb, true)
      end
    end

#### Implementation

    builder = ComputerBuilder.new
    builder.turbo
    builder.add_cd(true)
    builder.add_dvd
    builder.add_hard_disk(100000)
    computer = builder.computer #=> Shiny new instance!

#### Polymorphic builder.

Both `DesktopBuilder` and `LaptopBuilder` will inherit from `ComputerBuilder`, each with their own implementations on adding different components.

    class DesktopBuilder < ComputerBuilder
      def add_cd(writer=false)
        @computer.drives << Drive.new(:cd, 760, writer)       # Add a normal drive
      end

    class LaptopBuilder < ComputerBuilder
      def add_cd(writer=false)
        @computer.drives << LaptopDrive.new(:cd, 760, writer) # Only add LaptopDrives
      end

In addition to making object construction easier, builders can make object construction safer--the final "give me my object" method makes an ideal place to check that the configuration requested by the client really makes sense and that it adheres to the appropriate business rules.

    # Default is @computer, we add checks to ensure that the computer has been properly built.
    def computer
      raise "Not enough memory" if @computer.motherboard.memory_size < 250
      raise "Too many drives" if @computer.drives.size > 4
      hard_disk = @computer.drives.find {|drive| drive.type == :hard_disk}
      raise "No hard disk." unless hard_disk
      @computer
    end

#### Reusable Builders

If you do something like

    computer1 = builder.computer
    computer2 = builder.computer

You will end up with the same computer, so you have to create a `reset` function:

    def reset
        @computer = LaptopComputer.new
    end

So you can reuse the builder instance (you have to start the configuration again though).

kdG
