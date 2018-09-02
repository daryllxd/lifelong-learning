# What's in a Production Web Application?
[Reference](https://stephenmann.io/post/whats-in-a-production-web-application/)

- Individual engineers tend to learn very deeply what interests then, and learn just enough of the supporting pieces to be dangerous. Combined knowledge can overlap to fill in any individual's gaps.
- Beanstalk, Kubernetes work in that they hide the complexity required to get a web application up and running, and they tend to "just work".
- Simple system: server + client + database, then S3.
- Then, trying out load tests, checking that you have proper logging.
- Nginx as reverse proxy, CDN, knowing that you have used up your disk space, crashing your process and preventing it from starting again, `logrotate`.
- Replicating a database and running backups on it.
- Building staging, QA, and development environments.
- ElasticSearch, LogStash, Kibana: a way to log everything.
- Private and public subnets: you, trying to be hacked.
