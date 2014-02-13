Nil is an object.

    nil.to_s = ""
    nil.to_f = 0.0
    nil.to_i = 0

When a method doesn't exist you get teh `NoMethodError` with the `undefined_method` message.

    nil.inspect == "nil"

Everything is an object with an id. An id is a Fixnum (not FixNum!).

`object.clone` means you create a new object _with a different id_!

All arrays have class `Array`. They have 0 size. `array[-1]` is the last element.