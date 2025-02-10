# User Location
[Reference](https://web.dev/articles/user-location)

## Summary

- Use geolocation when it benefits the user.
- Ask for permission as a clear response to a user gesture.
- Use feature detection in case a user's browser doesn't support geolocation.
- Don't just learn how to implement geolocation; learn the best way to use geolocation.
- Test geolocation with your site.

## When to use

- Find where the user is closest to a specific physical location to tailor the user experience.
- Tailor information (such as news) to the user's location.
- Show the position of a user on a map.
- Tag data created inside your application with the user's location (that is, geo-tag a picture).

- Assume users will not give you their location. Handle all errors out of the geolocation API.
- Use a fallback if geolocation is required - can check the IP address.
- **Always request access to location on a user gesture.** Not when the site loads.
- Explicit action - "find near me".
- **You don't have access to anything users are doing. You know exactly when users disallow access to their locations but you don't know when they grant you access; you only know you obtained access when results appear.**
  - Set up a timer that triggers after a short period; 5 seconds is a good value.
  - If you get an error message, show a message to the user.
  - If you get a positive response, disable the timer and process the results.
  - If, after the timeout, you haven't gotten a positive response, show a notification to the user.
  - If the response comes in later and the notification is still present, remove it from the screen.

```
if (navigator.geolocation) {
  console.log('Geolocation is supported!');
} else {
  console.log('Geolocation is not supported for this Browser/OS.');
}
```

## When to use geolocation to watch the user's location

- You want to obtain a more precise lock on the user location.
- Your application needs to update the user interface based on new location information.
- Your application needs to update business logic when the user enters a certain defined zone.

## Best practices

- Clear up the locator - `clearWatch`.
- Handle errors gracefully.
- Reduce need to start geolocation hardware.
  - Use the `maximumAge` optional property to tell the browser to use a recently obtained geolocation result. This not only returns more quickly if the user has requested the data before, but it also prevents the browser from starting its geolocation hardware interfaces such as Wifi triangulation or the GPS.
- Don't keep the user waiting, set a timeout
  - Unless you set a timeout, your request for the current position might never return.

```
var geoOptions = {
  timeout: 10 * 1000,
  maximumAge: 5 * 60 * 1000,
};

```
