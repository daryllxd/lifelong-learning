
    # this is a comment

    ###
    	this is a multiline comment
    ###

## Variables and Scope

CoffeeScript solves this by simply removing global variables. Behind the scenes, CoffeeScript wraps up scripts with an anonymous function, keeping the local context, and automatically prefixes all variable assignments with var.

However, sometimes it’s useful to create global variables. You can either do this by directly setting them as properties on the global object (window in browsers), or with the following pattern:

    exports = this
    exports.MyVariable = "foo-bar"

## Functions

    func = -> "bar" #returns "bar"

>Arguments

    times = (a, b) -> a * b

>Default Arguments

    times = (a = 1, b = 2) -> a * b

>Splat for Multiple Arguments

    sum = (nums...) ->
    	result = 0
    	nums.forEach (n) -> result += n
    	result

>Function Invocation

    alert inspect a # Equivalent to: alert(inspect(a))

#### Function Context

Context changes are rife within JavaScript, especially with event callbacks, so CoffeeScript provides a few helpers to manage this. One such helper is a variation on ->, the fat arrow function: =>

Using the fat arrow instead of the thin arrow ensures that the function context will be bound to the local one.

>Object Literals and Array Definition

    object1 = {one: 1, two: 2}
    object2 = one: 1, two: 2
    object3 =
    	one: 1
    	two: 2

    User.create(name: "John Smith")

    array1 = [1, 2, 3]
    array2 = [
    	1
    	2
    	3
    ]

> Flow Control

    alert "It's cold!" if heat < 5
    if not true then "Panic"
    unless true
      "Panic"

    if true is 1 				# is <-> ===
      "Type coercion fail!"

    if true isnt true
      alert "Opposite day!"

>String Interpolation: Type interpolation for strings, and multiline strings are also allowed, without havng to prefix each line with a +.

    favorite_color = "Blue. No, yel..."
    question = "Bridgekeeper: What... is your favorite color?
    		   Galahad: #{favorite_color}
    		   Bridgekeeper: Wrong!"

## Loops

    for name, i in ["Roger the pickpocket", "Roderick the robber"]
      alert "#{i} - Release #{name}"

    release prisoner for prisoner in ["Roger", "Roderick", "Brian"]

    prisoners = ["Roger", "Roderick", "Brian"]
    release prisoner for prisoner in prisoners when prisoner[0] is "R"

    names = sam: seaborn, donna: moss
    alert("#{first} #{last}") for first, last of names

    num = 6
    minstrel = while num -= 1
      num + " Brave Sir Robin ran away"

## Arrays

    range = [1..5] # Expands into an array
    firstTwo = ["one", "two", "three"][0..1] # If, however, the range is specified immediately after a variable, CoffeeScript converts it into a slice() method call

    numbers = [0..9]
    numbers[3..5] = [-3, -4, -5] # Replacement

    my = "my string"[0..1] # slice on string

    words = ["rattled", "roudy", "rebbles", "ranks"]
    alert "Stop wagging me" if "ranks" in words

## Aliases and the Existential Operator

    JS's `this` is `@` in CS.

    praise if brian?
    velocity = southern ? 40 # || operator
    blackKnight.getLegs()?.kick() # if has legs, kick.

# CoffeeScript Classes

Behind the scenes, CoffeeScript is using JavaScript’s native prototype to create classes; adding a bit of syntactic sugar for static property inheritance and context persistence.

    class Animal
      constructor: (name) ->
        @name = name

>Shortcut

      class Animal
      constructor: (@name) ->
    animal = new Animal("Parrot")

>Instance vars

    class Animal
      price: 5
      sell: (customer) ->

    animal = new Animal
    animal.sell(new Customer)

*Fat arrow, use for methods for callbacks.*

#### Inheritance and Super

    class Parrot extends Animal
      constructor: ->
        super("Parrot")

[TODO]

## Mixins

    extend = (obj, mixin) ->
      obj[name] = method for name, method of mixin
      obj

    include = (klass, mixin) ->
      extend klass.prototype, mixin

    include Parrot,
      isDeceased: true

Mixins are a great pattern for sharing common logic between modules when inheritance is not suitable. The advantage of mixins is that you can include multiple ones, compared to inheritance where only one class can be inherited from.

## CoffeeScript Idioms

    myFunction(item) for item in array

### Map

    result = (item.name for item in array) # The parenthesis is absolutely essential for making sure that the array is returned.

#### Filter

    result = (item for item in array when item.name is "test") # Filter function, don't forget parens, otherwise, the `result` will be the last item in the array.

#### Includes

    included = "test" in array # We are checking if "test" is included, returns true if yes, false, if not.
    included = "test" in ["test", "this"] # true

#### Property Iteration

    object = { one: 1, two: 2 }
    alert("#{key} = #{value}") for key, value of object

#### Min/Max

    Math.max [1, 2, 3, 4, 5]... # Need the ellipsis!
    Math.min [1, 3, 3, 4, 6]... # Need the ellipsis

#### And/or

    string is string over string == string
    string and string over string && string
    string or string over string || string
    hash or= {} # Ruby style
    hahs ?= {}

#### Destructuring assignments

    someObject = {a: 'A', b: 'B'}
    { a, b } = someObject

