## Gang of Design Patterns in Ruby: Command

    class Button
      def initialize(options)
        @label = options[:label]
        @action = options[:action].new
      end

      def click
        @action.execute
      end
    end

    class ShowMessage
      def execute
        puts "Button was clicked"
      end
    end

    class DieMessage
      def execute
        puts "Die"
      end
    end

This establishes a contract between a button and a message associated with it. Usage:

    Button.new(action: ShowMessage) # We pass in a CLASS. To perform the click action, we call the class's `execute` method.
    Button.new(action: DieMessage)  # When this button is clicked, execute `DieMessage.execute`.

In this way we have decoupled the business logic from the UI component logic.

## Design Patterns in Ruby -- Command

To apply the Command pattern, we store a command with each button:

    class SlickButton
      attr_accessor :command

      def initialize(command)
        @command = command
      end

      def on_button_push
        @command.execute if @command
      end
    end

Basically you dependency inject the `@command` so that when the `on_button_push` event is called you can basically execute the command at will.

Example of a command:

    class SaveCommand
      def execute
      end
    end

    save_button = SlickButton.new(SaveCommand.new)

#### Chaining Commands

    class CompositeCommand < Command
      def initialize                            # An array stores each of the commands inside the composite
        @commands = []
      end

      def add_command(cmd)                      # Adding a command means populating the array
        @commands << cmd
      end

      def execute                               # You execute the commands in sequence
        @commands.each {|cmd| cmd.execute}
      end

      def description                           # Function that iterates over the commands and shows the description
        description = ''
        @commands.each {|cmd| description += cmd.description + "\n"}
        description
      end
    end

    cmds = CompositeCommand.new
    cmds.add_command(CreateFile.new('file1.txt', "hello world\n"))
    cmds.add_command(CopyFile.new('file1.txt', 'file2.txt'))
    cmds.add_command(DeleteFile.new('file1.txt'))
    cmds.execute

#### Being Undone by a Command

    class CreateFile < Command
      def execute
          f = File.open(@path, "w")
          f.write(@contents)
          f.close
      end

      def unexecute
          File.delete(@path)
      end

Mass undoing the commands

    class CompositeCommand < Command
      def unexecute
          @commands.reverse.each { |cmd| cmd.unexecute }
      end

Useful in installers: you go through the wizard saying which components you want (the wizard memorizes your to-do list and it is only at the end of the wizard that you get a final chance to change your mind.

*The key thing about the Command pattern is that it separates the thought from the deed.* When you use this pattern, you are no longer simply saying, "Do this"; instead, you are saying, "Remember how to do this," and, sometime later, "Do that thing that I told you to remember."
