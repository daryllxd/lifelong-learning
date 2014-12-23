## How to design a good API wrapper?
[link](http://www.reddit.com/r/ruby/comments/2nru6m/how_to_design_a_good_api_wrapper/)

I've found that a lot of libraries mix in all their methods in a `Client` class instead of using inheritance. To fetch commits in Octokit, you do this:

    client = Octokit::Client.new
    client.commits

Why not `Octokit::Commit.all`?

- If you wrap everything in the top-level class, you can only work with one endpoint at a time. If you use the client approach, you can create as many clients as you need and import data asynchronously. You can't thread/fiber/whatever using the same `Octokit` class (this is only configured for one user at a time).

- Why not do this?

    client = Octokit::Client.new
    client.repository(repo_name).star(options)

The `#repository()` method creates and returns a Repository instance which has the appropriate methods on it. So the client knows how to create a repository object but not how to star, watch, etc.

- We can also do

    client.repositories.find(repo_name).star(options)

This follows the AR terminology.

- I'd prefer:

    client.fetch_repository(repo_name).star(options)

The problem with mimicking AR's API is that ActiveRecord generally rungs on top of a database connection, where `SELECT`, `INSERT`, `REPLACE`, and `DELETE` are generally available. *This is nothing like an API gateway, unless thje API itself is a thin veneeer over a database. Is repositories going to return something similar to an ActiveRecord::Relation? Is there any type of entity in an HTTP API that is anything like an ActiveRecord::Relation?*
