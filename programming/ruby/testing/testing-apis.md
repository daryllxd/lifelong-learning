# Rails API Testing Best Practices
[link](http://matthewlehner.net/rails-api-testing-guidelines/)

*A properly designed API should return two things: an HTTP response status-code and the response body. That said, testing the response body should just verify the application is sending the right content.*

Just like we use an integration test to ensure that our app behaves as planned, we also require that our API responds as desired. Use RSpec request specs.

Request specs are designed to drive behavior through the full stack, including routing (provided by Rails), and without stubbing (that's up to you).

    # spec/requests/api/v1/messages_spec.rb
    describe "Messages API" do
      it 'sends a list of messages' do
        FactoryGirl.create_list(:message, 10)

        get '/api/v1/messages'

        expect(response).to be_success            # test for the 200 status-code
        json = JSON.parse(response.body)
        expect(json['messages'].length).to eq(10) # check to make sure the right amount of messages are returned
      end
    end

## JSON Helper

    # spec/support/request_helpers.rb
    module Requests
      module JsonHelpers
        def json
          @json ||= JSON.parse(response.body)
        end
      end
    end

    RSpec.configure do |config|

      config.include Requests::JsonHelpers, type: :request

    end


    # spec/requests/api/v1/messages_spec.rb
    describe "Messages API" do
      it 'retrieves a specific message' do
        message = FactoryGirl.create(:message)
        get "/api/v1/messages/#{message.id}"

        # test for the 200 status-code
        expect(response).to be_success

        # check that the message attributes are the same.
        expect(json['content']).to eq(message.content)

        # ensure that private attributes aren't serialized
        expect(json['private_attr']).to eq(nil)
      end
    end
