# Nil is Unfriendly, with Joe Ferris (Thoughtbot Weekly Iteration 1)

Nil is extremely unfriendly, and its not unwarranted.

## Nil is contagious. 

If you have one `nil`, they jump out. Ex: `user.account.subscription.plan.price`. If you want to know the price that the user is paying, you go through all of these, and some of them are optional. Though we actually would rather just not traverse the chain to obey the Law of Demeter (if we repeat it here we might repeat it multiple times at other points of the app). We also have to deal with `nil` at every step of the chain (Demeter'd or not).

So we do `user.price`, clearly we have no duplication here, when we need the price, we just ask for the price. But still, `nil` bites you. Assuming you get a `nil` here, you just return `nil`.

## Nil has No Meaning

The problem here is that `nil` has no value. Is the price zero? Is the price unknown? Is this an invalid scenario? Or is this a bug? `Nil` is not a good place to represent "the being zero of a price". This is `nil` co-opting a thing that isn't really a thing.

Nil is a slap in the face of duck-typing. Nil violates duck typing. Whereas we can have "attempt to do this", `nil` just does nothing. `nil` says I don't care, and it forces you to look for things anywhere.

What's funny is people say that they hate the `is_a?`, but they are fine with `nil`.
