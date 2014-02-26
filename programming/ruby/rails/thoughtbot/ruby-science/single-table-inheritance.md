[TODO] this. I don't really understand everything.

## Single Table Inheritance (STI)

Rails provides a mechanism for storing instances of different classes in the same table, called Single Table Inheritance. 

Rails will take care of most of the details, writing the class’s name to the type column and instantiating the correct class when results come back from the database.

#### Symptoms
- You need to change from one subclass to another.
- Behavior is shared among some subclasses but not others.
- One subclass is a fusion of one or more other subclasses.

> a/m/question.rb

    def switch_to(type, new_attributes)
        attributes = self.attributes.merge(new_attributes)
        new_question = type.constantize.new(attributes.except('id', 'type')) 
        new_question.id = id
    
        begin Question.transaction do
            destroy
            new_question.save!
        end

        rescue ActiveRecord::RecordInvalid 
        end

        new_question
    end

#### This is difficult because:

- You need to worry about common `Question` validations.
- You need to make sure validations for the old subclass are not used.
- You need to make sure validations for the new subclass are used.
- You need to delete data from the old subclass, including associations.
- YOu need to support data from the new subclass.
- Common attributes need to remain the same.

#### Solutions
- If you're using STI to reuse common behavior, use __Replace Subclasses with Strategies__.
- If you're using STI so you can easily refer to severaldifferentclasses in the same table, switch to using a polymorphic association instead.
