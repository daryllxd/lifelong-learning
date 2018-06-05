# Rails Database Best Practices
[Reference](https://blog.carbonfive.com/2016/11/16/rails-database-best-practices/)

- *Let the database do its job.* Filtering, sorting, it's usually faster than if it was done in Ruby.
- *Write efficient/chainable scopes.*

``` ruby
# Please don't do this...
scope :active, -> {
  includes(:client)
    .where(active: true)
    .select { |project| project.client.active? }
    .sort_by { |project| project.name.downcase }
}
```

- Problems:
  - Does not return AR::Relation. An AR::Relation is chainable. It can also be used with `merge()`.
  - Filtering a larger dataset into a smaller one USING RUBY. This is really slow, because you move from database to app server, parse query results, and your database has indexes which makes this filtering fast.
  - Sorting in Ruby. A `sort_by` is going to trigger the query and we lose the relation.
  - Scope is sorting. (You can separate this.)

``` ruby
# Much better
class Project < ActiveRecord::Model
  belongs_to :client

  scope :active, -> {
    where(active: true)
      .joins(:client)
      .merge(Client.active)
  }

  scope :ordered, -> {
    order('LOWER(name)')
  }
end
```

- *Reduce calls to the database.* If an often visited page triggers more than a couple calls to the DB, it's worth spending a little time to reduce the number of calls to just a few. Eliminate inefficient queries first.
- *Use indexes.* Add an index on every ID column as well as any column used in a `where` clause. It's possible to over-index, but it's better to have them than not.
- *Use Query Objects for complicated Queries.*

``` ruby
# A query that returns all of the adults who have signed up as volunteers this year,
# but have not yet become a pta member.
class VolunteersNotMembersQuery
  def initialize(year:)
    @year = year
  end

  def relation
    volunteer_ids  = GroupMembership.select(:person_id).school_year(@year)
    pta_member_ids = PtaMembership.select(:person_id).school_year(@year)

    Person
      .active
      .adults
      .where(id: volunteer_ids)
      .where.not(id: pta_member_ids)
      .order(:last_name)
  end
end
```

- Benefit: code organization, easy to test, SRP.
- *Avoid ad-hoc queries outside of Scopes and Query Objects.*
  - Restrict access to AR generic query-building methods (`.where`, `.group`, `.joins`, `.not`, etc.) to scopes and Query objects.
- *Use the right types.*
  - To preserve case, but have all comparisons be case-insensitive? `citext`.
  - A set of things, but a join table is overkill? `array`.
  - Date, int, float range? `range`.
  - Globally unique ID (primary key/otherwise)? `UUID`.
  - JSON blob? `JSON`.
- *Database full search.*

