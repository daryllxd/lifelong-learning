## Mastering Modern Payments -- Using Stripe with Rails

#### State and History

We aren't keeping much information in the database. We can't see how much we've earned, we can't see how big Stripe's cut has been. "Trust and verify." Track sales through each stage of the process, from the point the customer clicks the buy button all the way to a possible refund. We should know, at any given moment, what state a transaction is and it's entire history.

AASM: `gem aasm`

The Sale state machine will have four possible states:

- Pending means we just created the record
- Processing means we're in the middle of processing
- Finished means we're done talking to Stripe and everything went well
- Errored means we're done talking to Stripe and there was an error

#### Audit trail

    has_paper_trail


