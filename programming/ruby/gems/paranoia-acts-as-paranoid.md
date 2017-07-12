## How To Configure Ruby on Rails With Paranoia Gem
[Reference](https://www.netguru.co/tips/how-to-configure-ruby-on-rails-with-paranoia-gem)

- If you want to delete a user, but his messages should be displayed. If you removed that user, when trying to display his messages you would get an error.

``` ruby
class User < ActiveRecord::Base
  acts_as_paranoid
end
rails generate migration AddDeletedAtToUsers deleted_at:datetime:index
rake db:migrate
```

- To access softly deleted user record: `User.unscoped { super }`.
- To access: `belongs_to :user, -> { with_deleted }`.
- New scope: `User.with_deleted`, `User.without_deleted`, `User.only_deleted`.
- To check if a record is softly deleted using `user.paranoid_destroyed?` or `user.deleted?` methods.
- Index ignores softly deleted records: `add_index :users, :some_column, where: "deleted_at IS NULL"`
- Restoring a user: `User.restore(message.user.id)`.
