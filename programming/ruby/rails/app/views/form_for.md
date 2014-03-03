## `form_for(record, options = {}, &block) public`

    <%= form_for :person do |f| %>
      First name: <%= f.text_field :first_name %><br />
      Last name : <%= f.text_field :last_name %><br />
      Biography : <%= f.text_area :biography %><br />
      Admin?    : <%= f.check_box :admin %><br />
      <%= f.submit %>
    <% end %>

The variable f yielded to the block is a FormBuilder object that incorporates the knowledge about the model object represented by :person passed to form_for.


