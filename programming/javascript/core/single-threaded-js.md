# If Javascript Is Single Threaded, How Is It Asynchronous?
[Reference](https://dev.to/bbarbour/if-javascript-is-single-threaded-how-is-it-asynchronous-56gd)

- JS is single threaded - one call stack, one memory heap. So it executes code in order and must finish executing a piece of code before moving onto the next.
- Ex: `alert` means you can't interact with the webpage at all until you hit OK.
- Asynchronous - the JS engine has a Web API that handles these tasks in the background. Once those tasks are finished by the browser, they return and are pushed onto the stack as a callback.
- `setTimeout` isn't handled by JS and pushes it off to the Web API to be done asynchronously.

# What does it mean by Javascript is single threaded language
[Reference](https://medium.com/swlh/what-does-it-mean-by-javascript-is-single-threaded-language-f4130645d8a9)

- JS engine runs on a V8 engine that has a memory heap and a call stack.
- JS is single threaded which means only one statement is executed at a time.
- Async implementation: call stack, call back queue, web API and event loop.
- In JS, all instructions are put on a call stack. When the stack arrives at `setTimeout`, the engine sees it as a Web API instruction and pops it out and sends it to Web API.

# Asynchronous and Single-threaded JavaScript? Meet the Event Loop
[Reference](https://thecodest.co/blog/asynchronous-and-single-threaded-javascript-meet-the-event-loop/)

- JS is interpreted - it needs an interpreter which converts the JS code to machine code.
- Interpreters - V8 (Chrome), Quantum (Firefox), and Webkit (Safari).
- Each engine contains a memory heap, a call stack, even loop, callback queue, and a WebAPI with HTTP requests, timers, events, etc.
- Blocking call stack: `readFileSync`.
- JS engines can be non-blocking and behave as if it were multi-threaded. It means that it doesn't wait for the response of an API call, I/O events, etc. and can continue the code execution.
- `setTimeout` goes  to the `WebApi` queue.
- Event loop: How does the runtime know that the call stack is empty?

## Synchronous and Asynchronous in a Single and Multi-threaded Environment

- Synchronous with a single thread: Tasks are executed one after another. Each task waits for its previous task to get executed.
- Synchronous with multiple threads: Tasks are executed in different threads but wait for any other executing tasks on any other thread.
- Asynchronous with a single thread: Tasks start being executed without waiting for a different task to finish. At a given time, only a single task can be executed.
- Asynchronous with multiple threads: Tasks get executed in different threads without waiting for other tasks to be completed and finish their executions independently.

# Javascript is single-threaded? You’re kidding me!!!
[Reference](https://codeburst.io/is-javascript-single-threaded-youre-kidding-me-80b11d74f4e5)

- JS runtime is single-threaded.
- `setTimeout` is not a JS feature, it's provided by the browser. The browser controls the trigger and execution of the `setTimeout` method asynchronously.
- Web API - the suite of APIs that provide AJAX, cache, audio, geolocation, etc.
- Event loop:
  - Event table - maintains the triggers of the asynchronous calls against the reference for the callback methods.
  - Event queue - is a placeholder to temporarily keep the references of the callback method before it can be pushed into the JS runtime stack.
