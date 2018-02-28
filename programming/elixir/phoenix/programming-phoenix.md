## Programming Phoenix

### Introducing Phoenix

- Fast: Elixir is both fast and concurrent. Faster, 1/4 processing power, 1/6 memory.
- Erlang has a great model for concurrency.
- Router = cat-quick pattern matching.
- Templates = pre-compiled.
- Database fetches: You don't have to artificially batch them together with a stored procedure or a complex query. You can let them work at the same time:

``` elixir
D: WHOA!!!

company_task = Task.async(fn -> find_company(cid) end)
user_task    = Task.async(fn -> find_user(uid) end)
cart_task    = Task.async(fn -> find_cart(cart_id) end)

company = Task.await(company_task)
user    = Task.await(user_task)
cart    = Task.await(cart_task)
```

``` elixir
pipeline :browser do
  plug :accepts, ['html']
  plug :fetch_session
  plug :protect_from_forgery
end

pipeline :api do
  plug :accepts, ['json']
end

scope '/', MyApp do
  pipe_through :browser
  get '/users/, UsersController, :index
end

scope '/api/ MyApp do
  pipe_through :api
end
```

- Pipeline: You don't have to do `skip_before_filter`, you just build a `pipeline` for each group of routes that work the same way.
- Performance tuning in other frameworks: just tuning route tables.
- Elixir pattern matching and macro syntax to provide a routing layer.
- No saving of state, and that's it.
- Lightweight processes: Channels.

## Part 1: Functional MVC

### Chapter 2: The Lay of the Land

- Any web server is a function. Each time you type a URL, think of it as a function call to some remote server. Request -> response. **A web server is a natural problem for a functional language to solve.**
- `|>` (pipe operator): composition of functions, pipe or pipelines.
- Pipelines are also functions.
- `connection |> phoenix`: We pipe the connection into `phoenix`, it does it's magic, and we're done.
- Layers:

``` elixir
connection
|> endpoint
|> router
|> pipelines
|> controller
```

- Controllers:

``` elixir
connection
|> controller
|> common_services
|> action
```

- Phoenix: No side effects--functions that touch and probably change the outside world--to the controller.
- Pure functions: calling the same function with the same arguments will always yield the same results.
- In Phoenix, you'll want to separate the code that calls another web server from the code that fetches code from a database from the code that processes that data.

#### Pattern Matching

``` elixir
austin = %{city: "Austin", state: "Tx"}

defmodule Place do
  def city(%{city: city}), do: city    # Uses pattern matching to destructure the data/take it apart. This looks trivial, but sometimes data structures can be deep.
  def texas?(%{state: "Tx"}), do: true # Pattern match as a test.
  def texas?(_), do: false             # Fallback case if the pattern doesn't match
end
```

- You can also use this to grab only certain types of connections, and also to grab individual pieces of the connection, conveniently within the function heading.
- "When you think about it, typical web applications are just big functions."
- Then, it provides a place to explicitly register each smaller function in a way that's easy to understand and replace.
- Think of each individual plug as a function that takes a `conn`, does something small, and returns a slightly changed `conn`. The web server provides the initial data for our request, and then Phoenix calls one plug after the other.
- Project directory:
  - `config`
  - `lib`: supervision trees and long-running processes.
  - `test`: tests.
  - `web`: models, views, templates, controllers.
- When you have code reloading turned on, the code in `web` is reloaded, and the code in `lib` isn't, so that's where you put long-running services.
- Templates are separate from the views.

``` elixir
connection
|> endpoint
|> browser
|> HelloController.world
|> HelloView.render
```

### Chapter 3: Controllers, Views, and Templates

- Repository: A hand-coded bucket. This separates the data itself from the ceremony surrounding how it's saved.
- Model:

``` elixir
defmodule HabitsOne.User do
  defstruct [:id, :name, :username, :password]
end
```

- Repository: API for holding things. Split the concerns of data from the concerns of the database.
- View: A module containing rendering functions that convert data into a format the end user will consumer, like HTML or JSON.
- Template: A function on that module, compiled from a file containing a raw markup language and embedded Elixir code to process substitutions and loops.
- Templates are fast: Since Phoenix builds templates using linked lists rather than string concatenation, it doesn't need to make huge copies of giant strings.
- Elixir has only a single copy of the largest and most frequently used strings in your application, so you can cache stuff.

### Helpers

``` elixir
def view do
  quote do
    use Phoenix.View, root: "web/templates"

    # Import convenience functions from controllers
    import Phoenix.Controller, only: [get_flash: 2, view_module: 1]

    # Use all HTML functionality (forms, tags, etc)
    use Phoenix.HTML

    import HabitsOne.Router.Helpers
    import HabitsOne.ErrorHelpers
    import HabitsOne.Gettext
  end
end
```

- Internally: A view is just a module, and templates are just functions. So we can code templates in views?

### Chapter 4: Ecto and Changesets

- Changesets: holds all changes you want to perform on the database. Encapsulates the whole process of receiving external data, casting and validating it before writing it to the database.
- Models:

``` elixir
defmodule HabitsOne.User do
  use HabitsOne.Web, :model

  schema "users" do
    field :name, :string
    field :email, :string
    field :password, :string, virtual: true
    field :password_hash, :string

    timestamps
  end
end
```

``` elixir
# web/web.ex: These are injected into the HabitsOne.User module

def model do
  quote do
    use Ecto.Schema

    import Ecto
    import Ecto.Changeset
    import Ecto.Query
  end
end
```

- Migration

``` elixir
defmodule HabitsOne.Repo.Migrations.CreateUser do
  use Ecto.Migration

  def change do
    create table(:users) do
      add(:name, :string)
      add(:email, :string, null: false)
      add(:password_hash, :string)

      timestamps()
    end

    create unique_index(:users, [:email])
  end
end
```
