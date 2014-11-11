## Whenever

Whenever is a Ruby gem that provides a clear syntax for writing and deploying cron jobs.

    $ cd my_project
    $ wheneverize .

This will create an initial `config/schedule.rb` file for you.

    every 3.hours do
      runner "MyModel.some_process"
      rake "my:rake:task"
      command "/usr/bin/my_great_command"
    end

    every 1.day, :at => '4:30 am' do
      runner 'MyModel.task_to_run_at_four_thirty_in_the_morning'
    end

    every :hour do
      runner "SomeModel/ladeeda"
    end

    every '0 0 27-31' do
      command "echo 'you can use raw cron syntax too'"
    end

    every :day, at: => '12:20am', :roles => [:app] do
      rake "app_server:task"
    end
