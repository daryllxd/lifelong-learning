## How To Code Like The Top Programmers At NASA — 10 Critical Rules
[Reference](http://techaed.com/how-to-code-like-the-top-programmers-at-nasa-10-critical-rules/)

- Simple flow constructs--no goto, setjmp or longjmp, and direct or indirect recursion.
- All loops must have a fixed upper-bound, which can be checked and proven.
- Do not use dynamic memory allocation after initialization.
- 60 lines max (where there is a line per statement and one line per declaration).
- The assertion density of the code should average to a minimum of two assertions per function. If this fails, a recovery action must be taken (returning an error condition to the caller of the function that executes the failing assertion).
- Data objects must be declared at the smallest possible level of scope.
- The return value of non-void functions must be checked by each calling function, and the validity of parameters must be checked inside each function. (Static typing?)
- Preprocessor: inclusion of header files and simple macro definitions only. No token pasting, variable argument lists, and recursive macro calls.
- Restrict the use of pointers. No more than one level of dereferencing is allowed.
- All code must be compiled with compiler warnings at the highest setting. All code must compile without any warnings. They must be checked daily with code analyzers.
