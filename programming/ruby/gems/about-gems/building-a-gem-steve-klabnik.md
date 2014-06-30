# Ruby with Steve Klabnik
[link](ihttp://www.howistart.org/posts/ruby/1d)

Convention: `ruby_gem`, `ruby_gem-extensions`

    $ bundle gem how_i_start

- Gemfile - track project dependencies
- Rakefile - for making things (`rake build`, `rake install`, `rake release`)
- Gemspec (`how_i_start.gemspec`): Specified metadata for the gem
- `lib/how_i_start.rb`: This is where the files go. This is the file that gets required when you say `require 'how_i_start'`

Test:

    require "minitest/autorun"

    require "how_i_start"

    class UrlTest < Minitest::Test
      def test_url
        assert_equal "http://howistart.org/posts/ruby/1", HowIStart::Url
      end
    end

Code:

    require "how_i_start/version"

    module HowIStart
      Url = "http://howistart.org/posts/ruby/1"
    end

To push to RubyGems:

    $ bundle exec rake install
