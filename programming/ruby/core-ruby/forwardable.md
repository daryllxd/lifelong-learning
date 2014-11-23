## Shorter, Simpler Code with Forwardable
[link](http://www.saturnflyer.com/blog/jim/2014/11/15/shorter-simpler-code-with-forwardable/)

    class Person
      def street
        address.street
      end

      def city
        address.city
      end

      def state
        address.state
      end
    end

Ruby has a built-in way to bring the information out of this code: Forwardable.

    require 'forwardable'
    class Person
      extend Forwardable

      delegate [:street, :city, :state] => :address
    end

*With this code, the concept of forwarding a message to a collaborating object is so clear that it reads like configuration. Good configuration is fast and easy to understand.*

#### Simplified Implementation

    module Forwardable
      def delegate(hash)
        hash.each{ |methods, accessor|
          methods.each{ |method|
            instance_eval %{
              def #{method}(*args, &block)
                #{accessor}.__send__(:#{method}, *args, &block)
              end
            }
          }
        }
      end
    end

The "delegate" method accepts a hash where the keys are the method names to forward, and the values are the object names to receive the forwarded messages.
