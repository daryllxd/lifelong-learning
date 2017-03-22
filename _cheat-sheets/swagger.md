```ruby
module Documentation
  module MatchParticipantsController
    extend ActiveSupport::Concern
    included do
      swagger_controller :match_participants, 'MatchParticipant'

      swagger_model :MatchParticipant do
        description 'Match Participant'
        property :id, :integer, :required, 'Match Participant ID'
        property :is_settled, :boolean, :required
      end

      swagger_model :MatchParticipantArray do
        property :courses, :array, :required, 'An array of courses', items: { '$ref' => :MatchParticipant }
      end

      swagger_api :settle do |api|
        summary 'Changes an array of MatchParticipants is_settled status to settled.'
        ApiController.has_token_authentication(api)

        param :form, 'participants[]', :array, :required, 'Match Participants', items: { '$ref' => :Ids }
        response :success, 'An array of MatchParticipants', 'MatchParticipantArray'
        response 404, 'Required parameters (participants) not found', 'Error'
      end
    end
  end
end
```
