## Why Associations?

With Active Record associations, we can streamline these — and other — operations by declaratively telling Rails that there is a connection between the two models. Here's the revised code for setting up customers and orders:

	class Customer < ActiveRecord::Base
	  has_many :orders, dependent: :destroy
	end
	 
	class Order < ActiveRecord::Base
	  belongs_to :customer
	end

## The Types of Associations

In Rails, an association is a connection between two Active Record models. Associations are implemented using macro-style calls, so that you can declaratively add features to your models. __By declaring that one model belongs_to another, you instruct Rails to maintain Primary Key–Foreign Key information between instances of the two models, and you also get a number of utility methods added to your model.__

	belongs_to, has_one, has_many, has_many :through, has_one :through, has_and_belongs_to_many

#### belongs_to

One-to-one connection with another model. Each instance of the declaring "belongs to" one instance of the other model.

    Order belongs_to :customer # Must be singular because of inference

> Migration

    class CreateOrders < ActiveRecord::Migration
      def change
        create_table :customers do |t|
          t.string :name
          t.timestamps
        end
     
        create_table :orders do |t|
          t.belongs_to :customer
          t.datetime :order_date
          t.timestamps
        end
      end
    end

#### has_one

Each instance of a model contains or possesses one instance of another model.

    Supplier has_one :account # Must be singular

#### has_many

> Migration

    class CreateCustomers < ActiveRecord::Migration
      def change
        create_table :customers do |t|
          t.string :name
          t.timestamps
        end
     
        create_table :orders do |t|
          t.belongs_to :customer
          t.datetime :order_date
          t.timestamps
        end
      end
    end

#### has_many :through

A has_many :through association is often used to set up a many-to-many connection with another model. This association indicates that the declaring model can be matched with zero or more instances of another model by proceeding through a third model.

    class Physician < ActiveRecord::Base
      has_many :appointments
      has_many :patients, through: :appointments
    end
     
    class Appointment < ActiveRecord::Base
      belongs_to :physician
      belongs_to :patient
    end
     
    class Patient < ActiveRecord::Base
      has_many :appointments
      has_many :physicians, through: :appointments
    end

#### has_one :through

A has_one :through association sets up a one-to-one connection with another model. This association indicates that the declaring model can be matched with one instance of another model by proceeding through a third model.

    class Supplier < ActiveRecord::Base
      has_one :account
      has_one :account_history, through: :account
    end
     
    class Account < ActiveRecord::Base
      belongs_to :supplier
      has_one :account_history
    end
     
    class AccountHistory < ActiveRecord::Base
      belongs_to :account
    end

#### has_and_belongs_to_many

    class Assembly < ActiveRecord::Base
      has_and_belongs_to_many :parts
    end
     
    class Part < ActiveRecord::Base
      has_and_belongs_to_many :assemblies
    end

#### Choosing Between `belongs_to` and `has_one`

If you want to set up a one-to-one relationship between two models, you'll need to add `belongs_to` to one, and `has_one` to the other. How do you know which is which?

The distinction is in where you place the foreign key (it goes on the table for the class declaring the belongs_to association), but you should give some thought to the actual meaning of the data as well. The has_one relationship says that one of something is yours - that is, that something points back to you. For example, it makes more sense to say that a supplier owns an account than that an account owns a supplier.

> Migration

    class CreateSuppliers < ActiveRecord::Migration
      def change
        create_table :suppliers do |t|
          t.string  :name
          t.timestamps
        end
     
        create_table :accounts do |t|
          t.integer :supplier_id
          t.string  :account_number
          t.timestamps
        end
      end
    end

#### Choosing Between `has_many` :through and `has_and_belongs_to_many`

The simplest rule of thumb is that you should set up a `has_many` :through relationship if you need to work with the relationship model as an independent entity. If you don't need to do anything with the relationship model, it may be simpler to set up a `has_and_belongs_to_many` relationship (though you'll need to remember to create the joining table in the database).

__You should use `has_many` :through if you need validations, callbacks, or extra attributes on the join model.__

#### Polymorphic Associations

With polymorphic associations, a model can belong to more than one other model, on a single association.

You can think of a polymorphic belongs_to declaration as setting up an interface that any other model can use. From an instance of the Employee model, you can retrieve a collection of pictures: `@employee.pictures`.

Similarly, you can retrieve `@product.pictures`.

[TODO]

#### Self Joins

    class Employee < ActiveRecord::Base
      has_many :subordinates, class_name: "Employee",
                              foreign_key: "manager_id"
     
      belongs_to :manager, class_name: "Employee"
    end

## 3 Tips, Tricks, and Warnings

- __Controlling Caching:__ All of the association methods are built around caching and is shared among the methods.
- __Name Collisions:__ Don't use names like `attributes` or `connection`.


#### Updating the Schema

__When you declare a `belongs_to` association, you need to create foreign keys as appropriate.__

    class Order < ActiveRecord::Base
      belongs_to :customer
    end

> Corresponding migration

    class CreateOrders < ActiveRecord::Migration
      def change
        create_table :orders do |t|
          t.datetime :order_date
          t.string   :order_number
          t.integer  :customer_id
        end
      end
    end

__If you create a `has_and_belongs_to_many` association, you need to explicitly create the joining table.__ 

The precedence between model names is calculated using the < operator for String. "`paper_boxes`" and "`papers`" to generate a join table name of "`papers_paper_boxes`" because of the length of the name "`paper_boxes`", but it in fact generates a join table name of "`paper_boxes_papers`" (because the underscore '_' is lexicographically less than 's' in common encodings).

    class Assembly < ActiveRecord::Base
      has_and_belongs_to_many :parts
    end
     
    class Part < ActiveRecord::Base
      has_and_belongs_to_many :assemblies
    end

    class CreateAssembliesPartsJoinTable < ActiveRecord::Migration
      def change
        create_table :assemblies_parts, id: false do |t|
          t.integer :assembly_id
          t.integer :part_id
        end
      end
    end

__We pass id: false to `create_table` because that table does not represent a model. That's required for the association to work properly.__

#### Controlling Association Scope [TODO]

#### Bi-directional Associations

It's normal to have a `Customer has_many :orders` and `Order belongs_to :customer`, but by default, AR doesn't know about the connection between these associations. __This happens because c and o.customer are two different in-memory representations of the same data, and neither one is automatically refreshed from changes to the other.__

Active Record provides the :inverse_of option so that you can inform it of these relations:

    class Customer < ActiveRecord::Base
      has_many :orders, inverse_of: :customer
    end
     
    class Order < ActiveRecord::Base
      belongs_to :customer, inverse_of: :orders
    end

Limitations:

- They do not work with :through associations.
- They do not work with :polymorphic associations.
- They do not work with :as associations.
- For `belongs_to` associations, `has_many` inverse associations are ignored.

## Detailed Association Reference [TODO]