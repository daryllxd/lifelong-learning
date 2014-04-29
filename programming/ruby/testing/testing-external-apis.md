# How to Stub External Services in Tests
[link](http://robots.thoughtbot.com/how-to-stub-external-services-in-tests)

Requests to external services can cause several issues:

- Connectivity problems
- Slower tests
- Hitting API rate limits
- Service doesn't exist yet
- Service doesn't exist yet

## Webmock

Disable external requests (`spec_helper.rb`)

    require 'webmock/rspec'
    Webmock.disable_net_connect!(allow_localhost: true)

You can stub shit to return pre-defined content:

> `spec_helper`

    Rspec.configure do |config|
      config.before(:each) do
        stub_request(:get, /api.github.com/).with(headers: {'Accept' => '*/*'m 'User-Agent' => 'Ruby'}).to_return(status: 200, body: 'stub', headers: {})
      end
    end


## VCR

VCR - Has the concept of cassettes which will record your test suites outgoing HTTP requests and then replaying them for other test runs.

Considerations: communication on how cassettes are shared, and it is difficult to simulate errors.

## Fake App (Sinatra)

Now we can run full integration tests in total isolation.

    RSpec.configure do |config|
      config.before(each) do
        stub_request(:any, /api.github.com/).to_rack(FakeGithub)
      end
    end

    # spec/support/fake_github.rb

    class FakeGitHub < Sinatra::Base
      get '/repos/:organization/:project/contributors' do
        json_response 200, 'contributors.json'
      end

      private

      def json_response(response_code, file_name)
        content_type :json
        status response_code
        File.open(File.dirname(__FILE__) + '/fixtures/' + file_name, 'rb').read
      end
    end

Get a sample JSON response and store it in a local file.

    # spec/support/fixtures/contributors.json
    [
      {
        "login": "joshuaclayton",
        "id": 1574,
        "avatar_url": "https://2.gravatar.com/avatar/786f05409ca8d18bae8d59200156272c?d=https%3A%2F%2Fidenticons.github.com%2F0d4f4805c36dc6853edfa4c7e1638b48.png",
        "gravatar_id": "786f05409ca8d18bae8d59200156272c",
        "url": "https://api.github.com/users/joshuaclayton",
        "html_url": "https://github.com/joshuaclayton",
        "followers_url": "https://api.github.com/users/joshuaclayton/followers",
        "following_url": "https://api.github.com/users/joshuaclayton/following{/other_user}",
        "gists_url": "https://api.github.com/users/joshuaclayton/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/joshuaclayton/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/joshuaclayton/subscriptions",
        "organizations_url": "https://api.github.com/users/joshuaclayton/orgs",
        "repos_url": "https://api.github.com/users/joshuaclayton/repos",
        "events_url": "https://api.github.com/users/joshuaclayton/events{/privacy}",
        "received_events_url": "https://api.github.com/users/joshuaclayton/received_events",
        "type": "User",
        "site_admin": false,
        "contributions": 377
      }
    ]

Verify stub response is being returned.

    require 'spec_helper'

    feature 'External request' do
      it 'queries FactoryGirl contributors on Github' do
        uri = URI('https://api.github.com/repos/thoughtbot/factory_girl/contributors')
        response = JSON.load(Net::HTTP.get(uri))
        expect(response.first['login']).to eq 'joshuaclayton'
      end
    end

## Considerations

- Additional maintenance overhead.
- Fake gets out of sync with the external endpoint.

# Testing Third-Party: Learn

I'm not a fan of fakes. It's a ton of overhead to mock the API, and it's too easy to get sometime wrong and discover it on Staging/Prodcution. Why VCR?

- Set your cassettes to expire after a few days (I do 3).
- Add cassettes to .gitignore, they exist only to make your tests run faster.
- If integration with the service requires and API key, wrap specs that hit the API in `if ENV['FOO_API_KEY'].present?`.
- The only things that should require VCR are the unit tests for the class that interacts directly with that API and integration tests. Make sure you use a stub instead of the class that hits the service in unit tests for collaborating objects.
- You are attempting to test your real integration with the API. Do not think of VCR as a mocking service and don't try and use it as a replacement for Web Mocks. If you only use it as a helper to make your tests run faster and/or hitting API limits, it can work beautifully.

# How to Test External APIs
[link](http://blog.carbonfive.com/2012/03/18/how-to-test-external-apis/)

The Testing Strategy:

- A request for the homepage is routes by Rails to a controller.
- The controller asks a `Post` model for recent posts.
- The `Post` model asks a Hacker News library for recent posts.
- The Hacker News library gets the latest posts from the Hacker News RSS feed.

To test this we'll:

1. Start with an end-to-end integration test, we can use the Rails request specs.
2. Skip controller specs. Specifying the controller won't gain us much,because it will be thing and completely exercise by the request spec.
3. Mock out Hacker News in the `Post` model's specs. No need to perform another mini-integration test between our domain model and its collaborator.
4. Specify the Hacker News library directly, instead of mocking, we'll use VCR to record the actual Hacker News HTTP request and response.

## Starting with a Request Spec

    describe 'The homepage', :vcr do
      it 'displays the recent posts'
        hacker_news_links = all '#hn .post a'
        hacker_news_links.should_not be_empty
        hacker_news_links.each do |link|
          link[:href].should match(%r{http://news\.ycombinator\.com})
        end
      end
    end

