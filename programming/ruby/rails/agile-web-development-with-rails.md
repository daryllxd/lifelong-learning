## Introduction

#### Why Rails
1. MVC, we start with a working application.
2. Full testing support.
3. Ruby, concise language.
4. Convention over configuration
5. Deployment
6. Obsessive over DRY

## 2: Instant Gratification

	$ rails g controller Say hello goodbye # You get a controller named Say with actions hello and goodbye
	$ rails d controller Say # must delete routes first in routes.rb

Whenever you have data, you have to do it first in the controller, then provide it inthe view. Ex for `time`, you have to `It is now <%= @time %>` in the view so that when you modify the time collection you just edit it once.

## 3: The Architecture of Rails Apps

Rails model support: RDBMS are designed around mathematical set theory. While good from a conceptual POV, it makes it difficult to combine RDBMS with OOPLs.

Active Record is the ORM layer supplied with Rails.

#### Controller
- Routes external requests to internal actions.
- Manages caching.
- Manages helper modules.
- Manages sessions.

## 4: Introduction to Ruby

Modules: Hold a collection of methods, constants. They act as a namespace and they can be mixed into another thingie.

#### Idioms

- `empty!` and `empty?`: Exclamation = destructive
- `a || b`: Short-circuit eval, used for default values
- `a ||= b`. Ex: `count || 0` gives count the value of 0 if count doesn't already have a value.
- `obj = self.new`: A class method creates an instance of the class.

## 5: The Depot Application

#### Use Cases

A use case is simply a statement about how some entity uses a system.





what html template to use

easies place to get 1st world citizenship