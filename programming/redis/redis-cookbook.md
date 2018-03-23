# The Redis Cookbook
[Reference](http://www.rediscookbook.org/introduction_to_storing_objects.html)

Storing objects


```
# Generate unique ID first

id = redis.incr "event"
redis.set "event:#{id}:name", "Redis Meetup"
redis.get "even:#{id}:name"

# Using the Hash datatype

redis.hset "event:#{id}", "name", "Redis Meetup"
redis.hget "event:#{id}", "name"
```

