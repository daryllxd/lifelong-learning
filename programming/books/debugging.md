# Debugging

- *When it took us a long time to find a bug, it was because we had neglected some essential, fundamental rule; once we applied the rule, we quickly found the problem.*
- *People who excelled at quick debugging inherently understood and applied these rules. Those who struggled to understand or use these rules struggled to find bugs.*
- System can be: designed wrong, built wrong, used wrong, or just plain got broken.
- Debugging vs troubleshooting: debugging means figuring out why a design doesn't work as planned. Troubleshooting means figuring out what's broken in a particular copy of a product when the design is known to be good.

# Understand the System

- Read the manual. And read everything, from cover to cover. Application notes and implementation guides.
- Know what's reasonable.
- Know the road map. You should know what goes across all the APIs and communication interfaces in your system. You should know what each module or program is supposed to do with what it receives and transmits through those interfaces. Expect interfaces to be simple and modules well-defined.
- For the black boxes, at least know how they're supposed to interact with other parts, so you can at least locate the problem as being inside the box or outside the box.
- Know your tools and their limitations: stepping through source code shows logic errors but not timing or multithread problems; profiling tools can expose timing problems but not logic flaws.
- Don't guess. Look things up. Detailed information has been written down somewhere, either by you or by someone who manufactured a chip or wrote a software utility, and you shouldn't trust your memory about it. Look at each step, even parameter passing to a function call. Don't just trust your memory, trust everything getting passed in.

# Make It Fail

- What do you do when you find a failure? Try to make it fail again. There are three reasons for trying to make it fail: so you can look at it, so you can focus on the cause, and so you can tell if you've fixed it.
- Do it again. A well-documented test procedure is always a plus, but mainly you just have to have the attitude that one failure is not enough.
- Stimulating the failure: automate the process of replicating a bug so it's easier to replicate it.
- If a bug can be recreated on more than one system, you can characterize it as a design bug. If you can't recreate it quickly, don't start modifying your simulation to get it to happen.
- Intermittent:
  - Uninitialized data, random data input, timing variations, multi-thread synchronization, outside devices.
  - Ex: a mainframe computer crashing when it was coffee break, and all the vending machines in the cafeteria were operated simultaneously.
  - *When something fails, you have to look at it each time it fails, while ignoring the many times it doesn't fail. The key is to capture information on every run so you can look at it after you know that it's failed.*

# Quit Thinking and Look
