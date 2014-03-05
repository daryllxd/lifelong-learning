# Action View

Conventions: `app/views` contains subdirectories corresponding to the name of controllers in your application. Within each controller's view subdirectory, a template match each corresponding action.

`app/views/layout` holds layout templates, intended to be reusable containers for your views.

Most Rails applications have an application.html.haml file in their layout directory. It shares its name with the ApplicationController, which is typically extended by all the other controllers in an application; therefore it is picked up as the default layout for all views.

Ruby's `yield` marks where to insert the output of the action's rendered output, which is usually the template corresponding to that action.

Double yields: `content_for`.

    %body
      .left.sidebar
        = yield :left 
      .content
        = yield 
      .right.sidebar
        = yield :right

    - content_for :left do
        ...

    - content_for :right do
        %h2 Help

Use `content_tag`. Don't do this:

    = "<h2>#{h(article.subtitle)}</h2>".html_safe if show_subtitle?

Do this:

    = content_tag('h2', article.subtitle) if show_subtitle?

#### Standard Instance Variables

`assigns`: Throw a `debug(assigns)` into your template to see everything tha comes across the controller-view boundary.

`controller` (`debug(controller`): Show current controller. Can do this:

    %body{ class: "#{controller.controller_name} #{controller.action_name}" }
    %body{ class: page_class }

`cookies` (`debug(cookies)`): Usually used in the controller.

`flash` (`debug(flash)`)

`logger`

`params`: Same params hash from 

`request`, `response`, `session`

#### Partials

The simplest partial use case is simply to extract a portion of template code. Some developers divide their templates into logical parts by using partial extraction.

__Personally, I like partials to be entirely contained inside a semantically significant markup container.__ Following that rule, more as a loose guideline than anything else, helps me to mentally identify how the contents of this partial are going to fit inside the parent template.

> Reused Partial:

    %h1 Edit User 
    = form_for :user, url: user_path(@user), method: :put do
      .settings
        .details
            = render 'details' 
        .demographics
            = render 'demographics' 
        .opt_in
            = render 'opt_in'
    %p= submit_tag 'Save Settings'

> Shared Partial:

You do have to be a little bit careful when you move existing template code into a shared partial. _It’s quite possible to inadvertently craft a partial that depends implicitly on where it’s rendered._ Ex: A form tag needs an action parameter so it can do the same thing regardless of where it is.

> Passing Variables to Partials

    = render 'shared/address', form: form

Check the presence of a local variable in a partial: `local_assigns.has_key? :whatever_key_you_need`.

> Rendering an Object. These are the same thing. (Renders `_entry.html.haml`)

    = render entry # entry is an object
    = render partial: entry, object: entry

TODO
- Decent Exposure
- Rendering collections
- partial_counter
- Logging
