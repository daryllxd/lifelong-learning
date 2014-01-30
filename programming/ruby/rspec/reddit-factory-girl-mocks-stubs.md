FactoryGirl and mocks/stubs solve two different problems.

FG is great for replacing fixtures when you need a database filled with real-ish data. But it can't do things like stub your authentication methods during testing, for example.

Mocks and stubs are extremely useful when you are dealing with multiple factors and you want to reduce your test to only your class, or only one moving part.

    group :development, :test do
      gem 'annotate'
      gem 'database_cleaner'
      gem 'factory_girl_rails'
      gem 'launchy'
      gem 'quiet_assets'
      gem 'rspec-rails'
      gem 'shoulda-matchers'
      gem 'timecop'
      gem 'vcr', :require => false
      gem 'webmock', '< 1.14.0', :require => false
    end


annotate adds meaningful schema comments to each of your models.

database cleaner helps you escape transactional fixtures and is neccesary if you have any multi-threading in your tests, such as testing sphinx searching.

factory_girl_rails you are already reading about

launchy is a tool to help launch external programs from your tests, such as if you export a copy of your HTML and want to open it in a browser

quiet assets makes those f*****g js and css lines in your log file go away

rspec-rails you are already reading about

timecop manipulates time objects so you can effectively test time-dependent code

vcr and webmock are useful for creating stubs of external services so your tests 
can use real responses from third party services without actually being internet dependent.

FactoryGirl is for quickly generating and initializing ActiveRecord Models with known content. 

Mocks/stubs are useful for overriding methods within a test.

For example, if I'm using the Twitter gem I want to (a) assert that I called the appropriate method on its interface, (b) not actually call the method because I don't want the side effects (a tweet or an error that the my credentials are wrong) to happen in my test and maybe (c) return a faked response from that method for further computation in my test. 

The analogue to FactoryGirl is a "Double", which is an object that implements the activerecord interface without actually being an actual activerecord object (and thus is faster because it doesn't have all the baggage); I don't use Doubles (my tests run fast enough as it is).

It's important to understand the difference between state-based and behavior-based testing.

FactoryGirl is a fixture replacement and is used solely in integration tests, which are almost exclusively state-based tests.

Stubs are used for state or behavior based testing, but usually state based testing. They can also be used in integration or unit tests.

Mocks are used exclusively for behavior-based testing, and thus for unit tests.

Minitest + fixtures, unless you have entire test suite run 10 times slower.