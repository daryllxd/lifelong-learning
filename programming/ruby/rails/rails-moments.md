AR:

- `where` returns an AR::Relation. If nothing matches, it returns an empty relation. `find` returns a single model object, a collection of model objects in an Array, or `nil`/raising and `ActiveRecord::RecordNotFound`.
- `where(id > 5)` to find stuff, also `find_by("id = 5")`, `find(35)`.
