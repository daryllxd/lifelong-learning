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


