# Rails Presenters
[link](http://rvlasveld.github.io/blog/2013/09/26/rails-presenters-filling-the-model-view-controller-gap/)

The Presenter Design Pattern is used to perform operations required by the View. Using a Model object, provided by the Controller, the Presenter pattern decouples calculations from structure, providing a better Separation of Concerns for the View.

Gap a presenter can fill: Creating SVG graphs. Calculating them in JS will result in a slower rendering of the whole page. Calculating in the view/partial = not good. Calculating in the controller is also wrong, since the coordinate calculations in the SVG has nothing to do with application logic. Calculating in the model means it has knowledge of the View.

## What is a Presenter?

There are multiple interpretations of the Presenter pattern. In the context of MVP, it is almost a substitute for the controller. A presenter handles events arising in the View or Model and mediates between the two.

*The presenter is created by the Controller, initialized with the Model, and passed to the View. The view in turn calls Presenter methods, for instance to calculate the coordinates of the n-th data point in a graph.*

> `app/presenters/graph_presenters/line_graph_presenter.rb`

    module GraphPresenters
      class LineGraphPresenter
        public

        def initialize( graph )
          @graph = graph

          @options = {
            :number_of_vertical_lines = 11,
            :range_top_value = @graph.max_value
          }
          @options[:range_step_size] = @options[:range_top_value] / @options[:number_of_vertical_lines]
        end

        def configure( settings = {} )
          settings.assert_valid_keys( :width, :height )
          @options.merge! settings
          @options.merge! {
            x_start: 113, # Leave space for the vertical labels
            y_start: 10,  # Leave space for the year-labels
            radius: 5,    # The radius of each data point
          }
          @options.merge! {
            x_end: @options[:width] - @options[:radius],
            y_end: @options[:height] - @options[:radius]
          }
        end
      end
    end

`initialize` is called from the controller. `configure` is called from the View just to set the width and height of the resulting SVG. When the controller initializes `@presenter`, the view can now use its methods to delegate the calculation of coordinates and focus on the structure of the SVG.

> `show.html.haml`

    %svg{xmlns: 'http://www.w3.org/2000/svg','xmlns:xlink' => 'http://www.w3.org/1999/xlink', version: '1.1', class: 'graph'}
      %g.grid#xGrid
        - @presenter.number_of_datapoints.times do |n|
          %line{ @presenter.vertical_line n }

      %g.grid#yGrid
        - @presenter.number_of_vertical_lines.times do |n|
          %line{ @presenter.horizontal_line n }

We make use of Haml's functionality by letting all the Presenter methods return a hash, which can be used directly as the HTML/SVG attributes.

## Round-up

We have created a Module to group all our `GraphPresenters`. Each of those is constructed by the Controller, which passes them a Graph model Object when they are initialized. Therefore, the Presenter knows about the Model, performs calculations on the data in the Model, and prepares the information to be used by the View. The View's only concern is the structure of the elements, whilst positioning is delegated to the Presenter.

# Simplifying your Ruby on Rails code: Presenter pattern, cells plugin
[link](http://kpumuk.info/ruby-on-rails/simplifying-your-ruby-on-rails-code/)

Add this line to `config/environment.rb`:

    config.load_paths += %W( #{Rails.root}/app/presenters)

> `app/presenters/home_presenters/show_presenter.rb`


    module HomePresenters
      class ShowPresenter
        def top_videos
          @top_videos ||= Video.top.all(:limit => 10)
        end

        def categories
          @categories ||= Category.all(:order => 'name DESC')
        end

        def featured_videos
          @featured_videos ||= Video.featured.all(:limit => 5)
        end

        def latest_videos
          @latest_videos ||= Video.latest.all(:limit => 5)
        end
      end
    end

> Tests

    describe HomePresenters::ShowPresenter do
      before :each do
        @presenter = HomePresenters::ShowPresenter.new
      end

      it 'should respond to :top_videos' do
        expect { @presenter.top_videos }.to_not raise_error
      end

      it 'should respond to :categories' do
        expect { @presenter.categories }.to_not raise_error
      end

      it 'should respond to :featured_videos' do
        expect { @presenter.featured_videos }.to_not raise_error
      end

      it 'should respond to :latest_videos' do
        expect { @presenter.latest_videos }.to_not raise_error
      end
    end
