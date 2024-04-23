# Server Actions
[Reference](https://nextjs.org/docs/app/api-reference/functions/server-actions)

- Server actions can be defined in two places:
  - Inside the component that uses it.
  - In a separate file (client and server components), for reusability.


# Building Real-time Apps with Next.js 13.4 Server Actions
[Reference](https://hackernoon.com/building-real-time-applications-with-nextjs-134-server-actions-1-introduction)

- Real-time apps: Immediate response to user inputs/external events. Ex: instant messaging, Google Docs, stock tickers, online games.
- React actions - execute asynchronous code in response to user interactions.
- With actions, you can pass a function to `action` prop.

```
<!-- Traditional HTML approach -->
<form action="/submit-url">
   <!-- form elements -->
</form>

<!-- With Next.js 13.4 Form Actions -->
<form action={asyncFunctionForSubmission}>
   <!-- form elements -->
</form>
```

- Server functions - functions that operate on the server-side but can be invoked from the client.
- Server mutations: They are used to modify on the server and then execute specific responses.

## Creation/Invocation

- It can be in the server component or in the client component (create the action in a separate file and then import it).
- Invoking server actions outside of `startTransition`.

# The simplest example to understand Server Actions in Next.js
[Reference](https://dev.to/scastiel/the-simplest-example-to-understand-server-actions-in-nextjs-5533?comments_sort=oldest)
