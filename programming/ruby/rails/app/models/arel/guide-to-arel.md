## The definitive guide to Arel, the SQL manager for Ruby
[link](http://jpospisil.com/2014/06/16/the-definitive-guide-to-arel-the-sql-manager-for-ruby.html)

AR uses Arel to build the queries and calls out to it to get the final SQL before shipping it to the database of your choice.

    users = Arel::Table.new(:users)
    select_manager = users.project(Arel.star) # project is select
    select_manager.to_sql

Arel is technically independent from AR but it needs to get the database details from somewhere and currently it uses AR. More specifically, Arel requires AR's APIs.

    select_manager = users.project(users[:id], users[:name])
    select_manager = users.project(users[:comments_count].average) => SELECT AVG("users"."comments_count") AS avg_id from "users"
    select_manager = users.project(users[:vip].as("status"), users[:vip].count.as("count")).group("vip") # Alias vip

    users.project(Arel.star).where(users[:id].eq_any([23, 42]))

#### Joins

    select_manager = users.project(Arel.star).join(comments).on(users[:id].eq(comments[:user_id]))

#### Non-selection

    delete_manager = Arel::DeleteManager.new(ActiveRecord::Base)
    delete_manager.from(users).where(users[:id].eq_any([4, 8]))

    update_manager = Arel::UpdateManager.new(ActiveRecord::Base)
    update_manager.table(users).where(users[:id].eq(42))
    update_manager.set([[users[:name], "Bob"], [users[:admin], true]])

To execute Arel queries, we get the SQL out of Arel via `to_sql` and feed it into an `ActiveRecord::Base.find_by_sql`.

From AR::Relation to Arel: `ar_relation.ast`.


Example: Query Object

    class PrivilegedUsersQuery
      attr_reader :relation

      def initialize(relation = User.all)
        @relation = relation
      end

      def find_each(&block)
        relation.where(privileged_users).find_each(&block)
      end

      private

      def privileged_users
        with_high_karma.or with_vip
      end

      def with_high_karma
        table[:karma].gt(1000)
      end

      def with_vip
        table[:vip].eq(true)
      end

      def table
        User.arel_table
      end
    end

## Using Arel instead of strings in Rails 5
[text](http://www.jefferydurand.com/ruby/rails/arel/mysql/2015/09/21/using-arel-instead-of-strings-in-rails-4.html)

    User.where("age > #{myage}")

Ugly code, also do not pass a variable directly to an SQL string like this, you open yourself up to all sorts of attacks.

    User.where(["age > ?", myage])

Better, more secure, but if you compose this query with another table that has an age column, there will be an error because this doesn't specify which age column you are referring to.

    User.where(User.arel_table[:age].gt(myage))

Best since we prevent SQL injections and we ensure that the age column is scoped to the `users` table no matter what kind of join you make.

Another problem with Rails 4: OR conditions. It's unsupported via scopes and most of the documentation would have you write an OR condition using a crazy hacked up string.

Or example:

    ranges = [0..12, 24..35, 45..60, 66..68]
    table = User.arel_table

    # pop the last one off so we have a good starting point
    starting = table[:age].in(ranges.pop)
    query = ranges.inject(starting) do |result, element|
      # add the last or to the previous or condition...
        result.or(table[:age].in(element))
    end

    # query will be an arel relation.  We need to use a where clause
    # to wire it up with ActiveRecord
    User.where(query)

BTW at least you can get the SQL first before you wire it up to AR.
