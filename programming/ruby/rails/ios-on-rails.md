# iOS on Rails

Humon: User can have many events as an event owner. Instead of username/password, we have a unique device token to track unique users.

    user has_many events through attendances

To parse incoming JSON requests: MultiJson. We get it for free because it is a dependency of `ActiveSupport`.

To generate JSON responses: `Jbuilder` as opposed to AM Serializers, RABL, and Rails `:as_json`.

Versioning: Future-proof the API by including our views and controllers within `api/v1` subdirectories.

    Humon::Application.routes.draw do
      scope module: :api, defaults: { format: 'json' } do
        namespace :v1 do # all resources will be here
      end
    end

API documentation: Github wiki.

## Creating a GET request

*Outside-in Development:* We write just the minimum amount of code that provides value to stakeholders, and not a line more.

Use request specs, which we call by calling `JSON.parse(response.body)` over and over again. We abstracted this into `response_json`.

    require 'spec_helper'
      describe 'GET /v1/events/:id' do
        it 'returns an event by :id' do
          event = create(:event)

          get "/v1/events/#{event.id}"

          expect(response_json).to eq(
            {
              'address' => event.address,
              'ended_at' => event.ended_at,
              'id' => event.id,
              'lat' => event.lat,
              'lon' => event.lon,
              'name' => event.name,
              'started_at' => event.started_at.as_json,
              'owner' => {
                'device_token' => event.owner.device_token
              }
            }
          )
      end
    end

Start from the end and create the factory for this! Test validations and associations.

> `app/controllers/api/v1/events_controller.rb`

    class Api::V1::EventsController < ApplicationController
      def show
        @even = Event.find(params[:id])
      end
    end

`Jbuilder` partials minimize duplication by letting us re-use blocks of view code in many different places.

> `app/views/api/v1/events/_event.json.jbuilder`

    json.cache! event do
      json.address event.address
      json.ended_at event.ended_at
      json.id event.id
      json.lat event.lat
      json.lon event.lon
      json.name event.name
      json.started_at event.started_at
    end

## Creating a POST request

[TODO]: CSRF_THINGIES

    describe 'POST /v1/events' do
      it 'saves the address, lat, lon, name, and started_at date' do
        date = Time.zone.now
        device_token = '123abcd456xyz'
        owner = create(:user, device_token: device_token)

        post '/v1/events', {
          address: '123 Example St.',
          ended_at: date,
          lat: 1.0,
          lon: 1.0,
          name: 'Fun Place!!',
          started_at: date,
          owner: {
            device_token: device_token
          }
        }.to_json, { 'Content-Type' => 'application/json' }

        event = Event.last
        expect(response_json).to eq({ 'id' => event.id })
        expect(event.address).to eq '123 Example St.'
        expect(event.ended_at.to_i).to eq date.to_i
        expect(event.lat).to eq 1.0
        expect(event.lon).to eq 1.0
        expect(event.name).to eq 'Fun Place!!'
        expect(event.started_at.to_i).to eq date.to_i
        expect(event.owner).to eq owner
      end
    end

> Sad path

    # spec/requests/api/v1/events/events_spec.rb
      describe 'POST /v1/events' do

        it 'returns an error message when invalid' do
        post '/v1/events',
          {}.to_json,
          { 'Content-Type' => 'application/json' }

          expect(response_json).to eq({
            'message' => 'Validation Failed',
            'errors' => [
            "Lat can't be blank",
            "Lon can't be blank",
            "Name can't be blank",
            "Started at can't be blank",
          ]
        })
        expect(response.code.to_i).to eq 422
      end
    end
