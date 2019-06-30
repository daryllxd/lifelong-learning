# Go

- New, open-source programming. Scalable both for lines of code and for number of people.
- Go: interfaces, reflection on types and values, concurrency.

```
package main
import "fmt"

// All programs run with this function signature.
func main() {
  fmt.Printf("Hello, World\n")
}

type World struct{}

// First
func (w *World) String() string {
  return "hello"
}
```

Interfaces

- A type implements the interface by defining the required methods.
- `%s`: interpolation.
- `fmt` implements a string method `Stringer`, `Reader`, `Marshaler`.

```
type Office int
const (
    Boston Office = iota // C enum
    NewYork
    )

func (o Office) String() string {
  return "Google, " + officePlace[0] // Array defined outside
}

Define methods on any definition.
```

Printing Weekdays

```
day := time.Now().Weekday()
fmt.Printf("Hello, %w (%d)\n", day, day)


start := time.Now()
fetch("http://www.google.com/")
fmt.Println(time.Since(start))
  ```

  - No "implements" declarations, but they just have this `String()` method. This is the difference between the languages in Java/C#. This makes things really faster.
  - Package `io` is the `Write` method for the file.
  - `Fprintf`, argument is a writer and the message.
  - `io.MultiWriter`.
  - package `hex.Dumper`.
  - Unix `Reader` system call, the idea is that we have a bigger interface.

# Reflection

  - `%v` for value. Didn't use interfaces.
  - Reflection: type information and basic operations are available at run-time. Perform the type's basic operations in value.
  - You don't want to over-reflect.
  - `Print` and `Printf` are not built into the language. They are not magical.
  - `...`: multiple arguments.
  - Argument that requires no methods.

  ```
  func myPrint(args ...interface{}) {
    for _, arg := range args {
      // Some way to print out basically anything to t
      switch v := reflect.ValueOf(arg); V.kind() {
        case reflect.String:
          os.Stdout.WriteString(v.string())
        case reflect.Int:
            os.Stdout.WriteString(strconv.FormatInt(v.Int(), 10))
      }
    }
  }
```

- `json.Marshal`.
- Reflection.
- `http`

- Concurrency is the coordination of parallel tasks.
- Goroutines let you run multiple computations simultaneously. Channels let you coordinate the computations by explicit communication.
- `go`, then add channels to make them run concurrently.
- Annotation to send things to the channel. Splat those languages in and read the results in the channel. We know exactly when we're done.
- Go heavily abstracts Stuff like deadlocks etc. so you don't need to think about it. They exist, but are abstracted below.

# Go By Example

- No ternaries.
- Type switch: `i.(type)`.
