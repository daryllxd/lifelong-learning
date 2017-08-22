## Amazon RDS DB Instance Lifecycle
[Reference](http://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_CommonTasks.html)

- Amazon RDS creates and saves automated backups of your DB instance. Amazon RDS creates a storage volume snapshot of your DB instance, backing up the entire DB instance and not just individual databases.
- DB instance must be in the `ACTIVE` state for automated backups to occur. If your database is in another state, like `STORAGE_FULL`, automated backups do not occur.
- When you restore a DB instance, the default security groups is associated with the restored instance. Need to associate the custom security groups used by the instance you restored from.
