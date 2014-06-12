# Exceptional Ruby

In most test suites, happy path tests predominate, and there may only be a few failure case tests. Most mature codebases are riddled with the telltale times of hastily-patched failure cases--business logic that is interrupted again band again by `nil`-checkes and `begin...rescue...end` blocks.

An *exception* is the occurence of an abnormal condition during the execution of a software element.

A *failure* is the inability of a software element to satisfy its purpose.

An *error* is the presence in the software of some element not satisfying its specification.

Bertrand Meyer: All methods have a contract, either implicit or explicit, with their callers. A method can be said to have failed when it has failed to fulfill this contract.

*Contract: "Given the following inputs, I promise to return certain outputs and/or cause certain side-effects." It is the caller's responsibility to ensure that the method's preconditions (the inputs it depends on) are met. It is the method's responsibility to ensure that its postconditions (outputs and side effects) are fulfilled.*

It is also the methods' responsibility to maintain the invariant of the object it is a member of. The invariant is the set of conditions that must be met for the object to be in a consistent state.

*When a method's preconditions are met, but is unable to either deliver on its promised postconditions, or to maintain the object invariant, then it is in breach of its contract; it has failed.*

## Reasons for Failure

- Mistake in implementation (ex: hash indexed by String instead of Symbol).
- Program runs out of resources.
- Web service fails.

# Exception Life Cycle

`raise` and `fail` are synonyms. Jim Weirich: Use `fail` for first time and `raise` for second time.

    raise [EXCEPTION_CLASS], [MESSAGE], [BACKTRACE]
    raise RuntimeError # RuntimeError is raised when nothing is passed in as an EXCEPTION_CLASS

`raise` can be overrode because it is implemented by `Kernel`.

# `raise` Internals

1. Call `#exception` to get the exception object.
2. Set the backtrace.
3. Set the global exception variable. The `$!` and `$ERROR_INFO` global variable always contains the currently active exception if any.
4. Raise the exception object up the call stack. Exception will look for `ensure` or `rescue`.

`ensure` classes will always be executed, whether an exception is raised or not. BTW a return from a method inside an `ensure` takes precedence over any exception being raised, and the method will return as if no exception has been raised at all.

# Coming to the `rescue`

It doesn't capture: `NoMemoryError`, `LoadError`, `NotImplementedError`, `SignalException`, `Interrupt`, `ScriptError`. Exceptions outside of `StandardError` (these are conditions that can't reasonably be handled by a generic catch-all `rescue`).

You can use `rescue` in the same way that you use `if` or `unless`.

    f = open("nonesuch.txt") rescue nil

`retry`

    tries = 0
    begin
      tries += 1
      puts "Trying #{tries}"
      raise "Didn't work"
    rescue
      retry if tries < 3
      puts "I give up"
    end

`raise` during exception handling: This throws away the original exception. There is no way to retrieve the original exception. Use Nested exceptions.

[TODO]: NESTED_EXCEPTIONS.

`else` after a `rescue` clause is the opposite of `rescue`; where the `rescue` clause is only hit when an exception is raise, `else` is only hit when no exception is raised by the preceding code block.

## Uncaught exceptions

When an exception is never rescued, the stack will unwind completely and Ruby will handle the un-rescued exception by printing a stack trace and terminating the program. However, before the program ends, Ruby will execute various exit hooks:

    trap
    at_exit
    END

Crash logger implemented with `at_exit`:

    at_exit do
      if $! # Check if the exit is because of an exception
        open('crash.log', 'a') do |log|
          error = {
            :timestamp => Time.now,
            :message => $!.message,
            :backtrace => $!.backtrace,
            :gems => Gem.loaded_specs.inject({}){m, (n,s)| m.merge(n => s.version)}
            }
          }
          YAML.dump(error, log)
        end
      end
    end

## Are Ruby exceptions slow?

There is no penalty simply for having exception-handling code lying around dormant. On the other hand, writing code that uses exceptions as part of its logic can have a significant performance cost.

# Responding to Failures

*Failure flags and benign values.* A `nil` isn't very communicative but in some cases it may be all that's needed.

When the system's success doesn't depend on the outcome of the method in question, using a benign value may be the right choice.

    begin
      response = HTTP.get_response(url)
      JSON.parse(response.body)
    rescue Net::HTTPError
      { "stock_quote" => "<Unavailable>" }
    end

*Remote failure reporting.* These can be in a central log server, an email to the developers, or a post to a third-party exception-reporting service such as Hoptoad, Exceptional, or New Relic RPM.

*Bulkhead.* By partitioning your systems, you can separate a system's errors from the other parts. Ex: `rescue` nothing.

    begin
      SomeExternalService.some_request
    rescue Exception => error
      logger.error "Exception at..."
      logger.error error.message
      logger.error error.backtrace.join("\n")
    end

*The Circuit Breaker pattern.*

