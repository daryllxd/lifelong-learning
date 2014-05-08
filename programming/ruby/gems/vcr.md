# VCR 2.9.0
[link](https://www.relishapp.com/vcr/vcr/docs)

VCR: Records your test suite's HTTP interactions and replay them during future test runs for fast, deterministic, accurate tests.

    require 'rubygems'
    require 'test/unit'
    require 'vcr'

    VCR.configure do |c|
      c.cassette_library_dir = 'fixtures/vcr_cassettes'
      c.hook_into :webmock
    end

    class VCRTest < Test::Unit::TestCase
      def test_example_dot_com
        VCR.use_cassette('synopsis') do
          response = NET.HTTPget_response(URI('www.google.com')
          assert_match /Example domains/, response.body
        end
      end
    end

Run this test once, and VCR will record the HTTP request to *fixtures/vcr_cassettes/synopsisy.yml*. Next run, VCR will replace the test and it will contain the same headers and body.

## Features

- Automatically records and replays your HTTP interactions with minimal setup/configuration code.
- Supports and works with HTTP stubbing facilities of multiple libraries (including Faraday).
- Request matching is configurable based on HTTP method, URI, host, path, body and headers.
- Same request can receive different response in different tests--just use different cassettes.
- Recorded request and response can be stored in JSON or YAML or your own format.
- Automatically re-records cassettes on a configurable regular interval to keep them fresh and current.
- Disable all HTTP requests you don't explicitly allow.
- Can integrate with Rspec.

# Railscasts 291

    describe "ZipCodeLookup" do
      it "show Beverly Hills given 90210", :vcr do
        visit root_path
        fill_in "zip_code", with: "90210"
        click_on "Lookup"
        page.should have_content("Beverly Hills")
      end

      it "searches RailsCasts", :vcr do
        Capybara.current_driver = :mechanize
        visit "http://railscasts.com"
        fill_in "search", with: "how I test"
        click_on "Search Episodes"
        page.should have_content('#275')
      end
    end

Slow specs, add VCR!

    gem 'vcr'
    gem 'fakeweb' or gem 'webmock'

Configuration

    VCR.config do |c|
      c.cassette_library_dir = Rails.root.join('spec', 'vcr')
      c.stub_with :fakeweb
    end

You'll get an error saying Real HTTP connections are disabled. By default, VCR is configured so it will throw an exception is any external HTTP requests, so we'll modify our spec to use it.

    VCR.use_cassette "zip_code/90210" do
      visit root_path
      fill_in "zip_code", with: "90210"
      click_on "Lookup"
      page.should have_content("Beverly Hills")
    end

*Any external HTTP requests made inside the block will now be recorded to the cassette.* Slashes mean they will run in a subdirectory.

RSpec tags: Add `:vcr` to the specs that need to use VCR so they use it automatically and create a cassette based on the spec's name.

    RSpec.configure do |c|
      c.treat_symbols_as_metadata_keys_with_true_values = true
      c.around(:each, :vcr) do |example|
        name = example.metadata[:full_description].split(/\s+/, 2).join("/").underscore.gsub(/[^\w\/]+/, "_")
        VCR.use_cassette(name) { example.call }
      end
    end

## Configuring Individual Cassettes

Individual cassettes can have differing `record` options. Default is `:once`
