# Adding A Robust Form Validation To React Redux Apps
[Reference](https://medium.com/@rajaraodv/adding-a-robust-form-validation-to-react-redux-apps-616ca240c124)

- Form validations:
  - Client-side validation.
  - Instant server-side validation (ex: check server if username is unique upon blur).
  -  On Submit server-side validation (check server after submit).
  - Prevent duplication submissions (disable submit-button after submit).

- `PostsForm`: Presentational, its job is to render the page and delegate event handling to its parent container.

- Client side validation: Have a way of tracking errors for each of the form elements.
- Instant server-side validation: Async action pattern?
- On Submit server-side validation: it should return a Promise and implement reject/resolve, then dispatch the even that signifies that the data was bad.
