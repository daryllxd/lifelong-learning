# RUBY GEM CONFIGURATION PATTERNS
[Reference](http://brandonhilkert.com/blog/ruby-gem-configuration-patterns/)

## Global Configuration

``` ruby
module MegaLotto
  class << self
    attr_writer :configuration
  end

  def self.configuration
    @configuration ||= Configuration.new
  end

  def self.reset
    @configuration = Configuration.new
  end

  def self.configure
    yield(configuration)
  end
end
```

## Local Configuration

- Inject the configuration class and pass it into an object that can read it.

``` ruby
module MegaLotto
  class Drawing
    attr_accessor :config

    # We pass the Configuration object in, which will be used later
    def initialize(config = Configuration.new)
      @config = config
    end

    # We use config.drawing_count to figure out the number range
    def draw
      config.drawing_count.times.map { single_draw }
    end

    private

    def single_draw
      rand(0...60)
    end
  end
end
```

- The more flexibility you offer to users of your gem, the more users will find value in your work. However, there's a point where offering too much configuration can make the internals of a gem unnecessarily complicated.

## Clearance Implementation
[Reference](https://robots.thoughtbot.com/mygem-configure-block)

``` ruby
module Clearance
  class << self
    attr_accessor :configuration
  end

  def self.configure
    self.configuration ||= Configuration.new
    yield(configuration)
  end

  class Configuration
    attr_accessor :mailer_sender

    def initialize
      @mailer_sender = 'donotreply@example.com'
    end
  end
end
```

