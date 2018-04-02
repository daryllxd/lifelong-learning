# Perfect Full Page Background Image
[Reference](https://css-tricks.com/perfect-full-page-background-image/)

``` css
/* Use HTML as it's always the height of the browser window. */
/* Fixed and centered twice */
/* background-size: cover */
html {
  background: url(images/bg.jpg) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
```
