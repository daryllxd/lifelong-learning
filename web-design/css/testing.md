# Unit Testing Sass
[Reference](https://seesparkbox.com/foundry/how_and_why_we_unit_test_our_sass)

- Why Unit Test Sass?
  - To ensure code is compiling as expected - checking the accuracy of their output is not a native feature. Your CSS might still compile, but it could not be the intended output.
  - Catch output errors quickly [Reference](https://github.com/oddbird/true)

Example:

```
@mixin primary-header {
 font-family: "Helvetica", Arial, sans-serif;
 font-size: 2rem;
 line-height: 2.5rem;
 color: #333;
 text-decoration: underline;
}

// Describe what you're testing
@include describe('The primary-header mixin') {
  // Explain what it should do
  @include it('outputs the properties of our primary header.') {
    // Assert the output of the mixin matches the expected result
    @include assert {
      @include output {
        @include primary-header();
      }
      @include expect {
        font-family: "Helvetica", Arial, sans-serif;
        font-size: 2rem;
        line-height: 2.5rem;
        color: #333;
        text-decoration: underline;
      }
    }
  }
}
```
