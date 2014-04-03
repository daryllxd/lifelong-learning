# Rails Antipatterns

## Models

### Review

- Class: Defines characteristics of an object. What is is (attributes), what it can do (methods).
- Encapsulation: Often, a class should be recognizable to a non-programmer. But you limit what you can call on an object via its API using the public-private-protected keywords.

### Solution: Follow the Law of Demeter

Assume three AR models, `Address`, `Customer`, and `Invoice`. Instead of having `invoice.customer.addresss.street` whenever we present in the view, we can just do:

    class Customer < AR::Base
      has_one :address
      has_many_invoices

      def street
        address.street
      end

      def city
        address.city
      end
    end

    class Invoice < AR::Base
      belongs_to :customer

      def customer_name
        customer.name
      end

      def customer_street
        customer.street
      end
    end

That way we can do this in the view: `@invoice.customer_name, @invoice.customer_street` as opposed to `@invoice.customer.address.street`. So `address` API is coupled only to Customer, and `customer` API is read only by the `invoice` class.

The problem is you clutter the namespace with a ton of methods. So you use `delegates`.

    Invoice delegate :name, :street :to => :customer, :prefix => true

You now have access to these methods: `@invoice.customer_name`, `@invoice.customer_street`.

### Solution: Push all `find()` Calls into Finders on the Model

No shit like `User.find(:order => "last_name")` on the view. That should be on the model and ivars should be instantiated by the controller.

### Solution: Keep Finders on Their Own Model

Bad:

    class UsersController
      def index
        @user = User.find(params[:id])
        @memberships = @user.memberships(where:active => true).limit(5)
      end
    end

Good:

    class UsersController
      def index
        @recent_active_memberships = @user.find_recent_active_memberships
      end
    end

    class User
      def find_recent_active_memberships
        memberships.where(:active => true).limit(5)
      end
    end

Pros: `UsersController` is thinner. Method name reveals intent. No SQL-like things on the controller.

Better: We can move the `find_recent_active_memberships` again so that `Membership` is the class that actually calls it.

    class User < AR::Base
      has_many :memberships

      def find_recent_active_memberships
        memberships.find_recent_active
      end
    end

    class Membership < AR::Base
      def self.find_recent_active
        where(:active => true).limit(5).order("last_active_on DESC")
      end
    end


