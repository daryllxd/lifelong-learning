## Case Statement

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

#### Solutions:

1. Replace Type Code with Subclass if the case statement is checking the class of an object.
2. Replace Conditional with Polymorphism when the case statement is checking the class of an object.
3. Use Convention over Configuration when selecting a strategy based on a string name.
