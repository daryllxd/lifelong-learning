# Ecto Official Documentation
[Reference](https://hexdocs.pm/ecto/Ecto.html)

- `Ecto.Repo`: Wrappers around the data store.
- `Ecto.Schema`: Used to map any data source into an Elixir struct. We often use them to map tables into Elixir data, but that's just one of their use cases and not a requirement for using Ecto.
- `Ecto.Changeset`: Provide a way for developers to filter and cast external parameters.
- `Ecto.Query`: Written in Elixir syntax, queries are used to retrieve information from a given repository. Secure, avoids SQL injection, while still being composable, allowing developer to build queries piece by piece instead of all at once.

## Repositories

``` elixir
defmodule Repo do
  use Ecto.Repo. otp_app: :my_app
end

# config/config.exs
config :my_app, Repo
```

## Schemas

``` elixir
defmodule Weather do
  use Ecto.Schema

  # By defining a schema, Ecto automatically defines a struct with the schema fields
  schema "weather" do
    field :city, :string
    field :temp_lo, :integer
    field :temp_hi, :integer
    field :prcp, :float, default: 0.0
  end
end

iex> weather = Repo.get(Weather, 1) #=> %Weather{id: 1, ...}
iex > Repo.delete!(weather) #=> Weather{...}
```

- **Storage and data are decoupled.**
  - By having structs as data, we guarantee they are light-weight, serializable structures.
  - You do not need to define schemas in order to interact with repositories.

## Changesets

- Operations on top of schemas are done through changesets so Ecto can efficiently track changes.
- These allow developers to filter, cast, and validate changes before we apply them to the data.
- The `changeset/2` invokes `Ecto.Changeset.cast/4` with the struct, the parameters, and a list of allowed fields.
- Once a changeset is built, it can be given to functions like `insert` and `update` in the repo that will return an `:ok` or `:error` tuple.

## Queries

``` elixir
query = from u in User,
          where: u.age > 18 or is_nil(u.email),
          select: u

Repo.all(query) # Returns %User{} structs matching the query.
```

# Programming Phoenix, Studying Ecto

- Sample debugging when trying to insert things

``` elixir
def registration_changeset(model, params) do
  aw = model
        # creates an Ecto.Changeset instance from the model, blank changes
        |> changeset(params)
        # cast: applies the given params as changes for the data according to the given set of keys.
        |> cast(params, ~w(password), [])
        # applies a required validator. if no password, still pass through the function but add an error to the changeset
        |> validate_required(:password)
        # applies a length validator
        |> validate_length(:password, min: 6, max: 100)
        # calling another function which can transform the changeset (change attributes, add an error) or not
        |> put_pass_hash()

  require IEx; IEx.pry
  # Because of immutability, you need to have an assignment to the "changed model". You can't just do `model` here because you get the untouched model.
  # This is actually cool because you can then do things step by step as long as you assign and re-assign.
  # At this point, you can call `Repo.insert(aw)`

  aw # Still have to return the changed model or inserted model
end
```

- Pattern match to get the `user_params` from the inbound form.
- Create a registration changeset, and if it's valid, we insert it and present the result to the user.
- If not, render the same thing, with the changeset.
- Controller is separate from change policies in the model layer.
- Model layer has no side effects. (Repo takes care of inserting).
- Changeset = data structure that tracks changes and their validity.

# Programming Phoenix Chapter 6, Generators/Relationships

- You need to import `Ecto.Query` to actual do query things.
- Ecto associations are explicit, when you want Ecto to fetch some records, you need to ask.
- Preloading:

``` elixir
iex> user = Repo.preload(user, :videos)
iex> user.videos
```

# Composable Queries in Ecto
[Reference](https://blog.drewolson.org/composable-queries-ecto/)

- Querying with Ecto:
  - Keyword Query

``` elixir
MyApp.Repo.all(
  from p in MyApp.Post,
  select: p
)

MyApp.Repo.all(
  from p in MyApp.Post,
   where: p.published == true,
  select: p
)
MyApp.Repo.all(
  from c in MyApp.Comment,
    join: p in assoc(c, :post),
   where: p.id == 1,
  select: c
)

```

  - Query Expressions

``` elixir
MyApp.Post |> MyApp.Repo.all

MyApp.Post
|> where([p], p.published == true)
|> MyApp.Repo.all

MyApp.comment
|> join(:left, [c], p in assoc(c, :post))
|> where([_, p], p.id == 1)
|> select([c, _] c)
|> MyApp.Repo.all
```

## Query Compositions
[Reference](https://blog.drewolson.org/composable-queries-ecto/)
``` elixir
defmodule MyApp.Post do
  def published(query) do
    from p in query,
    where: p.published == true
  end

  def sorted(query) do
    from p in query,
    order_by: [desc: p.published_at]
  end
end
```

``` elixir
defmodule MyApp.Comment do
  # First post query so it's pipe-able
  def for_post(query, post) do
    from c in query,
    join: p in assoc(c, :post)
    where: p.id == ^post.id
  end

  def popular(query) do
    query |> where([c], c.votes > 10)
  end
end

recent_popular_comments = Comment
|> Comment.for_post(last_post)
|> Comment.popular
|> MyApp.Repo.all
```
