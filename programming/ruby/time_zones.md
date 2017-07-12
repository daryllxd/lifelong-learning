## It's About Time (Zones)
[Reference](https://robots.thoughtbot.com/its-about-time-zones)

``` ruby
Time.now: Time on my machine
Time.zone = 'Fiji': Set Time.zone to Fiji.
Time.now: Will still get the system time.
Time.zone.now: Get the current time in that zone.
Time.current: Same.
Time.now.in_time_zone: Same
Date.today: System date
Time.zone.today: Application zone.
Time.zone.tomorrow: Correct tomorrow.
1.day.from_now: Correct tomorrow.
```

### Don't Use

``` ruby
Time.now
Date.today
Date.today.to_time
Time.parse(...)
Time.strptime(...)
```

#### Use

``` ruby
Time.current
2.hours.ago
Time.zone.today
Date.current
1.day.from_now
Time.zone.parse...
Time.striptime(...).in_time_zone
```

Testing:

- `ActiveSupport::Testing::TimeHelpers`.
- `Time.current` or `Time.zone.today`.
