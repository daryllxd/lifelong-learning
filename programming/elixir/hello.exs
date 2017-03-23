speak = &(IO.puts(&1))
speak.("eheh")

# hehe

divrem = &{ div(&1, &2), rem(&1, &2) }
IO.puts(divrem.(5,2))

add_n = fn (n) -> (fn(other) -> n + other end) end
haha = add_n.(5)
IO.puts(haha.(7))

adding = &(&1 + &2)

IO.puts(adding.(1, 2))


list_concat = fn (a, b) -> a ++ b end
hello = fn(a) -> IO.puts(a) end

list_concat.([:a], [:c])

hello.("SAWG")

fizzbuzz = fn (a, b, c) ->
  case { a, b, c } do
    { 0, 0, _ } -> "fizzbuzz"
    { 0, _, _ } -> "fizz"
    { _, 0, _ } -> "buzz"
    _ -> c
  end
end

rem_fiz = fn(num) ->
  fizzbuzz.(rem(num, 3), rem(num, 5), num)
end

hello.(rem(5, 3))
hello.(rem_fiz.(10))
hello.(rem_fiz.(11))
hello.(rem_fiz.(12))
hello.(rem_fiz.(13))


