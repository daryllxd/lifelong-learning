# The Secrets of Database Change Deployment Automation
[link](http://www.infoq.com/articles/Database-Change-Deployment-Automation/)

## The challenges of database change deployment processes

1. Scripts in the version control system are not connected to the database objects they represent as these are two separated systems. Coding and testing of the database code is done at the database side.
2. Scripts are manually coded: they are prone to human error, syntax error, etc.
3. Scripts are hard to test in its entirety.
4. Scripts are unaware of changes made in the target environment during the time passed from their coding to the time they are run.
5. Content changes are hard to manage.
