## Design Patterns in Ruby -- Observer

This code updates payroll whenever an `Employee` has a new salary.

    class Employee
      attr_reader :name, :title
      attr_reader :salary

      def initialize( name, title, salary, payroll)
        @name = name
        @title = title
        @salary = salary
        @payroll = payroll
      end

      def salary=(new_salary)
        @salary = new_salary
        @payroll.update(self)
      end
    end

If we need to keep other objects informed about Fred's financial state, we need to go back in and modify the `Employee` class. What we need is a list of objects that are interested in hearing about the latest news from the `Employee` object. We can set up an array for that:

    def initialize( name, title, salary )
      @observers = []
    end

We also modify the `salary` method to `notify_observers`, and tell each observer to update itself, sending the original object via `self`:

    def salary=(new_salary)
      @salary = new_salary
      notify_observers
    end

    def notify_observers
      @observers.each do |observer|
        observer.update(self)
      end
    end

Methods for adding and deleting observers:

    def add_observer(observer)
      @observers << observer
    end

    def delete_observer(observer)
      @observers.delete(observer)
    end

By building this general mechanism, we have removed the implicit coupling between the Employee class and the Payroll object. *Employee no longer cares which or how many other objects are interested in knowing about salary changes; it just forwards the news to any object that said that it was interested.* In addition, instances of the Employee class will be happy with no observers, one, or several.

    class TaxMan
      def update( changed_employee )
        puts("Send #{changed_employee.name} a new tax bill!")
      end
    end

    tax_man = TaxMan.new
    fred.add_observer(tax_man)

Ruby has a standard `Observable` module that provides all of the support you need to make your object observable.

    def salary=(new_salary)
      @salary = new_salary
      changed
      notify_observers(self)
    end

To cut down on redundant notifications to the observers, the standard Observable module requires that you call the `changed` method before you call `notify_observers`.

The Observer pattern allows you to build components that know about the activities of other components without having to tightly couple everything together in an unmanageable mess.

Most of the work in implementing the Observer pattern occurs in the subject or observable class. In Ruby, we can factor that mechanism out into either a superclass or (most likely) a module.
