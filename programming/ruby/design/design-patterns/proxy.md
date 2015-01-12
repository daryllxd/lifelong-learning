# Proxy

We have a class `Video` that needs authorization. Where do we put that logic? We can do this:

    def authorized? user
      user == "Authorized"
    end

    def play user
      if authorized?(user)
        ...
      else
        return false # or something else
      end
    end

This is horrible because you are changing a class that already works. How can we limit access to the videos?

We can create a new class, `VideoAuthenticationProxy`.

    class VideoAuthenticationProxy
      it "allows the privileged user to view" do
        video = Video.new
        proxy = VideoAuthenticationProxy.new(video)
        proxy.play
        capture { video.play.string }.must_include "My First Video"
      end
    end

> Class

    class VideoAuthenticationProxy

> This is where we inject user into the constructor, so we can make the proxy choose whether to let the user watch the video or not.

      def initialize(video, user)
        @video = video
        @user = user
      end

> This is where we insert the authentication logic, as opposed to the video itself.

      def play
        if @user == "Privileged"
          @video.play
        else
          raise ForbiddenAccessError, "Only privileged users are allowed."
      end
    end

# Ruby Best Practices: Proxy
[link](http://blog.rubybestpractices.com/posts/gregory/060-issue-26-structural-design-patterns.html)

A Proxy is any object that acts as a drop-in replacement object that does a bit of work and then delegates to some other underlying object.

    require "delegate"

    class Quiz
      def questions
        @questions                  ||= HasManyAssociation.new([])
        @questions.associated_class ||= Question

        @questions
      end
    end

    class Question
      def initialize(params)
        @params = params
      end

      attr_reader :params

      def answer
        params[:answer]
      end
    end

    class HasManyAssociation < DelegateClass(Array)
      attr_accessor :associated_class

      def initialize(array)
        super(array)
      end

      def create(params)
        self << associated_class.new(params)
      end
    end

In here we have a Quiz which has questions. Instead of initializing a `Questions` variable or something, a `HasManyAssociation` object is initialized and the logic for `create` is inside. Since there is also a `DelegateClass(Array)` it gains the array methods so we can call `questions[0]` etc. You can now reuse the `HasManyAssociation` for `Quiz` to add other `HasMany` relationships to it.

## Design Patterns in Ruby -- Proxy

When the client asks us for an object, we do indeed give the client back an object. However, the object we give back is not the object the client expected--*we hand the client an object that looks and acts like the object the client expected, but is actually an imposter.* The counterfeit object (proxy) has a reference to the real object (subject) hidden inside. Whenever the client code calls a method on the proxy, the proxy forwards the request to the real object.

> Subject:

    class BankAccount
      attr_reader :balance

      def initialize(starting_balance=0)
        @balance = starting_balance
      end

      def deposit(amount)
        @balance += amount
      end

      def withdraw(amount)
        @balance -= amount
      end
    end

> Proxy:

    class BankAccountProxy
      def initialize(real_object)
        @real_object = real_object
      end

      def balance
        @real_object.balance
      end

      def deposit(amount)
        @real_object.deposit(amount)
      end

      def withdraw(amount)
        @real_object.withdraw(amount)
      end
    end

We can now use the proxy interchangeably with the bank account itself. By itself though, the proxy just turns out to the real `BankAccount` object, delegating the method call to the subject.

#### The Protection Proxy

    class AccountProtectionProxy
      def initialize(real_account, owner_name)
        @subject = real_account
        @owner_name = owner_name
      end

      def deposit(amount)
        check_access
        return @subject.deposit(amount)
      end

      def withdraw(amount)
        check_access
        return @subject.withdraw(amount)
      end

      def balance
        check_access
        return @subject.balance
      end

      def check_access
        if Etc.getlogin != @owner_name
          raise "Illegal access: #{Etc.getlogin} cannot access account."
        end
      end
    end

Each operation on the account is protected by a call to the `check_access` method. The `check_access` method makes sure that the current user is allowed to access the account.

*The advantage of using a proxy for protection is that it gives us a nice separation of concerns: The proxy worries about who is or is not allowed to do what. The only thing that the real bank account object need be concerned with is, well, the bank account. By implementing the security in a proxy, we make it easy to swap in a different security scheme (just wrap the subject in a different proxy) or eliminate the secu- rity all together (just drop the proxy). For that matter, we can also change the implementation of the BankAccount object without messing with our security scheme.*

By splitting the protection cleanly off from the workings of the real object, we can minimize the chance that any important information will inadvertently leak out through our protective shield.

#### Virtual Proxy

We can use a proxy to delay creating expensive objects until we really need them.  We do not want to create the real `BankAccount` until the user is ready to do something with it, such as making a deposit. But we also do not want to spread the complexity of that delayed creation out over all the client code.

    class VirtualAccountProxy
      def initialize(starting_balance=0)
        @starting_balance=starting_balance
      end

      def deposit(amount)
        s = subject
        return s.deposit(amount)
      end

      def withdraw(amount)
        s = subject
        return s.withdraw(amount)
      end

      def balance
        s = subject
        return s.balance
      end

      def subject
        @subject || (@subject = BankAccount.new(@starting_balance)) # Until this is called, no @subject will exist
      end
    end

Initializing the subject won't actually initialize a `BankAccount` object, we only initialize the `BankAccount` when we actually call a method.

#### Removing the creation logic and turning it into a method call:

    class VirtualAccountProxy
      def initialize(&creation_block)
        @creation_block = creation_block
      end

      def subject
        @subject || (@subject = @creation_block.call)
      end
    end

Problem with Proxy: You end up writing all the methods of the subject again, just to delegate. We can fix this with `method_missing`:

    def method_missing(name, *args)
      puts("Warning, warning, unknown method called: #{name}")
      @subject.send(name, *args)
    end

Rewriting `AccountProtectionProxy`:

    def method_missing(name, *args)
        check_access
        @subject.send( name, *args )
    end

Rewriting `VirtualAccountProxy`:

    def method_missing(name, *args)
        s = subject
        s.send( name, *args)
    end

The proxy does not just act as a method call conduit for the object. It serves as a pinch point between the client and the subject. "Is this operation authorized?", asks the protection proxy. "Have I actually created the subject yet?", asks the virtual proxy.
