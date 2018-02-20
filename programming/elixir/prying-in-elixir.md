## Pry in Elixir Phoenix
[Reference](https://til.hashrocket.com/posts/3ab413d696-pry-in-elixir-phoenix)
[Reference](http://www.jessetrimble.net/iex-pry-elixir)
[Reference](http://idlehands.codes/using-pry-in-elixir)

- Apparently you need to run Phoenix through IEx. (???) So why would you not run it through IEx then?

``` elixir
require IEx; IEx.pry
$ iex -S mix phoenix.server

pry> respawn # Kills the iex process and spins a new one up at the same place in the code
```
