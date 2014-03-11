# Active Record Associations

When code such as `has_many` and `belongs_to` are executed, Rails uses some metaprogramming magic to dynamically add code to your models.

The relationships won't work unless the foreign keys are there. So you have to bring the accompanying migrations, too.

Automatically add indices for the foreign keys. `add_index :timesheets, :user_id`.

## Association Collection Methods

- `<<(*records)` and `create(attributes = {})`
- `any?` and `many?`
- `average`
- `build` (?)
- `calculate` - performs :sum, :average, :minimum, :maximum
- `clear`/`delete`/`delete_all` - They execute an `SQL UPDATE` that sets foreign keys for all associated objects to null.. not delete the actual thing.
- `count(column_name=nil)` - If you put the column name it will count the number of rows where an entry exists.
- `create`
- `destroy`- Legit delete a row in the database.
- `first`
- `ids`- Convenience wrapper for `pluck(primary_key)`
- `include?`
- `last`
- `length`
- `maximum`
- `minimum`
- `new`
- `pluck`
- `replace`
- `select`
- `size`
- `sum`
- `uniq`

## `belongs_to`

The `belongs_to` class method expresses a relationship from one AR object to a single associated object for which it has a foreign key attribute.

__A class `belongs_to` another class if it has a foreign key column in its database table.__

AR caches the objects. You can reload it via explicitly telling the method `true`.

    Timesheet belongs_to User
    Timesheet.user.object_id
    Timesheet.user.object_id #=> same as before since cached
    Timesheet.user(true).object_id #=> different since you reload the relationship

#### Options

__class_name__

If we want to establish another `belongs_to` relationship from the Timesheet class to User, we can add an `approver_id` to the timesheets, and an `authorized_approver` column to the users table via amigration.

    belongs_to :approver, class_name: 'User'
    belongs_to :user

__counter_cache__

Use this option to make Rails automatically update a counter field on the associated object with the number of belonging objects.

    counter_cache: :number_of_children
    counter_cache: true #=> children_count

You get to optimize performance ad teh cost of some extra database storage by using counter caches liberally, because Rails will no longer try to query the db for the associated records.

To use this, set the default value of things to 0 in the database! Otherwise the counter caching won't work.

__dependent: destroy__ and __dependent: delete__

This might make sense in a `has_one`/`belongs_to` pairing, but it is unlikely that you want the behavior on a `has_many`/`belongs_to` relationship.

__`foreign_key`: `column_name`__

Rails will normally infer the setting from the name of the association by adding `_id` to it.
    
    belongs_to :administrator, foreign_key: 'admin_user_id'

__`inverse_of: name_of_has_asociation`__

Performance optimization.

## `has_many`

The `has_many` class mehtod is often used without additional options. If Rails can guess the type of class of the relationship from the name of the assoc, no additional config is necc.

__`as: association_name`__

Specifies the `belongs_to` association to use on the related class.

__`class_name`__

Specifies, as a string, the name of the class of the association.

    has_many :draft_timesheets, -> { where(submitted: false) }, class_name: "Timesheet"

__`primary_key: column_name`__

Specifies a surrogate key to use instead of the owning record's primary key, whose value should be used when querying to fill the association collection.

## Many-to-Many Relationships

## `has_many :through`

Rails strongly recommends real Joins via `has_many :through` associations.

Rails will not remove habtm because of the legacy Rails apps and because it provides a way to join classes without a primary key defined on the join table.

> The `has_many :through` association allows you to specify a one-to-many relationship indirectly via an intermediate join table. In fact, you can specify more than one such relationship between the same table. The biggest advantage is that the join table contains full_fledged model objects complete with primary keys and ancillary data. - Josh Susser

    class Client < AR:Base
        has_many :billable_weeks
        has_many :timesheets, through: :billable_weeks
    end

    class BillableWeek < AR:Base
        belongs_to :client
        belongs_to :timesheet
    end

    class Timesheet < AR:Base
        has_many :billable_weeks
        has_many :clients, through

`has_many :through` is always used in conjunection with a normal `has_many` association. Also, notice that the normal `has_many` association will often have the same name on both classes that are being oined together.

    class Grandparent < AR:Base
        has_many :parents
        has_many :grand_children, through: :parents, source: :children
    end

    class Parent < AR:Base
        belongs_to :grandparent
        has_many :children
    end




- `after_add`: Called after collection is added via `<<` method.
- `after_remove`: Called after a record has been removed from the collection with the `delete` method.




TODO
- belongs_to scopes
- has_many `dependent: delete_all`
- has_many scopes
- many-to-many
