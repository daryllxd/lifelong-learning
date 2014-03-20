## Railscasts #394 STI and Polymorphic Associations

(Read Railscasts STI stuff first.)

Behavior of app hasn't changed (but it's cleaner) but the database hasn't changed.

    ActiveRecord::Schema.define(:version => 20121212202638) do
      create_table "tasks", :force => true do |t|
        t.integer  "user_id"
        t.string   "name"
        t.boolean  "complete",   :default => false, :null => false
        t.datetime "created_at",                    :null => false
        t.datetime "updated_at",                    :null => false
      end

      create_table "users", :force => true do |t|
        t.string   "username"
        t.string   "email"
        t.string   "password_digest"
        t.datetime "created_at",      :null => false
        t.datetime "updated_at",      :null => false
        t.string   "type"
      end
    end

When the app grows and columns are added that apply to one type of user only that would suck for us. There would be nulls because the table isn't properly normalized.

*A general rule of thumb is that we have several fields in a table that aren’t shared by all the records then Single Table Inheritance isn’t the best approach.*

The end result is similar to STI but it allows each different type to have its own model and DB table.

Each task has a user assigned to it. We can add a `user_type` column to the `Tasks` table but this means that *every time a model needs to relate to user, you need to create a polymorphic association*.

What is better is that you:

1. Keep the users table.
2. Move the columns specific to a member out into a `member_profile` and `guest_profile` table and have polymorphic association between users and profiles.

#### Steps

Create migration.

    $ rg model MemberProfile username email password_digest
    $ rg model GuestProfile

Add reference from model.

    $ rg migration add_profile_to_users profile_id:integer profile_type
    $ rdm

Add index to database columns.

Do this:

> a/m/user.rb

    class User < ActiveRecord::Base
      has_many :tasks, dependent: :destroy
      belongs_to :profile, polymorphic: true
    end

> a/m/guest_profile.rb

    class GuestProfile < ActiveRecord::Base
      has_one :user, as: :profile, dependent: :destroy
    end

> a/m/member_profile.rb

    class MemberProfile < ActiveRecord::Base
      has_one :user, as: :profile, dependent: :destroy
      attr_accessible :email, :password_digest, :username
    end

Add methods and shit!

## RailsGuides

With polymorphic associatiosn, a model can belong to more than one other model, on a single association.

> picture that belongs to either and employee or a product.

    class Picture < ActiveRecord::Base
      belongs_to :imageable, polymorphic: true
    end
     
    class Employee < ActiveRecord::Base
      has_many :pictures, as: :imageable
    end
     
    class Product < ActiveRecord::Base
      has_many :pictures, as: :imageable
    end

Now, you can retried `@employee.pictures` and `@product.pictures`.



My problem with this:
- Creating an instance of the polymorphed
- Tons of delegation everywhere
