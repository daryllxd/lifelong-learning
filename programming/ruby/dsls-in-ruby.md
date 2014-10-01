# Benefits of Writing a DSL in Ruby
[link](http://engineering.zenpayroll.com/benefits-of-writing-a-dsl/)

## Use Cases

1. *Consolidation of state-specific code.* We have several models where we have to implement specific code for each state. We need to generate forms, store and manipulate mandatory information pertaining to employees, companies, filing schedules and tax rates. A DSL implementation allows us to consolidate and organize all of the state-specific code into a dedicated directory and primary file.
2. *Scaffolding for states.* A DSL provides scaffolding to automate common tasks.
3. *Reduced surface area for errors.* Having a DSL creates the classes and methods we need to eliminate boilerplate code and provides fewer touch points for developers.
4. *Provides a toolkit to accelerate expansion.* With the DSL, you get a framework that makes it easier to implement unique compliance requirements for new states. A DSL is a focused toolkit that reduces the time it takes to develop moving forward.

    StateBuilder.build('CA') do
      company do
        edd { format '\d{3}-\d{4}-\d' }
        sos { format '[A-Z]\d{7}' }
      end

      employee do
        filing_status { options ['Single', 'Married', 'Head of Household'] }
        withholding_allowance { max 99 }
        additional_withholding { max 10000 }
      end
    end

[TODO]: THIS!

