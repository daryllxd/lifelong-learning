High level testing: Request specs.

Set up

    group :development, :test do
      gem 'rspec-rails'
    end

    $ rails g rspec:install

Rspec request tests are integration tests.

    $ rails g integration_test task
    $ rake spec:requests # run integration tests

Capybara mimics the user's behavior. Automatically included in the path.

Check flash content, too.

    Capybara: save_and_open_page to open the page lol.

By default. There is no selenium yet.

    require 'capybara/rspec'

Transactional fixtures don't work in selenium.

Just passs in the `js: true`.

> spec/requests/tasks_spec.rb

    describe "Tasks" do
      describe "GET /tasks" do
        it "displays tasks" do
          Task.create!(:name => "paint fence")
          visit tasks_path
          page.should have_content("paint fence")
        end
        
        it "supports js", :js => true do
          visit tasks_path
          click_link "test js"
          page.should have_content("js works")
        end
      end
      
      describe "POST /tasks" do
        it "creates task" do
          visit tasks_path
          fill_in "New Task", :with => "mow lawn"
          click_button "Add"
          # save_and_open_page
          page.should have_content("Successfully added task.")
          page.should have_content("mow lawn")
        end
      end
    end