This is a mechanism that controls the operation of a software subsystem and behaves like a physical circuit breaker. Thee states:

- *Closed.* Subsystem is allowed to operate normally. However, a counter tracks the number of failures that have occurred, and when the number exceeds a threshold, the breaker trips, and enters the open state.
- *Open.* The subsystem is not permitted to open.
- *Half-open.* The system can run, but a single failure will send it back into the "open" state.

# Alternatives to Exceptions

There are situations when failing fast may not yield the best results. Ex: When proceeding with a script to set up a server, you may fail on a "keyfile download" exception when you can't access the key data. What can happen is you need a way to proceed through the steps of the process then get a report at the end telling you what parts succeeded and what parts failed.

*Sideband data.* A Every method has a primary channel of communicating data back to the user, the return value. The side band is a secondary channel of communication for reporting meta-information about the status and disposition of a process.

*Multiple return values.* `return [result, succcess]` where `success` can be true or false. Problem is that receivers need to expect an array.

*Output parameters.* These aren't output parameters in the traditional sense of a parameter.

    def make_user_accounts(host, transcript = StringIO.new)
      transcript.puts "* Making user accounts..."
    end

    def install_packages(host, transcript = StringIO.new)
      transcript.puts "* Installing packages..."
    end

    def provision_host(host, transcript)
      make_user_accounts(host, transcript)
      install_packages(host, transcript)
    end

    transcript = StringIO.new
    provision_host("192.168.1.123", transcript)
    puts "Provisioning"
    puts transcript.string

*Caller-supplied fallback strategy.* If we're not sure we want to terminate the execution of a long process by raising an exception, we can inject a failure policy into the process in the same way that we injected a transcript above.

    def make_user_accounts(host, failure_policy=method(:raise))
      # ...
      rescue => error
        failure_policy.call(error)
    end

    def install_packages(host, failure_policy=method(:raise))
      # ...
      raise "Package ’foo’ install failed on #{host}"
      rescue => error
        failure_policy.call(error)
    end

    def provision_host(host, failure_policy)
      make_user_accounts(host, failure_policy)
      install_packages(host, failure_policy)
    end

    policy = lambda {|e| puts e.message}
    provision_host("192.168.1.123", policy)

