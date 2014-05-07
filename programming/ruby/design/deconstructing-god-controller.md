# Parley thread

20 actions + 19 helper methods in the controller.

*andrzejkrzywda*

- Inline controller filter.
- Explicitly render views with locals.
- Extract ServiceObject with help of SimpleDelegator.
- Extract render/redirect method.
- Extract exception objects from a service object.
- Change CRUD name to domain name.
- Return entity from service object.

*markijbema*

Approval tests to make sure you don't accidentally break something. Bring in the app to the state you want, and make sure you don't accidentally break something.

*kytrinyx*

Here's the approach I use when I have a GET request that does a bunch of biz-level stuff and assigns one or more instance variables.

Core idea: Duplicate. You want your test to be passing the whole time, and duplicating the code into a more isolated environment will let you untangle the dependencies while still being close to having passing tests.

Inline helper (private controller methods) to see what is going on exactly. Plus when you inline the legacy code you get rid of the wrong abstractions and you start with a clean slate

1. Create an empty model object (PORO). Tests still pass.
2. Create an empty method called `process` or whatever, it will go away anyway.
3. Copy and paste model-level code from the controller to the new process method. Your tests still pass.
4. At the top of the controller action, instantiate your new object and `run` it. At this point, old code should still be running and doing whatever.
5. *Duplicate as much code as you need to get the tests passing.*
6. When tests are green, you can then refactor.
7. Find the first instance variable that gets assigned. Expose it with an `attr_reader` in your new object. Then immediately below the assignment, add a new line where you re-assign the value of the instance variable by calling it on your new object.
8. Basically what you want is to have everything that will be used as an instance variable is called from the model object.

*centipedefarmer*

With cases that have a lot of interdependent `before_filters` is that they were used as popular practice for a while. These are interdependent with other actions because they set up the next variables. Replacing these and references to `@variables` they set would be a good start, maybe they can be moved out with a context to some kind of a command object.

*derekprior*

I'm currently refactoring a 19 action controller that has ~5-7 before filters applied selectively to various actions. How do you eat an elephant? One bite at a time.

My general approach was to scan the god controller for obvious abstractions. In my case the controller was `UsersController`, there were `<verb>_<noun>` actions where the noun was not `user` (`change_password`, `update_password`, `add_note`, `edit_settings`, and `update_settings`.

Katrina's advice to duplicate is right on. As I extract things, I duplicate functionality, review, then merge. As I do so, I'm making mental notes of any cleanups I can now do back in `UsersController`, but I'm not really doing anything about them yet, outside of deleting actions/references to them yet.

As I'm extracting a new controller I'm using the old tests to be sure that things work as they should, but building up new tests that are better. My new tests have better coverage'

# Sydney Rails -- Refactoring Rails Controllers

Returning books. Routes:

    UberLibrary::Application.routes.draw do

      resources :books do
        member do
          get :return # show the return screen
          put :return # perform the return action
        end
      end

Controller method:

    def return
      @book = Book.find(params[:id])

      if request.put?
        if @book.update_attributes(book_params)
          flash[:success] = 'Book returned'
          redirect_to books_url
        else
          render :return
      else
        render :return
      end
    end

    private

    def book_params
      params.require(:book).permit(:returned_on, :returned_by)
    end

This is actually okay already, but there are a few problems.

- Not RESTful (the `if` statement for `put` and `get`).
- If business logic is more complex, then it is hard to read.
- Hard to test (`update_params`).

The beginner thing is to think that a controller is bound to a model, but actually controllers are arbitrary.

I'm going to create a separate controller `BookReturn`. New code:

    class BookReturnController < ApplictionController
      before_filter :load_book

      def edit
      end

      def update
        if Book.update_attributes(book_params)
          flash[:success] = 'Book returned'
          redirect_to books_url
        else
          render :edit
        end
      end

      private

      def load_book
        @book = Book.find(params[:id])
      end

      def book_params end
    end

> Routes

    member do
      get :return, to: 'book_return#edit'
      put :return, to: 'book_return#edit'
    end

We still have the same routing. The implied render is transformed into the `edit` action.

Problem is if we put biz logic inside the AR model, it has 2 responsibilities which is logic and persistence. We use Service classes (PORO) which has the business logic. AR models only for data persistence and validation.

From mvC (fat controller) to Mvc (fat model) to mvcs (service classes).

## Service Classes

    class BookReturnService

      def initialize(book)
        raise 'book cannot be blank' if book.blank?
        @book = book
      end

      def return_book(user_id, returned_on)
        @user = User.find(user_id)
        @user.extend BookReturn
        @user.return_book(@book, returned_on)
      end
    end

    module BookReturn
      def return_book(book, returned_on)
        book.returned_by = self.id
        book.returned_on = self.returned_on
      end
    end

## Good practices

- Slim controller break down to RESTful Action controllers.
- Slim Model only for persistence and validation.
- Many and many slim services that only do one thing and do it well and correctly.
