## What I did

Install gem and include 2.1.0

Create the PagesController and inherit like a baws

    class PagesController < HighVoltage::PagesController
      def show
        render template: current_page
      end
    end

Create initializer

    HighVoltage.configure do |config|
      config.route_drawer = HighVoltage::RouteDrawers::Root
    end

Don't add routes except for the front controller

## Tests

    LANDING_PAGES = %w(about faq landing)

    describe HighVoltage::PagesController do
      LANDING_PAGES.each do |page|
        context 'GET /#{page}' do
          before { get :show, id: page }

          it "should be successful" do
            expect(response).to be_success  
          end

          it "should render the page" do
            expect(response).to render_template(page)
          end      
        end
      end
    end

## Github documentacion

Write your static pages and put them in the `a/v/pages` directory and you can access them via `page_path('about')`. This will access `a/v/pages/about.html.erb or .haml`.

What happens is that `page_path(about)` will link to `localhost:3000/pages/about`. What you need to do is to set the route to the root (lelz).

> c/initializers/high_voltage.rb

    HighVoltage.configure do |config|
      config.route_drawer = HighVoltage::RouteDrawers::Root
    end

Some `c/initializers/high_voltage.rb` options.

    config.content_path = 'site/'           # The default is pages, so change this via this switch.
    config.action_caching = true            # Turn on caching like a baws
    config.page_caching = true              # Page caching

#### Override using your own controller

Why?

- You need authentication.
- You need to render different layouts for different pages.
- You need to render a partial from the `a/v/pages` diretory.
