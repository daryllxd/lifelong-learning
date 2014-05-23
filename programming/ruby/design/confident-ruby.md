# Confident Ruby

The four parts of a method:

- Collecting input
- Performing work
- Delivering output
- Handling failures

You want to break a method/highlight which parts do what. When the different parts are mixed up, then you have timid code. Code like this puts an extra cognitive burden on the reader as they try to keep up with it. And because its responsibilities are disorganized, this kind of code is often difficult to refactor and rearrange without breaking it.

#2: Performing Work

The fundamental feature of an OOP is the sending of messages. Every action the program performs boils down to a series of messages sent to objects. The decisions we make are about what messages are sent, under which circumstances, and which objects will receive them.

Writing maintainable code is all about focusing our mental energy on one task at a time, and equally importantly, on *one level of abstraction at a time.*

We require these elements:

- Identify the messages we want to send in order to accomplish the task at hand.
- Identify the roles corresponding to those messages.
- Ensure the method's logic receives objects which can play those roles.

System: Parses CSV data from an old system to the new system (`#import_legacy_purchase_data`). It has to:

1. Parse the purchase records from the CSV. (`#parse_legacy_purchase_records`)
2. For each purchase record, use the record's email address to get the associated customer record (or create a new record if not found). (Use `#email_address` to `#get_customer`)
3. Use the legacy record's product ID to find or create a product record in the system. (`#product_id` to `#get_product`)
4. Add the product to the customer's list of purchases. (`#add_purchased_product`)
5. Notify the customer of the new location where they can download their files. (`#notify_of_files_available`)
6. Log successful import of the purchase record. (`#log_successful_import`)

    Message                     | Receiver Role      | Steps when rewritten
    #parse_purchase_records     | legacy_data_parser | legacy_data_parser.parse_purchase_records
    #each                       | purchase_list      | for each purchase_list.each purchase_record
    #email_address, #product_id | purchase_record    |
    #get_customer               | customer_list      |
    #get_product                | product_inventory  |
    #add_purchased_product      | customer           | customer.add_purchased_product
    notify_of_files_available   | customer           | customer.notify_of_files
    log_successful_import       | data_importer      | self.log_successful_import(purchase_record)


    def import_legacy_purchase_data(data)
      purchase_list = legacy_data_parser.parse_purchase_records(data)
      purchase_list.each do |purchase_record|
        customer = customer_list.get_customer(purchase_record.email_address)
        product = product_inventory.get_product(purchase_record.product_id)
        customer.add_purchased_product(product)
        customer.notify_of_files_available(product)
        log_successful_import(purchase_record)
      end
   end

Though we did a formalized procedure for arriving at a method definition, we never once talked about the already existing classes or methods defined in the system. We didn't talk about the existing classes, persistence strategy, ORM, and the conventions for accessing data stored in it. This is intentional, because we would rather have the method be about the mission we want to accomplish rather than the tools we'll be using.

Horrible:

    CSV.new(data, headers: true, converters: [:date]).each do
      | purchase_record | ....
    end

    @logger && @logger.info "Imported #{purchase_record.id}"

## Talk Like a Duck

Roles are names for duck types, simple interfaces that are not tied to any specific class and which are implemented by any object which responds to the right set of messages. Despite the prevalence of duck-typing in Ruby, there are two pitfalls that users of duck-types often fall into:

1. They fail to take the time to determine the kind of duck they really need.
2. They give up too early (they go back to `is_a?` and `respond_to?`) and check if their variables are `nil`.

