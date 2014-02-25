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
