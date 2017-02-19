# RubyConf 2016 - Halve Your Memory Usage With These 12 Weird Tricks
[text](http://www.youtube.com/watch?v=kZcqyuPeDao)

1. *Dial back the instance counts.* Discover true steady-state memory usage per instance, you want to check how long the app would last with a small footprint.

Myth: Memory usage should look like a long, flat line. The actual graph looks more like a logarithm. First, everything is getting `required`. Secondly, you build your caches. Finally, there are parts of the app that takes up bigger memory than the others. BTW, do not expect that this will taper off.

The problem with worker killers is that you might kill the instance before you get to steady state, so you don't get to see if there is a memory leak or not (you end the process prematurely).

Aim for 300MB per instance of Rails.

2. *Stop allocating so many objects at once.* Garbage collection is lazy. It doesn't work based on timers, it works based on thresholds. It doesn't run in the background, the sweeping phase (the part the frees memory) is based on these thresholds.

3 thresholds: slots that the Ruby VM has for objects, oldmalloc (threshold for slots), and malloc.

Heap fragmentation: We cannot move objects and pages in the objects. Ruby can only release a page (16kb memory) if there are no objects in the page.
