# PHRUG Meetup - March 20

## Testing Command-Line Apps

Cucumber, Aruba.

CLI apps have only one layer and has a lot of side effects. So you have a script, it does something, and how do you know if something works.

Check if file exists, stdout contains text, exit status == 0..

So you can manage a bunch of Virtualbox commands via SSH.

# Make the Most of RubyConfPH

- Starters: WHat do you think about the recent talk? Where are oyou from? What's your AR pet peeve? What's your editor?
- Be curious. You don't just learn from the speakers, you learn from the attendees.
- Share your story.
- MINASWAN!!!!!

# Deploying Rails with AWS Opsworks

IaaS. You're in charge of what components you need, you can configure your instances/components for Redis, Memcached. Compared to Heroku/Azure, they have Elastic Beanstalk.

Twitmusic Stack:

- Backend - handles background jobs
- CRON - one
- Frontend - heavy, scales up

OPsworks supports Unicorn (multithreaded)/Passenger.

Alternative deployment routes - Heroku, Elastic Beanstalk, CloudFormation, Azure

Opsworks

- I can SSH into the instance
- Scale automation based on load, or time
- Runs on Chef
- Options for instances
- Built in AWS, with an option to use other components: RDS, Cloudfrotn, ElasticCache
- Great support

T1 Micro instance, M1 small instance

## Redis Use Cases

- Caching similar to memcache
- Analytics
- To track that they like they post without being a signed in user
- Running jobs
- When data is unimportant, then you can use Redis

## Static Sites in Ruby

- YAGNI.
- Third-Party APIs can be provided without Wordpress (Disqus + Google Analytics + Gist)
-
