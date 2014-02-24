Start with Capybara and Rspec.

Feature spec first. Outside-in, create a test that acts like the user will. Create spec for the feature.

    feature 'User can manage their library' do
        scenario 'Viewing the library' do
            visit '/'

#### This is a smoke test:
- Now you know there is no route at the start
- Then you know you have to create a library controller
- Just get the simplest possible thing to make the test pass. Don't add the index if you don't have.

Refactor out book_params:

> Controller

    def create
        Book.create!(book_params)
        redirect_to root_path
    end

    private

    def book_params
        params[:book].permit(:title)
    end

There was no Controller tests because there usually is duplication anyway. But you use unit tests when you dip down into the model.

No method errors on your unit test are actually good to drive your learning.