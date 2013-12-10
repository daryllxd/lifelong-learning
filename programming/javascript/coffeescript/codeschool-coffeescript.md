## A Beautiful Programming Language

- Least amount of code to solve problems
- Readable and understandable
- Easy to maintain

Assignment

  Person = “hlleo”

Declaring Functions in JS

Either named (function()coffee{}) or function expressions (var coffee = function(){}).

Declaring Function in Coffee

    coffee = ->
      confirm “Ready for coffee” # Converts to function(){}

Always has a return value.

#### Return a String

    Coffee = ->
      answer = confirm “ready for some coffee”
      “your answer is #{answer}” # Ruby-style string interpolation

#### Calling functions

    coffee = ->
    coffee = (message) ->

    coffee()
    coffee(“Yo”) or coffee “Yo”

Function without parameters

Coffee = (message = “yheel”)

#### Compiling

    Coffee –c test.coffee // Creates test.js
    Coffee –cw test.coffee //Every time test.coffee is updated, recompile
    Coffee –c src –o js // Compile all .coffee files in the src into the js
    Coffee –wc src –o js //Every time a file is update, recompile.

#### Applied JQuery

    $ -> //fine to use if there is no jQuery
    This => @
    Example: Change Tabs in CS
    $ ->
      changeTab = (e) ->
        e.preventDefault()
        $(‘#tabs li a.active’).removeClass “active”
        $(@).addClass “active”

    $(“tabs ul li a”).click changeTab

    $(‘#tabs #error a’).click (e) ->
      e.preventDefault())

    $(‘confirm’).queue ->
      $(@).dequeue()

    showNumberOfFlights = (e) ->
      num_flights = $(@).data “flights”
      $(@).append “<span>#{num_flights}</span>”
      $(‘#tabs span.tooltip).show()

Pass 2 functions inside: Put parentheses around both
    
    $('.drink li').hover -> 
      (-> $('@').find('span').show())
    ,  
      (-> $('@').find('span').hide())
     
Conditionals and Operators

    alert ‘under age’ if age < 18
    if age < 18 then alert ‘under age’
    if age < 18 then alert ‘under age’ else alert ‘under age’

Operators

    ==, is	===
    !=, isnt	!==
    not	!
    and	&&
    or	||
    true, yes, on	true
    false, no, off	false
    addCaffeine() if not decaf()
    addCaffeine() unless decaf()
    if 2 < newlevel < 3 ... //operator chaining

#### Switch Statements

    message = switch cupsOfCoffee
      when 0 then ‘sleep’
      when 1 then ‘eyes open’
      when 2 then ‘buzzed’
      else ‘dangerous’

#### Existential

To check if defined and isn’t null?

    if cupsOfCoffee?
      alert ‘it exists’

alert ‘it exists’ if cupsOfCoffee?

    cupsOfCoffee ?= 0 //Set if it doesn’t exist
    coffeePot?.brew //Do only if it exists
    vehicle.start_engine?().shift_gear?() //Do functions only if  the function exists

#### Arrays, Objects, Functions

    range = [1..4] -> [1, 2, 3, 4]
    range = [1...4] -> [1, 2, 3]
    //can be used in arrays
    Arrays
    storeLocations = [
      ‘Orlando’
      ‘Winter Park’
    ]

#### Iterate

    For location in storeLocations
      alert: “location: #{locations}”

    “#{loc}, FL” for loc in storeLocations //List Comprehensions

    geoLocate(loc) for loc in storeLocations when loc isnt ‘Sanford’

    //initialize new array
    newLocs = (loc for loc in storeLocations when loc isn’t ‘Sanford’)

    //Splats: Do all
    searchLocations = (brand, cities...) ->
      “looking for #{brand} in #{cities.join(‘,’)}”

Objects

    coffee = name: ‘French’, strength: 1

    coffee =
      name: ‘French’
      strength: 1
      brew: -> alert “brewing #{@name}”
      pour: (amount =1) ->
      bla bla
    Complex
    coffees =
      french: 
        strength: 1
        in_stoc: 1
    coffees.french.in_stock




