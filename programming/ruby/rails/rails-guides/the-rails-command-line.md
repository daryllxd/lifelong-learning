The Rails Command Line
rails n
rails s # launches a small web server named WEBrick which is bundled with Ruby
rails s –e production –p 4000 # environment production, port 4000
rails g controller NAME [action action] [options] # generates a controller with specific actions.
•	Controllers are linked with views
# app/controllers/greetings_controller.rb
# app/views/greetings/hello.html.erb
•	Models
rails g model NAME [field[:type][:index] field[:type][:index]] [options]
rails g scaffold HighSchore game:string score:integer # a full set of model, database migration, controller, view, test suite
•	Rails Console
rails c staging # set the environment
rails c –sandbox # no data is changed

rails dbconsole # figures out what db you are using and goes to its CLI

rails runner “Model.long_method” # runs Ruby code in the context of Rails non-interactively

rails d model Oops # 
