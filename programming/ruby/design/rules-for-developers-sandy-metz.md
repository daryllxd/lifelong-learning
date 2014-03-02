## THE RULEZ

1. Classes can be no longer than 100 LOC.
2. Methods can be no longer than 5 LOC.
3. Pass no more than 4 params. Hash options are parameters.
4. Controllers should only instantiate one object. Therefore, views can only know about one instance variable and view should only send messages to that object. (`@object.collaborator.value`).

__100 LOC classes.__ This forces you to keep classes short and easy.

__Five LOC/method.__ `if`, `else`, and `end` are all lines. In an `if` block with two branches, each branch could only be one line.

    def validate_actor
      if actor_type == 'Group'
        user_must_belong_to_group
      elsif actor_type == 'User'
        user_must_be_the_same_as_actor
      end
    end

No `elsif`!.

Having only one line per branch urged us to use well-named private methods to get work done. Private methods are great documentation. They need very clear names, which forced us to think about the content of the code we were extracting.

__Four method arguments.__ View helpers such as `link_to` or `form_for` can end up requiring many parameters to work correctly. While we put some effort into not passing too many arguments, we fell back to Rule 0 and left the parameters if we couldn’t find a better way to do it.
