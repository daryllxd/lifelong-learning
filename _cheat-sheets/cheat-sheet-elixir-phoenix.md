```
Rails                            | Elixir
rails new hello                  | mix phx.new hello
rails s                          | iex -S mix phx.server
rails c                          | iex -S mix
bundle install                   | mix deps.get
bundle update hello              | mix deps.update hello
bundle update                    | mix.deps update --all
rails routes                     | mix phx.routes
rake db:migrate                  | mix ecto.migrate
rake db:rollback                 | ecto.rollback
rake db:create                   | mix ecto.create
rake db:drop                     | mix ecto.drop
rails g migration CreatePictures | mix ecto.gen.migration create_pictures
```
