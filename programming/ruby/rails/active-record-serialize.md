## serialize APIdock
[Link](http://apidock.com/rails/ActiveRecord/AttributeMethods/Serialization/ClassMethods/serialize)

    serialize(attr_name, class_name = Object) public

If you have an attribute that needs to be saved to the database as an object, and retrieved as the same object, then specify the name of that attribute using this method and it will be handled automatically. The serialization is done through YAML. If class_name is specified, the serialized object must be of that class on retrieval or SerializationTypeMismatch will be raised.

## Rails: Serializing objects in a database?
[Link](http://stackoverflow.com/questions/2959661/rails-serializing-objects-in-a-database)

In computer science, in the context of data storage and transmission, serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file, a memory buffer, or transmitted across a network connection link to be "resurrected" later in the same or another computer environment.

So serialized objects (in the context of ActiveRecord) are text/string representations of objects (encoded using YAML). When serialized, you can save (almost) any Ruby object in a single database field.

__You can use serialization if you have somewhat complex objects that you need to save in a database and you don't need to retrieve records based on the contents of a serialized attribute.__ I used them for example for storing preferences for users of a webapp: the preferences were basically hashes that I wanted to save in a single db field.

## RubyJunky.com Rails ActiveRecord Serialize
[Link](http://rubyjunky.com/rails-activerecord-serialize.html)

My use case is storing a bunch of key/value data that I don’t necessarily control the source of. I may want to add data for new keys or have older keys' data be deprecated. Also, I likely won’t need to query on any of the data so one of the best solutions would be to encode the data into some kind of text format and store it as a text column on an appropriately associated model.

I wanted to be able to use my data as much like an ActiveRecord object as possible. For instance, being able to use it in a form_for helper or possibly do validations on the data.

Rails provides the foundational structure for marshaling and storing arbitrary data in ActiveRecord with the serialize method.

> Declare in AR Base

    class User < ActiveRecord::Base
      serialize :properties
    end

> Migrate the shit

    $ rails generate migration AddPropertiesToUser properties:text
    $ rake db:migrate

> Now if we create a new user their properties starts out as nil.

    irb(main):001:0> user = User.create
    irb(main):002:0> user.properties #=> nil