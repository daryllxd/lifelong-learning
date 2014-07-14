# Deployments Best Practices
[link](http://guides.beanstalkapp.com/deployments/best-practices.html)

## Workflow

- Developers work on bugs and features in separate branches. Really minor updates can be committed directly to the stable development branch.
- Once features are implemented, they are merged into the staging branch and deployed to the Staging environment for QA and testing.
- After testing is complete, feature branches are merged into the development branch.
- On the release data, the development branch is merged into production and then deployed to the Production environment.
- It is very handy to have a separate branch called staging to represent your staging environment. It will allow developers to deploy multiple branches to the same server simultaneously, simply by merging everything that needs to be deployed to the staging branch.
- Production: After branches are merged, they should be merged and deleted to avoid confusion between team members. Make sure to only merge development branch into production only when you actually plan to deploy. We recommend always deploying major releases to production at a scheduled time, of which the whole team is aware of. Find the time when the application is least active and use that time to roll out updates.
- Big win if your deployment tool can send an email to all team members with a summary of changes after every deployment.

