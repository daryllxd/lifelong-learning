# Understanding Next.js Server Actions With Examples
[Reference](https://blog.greenroots.info/understanding-nextjs-server-actions-with-examples)

```
export default function Cart() {

  function addToCart(e) {
    // Read the Form Data
    // Make the API call
    // Change the Component state
  }

  return (
    <form method="post" onSubmit={addToCart}>
      <label>
        Select your favorite brand:
        <select name="selectedBrand" defaultValue="apple">
          <option value="apple">Apple</option>
          <option value="oppo">Oppo</option>
          <option value="samsung">Samsung</option>
        </select>
      </label>
      <label>
        Enter the Count:
        <input
          type="number"
          name="count"
          placeholder="Specify how many do you want" />
      </label>
      <hr />
      <button type="reset">Reset</button>
      <button type="submit">Submit</button>
    </form>
  );
}
```

- For this, you need to read the form data to capture the user inputs, make an API call over the network, and then update the component/application state based on the API call response.
  - These happen from the client side of the application.
- If we use RSC:
  - The components have back-end access without any network round trips.
  - We improve the app performance with 0 bundle size.
- A component hierarchy can combine server and client components.
- Enable `serverActions` in your next.config file.

## What are they

- Server actions are JS `async` functions that run on the server by the user interactions on the client.

```
async function addItemToCart(data) {
  'use server'
  await addToDB(data)
}

<form action={handleSubmit}>
    <input type="text" name="name" formAction={handleName} />
    <button type="submit">Submit</button>
</form>
```

## Using from Client component:

- This code does not get sent to the client.

```
'use server'

import { addCommentToCourse } from '@/data/course'

export async function addComment(data, courseId) {
  const response = await addCommentToCourse(data, course);
  return response;
}
```

```
'use client'

import { addComment } from '@/actions/add-comment';

export default function CourseComment() {
  return (
    <form action={addComment}>
      <button type="submit">Add Comment</button>
    </form>
  )
}
```

- How to invoke outside of Forms? Do it with `startTransition` in `useTransition` hook.

```
Server mutations with redirect, revalidatePath, and revalidateTag.

About the useOptimistic hook and how it helps to make the app more responsive.

What is Progressive Enhancements?

How useFormStatus hook comes in handy with server actions and progressive enhancements.
```

# Introduction to Next.js Server Actions
[Reference](https://makerkit.dev/blog/tutorials/nextjs-server-actions)

- This is a huge step forward for Next.js, as it allows us to run code on the server without having to create an API endpoint. This is a whole new DX for Next.js developers, and it's going to be a game changer.
- Use cases:
  - Writing to a database: you can write to a database directly from the client, without having to create an API endpoint - just by defining your logic in a server action.
  - Server logic: executing any server-related business logic, such as sending emails, creating files, etc.
  - Calling external APIs: you can call external APIs directly from server actions, without having to create an API endpoint

## Pros to using Next.js Server Actions

- No need to create an API endpoint: you can run server code without having to create an API endpoint.
- Jumping to the definition: you can jump to the definition of a server action just by clicking on it in your code editor, without the need of searching for it in your codebase.
- Type safety: you can use TypeScript to define the arguments and return value of your server actions, and Next.js will automatically validate them for you.
- Less code: you can write less code, as you need a lot less boilerplate to run server code - you can just define a function and its parameters - and then call it from the client.
- There's a lot to love about Next.js Server Actions, and I'm sure you'll find a lot of use cases for them.

- **Client Components can only import actions from server actions files: client components cannot define server actions inline from the same file - but you can still import them from a file that defines multiple server actions using the use server keyword.**

