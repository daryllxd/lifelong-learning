## Introduction

To make it easier to review code, always work in a feature branch. The branch reduces the temptation to push unreviewed code or to wait too long to push code.

The first person who should review every line of your code is you. Before committing new code, read each changed line. Use git’s diff and --patch features to examine code before you commit. Read more about these features using git help add and git help commit.

Look for smells: Extract Method.

Removing resistance: If it is hard to determined where new code belongs, then the code is not readable enough. Rename methods and variables until it's obvious where your change belongs.

Is it hard to change the code without breaking existing code? Add extension points or extract code to be easier to reuse.

Each change should be easy to introduce, if not, refactor.

Bugs and churn: Avoid refactoring areas with low churn.

Metrics: `flog`, `flay` (duplication), `reek`, `churn`, `Code Climate`, `Metric Fu`.

__Getting obsessed with the counts and scores from these tools will distract from the actual issues in your code, but it’s worthwhile to run them continually and watch out for potential warning signs.__

## Code Smells

#### Long Method

1. If you can't tell exactly what a method does at a glance, it's too long.
2. Methods with more than one level of nesting are usually too long.
3. Methods with more than one level of abstraction maybe too long.
4. Methods with a flog score of 10 or higher may be too long.

> Example

    def create
        @survey = Survey.find(params[:survey_id])
        @submittable_type = params[:submittable_type_id]
        question_params = params.require(:question).permit(:submittable_type, :title, :options_attributes, :minimum, :maximum) 
        @question = @survey.questions.new(question_params)
        @question.submittable_type = @submittable_type
        
        if @question.save 
            redirect_to @survey
        else
            render :new
        end
    end

Solutions: Extract Method, Replace Temp with Query, check for Feature Envy, Replace Temp with Query.

#### Large Class

1. You can't tell what the class does without scrolling.
2. The class needs to change for more than one reason.
3. The class has more private methods than public methods.
4. __The class has more than 7 methods.__
5. __The class has a total flog score of 50.__

__Solutions:__

1. __Move Method__ to move methods to another class if an existing class could better handle the responsibility.
2. __Extract Class__ if the class has multiple responsibilities.
3. __Replace Conditional with Polymorphism__ if the class contains private methods related to the conditional branches.
4. __Extract Value Object__ if the class contains private query methods.
5. __Extract Decorator__ if the class contains delegate methods.
6. __Replace Subclasses with Strategies__ if the large class is a base class in an inheritance hierarchy.

Following the `Single Responsibility Principle` will prevent large classes from cropping up. It’s difficult for any class to become too large without taking on more than one responsibility.

#### God Class

A God Class is any class that seems to know everything about an appli- cation. It has a reference to the majority of the other models, and it’s difficult to answer any question or perform any action in the application without going through this class.

Most applications have two God Classes: User, and the central focus of the application.

__You need to be particularly vigilant about refactoring these classes. If you don’t start splitting up your God Classes early on, then it will become impossible to separate them without rewriting most of your application.__

#### Feature Envy

Methods suffering from feature envy contain logic that is difficult to reuse, be- cause the logic is trapped within a method on the wrong class. These meth- ods are also often private methods, which makes them unavailable to other classes.

1. Repeated references to the same object.
2. Parameters or local variables which are used more than methods and instance variables of the class in question.
3. Methods that includes a class name in their own names (such as `invite_user`).
4. Private methods on the same class that accept the same parameter.

> app/models/completion.rb

    def score
        answers.inject(0) do |result, answer| 
            question = answer.question
            result + question.score(answer.text)
        end 
    end

The answer local variable is used twice in the block: once to get its question, and once to get its text. This tells us that we can probably extract a new method and move it to the Answer class.

__Solutions:__
1. Extract Method if only a part suffers.
2. Move Method if the entire method suffers from feature envy.
3. Inline Classes if the envied class isn't pulling its weight.

#### Case Statement

1. Case statements that check the class of an object.
2. Case statements that check a type code.
3. Divergent Change caused by changing or adding when clauses.
4. Shotgun Surgery caused by duplicating the case statement.

Look for `case` and its cousin, the repetitive `if-elsif`.

Type codes: Some applications contain type codes: fields that store type information about objects. Better to take advantage of Ruby's ability to invoke different behavior based on the object's class, called "dynamic dispatch."

> Ex: a/m/question.rb
    
    def summary
        case question_type 
            when 'MultipleChoice' summarize_multiple_choice_answers
            when 'Open' summarize_open_answers
            when 'Scale' summarize_scale_answers
        end 
    end

This is repeated multiple times in an app, for example, when you show the question in the view:

    <% if question.question_type == 'MultipleChoice' -%>
        <ol>
            <% question.options.each do |option| -%>
                <li>
                    <%= submission_fields.radio_button :text, option.text, id: dom_id(option) %> 
                    <%= content_tag :label, option.text, for: dom_id(option) %>
                </li>
            <% end -%>
        </ol>
    <% end -%>

    <% if question.question_type == 'Scale' -%> 
        <ol>
            <% question.steps.each do |step| -%> <li>
                <%= submission_fields.radio_button :text, step %>
                <%= submission_fields.label "text_#{step}", label: step %> </li>
            <% end -%> 
        </ol>
    <% end -%>

Horrible.

__Solutions:__

1. Replace Type Code with Subclass if the case statement is checking the class of an object.
2. Replace Conditional with Polymorphism when the case statement is checking the class of an object.
3. Use Convention over Configuration when selecting a strategy based on a string name.
