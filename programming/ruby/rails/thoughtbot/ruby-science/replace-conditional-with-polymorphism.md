#### Replace Conditional with Polymorphism

OOPs like Ruby allow developers to avoid conditionals using polymorphism. Instead of conditionals, implement a method differently in different classes, adding/reusing a class for each situation.

What happens is that you create classes that don't have to change when the application changes.

__Uses:__

1. Remove Divergent Change from classes that need to alter their behavior on the outcome of the condition.
2. Remove Shotgun Surgery by adding new types.
3. Remove Feature Envy by allowing dependent classes to make their own decisions.
4. Make it easier to remove Duplicated Code by taking behavior out of conditional clauses and private methods.

> Example code: a/m/question.rb

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

__Problems:__

1. Adding a new question type will require modifying the method. (Divergent Change)
2. Logic and data for summarizing every type of question and answer is jammed into the Question class. (Large Class, Obscure Code)
3. App checkes question types multiple times. (New types will cause Shotgun Surgery)

###### Replace Type Code with Subclasses

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

