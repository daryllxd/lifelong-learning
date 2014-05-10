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
