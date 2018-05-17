# Javascript `call()` & `apply()` vs `bind()`?
[Reference](https://stackoverflow.com/questions/15455009/javascript-call-apply-vs-bind)

- `call` and `apply` call a function while `bind` creates a function. Though with `call()` you pass arguments individually, and with `apply()`, you pass them as an argument array.
- Use `bind()` when you want that function to later be called with a certain context, useful in events. Use `call()` or `apply()` when you want to invoke the function immediately, and modify the context.
- Example:

``` js
// Call
var person1 = {firstName: 'Jon', lastName: 'Kuperman'};
var person2 = {firstName: 'Kelly', lastName: 'King'};

function say(greeting) {
    console.log(greeting + ' ' + this.firstName + ' ' + this.lastName);
}

say.call(person1, 'Hello'); // Hello Jon Kuperman
say.call(person2, 'Hello'); // Hello Kelly King


// Apply
var person1 = {firstName: 'Jon', lastName: 'Kuperman'};
var person2 = {firstName: 'Kelly', lastName: 'King'};

function say(greeting) {
    console.log(greeting + ' ' + this.firstName + ' ' + this.lastName);
}

say.apply(person1, ['Hello']); // Hello Jon Kuperman
say.apply(person2, ['Hello']); // Hello Kelly King

// Bind

var person1 = {firstName: 'Jon', lastName: 'Kuperman'};
var person2 = {firstName: 'Kelly', lastName: 'King'};

function say() {
    console.log('Hello ' + this.firstName + ' ' + this.lastName);
}

var sayHelloJon = say.bind(person1);
var sayHelloKelly = say.bind(person2);

sayHelloJon(); // Hello Jon Kuperman
sayHelloKelly(); // Hello Kelly King
```

- `bind()` allows us to curry a function.

``` js
function greet (gender, age, name) {
    // if a male, use Mr., else use Ms.
    var salutation = gender === "male" ? "Mr. " : "Ms. ";
    if (age > 25) {
        return "Hello, " + salutation + name + ".";
    }else {
        return "Hey, " + name + ".";
    }
 }

// So we are passing null because we are not using the "this" keyword in our greet function.
var greetAnAdultMale = greet.bind (null, "male", 45);

greetAnAdultMale ("John Hartlove"); // "Hello, Mr. John Hartlove."

var greetAYoungster = greet.bind (null, "", 16);
greetAYoungster ("Alex"); // "Hey, Alex."​
greetAYoungster ("Emma Waterloo"); // "Hey, Emma Waterloo."
```

# Apply/Call method in Javascript: What is the first arguments “this”?
[Reference](https://stackoverflow.com/questions/29483297/apply-call-method-in-javascript-what-is-the-first-arguments-this)

- First argument is the context (the `this`) for the function.

``` js
function foo(bar) {
    this.bar = bar;
}

foo.apply(this, ['Hello']);    //calling foo using window as context (this = window in global context in browser)
console.log(this.bar);         //as you can see window.bar is the same as this.bar
console.log(window.bar);

var ctx = {};    //create a new context

foo.apply(ctx, ['Good night']);
console.log(ctx.bar);        //ctx now has bar property that is injected from foo function
```
