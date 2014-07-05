# All About Helpers

`CaptureHelper`: Along the way, you can define blocks of template code that should be inserted into other parts of the page during rendering using `yield`.

`capture(&block)`: The capture method lets you capture part of a template’s output (inside a block) and assign it to an instance variable.

`content_for(name, &block)`: Instead of returning the contents of the block provided to it, _it stores the content to be retrieved using yield elsewhere in the template_ (or most commonly, in the surrounding layout).

    - content_for :navigation_sidebar do
      = link_to 'Detail Page', item_detail_path(item)

`content_for?(name)`: Checks whether the template yields content under a particular name using the `content_for` helper method.

    %body{class:content_for?(:right_col) ? 'one-column' : 'two-column'}
      = yield
      = yield :right_col





[TODO]
- ActiveModelHelper
- DateHelper
