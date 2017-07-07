## Active Record Transactions
[Reference](http://api.rubyonrails.org/classes/ActiveRecord/Transactions/ClassMethods.html)
## RAILS TRANSACTIONS: THE COMPLETE GUIDE
[Reference](http://www.codeatmorning.com/rails-transactions-complete-guide/)
## Transactions in Rails
[Reference](http://markdaggett.com/blog/2011/12/01/transactions-in-rails/)

- Inside a transaction, any errors raised (that's why we use `update!` instead of `update` will trigger a rollback in the transaction. Error pages will still show up, so you have to rescue them.
- Triggering the rollback intentionally: `raise AR::Rollback`.
- Nested transactions--errors in the inner transaction will rollback the outer transaction because we are not rescuing anything.
- Transactions: Will cause deadlocks and this will lock every row in the transaction.
- Transactions are bound to the database connection, not the model instance. They are only needed when changes to multiple records succeed as a single unit.
- In Rails, rollbacks are only triggered by an exception.
-
