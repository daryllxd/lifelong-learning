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

