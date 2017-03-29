defmodule Sum do
  def of(0), do: 0
  def of(n), do: n + of(n-1)
end

defmodule Gcd do
  def of(x, y) do
    if y > x do
      of(y, x)
    else
      quotient = div(x, y)
      remainder = rem(x, y)

      ~s({ #{quotient}, #{remainder} })
    end
  end
end

IO.puts(Sum.of(9))

IO.puts(Gcd.of(9, 3))
IO.puts(Gcd.of(3, 9))
IO.puts(Gcd.of(9, 4))
