## #19: Intro to Function Plugs
[Reference](https://elixircasts.io/intro-to-function-plugs)

``` elixir
defmodule Teacher.MovieData do
  import Plug.Conn

  def movie_total(conn, _opts) do
    assign(conn, :movie_total, 3)
  end
end
```
