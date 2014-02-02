## Writing Configurable Applications, Part 1

The worst way to work with configuration data is to embed it directly within your application. The simple Sinatra application shown below is a nice example of what not to do.

    require "rubygems"
    require "sinatra"
    require "active_record"

    class User < ActiveRecord::Base; end

    configure do
      ActiveRecord::Base.establish_connection(
        :adapter  => "mysql",
        :host     => "myhost",
        :username => "myuser",
        :password => "mypass",
        :database => "somedatabase"
      )
    end

    get "/users" do
      @users = User.all
      haml :user_index
    end

The first and most obvious issue with this sort of code is security, everyone who looks at its source needs to be trusted, as the credentials for the database connection are embedded directly within it. 

In a field in which revision control is a key part of our practices, it's not as simple as removing this sensitive information when you decide you no longer want to share it with others. Rewriting the history of a repository is straightforward on its own, but mixing application and configuration code makes it tricky to do this without jumping through a bunch of hoops.

### YAML Based Configurations

    development:
      adapter: mysql
      database: mydatabase
      username: myuser
      password: mypass
      host: myhost

Through the standard YAML library, we can easily access this data by parsing it into a nested hash, as shown in the irb session below.

    >> require "yaml"
    => true
    >> YAML.load_file("config/database.yml")
    => {"development"=>{"username"=>"myuser", "adapter"=>"mysql", 
       "database"=>"mydatabase", "host"=>"myhost", "password"=>"mypass"}}

    configure do
      database_config = YAML.load_file("config/database.yml")
      ActiveRecord::Base.establish_connection(database_config)
    end

By removing the configuration data from the application code, we have made it so that the application code no longer needs to be modified everywhere it runs, provided the configuration data is properly set up. We can now safely tell our revision control system to ignore the configuration file without it causing many problems.

## [Writing Configurable Applications, Part 2](https://practicingruby.com/articles/configurable-applications-2)

    default: &DEFAULT
      host:
        name: testsystem
        http_port: '8080'
        username: defaultuser
      database:
        host: db01/db01
        username:
        password:
      test:
        browser: FIREFOX

    windows_default: &WIN_DEFAULT
      <<: *DEFAULT
      test:
        browser: IE

In this example, the `default` and `windows_default` configurations share almost the same attributes, except that browsers differ in test mode. Franklin uses aliasing to merge the `DEFAULT` data into the `WIN_DEFAULT` entry, solving his duplication problem. This is a neat way to keep your YAML configurations well organized.

While Franklin shared this example of aliasing to illustrate that some dynamic functionality does exist within YAML, he acknowledged that the format was still mostly suited for static data.

#### Moving to Ruby

Franklin suggests that running the YAML data through Ruby's eval method is an option, which is similar to how Rails passes its YAML files through ERB. This approach would work, but once we start going down that road, we need to ask what it would take to implement the entire configuration in pure Ruby. As you can see in the following example, the answer is 'not much':

    module MyApp
      module Config
        HOST = { :name => 'localhost', :port => 3000 }
        WEB  = { :login_url =>  "#{HOST[:name]}:#{HOST[:port]}/login" }
      end
    end

If we drop this snippet into our application code, we run into the same problems that we saw in the first example in Issue #3. But by defining this module in its own file and requiring that file, those issues are avoided:

    require "config/my_app_config"
    require "rest_client"

    module MyApp
      module Client
        extend self

        def authenticate(user, password)
          RestClient.post(MyApp::Config::WEB[:login_url], 
            :user => user, :password => password)
        end
      end
    end

    MyApp::Client.authenticate('my_user', 'seekrit')

Using ordinary Ruby constants is no more complicated than referring to data stored in a YAML file, but gives you the full power of Ruby in your configuration scripts. In more complex configurations, you may even build a mini-DSL.

Because doing configuration in pure Ruby is so easy, I often lean towards it rather than using YAML or some other external file format. I find configuration files written in Ruby to be just as readable as YAML, but far more flexible.

Using YAML might be a better idea than the approach shown above if any of the following apply to your application:

- You need to integrate with other programs that will either read or write your configuration files. It is easier for a program written in another language to produce and consume YAML than it is for it to work with arbitrary Ruby code.
- You don't want users to be able to execute arbitrary code in your application's runtime environment. This can either be for security reasons, or for protecting users from their own stupidity by restricting the range of possible mistakes they can make.
- You want configuration data that can easily be passed over a network and then executed remotely.

#### Using the Shell Environment for Configuration

Every Ruby application has a fairly primitive but useful configuration system built into it through direct access to shell environment variables. As you can see in the code below, Ruby provides a top level constant that turns the environment variable mappings into a plain old Hash object.

    $ TURBINE_API_KEY="saf3t33553" ruby -e "puts ENV['TURBINE_API_KEY']"
    IqxPfasfasasfasfgqNm

The fact that I mention API keys in the above contrived example is no coincidence. The area I first made use of environment variables in my own applications was in a command line application which acted as a client to a web service I needed to interact with. Each distinct user needed to use a different API key, but I didn't want to rely on fragile home directory lookup code to provide per-user configuration. By using environment variables, it was possible to write a line like the following in my .bash_profile which would ensure that this information was available whenever my command line program ran.

Since most modern shell implementations support environment variables, they're a good choice for this sort of semi-global configuration data. You'll also find environment variables used in places where you don't have much control over the system where your application is destined to run. The Ruby web application deployment service Heroku is a good example of that sort of environment.

On Heroku, you aren't given direct shell access and aren't even given any guarantees about where on the filesystem your application is destined to run. On top of that, if you want to run an open source application on Heroku while actively mirroring your changes to Github or some other public git host, you can't simply check in configuration files which may contain sensitive information, whether written in Ruby, YAML, or anything else.

While hardly the first tool you should reach for, environment variables make sense in situations in which you do not want to store sensitive information within your application. They also come in handy when you don't want to assume anything about your user's file system in order to locate user-wide configuration settings.

#### Configuration Best Practices

- Convention often is better than configuration. Always provide sensible defaults where possible.
- Don't put your real configuration files into your application's code repository, since this can expose sensitive data and also makes it hard for others to submit patches without merge conflicts on configuration settings.
- __Include a sample configuration file filled with reasonable defaults with your application.__ For example, in Rails, people often check in a _config/database.yml.example_ for this purpose. The goal should be to make it as easy for your user to make a copy of the sample file and then customize it as needed to get their systems up and running.
- Raise an appropriate error message when a config file is missing. You can do this by doing a File.exist? check before loading your configuration file, or by rescuing the error a failed load causes and then re-raising a more specific error that instructs the user on where to set up their configuration file.
- Make it very easy for users to override defaults by merging their overrides rather than forcing them to replace whole configuration structures in order to make a small change.