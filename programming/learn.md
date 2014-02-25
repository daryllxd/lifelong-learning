> Add spec alias for "require spec helper" and first test.
> They took out assets group in Rails 4.
> Outside in testing 
> Add Capybara DSL 
> All Rspec tests have to have spec in the name.
> I really should make my own generator.
> Tmux changing the crap thing.
> Start rails on alternate port in Guard.
> Controller structure: Home has its own controller (no model, show action only). Dashboard has its own controller (no model, show action only).
> Controllers need not be connected to models.
> render text: "DO the text". That's the right syntax.
> Setting up devise via migration, then the initializers, then the views in the folder,
> First time to do the seeding thing on Rails. JESUS CHRIST DO NOT FORGET THE PRIMARY KEY.
> Testing thing sa thoughtbot: CodeClimate, simplecov if env["coverage"]. Requires: rspec/autorun, rspec/rails, paperclip/matchers, webmock/rspec, clearance/testing
> FakeStripeRunnner, FakeGithubRunner, Capybara js driver = webkit. Mocks: Mocha.
> FactoryGirl+Faker: Require the Faker (or FFaker) at top. Also, FFaker still uses Faker in the factories themselves.
> No need to restart guard when FG has been modified.
> Iba yung `user_session_path` sa `new_user_session_path`
> Important thing for devise:

    <%= form_for(:user, :url => session_path(:user)) do |f| %>
      <%= f.text_field :email %>
      <%= f.password_field :password %>
      <%= f.check_box :remember_me %>
      <%= f.label :remember_me %>
      <%= f.submit 'Sign in' %>
      <%= link_to "Forgot your password?", new_password_path(:user) %>
    <% end %>

 
