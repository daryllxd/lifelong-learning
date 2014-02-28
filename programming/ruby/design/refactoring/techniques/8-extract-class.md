#### Steps


1. Instantiate the class you wish you had.
2. Make a new empty class.
3. Move a method and fields over.
4. Copy the tests and modify as necessary.
5. Slowly uncomment tests, it's about making the tests drive your development.

[TODO] Incomplete

When you describe a class as "what it does", and you hear yourself saying "and", this might mean that you need to separate classes.

    require 'csv'

    class Sender
        def initialize(csv, message)
            @csv = csv
            @message = message
        end

        def send
            recipients.each do |recipient|
                Mailer.invitation(recipient['name'], recipient['email'], @message).deliver
            end
        end

        private

        def recipients
            CSV.parse(@csv, headers: true).map(&:to_hash)
        end
    end

So anytime I hear parsing, I want to put that somewhere by itself. So let's make a parser class to handle this CSV.

Little steps. I write the code I wish I had which is the parser.

    def initialize(csv, message)
        @csv = csv
        @message = message
        @parser = Parser.new
    end

You break the tests and you want to do it in small tests. you also want to run the tests from your editor.

When extracting the class, keep the original tests intact so you don't change the behavior from the outside POV.

Specs make it very clear on what you should do.


