## Building Rich Domain Models in Rails. Separating Persistence
[Link](http://victorsavkin.com/post/41016739721/building-rich-domain-models-in-rails-separating)

Building rich domain models in Rails is hard, because of AR, which doesn't play well with the domain model approach. One way to deal with this problem is to use an ORM implementing the data mapper pattern.

#### Problems with AR
- The class is aware of AR. Therefore, you need to load AR to run your tests.
- An instance of a class is responsible for saving and updating itself. So mocking and stubbing is harder.
- Every instance exposes low-level methods such as `update_attribute!` which change the internal state of objects.
- `has_many` associations allow bypassing an aggregate root.
- Every instance if responsible for validating itself. It's hard to test. 

#### Solution
We split AR into three different classes:

- Entity
- Data Object
- Repository

*The core idea here is every entity when instantiated is given a data object.* The entity delegates its fields' access to the data object. The data object doesn't have to be an AR object so you can provide a stub or OpenStruct instead.

Since the entity is a PORO, it doesn't know how to save/validate/update itself.

#### Example

*Schema:* Migration (2 tables, orders, and items).

*Data Objects.*

    class OrderData < AR::Base
        self.table_name = "orders"

        attr_accessible :amount, :deliver_at

        validates :amount, numericality: true
        has_many :items, class_name: "ItemData", foreign_key: "order_id"
    end

*Domain Objects.*

    class Order
        include Edr::Model
        fields....
    end

*Map domain objets to Data Objects via the Edr library.*

    Edr::Registry.define do
        map Order, OrderData
        map Item, ItemData
    end

[TODO]

