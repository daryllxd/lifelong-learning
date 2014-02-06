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

## Reddit
[Link](http://www.reddit.com/r/rails/comments/1x63o8/when_to_use_activerecords_serialize/)

Serialize has the obvious disadvantage that you can't search by SQL on it. __So you will only want to use it for data that is mainly for display (or other purposes where you will read this single record anyway) and does not need to be searched and to some extend doesn't change that often.__

Its advantage is that it can be very fast, especially if you have to handle rather complex structures.

An example: We have about 12,000 products in our database. Each product is tagged with technical data that can be a bit complex. There is simple data like color, size, weight (but a lot of it, like 100 values for each item) and there is more complex data like items belong to certain car models (down to the build year level). Collecting this data and put it in a nice data structure is rather slow. While this data is still in tables whenever somebody edits it I write it in serialized form into the product table. So if I want to display it I have the whole tree structure immediately. 

(Since we search with Apache Solr there is more of this moving around data between different systems and forms of storage anyway, so not much extra overhead, otherwise you want to avoid storing identical information in different places).

So in your case the question is do you ever need to query the database for things like "Which Quiz contains a given question?", "Which QuizItem contains a given choice?". Chances are that you do not need to do this if your quiz app is simple and questions are not recycled too much between different quizzes. (Though you may run into issues when you want to store answers by user for a certain question).

Depends a lot on size of this project and number of quizzes and users. And how much cross referencing is necessary. I would be tempted to say that serializing is most likely ok for your use case.

If you want to remove it, then yes, you would need migrations in several steps. First create the new tables, then transfer all the data from the serialized fields to the tables (could be tricky keeping ids in place) and then remove the serialized fields (make sure your data is correct before you do this)

Is it right when I say it gives you speed at the cost of integrity? Not necessarily. In your case the data isn't stored in two places, so no integrity issues here.

__In my example where we actually have tables to hold the data and only use the serialized data this is in fact an issue (and having a third place in Apache Solr adds to that).__ But this is 'secondary' data storage and if it would ever run out of sync this would be only annoying and not critical. Plus we can run a update script once a week that force syncs everything.

__With Rails another issue with those serialized fields is that it omits the association proxies__ (those little helpers that allow you to do stuff like quizz.question.create on associations). Though you could write the relevant methods yourself (rather common in Rails to do such things, sometimes even with some data hardcoded in the 'virtual' model).

But really difficult to give advice, that's something where you won't get around creating some dummy tables fill them with a lot of data and then test the performance of the most important queries.

Otherwise this is something you could change without too much effort whenever you think you need to do so. So I wouldn't actually worry too much about it.

__See, this serialize thing is somehow storing a table in a column instead of giving it its own real table.__ This may seem strange, but if you do larger projects you will find many situations where you store data in very different places (like memcached, some search engine, some nosql, olap cubes). This sometimes is not exactly the super clean 'Rails Way', but Rails after all is only a framework that should guide and not force (a thing it does very well).