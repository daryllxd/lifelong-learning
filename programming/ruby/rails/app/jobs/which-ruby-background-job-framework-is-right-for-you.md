## Which Ruby background job framework is right for you?
[Reference](http://blog.scoutapp.com/articles/2016/02/16/which-ruby-background-job-framework-is-right-for-you)

- Background job: one that is processed outside of the usual request/response workflow that is part of the modern web framework.
- You offload the processing to the background job because the processing can fail (ex: email server going down, user's email service goes down, customer's inbox is full).
- Background jobs are also retryable: when the email server comes back up, or the customer clears their inbox, the email can be sent again.

### Delayed job:

- Creates a `job` table in the database to keep track of a task.
- Delayed::Job integrates with Rails, AR, Mongoid.
- Pros: stable, around for years.
- Cons: Dependency on the database. If the jobs table is in the same database as the one used by your application, could be unnecessary high load.

### Sidekiq

- Backed by Redis, runs in a separate process.
- Pros: It can process up to 100,000 jobs in 22 seconds (465 seconds for Delayed::Job), built-in dashboard. Sidekiq Pro and Sidekiq Enterprise comes with periodic scheduled jobs, unique jobs, priority email/chat support.
- Cons: Data loss if your Redis instance crashes while enqueuing or dequeueing a job. Redis tries snapshotting, (writing to an append only file as data is modified in memory).

### SuckerPunch

- Built on top of concurrent-Ruby. Stores the job state entirely in memory.
- Pros: Runs 'within' the existing application, so cheaper.
- Cons: Least durable/resilient when it comes to dealing with system failure.
- Recommended for jobs that are fast and non-mission critical (logs, emails).
