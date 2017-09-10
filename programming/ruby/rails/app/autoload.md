## Autoloading and Reloading Constants
[Reference](http://guides.rubyonrails.org/autoloading_and_reloading_constants.html)

- Without autoload:
  - Need to do file scanning for the files to be required. Very brittle.
  - `Kernel#require` loads files once, but development is much more smooth if code gets refreshed when it changes without restarting the server.

- Constant nesting

``` ruby
module XML
  class SAXParser
  end
end

[XML::SAXParser, XML]

class XMLs::SAXParser
end

[XML::SAXParser]
```

- Even though they namespace, the module nesting is different.
- When creating a `class Project < ApplicationRecord; Base`, this does `Project = Class.new(ApplicationRecord); Project.name = 'Project'`. From then on, what happens to the constant and the instance does not matter. Since the name is set, it doesn't change.
- Same with `module Admin; end` => `Admin = Module.new; Admin.name = 'Admin'`.
- Thus, when someone says "the `String` class", this really means the class object stored in the constant called "String" in the class object stored in the `Object` constant. `String` is otherwise an ordinary Ruby constant.

Some shit I didn't understand.

### `autoload_paths`

- Ruby looks for a `require 'erb'` in the directories listed in `$LOAD_PATH`. That is, Ruby iterates over all its directories and for each one of them check whether they have a file called `erb.rb`, `erb.so`, `erb.o`, or `erb.dll`. We try all load paths, if exhausted, `LoadError` is raised.
- Rails has a collection of directories in which to look up `post.rb`. That is `autoload_paths`. Those contain:
  - All subdirectories of `app`.
  - All second level directories called `/app/*/concerns` in the application and engines.
  - `test/mailers/previews`.
- Constant reloading:
  - If `config.cache_classes` is false, Rails is able to reload autoloaded constants.
  - `reload!` reloads code that is: `config/routes`, locales, Ruby files under `autoload_paths`, and `db/schema`.
  - *Each constant that Rails marks as an autoloaded one when an app runs is autoloaded whenever something in those files changes.* So if you do something like `require 'user'`, the `class User` in `app/models/user.rb` will not be marked for constant reloading.
- Never mix autoloading and require. If you really need a file, use `require_dependency`.
- Not a good idea to autoload constants on app initialization.

``` ruby
# app/models/auth_service.rb
class AuthService
  if Rails.env.production?
    def self.instance
      RealAuthService
    end
  else
    def self.instance
      MockedAuthService
    end
  end
end
```
