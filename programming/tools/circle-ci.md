# Circle CI Call

Jed: For wwupgrade we are going to use the basic implementation because it is a normal Rails app so it will use the same configuration as Flexport. For Core, since it doesn't have the database migrations, I am going to try to run the Rakefile in the core and I'm going to manipulate CircleCI's configuration.

Jed/Alvin: You need the circle.yml to make it work. All branches can be checked by CircleCI. You should also update the database schema. Sometimes we just ignore it but its important.

Every time commits are pushed to any branch, CircleCI will perform the continuous integration process. You can push to your own branch and run tests for your own branch independent of master. This means that you can push your commits to your branch and you can test everything without disturbing the master branch.

Lester: Regarding Resque, we don't want to rescue (lolz) exceptions because it is hard to debug. You don't want to rescue the whole exception, just a specific exception.

