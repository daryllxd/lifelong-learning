## Feature Envy

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

#### Solutions:
1. Extract Method if only a part suffers.
2. Move Method if the entire method suffers from feature envy.
3. Inline Classes if the envied class isn't pulling its weight.
