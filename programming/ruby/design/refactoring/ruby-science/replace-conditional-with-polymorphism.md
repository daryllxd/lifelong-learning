## Replace Conditional with Polymorphism

OOPs like Ruby allow developers to avoid conditionals using polymorphism. Instead of conditionals, implement a method differently in different classes, adding/reusing a class for each situation.

What happens is that you create classes that don't have to change when the application changes.

*Uses:*

1. Remove Divergent Change from classes that need to alter their behavior on the outcome of the condition.
2. Remove Shotgun Surgery by adding new types.
3. Remove Feature Envy by allowing dependent classes to make their own decisions.
4. Make it easier to remove Duplicated Code by taking behavior out of conditional clauses and private methods.

> Example code: `a/m/question.rb`

    class Question < ActiveRecord::Base
        include ActiveModel::ForbiddenAttributesProtection

        SUBMITTABLE_TYPES = %w(Open MultipleChoice Scale).freeze

        validates :maximum, presence: true, if: :scale?
        validates :minimum, presence: true, if: :scale?
        validates :question_type, presence: true, inclusion: SUBMITTABLE_TYPES validates :title, presence: true

        belongs_to :survey
        has_many :answers
        has_many :options

        accepts_nested_attributes_for :options, reject_if: :all_blank

        def summary
            case question_type
            when 'MultipleChoice'
                summarize_multiple_choice_answers
            when 'Open'
                summarize_open_answers
            when 'Scale'
                summarize_scale_answers
            end
        end

        def steps
            (minimum..maximum).to_a
        end

        private

        def scale?
            question_type == 'Scale'
        end

        def summarize_multiple_choice_answers
            total = answers.count
            counts = answers.group(:text).order('COUNT(*) DESC').count
            percents = counts.map do |text, count|
                percent = (100.0 * count / total).round
                "#{percent}% #{text}"
            end
            percents.join(', ')
        end

        def summarize_open_answers
            answers.order(:created_at).pluck(:text).join(', ')
        end

        def summarize_scale_answers
            sprintf('Average: %.02f', answers.average('text'))
        end
    end

*Problems:*

1. Adding a new question type will require modifying the method. (Divergent Change)
2. Logic and data for summarizing every type of question and answer is jammed into the Question class. (Large Class, Obscure Code)
3. App checks question types multiple times. (New types will cause Shotgun Surgery)

#### Replace Type Code with Subclasses

`Question` is an AR:Base. If we want to create subclasses, we have to tell AR which subclass to instantiate when it fetches records from the `Questions` table. Rails uses Single Table Inheritance here.

> Current question type

    def summary
        case question_type
        when 'MultipleChoice'
            summarize_multiple_choice_answers
        when 'Open'
            summarize_open_answers
        when 'Scale'
            summarize_scale_answers
        end
    end

> Better question type (includes the type itself)

    def summary
        case question_type
        when 'MultipleChoiceQuestion'
            summarize_multiple_choice_answers
        when 'OpenQuestion'
            summarize_open_answers
        when 'ScaleQuestion'
            summarize_scale_answers
        end
    end

> Migration to make sure everyone has a Question type.

    def up
        connection.update(<<-SQL)
            UPDATE questions SET question_type = question_type || 'Question'
        SQL
    end

It is Rails convention to use the `type` column to base on STI. Since we already have `question_type`, we set the inheritance column to be `question_type`.

> a/m/question.rb

    set_inheritance_column 'question_type'

> a/m/open_question.rb

    class OpenQuestion < Question
    end

> a/m/scale_question.rb

    class ScaleQuestion < Question
    end

Since Rails generates URLS and local variable names for partials based on class names, we need to update some references.

> Old

    <%= form_for @question do |form| %>

> New

    <%= form_for @question, as: :question do |form| %>

Otherwise, it will generate `/open_questions` as URL instead of `/questions`.

Then, build the appropraite subclass in the controller instead of question.

> a/c/questions_controller.rb

    def build_question
        @question = type.constantize.new(question_params)
        @question.survey = @survey
    end

    def type
        params[:question][:type]
    end

#### Extracting Type-Specific Code

    def summary
        case question_type
        when 'MultipleChoice'
            summarize_multiple_choice_answers
        when 'Open'
            summarize_open_answers
        when 'Scale'
            summarize_scale_answers
        end
    end

First, it is good that we already used the *Extract Method* to move each path to its own method (`summarize_multiple_choice_answers`).

Second, we use *Move Method* to move the extracted method to the child classes.

    class MultipleChoiceQuestion < Question
        def summary
            total = answers.count
            counts = answers.group(:text).order('COUNT(*) DESC').count
            percents = counts.map do |text, count|
                percent = (100.0 * count / total).round
                "#{percent}% #{text}"
            end
            percents.join(', ')
        end
    end

MultipleChoiceQuestion#summary now overrides Question#summary, so the correct implementation will now be chosen for multiple choice questions.

*Once every path is moved, we can remove Question#summary entirely.*

The summary method is now much better. Adding new question types is easier. The new subclass will implement summary, and the Question class doesn’t need to change. The summary code for each type now lives with its type, so no one class is cluttered up with the details.

#### Polymorphic Partials

Remember that the views check the type before rendering a question.

We moved type-specific code into `Question` subclasses. However, moving view code would violate MVC and it would be super ugly.

Rails has the ability to render views polymorphically.

    <%= render @question %>

This line asks @question which view to be rendered and since we subclass AR::Base, the question subclasses return a path based on their class name. This means that the above line will attempt to render `open_questions/_open_question.html.erb` for an open question, and so on.

> `a/v/open_questions/_open_question.html.erb`

    <%= submission_fields.text_field :text %>

#### Multiple Polymorphic Views

We still have this crap:

    <% if @question.type == 'MultipleChoiceQuestion' -%>
        # display stuff
    <% end -%>

    <% if @question.type == 'ScaleQuestion' -%>
        # display stuff
    <% end -%>

To fix this, we modify the new:

> app/views/questions/new.html.erb

    <%= render "#{@question.to_partial_path}_form", question: @question, form: form %>

So that we render `a/v/open_questions/_open_question_form.html.erb`, etc.

#### Drawbacks
- Easier to add types but harder to add new behaviors
- If you find yourself adding behaviors much more often than adding types, then look into using observer or visitor

#### Next Steps
- Check for Duplicated Code
- Check for Shotgun Surgery
