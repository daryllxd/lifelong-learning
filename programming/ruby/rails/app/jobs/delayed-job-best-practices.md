## Delayed Job Best Practices
[link](http://www.sitepoint.com/delayed-jobs-best-practices/?utm_content=buffer1caf9&utm_medium=social&utm_source=linkedin.com&utm_campaign=buffer)

Table to hold delayed jobs:

    $ rails generate delayed_job:active_record

This creates a table with

    priority, attempts, handler, last_error, run_at, locked_at, failed_at, locked_by, queue

Add an index to the `queue` since you will most probably be looking for this, a lot.

Usually, a job is created in order to handle a background task related to a business entity.

#### Queueing jobs

- *Don't delete failed jobs.*
- *Think about he maximum run time value.*
- *Don't use one queue.* Even if you only have a few workers/jobs at the start, start by giving meaningful names to the queues. Distribute jobs with different business contexts to different queues. Registration emails: `registration_emails` queue, email notifications: `email_notifications`. Recommendation: one worker per queue.

#### Custom Delayed Jobs

- Hook handler for enqueue hook.
- Implement a success hook.
- Implement an error hook.
- Implement a failure hook.
