## Why Developers Should Be Force-Fed State Machines
[link](https://engineering.shopify.com/17488160-why-developers-should-be-force-fed-state-machines)

- Easier to figure out edge conditions with a state machine.
- Clearly defines which parts of the internal state of your object are exposed as an external API.
- In management, SMs are called business processes.

#### Patterns

- State or status field.
- Boolean fields like `published` or `paid`.
- Records that are valid for a given period in time, like subscriptions with a start and end date.

- Keeping the transition state: You can use `audit_trail` for this.
- *Deleting stuff--instead of removing it, add an error state for any reason you would have wanted to delete a record.* Spam--set to `spam` state, fraudulent--set to `fraud` state.

## Why Developers Never Use State Machines
[link](http://www.skorks.com/2011/09/why-developers-never-use-state-machines/)

- *You almost never create an object fully formed with all the behavior it is every going to need, rather you build it up over time.* So even if you feel that your object's SM is not complex enough to warrant a full-blown state machine, when it IS complex enough, you feel like it is too much time/effort to replace it with something that has equivalent functionality.
- SM is not like the CS counterpart. For Ruby, it's basically strings and methods that cause transitions from one state to another. *Even if you have two states, a state machine is not overkill. It might be easier than rolling an ad-hoc solution, as long as you have a good library to lean on.*
- Return values from state transitions are now consistent (`true/false`). Before it was objects, arrays of objects, nil, true/false.

#### Comments

- Implementing: A state transition table (2-D array), an actions table (array), and a `current_state` (integer).
