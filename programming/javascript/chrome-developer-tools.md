Tha JS Dude

right-click console, "Preserve Log Upon Navigation" to reload shit

	>> $('a') # gets the first one of them, even without jQ, this is document.querySelector('a')
	>> $$('a') # gets all, this is document.querySelectorAll(), you can do .length()
	>> $0 # last element... $1, $2

Check properties of element

	>> dir($('#myInput'))
	>> console.log('Window', window) to see the object!!!
	>> console.log('Window', window, 'body', document.body) to see multiple

Inspect elements can be done by

	>> inspect($('#myInput'))
	>> inspect($$('a')[3]) # 3rd link

Edit DOM directly

	>> document.body.contentEditable = true to edit shit
	
Keep track of event listeners

	>> var el = $('#myInput') 
	>> getEventListeners(el) # you see the events bound
	>> monitorEvents(el) # monitor all events
	>> monitorEvents(el, ['click', 'focus']) # the events you specify are logged here
	>> unmonitorEvents(el) # gg

Display Time

	>> console.time('myTime')
	>> console.timeEnd('myTime')
	# useful for looping
	>> console.time()
	   for... 
	   console.timeEnd()

Collapse Shit

	>> console.groupCollapsed("My Error");
	   for(var i = 50; i--; ){
	   	console.error(i);
	   }
	   console.groupEnd();

Collection collapse

	>> var myArray = [{a:1, b:2, c:3}, {a:1, b:2, c:3}, {a:1, b:2, c:3}]
	>> console.table(myArray) # orgasm forever


Get last outputted

	>> bla bla bla
	>> $_ you get this

Call stack
	
	>> console.trace()

Count
	
	>> function foo(){
		console.count("fooed")
	}

Profiling

	>> profile...

	