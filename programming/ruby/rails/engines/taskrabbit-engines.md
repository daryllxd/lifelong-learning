## Rails 4 Engines
[Link](http://tech.taskrabbit.com/blog/2014/02/11/rails-4-engines/)

Monolithic Rails app -> Several with their own logic and connected via na API -> single "app" made up of several Rails engines.

Rails Engines is basically a whole Rails app that lives in the container of another one. Put another way, as the docs note: an app itself is basically just an engine at the root level. 

Ex: `Devise` and `rails_admin`. These show the power of engines by providing a large set of relatively self-contianed functionality "mounted" into an app.

#### Versus Many Apps

Many apps mean it is easier to modularize and everyone has freedom. The problem is that things get rough in coordinating across these apps. What they did was __they made APIs and allowed any app to have read-only access to the platform app's database.__ This allowed things to go much faster by preventing the creation of man GETs and possible points of failure.

Problem is, integration testing the whole thing. 

__Engine advantages__

- One codebase and one repo
- Single PR has everything related to that feature
- Gems are bumped once
- Internal gems are left unbuilt in the gems folder in the app itself.
- Things are modular
- Specs are slower in the engine but you'll have better integration testing

#### Versus Single App

Inside a given engine, you have the scope of a much smaller project. Some engines may grow larger and you'll start to use those tools to keep things under control.

## Engine Usage

#### Admin

Before: They put adin f(x) in the normal pages. Just by changing permissions, we could allow the admin to edit it, too.

__Benefits:__

- Previously, 1/3 of model code for Post would be for admins only.
- Now, admins can have a better experience and keep them in admin-land.
- The tendency for them was to do Admin::Post < ::Post and other inheritance.
- Inheritance is bad if you have horrible 

#### Shared Code

Ex: models and layouts. Put them in top-level.

To keep things as tight as possible, we’ve allowed each engine to have their own User object, for example. If there is model code to share, it would still go in the shared engine, but as a mixin like this one. Note that in a well-designed schema, only one of these actually writes to the database and the others include a ReadOnly module from the shared engine.

#### API Server

Layouts are not shared between the engines. All frontend code is in one engine and all of the other engines just serve API endpoints. The frontend doesn't really use and models and has all the assets and such.

Ideally, there is no interaction between engines. Particularly in the models and views, this is critical. However, some knowledge leaks out in the example though from the controllers. For example, the login controller redirects to /posts after login. This is in the content engine. It’s probably not the end of the world but that is coupling. We get around this using our one frontend engine and the several API ones, but this does some serious commitment.

## Strategies

#### Migrations and Models

If sharing models: `db/migrate`.

Master User model: Has the `has_secure_password` and knows anything about that kind of thing. 

Other models: They may need a User model but they have the `ReadOnly` module __to prevent actually writing to the table__.

Therefore, the account engine has the migrations having to do with the users table. In order to register that migrations are within these engines, we add a snippet like the following to each engine.

What happens when you add a column to users for some other feature in the other engines? Ex: boolean `admin` column to know if the given user is allowed to do stuff in the admin engine.

__In part, if I couldn’t justify to myself why it would be part of the account engine, should this even be in the users table at all?__ If the answer is “yes” for whatever reason, then I’d likely still put the migration in the account engine, but usually it helps me realize that it shouldn’t be in the users table at all.

Again, architecture does not exist for fun or to get in the way. _If something is super-simple and obvious and easy to maintain while doing the “right” way for the design is difficult and fragile, we just do it the easy way._ That’s the way to ship things for customers. However, we’ve found that in most case the rules of the system kick off useful discussions and behaviors that tend to work out quite well.

#### Admin

In our system, the admin engine has it’s own migrations. For example, we have a model called `AdminNote` where an admin can jot down little notes about most objects in the system. It clearly owns that. But the reason this whole experience exists in the first place is that it also is able to write more or less whatever it wants to all the objects in the system.

So it’s fine if `Admin::Post < Content::Post` or just uses `Content::Post `directly in it’s controllers. It’s just not worth it to share all of the data definitions and validations with when it will almost always be with engine X and admin. Note that it’s important to have the same validations because admin might be in charge, but it still needs to produce valid data as that other engine will be using it.

In our much larger app, we inherit from and/or use most of the models in the system as well as service objects from other engines. We do not use outside controllers or views. Our admin engine does use it’s own layout and much simpler request cycle than our much fancier frontend app.

#### Assets [TODO]

#### Routes

In an Engine, routes go within the engine directory at the same `config/routes.rb` path. 

The Engines need to be mounted in order for them to be used.

In a normal engine use case, you would mount rails_admin (say to /admin) to give a namespace in the url, but we think it’s important that all of these engines get mounted at the root level. You can see our root routes.rb file here.

[TODO]