*This last practive is insidious. `NilClass` is just another type. asking if an object is `nil?`, even if implicitly (`duck && duck.quack` or `duck.try(:quack)` is type-checkin as much as explicitly checking if the object's class is equal to `NilClass`.*

# 3: Collecting Input

Inputs:

    def seconds_in_day
      24 * 60 * 60
    end

    SECONDS_IN_DAY = 24 * 60 * 60

    def seconds_days(num_days)
      num_days * 24 * 60 * 60
    end

> Class method

    class TimeCalc
      SECONDS_IN_DAY = 24 * 60 * 60

      def seconds_days(num_days)
        SECONDS_IN_DAY * 24 * 60 * 60
      end
    end

> Other method in same class

    class TimeCalc
      def seconds_in_week
        seconds_in_days(7)
      end

      def seconds_days(num_days)
        SECONDS_IN_DAY * 24 * 60 * 60
      end
    end

> Instance variable

    class TimeCalc
      def initialize
        @start_date = Time.now
      end

      def time_n_days_from_now(num_days)
        @start_date + ...
      end
    end

`Time` is a top-level constant that names a Ruby core class, and is the input for this method.

`Time.now` is an indirect input. We refer to the `Time` class, and send it the `#now` message. The value we are interested in is from the return value of `#now`, which is one step removed from `Time`. *Any time we send a message to an object other than `self` in order to use its return value, we're using indirect inputs.*

We can also get the input from the surrounding system:

    def format_time
      format = ENV.fetch('TIME_FORMAT') { '%D %r' }
      Time.now.strftime(format)
    end

Time format is another indirect input since gathering it requires two steps: Referencing the ENV constant to get Ruby's environment object, and sending the `#fetch` method to that object.

    require 'yaml'

    def format_time
      user = ENV['USER']
      prefs = YAML.load_file("/home/#{user}/time-prefs.yml")
      format = prefs.fetch('format') { '%D %r' }
      Time.now.strftime(format)
    end

One indirect input (`ENV`) is combined with another (`user`) to produce a needed value. THIS IS ONE OF THE RICHEST SOURCES OF SURPRISES IN SOFTWARE.

It also illustrates a common idiom in method-writing: an input-collection stanza. The purpose of the method, as stated in its name, is to format time. This is actually accomplished on the fourth line. The first three lines are dedicated to collecting the inputs needed to make that fourth line successful.

As we consider how to collect input for a method, we are thinking about how to map from the inputs that are available to the roles that the method would ideally interact with. Collecting input isn't just about finding needed inputs--it's about determining how lenient to be in accepting many types of input, and about whether to adapt the method's logic to suit the received collaborator types, or vice-versa.

Once we've determined the inputs an algorithm needs, we need to decide how to acquire those inputs. To ensure that a methods has collaborators that are reliable, we can do this:

1. Coerce objects into th roles we need them to play.
2. Reject unexpected values which cannot play the needed roles.
3. Substitute known-good objects for unacceptable inputs.

You may wonder if programming like this feels like "defensive programming", and it sort of is. Programming defensively in every method is redundant. It's better to check the code at the borders.

## Use Built-in Conversion Protocols

    Place = Struct.new(:index, :name, :prize)

    first = Place.new(0, "first", "yo")
    second = Place.new(0, "second", "yo")
    third = Place.new(0, "third", "yo")

This isn't valid: winners[second]. To use this, we can do:

    Place = Struct.new(:index, :name, :prize) do
      def to_int
        index
      end
    end

This works because Ruby arrays use `#to_int` to convert the array index argument to an integer.

Other ex: `File.open` takes a parameter, `filename`, which has to be a string (`fopen()` requires a string). If we give something that isn't a string but can be converted to one...

    class EmacsConfigFile
      def initialize
        @filename = "#{ENV['HOME'}/.emacs"
      end

      def to_path # awesome
        @filename
      end
    end

    emacs_config = EmacsConfigFile.new
    File.open(emacs_config).lines.count

This works because `EmacsConfig` defines the `to_path` conversion method. A `Pathname` is not actually a string, but `File#open` doesn't care, because it can be converted to a String via `to_path`.

Conversions: `to_a, to_ary, to_c, to_enum, to_h, to_hash, to_i, to_int, to_io, to_open, to_path, to_proc, to_r, to_regexp, to_s, to_str`.

Explicit vs. Implicit conversions: Remember the `to_str`.

    class ArticleTitle
      defi(text)
        @text = text
      end

      def to_str
        @text
      end

      def to_s
        to_str
      end

Because we implemented `to_str`, it is OK to implicitly convert it to a string in methods that normally expect one.

We can benefit from the practice of calling conversion methods as well. *Anytime we find ourselves assuming that an input to a method is one of the core types, we should consider making the assumption explicit by calling the conversion protocol methods.*

We can do this:

    def set_centrifuge_speed(new_rpm)
      new_rpm = new_rpm.to_int
      puts "#{new_rpm} RPM"
    end

If we send in `set_centrifuge_speed(nil)`, we get `undefined method to_int for nil:NilClass`.

## Conditionally Call Conversion Methods

We want to try if we can call a method on an object, and if so do it, but reject invalid objects immediately. What we can do is to optionally support conversion protocols.

    def my_open(filenam)
      filename = filename.to_path if filename.respond_to?(:to_path)
      respond_to = filename.to_str
    end

*This use of `respond_to?` is different from most type checking in that IT DOESN'T ASK "ARE YOU THE KIND OF OBJECT I NEED", instead it asks "CAN YOU GIVE ME THE KIND OF OBJECT I NEED?"* Inputs are checked, but in a way that is open for extension.

## Define Your Own Conversion Protocols

## Define conversions to user-defined types

## Use built-in conversion functions

## Use the Array() conversion function to arrayify inputs

`Array()` ensures that no matter what form the input data arrives in, our method logic will have an array to work with.

## Define conversion functions

## Replace "string typing" with classes

"Because bits, strings, and numbers can be used to represent almost anything, any one in isolation means almost nothing." "The string is a stark data structure and everywhere it is passed there is much duplication of process. It is a perfect vehicle for hiding information."

Leaning on polymorphism to handle decisions can remove unnecessary redundancy, reduce opportunities for mistakes, and clarify our object design.

    class TrafficLight
      State = Struct.new(:name) do
        def to_s
          name
        end
      end

      VALID_STATES = [
        STOP = State.new("stop"),
        CAUTION = State.new("caution"),
        PROCEED = State.new("proceed")
        ]

Better to split the states into their own class:

    class TrafficLight
      class State
        def to_s
          name
        end

        def name
          self.class.name.split('::').last.downcase
        end

        def signal(traffic_light)
          traffic_light.turn_on_lamp(color.to_sym)
        end
      end

      class Stop < State
        def color; 'red'; end
        def next_state; Stop.new; end
      end

      class Caution < State
        def color; 'yellow'; end
        def next_state; Stop.new; end
      end

Because `#next_state` is now defined on each `State` subclass as a method, we can reference other states directly within those methods.

Though now, calling is ugly:

    light = TrafficLight.new
    light.change_to(TrafficLight::Caution.new)
    light.signal

To fix this, we write a conversion function:

    class TrafficLight

      def change_to(state)
        @state = State(state)
      end

      private

      def State(state)
        case state
        when State then state
        else self.class.const_get(state.to_s.capitalize).new
        end
      end
    end

Now, callers can supply a String or Symbol, which will be converted into the appropriate State, if it exists.

    light = TrafficLight.new
    light.change_to(:caution)
    light.signal

*We solved this: repetitive case statements all switching on the same variable, and the ease of introducing an invalid value for the `@state` variable.* We also now have a new concept which is the "traffic light state."

*The key to working productively in an OO language is to make the type system and polymorphic method dispatch do your work for you. When dealing with string or Symbol values coming from the borders of our code, it can be tempting to simply ensure that they are in the expected set of valid values, and leave it at that. However, representing this concept as a class or set of classes can not only make the code less error-prone; it can clarify our understanding of the problem and improve the design of all the classes which deal with that concept.*

## 3.10: Wrap collaborators in Adapters

An adapter encapsulates distracting special-case handling and ensures the special case is dealt with once and only once. Ex:

    case @sink
    when Cinch::Bot
      @sink.do_something_weird
    else
      @sink << line # the other possible values of sink all respond to the << method.
    end

This works, but it is not confident code. Uncertainty about the type of the sink collaborator has introduced a large, distracting digression about differing interfaces into the story this method tells. *We've already established that there is a simple, well-understood convenviton for sending output to a sink, the `#<<` message, which is understood by all but one of the supported sink types. Instead of cluttering the `#info` method, let's **adapt** IRC bot objects to support that common protocol.*

    class Logger
      class IrcBotSink
        defi (bot)
          @bot = bot
        end

        def << (message)
          @bot.do_something_weird
        end
      end

      def initialize(sink)
        @sink = case sink
          when Cinch::Bot then IrcBotSink.new(sink)
          else sink
          end
      end
    end

## 3.11: Use transparent adapters to gradually introduce abstraction

## 3.12: Reject unworkable values with preconditions

Some input values cannot be converted or adapted to a usable form. We need to reject them early (`nil` sucks).

*One of the purposes of a constructor is to establish an object's invariant: a set of properties which should always hold true for that object. In this case, "employee hire date is a `Date` seems to be an invariant. Because the constructor did not secure this properly, we need to perform checks on every method dealing wiht hire dates.*

Since there is no obvious right way to handle a missing hire date, it probably needs to just insist on having a valid hire date, or having a precondition set in the constructor or elsewhere:

    class Employee
      attr_accessor :name
      attr_reader :hire_date

      def initialize (name, hire_date)
        @name = name
        self.hire_date = hire_date
      end

      def hire_date=(new_hire_date)
        raise TypeError, "Invalid hire date" unless new_hire_date.is_a?(Date)
        @hire_date = new_hire_date
      end
    end

Here, we are using a precondition to prevent an invalid instance variable from being set. But preconditions can be used to check for invalid inputs to individual methods as well.

Preconditions, being that they are put at the start of a method, serve as an executable documentation of the kind of inputs the method expects. When reading the code, the first thing we see is the precondition clause, telling us what values are the out of bounds for the method.

## 3.13: Use `#fetch` to assert the presence of Hash keys

Implicitly assert the presence of the required key with `Hash#fetch`. `#fetch` is concise, idiomatic, and avoids bugs that stem from Hash elements which can legitimately be set to nil or false.

When a key is required to be present, but is not, `KeyError` will be raised. *The `Hash#fetch` behaves like the subscript operator (`#[]`) but instead of returning `nil`, it raises `KeyError`.*

`fetch` can also take in a block, and when `#fetch` encounters a missing key, it evaluates the given block instead of raising the `KeyError`.

    def add_use(attributes)
      login = attributes.fetch(:login)
      password = attributes.fetch(:password) { raise KeyError, "Password must be supplied" }
    end

Using `#fetch` can head off subtle bugs involving attributes for which `nil` or false are legitimate values.

## 3.14: Use `#fetch` for defaults

Some common options may recur over and over again, with the same default value every time. In this case, we can set up the default as a `Proc` somewhere central and then re-use that common default for each `#fetch`.

    logger = options.fetch(:logger) { Logger.new($stderr) }

## 3.15: Document assumptions with assertions

## 3.16: Handle special cases with a Guard Clause

In certain unusual cases, the entire body of a method should be skipped. Use a guard clause to effect an early return from the method, in the special case.

    def log_reading(reading_or_readings)
      unless @quiet
        ...
      end
    end

(Quiet logging means you don't do anything). While everything seems okay, the mind is forced to deal with the `unless`, why not just have a guard clause like this:

    def log_reading(reading_or_readings)
      return if @quiet

The reader and the computer are made aware of the possibility of the `@quiet` case, and we ensure they are by putting a check for `@quiet` at the very top of the method.

## 3.17: Represent special cases as objects

There are special cases which may be taken into account, for example: a web application behaves differently if the current user is not logged in. We represent this special case as a unique type of object. Rely on polymorphism to handle the special case correctly wherever it is found. Use polymorphic method dispatch to handle special cases.

This happens in Rails apps with the `current_user`. We can introduce a `GuestUser`:

    class GuestUser
      defi(session)
        @session = session
      end
    end

> Rewrite `current_user` to return an instance of this class when there is no `:user_id` recorded.

    def current_user
      if session[:user_id]
        User.find(session[:user_id])
      else
        GuestUser.new(session)
      end
    end

> Testing if authenticated

    class User
      def authenticated?
        true
      end

      def
        false
      end
    end

    if current_user.authenticated?
      render_logout_button
    else
      render_login_button
    end

> This customizes `@listings` based on whether the user is logged in.

    class GuestUser
      def visible_listings
        Listing.publicly_visible
      end
    end

    @listings = current_user.visible_listings

> Implement a shopping cart for users who haven't yet logged in:

    class GuestUser
      def cart
        SessionCart.new(@session)
      end
    end

We identify a common role in the inputs passed to numerous methods: "user". The absence of a logged-in user doesn't mean that there is no user; only that we are dealing with a special kind of anonymous user. *We push differences between authenticated and guest users out of the individual methods and into the class hierarchy. By starting from the POV of the code we wanted to write at the method level, we arrived at a different, and likely better, object model of the business domain.*

