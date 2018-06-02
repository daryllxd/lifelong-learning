# RailsConf 2017 Panel: Performance, Performance
[Reference](https://www.youtube.com/watch?v=SMxlblLe_Io)

- Measure it first boys. Each Ruby object gets a slot in the Ruby VM.
- Discourse: Sam has a blog post on this thing.
- Defer JS, CDN.
- Low request variance on seconds thingie.
- Slowest endpoints that have a high amount of traffic.
- Freezing fucking strings?
- Fast vs pretty code?
- The thing about freeze is that if you don't really use the string more than once, why?
- Strike-proof.
- Thing that can cause a slow thing in production: Data in the database. Also when one specific user is logged in. Like paper trail.
- Chrome Dev Tools for throttling your network connection.
