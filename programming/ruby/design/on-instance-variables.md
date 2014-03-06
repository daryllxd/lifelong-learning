## Via Reddit
[Link](http://www.reddit.com/r/ruby/comments/1zf607/whats_bad_with_instantiating_instance_variables/)

There is nothing bad about instance variables, in fact, you need them to get your data to the view. However, if you tend to use more than 1-3 instance variables for that to happen, you might want to check your data model. Those instance variables usually correspond to some sort of concept, and maybe should be grouped together in a class.

Code Climate:

1. Take a lot of the logic you are doing in a controller to locate things, look up things, and do useful work. Go and put that into your model.
2. All of a sudden you have thin controllers but fat models; now what do you do?
3. Apply single responsibility principle; rinse and repeat.

__The key insight here is also that "saving your data to a database" (active record) and "doing things that model what your application simulates" (business logic aka "Model") are often mixed together when they shouldn't be.__

If you aren't familiar with SRP or other SOLID concepts, google has plenty of info; but the simplest way to decide if code should be in a controller or a domain model is to find something you want to do through the web UI and a rake task.

Write it in one. Then try and copy/paste it into the other and fix it up a bit. All of the bits that don't really work in the other: keep those in the controller; those are glue code. All of the bits that are pretty much the same: push those into common code (hint: use a lib/ directory to store your application logic) and call that from both places.

Pretty soon, your controller becomes very simple and looks more like

    if PeopleLoader.load('/path/to/file.csv')
      render "Hurray"
    else
      render ":("
    end
