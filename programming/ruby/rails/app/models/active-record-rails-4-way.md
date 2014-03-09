# Working with Active Record

> An object that wraps a row in a database table or view, encapsulates the database access, and adds domain logic on that data. -- Martin Fowler
 
By convention, an AR class named `Client` will be mapped to the `clients` table. Rails expects an `id` primary key. It should be an integer and incrementing of the key should be managed automatically by the database server when creating new records.

- Each instance of an AR class = row.
- Each column = attributes for the object.
- There is straightforward type conversions (varchar -> string, date -> Ruby date), no data validation.

#### Macro-Style Methods

Put these at the top of the file.

Relationship declarations. (`has_many`)

When the Ruby interpreter loads `client.rb`, it executes those `has_many` methods.

#### Defining Attributes

Migrations let you have default attribute values by passing `:default`. __But you want your default attributes at the model layer, not the database layer.__ Default values are part of your domain logic and should be kept together with the rest of the domain logic of your application, in the model layer.

    class TimesheetEntry < AR:Base
        def category
            @category || 'n/a'
        end
    end

> Sample specs

    describe TimesheetEntry do
        it "returns category when available" do
            entry = TimesheetEntry.new(category: "TR4W")
            expect(entry.category).to eq("TR4W")
        end

        it "has a category of n/a if not available" do
            entry = TimesheetEntry.new
            expect(entry.category).to eq("n/a")
        end
    end

`update_attribute` actually makes a physical call to the DB and you get an UPDATE statement. `write_attribute just means your model is written for assignment.`

`accept_nested_attributes_for` define an `attr_writer` for the specified associations.

> Write attribute that automatically assigns stuff to a column.

    def message=(txt)
        write_attribute(:message, txt + 'in bed')
    end

> Syntactic sugar - Read

    def tolerance
        self[:tolerance] || 'n/a'
    end

> Syntactic sugar - Write

    def message=(txt)
        self[:message] = txt + 'in bed'
    end

#### Serialized Attributes

Serialized stuff will be stored in the database as YAML, Ruby's native serialization format.

Use case: Storing user preferences.

    class User < AR::Base
        serialize :preferences, Hash # Second parameter = Must be of this class!
    end

#### Store [TODO]

This uses `serialize` behind the scenes to declare a single-column KV store.

#### CRUD

    c = Client.new #=> Client
    c.new_record? #=> true
    c.persisted? #=> false

> Additional Initialization

    c = Client.new do |client|
        client.name = "NRC"
    end

    c.attributes, no custom shit

AR's query cache is turned on by default for the processing of controller actions.

Updating form:

    def update
        project = Project.find(params[:id])
        if project.update(params[:project])
            redirect_to project
        else
            render 'edit'
        end
    end






TODO
- other shit
- `rate_before_typecast`
- `caching`
