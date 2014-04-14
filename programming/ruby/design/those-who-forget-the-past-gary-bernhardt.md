# Those Who Forget the Past by Gary Bernhardt

Capability - the power for a software system to express an idea. Capable = lisp. Lisp can express arbitrarily complex ideas as long as you don't care about syntax.

Suitability - the power to take the capability you have and actually build working software and build that software reliably. Java.

Fortran - Pure capability response to assembly. It has `IF` and variables, and it allows you to express higher-level ideas.

Structured programming - The idea of using `IF` and `WHILE` as opposed to `GOTO`. Structured programming takes some capability away to make things more reliable.

The relational model: a suitability response to flat files. By organizing the data in tables, you give up some flexibility, but you gain reliability in your software.

C++, Java. Java takes C++ and removes pointer arithmetic, manual memory management.

Rails. Is it a capability change or a suitability change? Did Rails increase the set of things we could say, or did it allow us to say the same things but say it more reliably?

I think Rails is a capability response. Rails/Ruby has a culture of brokenness. You can build a gem then abandon it a few months later.

## Patterns

I think abundant resources are the primary driving factor for expanded capability. More CPU, more memory, and you can write a Fortran compiler, or a Rails app.

The typical reaction is that it is **TOO SLOW**. C was too slow, C++ was too slow, Java was too slow.

I think confusion motivates contractions to suitability. GOTO is confusing. Flat files are confusing. The reaction here is **TOO LIMITING**.

So people tend to think that things are too slow or too limiting.

C, Java, and Ruby are too slow. I'd like to present for your consideration the idea that something is going to be slower than Ruby someday. When that things come, it's not our job as Ruby programmers to tell them that it's too slow.

Suitability is better than capability in terms of actually building working software. Just because you can, doesn't mean you should, or just because you can doesn't mean you really can.

Being active is different from having progress. So, what is progress? I'm pretty sure that expansion phases increase capability which increases activity. I think that the contraction phase increases suitability increase progress.

The truth about Rails is that apps are really bad inside. Rails basically took the big angry ball of mud from PHP and gave us a smaller big angry ball of mud. We have either fat controller or fat model. What can we do?

I think we can use GOOS. Do the higher level parts first. Or, we can do functional programming (Haskell, Clojure, Erlang). I think it's contraction time and contraction has to happen.
