# WI 5

- Refactor method from controller out to model.
- Then write tests to make sure you didn't break the code. Check out the Michael Feathers book.
- Define a method name or something.

`raise ActiveRecord::Rollback` to rollback the entire transaction.

New controller method:

    def process_vending
      parser = FastOrderParser.new(current_user, params[:template].lines)
      parser.parse
      flash[:import_errors] = parser.errors
      redirect_to 'backofice/fastorder'
    end

Controller is now 4 lines, it asks another class to do heavy lifting.

Those with a big chunk, such as `create_order`, chunk it out. Tests fail when they reference local variables. When you do that, you just pass it into the local method (not instance variables).

Sometimes it's easier to just assign some words to what we're actually doing. When there's a name to an action, it's easier to do.

Data clumps = sign for upcoming refactoring.

When we refactor, we move little bits around, as opposed to performing big actions. You want tests to be green as much as possible. You can commit at certain points, too. There's also an emotional thing about when your tests are red for a long time.

As you refactor, the main method `parse` starts to behave like a high-level description of what you're supposed to see. It's also easy to run the specs. If it's cumbersome to run the tests then thats a problem.

Data clump: We can clump these so we can pass it as an object.

Better to just assemble everything that needs to be saved then save it in the database than constantly check the database.

So we can check things in memory as opposed to the database.

As much as possible we want to not hit the database. As soon as we start organizing methods, we can figure out if the giant method's order of actions actually make sense. This is why we start by extracting methods.

There's always something to refactor, but we can totally stop at some point.

Syntastic.
