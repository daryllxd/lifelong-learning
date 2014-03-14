# RailsCasts 234: SimpleForm (Revised)

Several types of form fields, the board game has several types of associations, too. View form is super complicated. We can clean up form view templates using `simple_form`.

Change `form_for` to `simple_form_for` in yer application forms.

    $ rg simple_form:install --bootstrap

    <%= simple_form_for(@product) do |f| %>
      <%= f.error_notification %>
      <%= f.input :name %>
      <%= f.input :price, hint: "price should be in USD" %>
      <%= f.input :released_on, label: "Release Date" %>
      <%= f.input :discontinued %>
      <%= f.input :rating, collection: 1..5, as: :radio_buttons %>
      <%= f.association :publisher %>
      <%= f.association :categories, as: :check_boxes %>
      <%= f.error :base %>
      <%= f.button :submit %>
    <% end %>

Edit shit in `c/locales/simple_form.yml`.
