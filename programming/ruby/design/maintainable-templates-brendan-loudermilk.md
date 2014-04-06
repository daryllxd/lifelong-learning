# Rails Conf 2013: Maintainable Templates by Brendan Loudermilk
[link](https://www.youtube.com/watch?v=elRlAjtaFs://www.youtube.com/watch?v=elRlAjtaFsg)

## Assumptions:

- You know how to write "clean" markup.

Unmaintainable templates come from markup repetition and logic in templates.

Repetition - Good designers repeat themselves, to make their users feel consistent. Good programmers don't.

To avoid the markup repetition, why not just abstract interface components, and use partials. The things in Bootstrap, most probably they are the things that you will repeat anyway.

Logic in templates: These tend to be highly repetitive, and logic in templates is painful to test.

    %h3 Your Saved Credit Card
    %dl
      %dt Number
      %dd= "XXXX-XXXX-XXXX-#{@credit_card_number[-4..-1]"
      %dt Exp. Date
      %dd= @credit_card_expiration_month / @credit_card.expiration_year

The developer who wrote this decided that this is how they were going to mask the credit card number. They were going to throw 3 sets of Xs, and take the last 4 digits, and it passes the integration tests and its happy, and on the next page... they do it again.

  %p Thanks for Ordering! Your purchase has been billed to your credit card
    %strong= "XXXX-XXXX-XXXX-#{@credit_card_number[-4..-1]"

Inevitably, other views with the same logic are going to change. Until the next developer comes along, who uses helpers.

So from the Guide, *View Helpers live in app/helpers and provide small snippets of reusable code for views.* The thing I want you to focus on are "small snippets". It's easy to do things such as:

    def masked_credit_card_number(number)
      "XXXX-XXXX-XXXX-#{number[-4, 1]}"
    end

That's not the end solution, unfortunately. Why?

Big projects end up with tons and tons of helper methods. IMO because the context of the helper is the view itself, there's no natural place to put the helper. There's no standard to put where the helpers. Complex logic isn't well suited for them.

Lastly, they don't feel right. You have Rails, with OOP controllers and models, and doing a bunch of methods and putting them in a file doesn't seem right to me.

What I wish I had was some way to take my domain objects, my models, and add behavior to them for the views specifically. Luckily, we have that, called the decorator pattern.

From the GOF, decorators attach additional responsibilities to an object dynamically. Decorators provide a flexible alternative to subclassing for extending functionality.

So this is what a decorator looks like:

It wraps a single object, which is one instance of your models. It has a transparent interface, which means it behaves in the same method that the model does. The way it does that is by forwarding methods to the original object itself.

In our case, we can add presentational logic to the models without affecting the model itself.

## Implementing a Decorator in Ruby:

We can define this as a Decorator base class. The initial object should take whatever object you're about to decorate, they call this component. 

    class Decorator
      def initialize(component)
        @component = component
      end

The next thing you do is to set up the method forwarding. Basically we define `method_missing` here. What happens is that when the object being called on the object doesn't exist on the Decorator, we can try to call it on the model we are decorating.

      def method_mising(method. *arguments, &block)
        if @component.respond_to?(method)
          @component.send(method, *argu,ents, &block)
        end
      end

`respond_to_missing?` is a helpful

      def respond_to_missing?(method, *)
        @component.respond_to?(method) || super
      end
    end

## Credit Card Decorator

    class CreditCardDecorator < Decorator
      def masked_credit_card_number(number)
        "XXXX-XXXX-XXXX-#{number[-4, 1]}"
      end
    end

*If what I'm doing relates to one model, it should be a decorator.*

Using the decorator is pretty simple, we can make a new instance of the model into the Decorator:

  class CreditCardController < ApplicationController
    def show
      @credit_card = CreditCardDecorator.new(current_user.credit_cards.find(params[:id])
    end
  end

In our view, it just looks like our model has a method called `masked_number`. There's very littler to explain. It's also very beneficial to test.

## When to Decorate:

Presentation logic that relates directly to a single instance of a model.

## Draper

Implementing basic decorators is easy, but Draper adds a few helpful features:

- Access to the view context
- Easily decorate collections
- Pretends to be a decorated object (helpful for `form_for` and such)
- Easily decorate associations. If you're passing one record from your controller to your view, and you're climbing the association tree down, Draper can help.

## Complex Views

    %dl.story-summary
      %dt Assinged to
      %dd= if @story.assigned_user == current_user "You" else @story.assigned_user.name
      %dt Participants
      %dd= @story.participants.reject { |p| p == current_user).map(&:name).join(", ")

We see who the story is assigned to, and we see who is participating in the story. You know it doesn't belong into a view. Problem is, you aren't sure if it belongs in a decorator, either.

So how do you represent this UI element?

*The essence of a Presentation Model is of a fully self-contained class that represents all the data and behavior of the UI window, but without any of the controls used to render that UI on the screen. A view then simply projects the state of the presentation model onto the glass. -- Martin Fowler*

So he's talking about a dumb view, where the presenter does the heavy work.

Designing a View object:

    class StorySummaryView

We are passing a reference to the context of this view, along with this object. Second object: story we have. Third object: the `current_user`.

      def intialize(template, story, current_user)
        @template = template
        @story = story
        @current_user = current_user
      end

      def assigned_user
        if @story.assigned_user == @current_user
          "You"
        else
          @story.assigned_user.name
        end
      end

      def participant_names
        participants.map(&:name).join(", ")
      end

This is how the view will end up rendering the object. Erb renders a PORO just by calling the `to_s` method. It passes itself, as opposed to the story, for rendering.

      def to_s
        @template.render(partial: "story_summary", object: self)
      end

      private

      def participants
        @story.participants.reject { |p| p == @current_user }
      end
    end

## Helpers to Set Up View Objects

A helper can set up the view objects:

    module StoriesHelper
      def story_summary(story)
        StorySummaryView.new(self, story, current_user)
      end
    end

Calling View:

    story_summary(@story)

Now we have this nice and universal way to render our story for our app.

## Form Builders

    form_for @user do |form| # This is the view object

Rails custom form builders: The forms are hopefuilly the same, throughout. We can define a `FancyFormBuilder` for our app:

    class FancyFormBuilder < ActionView::Helpers::FormBuilder
      def fancy_text_field(attribute, options = {})
        @template content_tag(div, class: "form-field") do
          label(attribute) = text_field(attribute, options)
        end
      end
    end

Next time we use `form_for`, we pass in the optional `FormBuilder` object:

    form_for @user, builder: FancyFormBuilder do |form|
      form.fancy_text_field :name
      form.fancy_text_field :email
    end

We can change everything so easily by changing the form builder.

## Other tips
- First, try to use `i18n` whenever you can.
- `simple_form`, `table_cloth` to make tables.

