## What is the difference between “INNER JOIN” and “OUTER JOIN”?
[Reference](https://stackoverflow.com/questions/38549/what-is-the-difference-between-inner-join-and-outer-join)

- Inner join: Only get the intersect of A and B on the condition provided.
- Outer join: The union, and show the intersections when they do.
- Left outer join: Give all rows in A, plus any common rows in B.
- Right outer join: All rows in B, plus any common rows in A.
- Cross join: Every permutation of rows from the two tables.
- `SELECT A.Colour, B.Colour FROM A INNER JOIN B ON A.Colour NOT IN ('Green', 'Blue')`: Cross join but only for the conditions that satisfy.
- `SELECT A.Colour, B.Colour FROM A LEFT OUTER JOIN B ON A.Colour = B.Colour`: Cross join where you include all colors from A, all combinations that satisfy A.Color and B.Color.
- `SELECT A.Colour, B.Colour FROM A FULL OUTER JOIN B ON 1 = 0`: Since no rows in the cross-join can satisfy that predicate (1 = 0), you create a normal outer join.
- `SELECT COALESCE(A.Colour, B.Colour) AS Colour FROM A FULL OUTER JOIN B ON 1 = 0`: Union all of the two tables.

## Difference between natural join and inner join
[Reference](https://stackoverflow.com/questions/8696383/difference-between-natural-join-and-inner-join)

- Natural Join: Repeated columns are avoided. The problem though is that it will automatically join on fields of the same name.
- Why not: Let's say you have a `Customers`, and `Employees` table. `Employees` has a `ManagerID` field. When someone adds a `ManagerID` field in `Customers`, the natural join will attempt to reconcile the two columns.
- Inner join: One where the matching row in the joined table is required for a row from the first table to be returned.
- Outer join: Where the matching row in the joined table is not required for a row in the first table to be returned.
- Natural join: Assumes the join criteria to be where same-named columns in both tables match.
- Why not natural joins?
  - Not standard SQL.
  - No easy way to know which columns are being joined besides checking the schema.
  - The join conditions are invisibly vulnerable to schema changes. Changing columns will change returns and the query WILL still execute, but will return something else (silent fail so really bad.)