*Global variables.* We can designate a global variable to contain the error code for the most recently executed function.

    class Provisioner
      def provision
        # ...
        (Thread.current[:provisioner_errors ||= []) << "Error getting key file..."
      end
    end

    p = Provisioner.new
    p.provision

    if Array(Thread.current[:provisioner_errors]).size > 0 # Coerce the thread into an array
      # handle failures
    end

*Process reification.* The final/cleanest solution is to represent the process itself as an object, and give the object an attribute for collecting status data.

    class Provisionment
      attr_reader :problems

      def initialize
        @problems = []
      end

      def perform
        @problems << "Failure..."
      end
    end

    p. Provisionment.new
    p.perform
    if p.problems.size > 0
      ...
    end

This avoids multiple return values and global namespace pollution of using thread-local variables. The drawback is adding another class to the system.

# Your failure handling strategy

*Exceptions shouldn't be expected.* Use exceptions only for exceptional situations. Ex: `ActiveRecord#save` doesn't raise an exception when the record is invalid, because invalid user input isn't that unusual.

The Pragmatic Programmer: "Will this code still run if I remove all exception handlers? If the answer is "no", then maybe exceptions are being used in non-exceptional circumstances."

[TODO]: USE_THROW_FOR_EXPECTED_CASES

*What constitutes an exceptional case?* (EOF? Missing key in a hash? 404 status code from a web service?) It depends! When we raise an Exception, we force the caller to treat the condition as an exceptional case, whether the caller considers it to be one or not.

## Caller-supplied fallback strategy.

*In most cases, the caller should determine how to handle an error, not the callee.*

Ex: `Array#fetch`. If the collection is not able to find a value, it yields to the provided block.

    h.fetch(:optional_key) { DEFAULT_VALUE } # Use default value if key is not found
    h.fetch(:required_key) { raise "Required key not found!" }

Other ex: `Enumerable#detect`. Since block as already taken, it uses a parameter for its caller-specified feedback handler.

    arr.detect(lambda({"None found"}) {|x| ... } # The lambda param is yielded when nothing is detected.

Ex in Rails:

    def render_user(user)
      if user.name && user.lname
        "#{user.lname}, #{user.fname}"
      else
        yield
      end
    end

    # Fall back to a benign placeholder value:
    render_user(u) { "UNNAMED USER" }

    # Fall back to an exception
    render_user(u) { raise "User missing a name" }

## Questions to ask before raising

*Is the situation truly unexpected?* Do we really need to raise an exception when the user fails to answer YES or NO to a question? Maybe we can just loop until we get a sensible response. *User input is a classic example of a case where we expect mistakes. Is this really an unexpected case, or can you reasonably predict it will happen during normal operation?*

*Am I prepared to end my program?* An exception, if it goes unhandled, can potentially end the program (or in web apps, end the request). Maybe you can substitute some kind of benign value for the unexpected result.

    @ug = UserGreeting.find_by_name!("winter")

    @ug UserGreeting.find_by_name("winter")
    unless @ug
      logger.error "Someone forgot to run db:populate!"
      @ug = OpenStruct.new(:welcome => "Hello")
    end

*Can I punt the decision up the call chain?* Do I want to capture and log failure instead of aborting?

*Am I throwing away valuable diagnostics?A When you have just received the results of a long, expensive operation, that's probably not a good time to raise an exception because of a trivial formatting error. You want to preserve as much of that information as much as possible. See ifyou can enable the code to continue normally while noting the fact that there was a problem, using a kind of sideband.*

*Would continuing result in a less informatiive exception?* Sometimes, failing to raise an exception just results in things going wrong in less easy-to-diagnose ways down the road. In cases like this, it's better to raise earlier than later.

Compare this:

    response_code = might_return_nil()
    message = codes_to_messages[response_code]
    response_code = "Status: #{message}" # We can get a can't convert nil to string error here

...to this:

    response_code = might_return_nil() or raise "No response code"

*Isolate exception handling code.* An exception represents an immediate, non-local transfer of control (it's a kind of cascading `goto`). Programs that use exceptions as part of their normal processing suffer from all the readability and maintainability problems of classic spaghetti code.

I consider `begin` keyword to be a code smell in Ruby. The better way is to use Ruby's implicit begin blocks.

    def foo
      ... mainline logic
    rescue
      ... failure handling
    end

Isolating exception policy with a Contingency Method. A contingency method cleanly separates business logic from failure handling. Ex, in a code base which makes numerous calls which might raise an `IOError`:

    def with_io_error_handling
      yield
    rescue
      # handle IOError
    end

    with_io_error_handling { something_that_might_fail }
    with_io_error_handling { something_else_that_might_fail }

## Exception Safety

When it is vital that a method operate reliably, it becomes useful to have a good understanding  of how that method will behave in the face of unexpected Exceptions being raise.

There are three defined levels of exception safety:

- The weak guarantee. If an exception is raised, the object will be left in a consistent state.
- The strong guarantee. If an exception is raised, the object will be rolled back to its beginning state.
- The nothrow guarantee. No exceptions will be raised from the method. If an exception is raised during the execution, it will be handled internally.
- Implicit fourth level: No guarantee lol.

*Be specific when eating Exceptions.*

Don't do this:

    begin
    rescue Exception
    end

Sometimes you're forced to catch an overly broad exception type, but code such as the above example is prone to bugs. You'll often spend a long time trying to figure out why the code is not doing what it's supposed to do, only to discover that an exception is being raise early--and then being caught and hidden by the over-eager `rescue` clause.

If you can't match the class of an Exception, try to at least match the message.

    begin
      # ...
    rescue => error
      raise unless error.message =~ /foo bar/
    end

*Namespace your own exceptions.*

Every library codebase should have, at the very least, a definition such as the following:

    module MyLibrary
      class Error < StandardError; end
    end

That gives client code something to match on when calling into the library. It is suggested to put code in the top-level API calls,

[TODO]: TAGGING_EXECPTIONS_WITH_MODULES

## Three essential exception classes

- We could divide Exceptions up by which module or subsystem they come from.
- We might break them down by software layer--e.g. separate exceptions for UI level failures and for model-level failures.
- We could try basing them on severity levels: separate exceptions for fatal problems and nonfatal problems.

Why different exception classes?

- Want tot attach extra information to the exception, like an error code.
- Want to handle the exception differently. "Handling" means specific actions or presenting the failure to the user in a particular way.

Let's look at the different ways failures are presented to the user:

1. "You did something wrong." This message tells the user that the only way to fix the problem is for them to do something differently.
2. "Something went wrong inside the app." This tells the user that there is nothing they can do to fix the problem; it's an internal error.
3. "We are temporarily over capacity." Nothing is broken, but the system is temporarily over capacity and the problem will most likely resolve itself eventually.

## Three classes of exception

1. User error.
2. Logic error. Error in the system.
3. Transient failure. Something is over capacity or temporarily offline. Usually handled by giving the user a hint about when to come back and try again, or in the case of batch jobs, by arranging to retry the failed operation a little layer.

*I find that if a library or app defines these three exception types, they are sufficient for 80% of the cases where an exception is warranted.*

Ex:

    failures = 0
    begin
      ...
    rescue MyLib::UserError => e
      puts e.message
      puts "Please try again"
      retry
    rescue MyLib::TransientFailure => e
      failures += 1
      if failures < 3
        warn e.message
        sleep 10
        retry
      else
        abort "Too many failures"
      end
    rescue MyLib::LogicError => e
      log_error(e)
      abort "Internal error! #{e.message}"
