As developers, we develop parts one at a time. We are continuously adding code. When we were running tests, some of them break the build. Instead of putting things together at the end, we integrate new code often and early. We can keep the system free of defects, confident that nothing is going wrong.

Red/Green: When the build is green, then we are able to add new features.

# Jenkins: The Definitive Guide

# 1: Introducing Jenkins

When CI is introduced into an organization, it radically alters the way teams think about the whole development process. It has the potential to enable and trigger a series of incremental process improvements, going from a simple scheduled automated build right through to continuous delivery into production.

CI involves a tool that monitors your VCS for changes. Whenever a change is detected, this tool automatically compiles and tests your application. If something goes wrong, the tool immediately notifies the developers so that they can fix the issue immediately.

It can:

- Keep tabs on the code base health.
- Keep technical debt down.
- Keep maintenance costs low.
- It can automate the deployment process.

CI is about reducing risk by providing faster feedback. It is designed to help identify and fix integration and regression issues faster, resulting in smoother, quicker delivery, and fewer bugs.

Automated deployment: If you take automating the deployment process to its logical conclusion, you could push every build that passes the necessary automated tests into production.

Continuous delivery: Every successful build that has passed all the relevant automated tests can potentially be deployed into production via one click.

To get the most of CI, a team needs to adopt a CI mentality. Your projects must have a reliable, repeatable, and automated build process, involving no human intervention. Fixing broken builds should take an absolute priority and not be left to stagnate.

## Jenkins

Jenkins is open source and written in Java, made by Kohsuke Kawaguchi (started as hobby project while working at Sun). When Oracle purchased Sun, Oracle wanted to make the development process controlled. The Hudson developer community renamed the project to Jenkins and migrated the code to a different repository. 75% of users use Jenkins while 13% still use Hudson.

## Introducing CI Into Your Organization

- Phase 1: No build server. Software is built manually on a developer's machine. Some time before a release is scheduled, a developer manually integrates the change.
- Phase 2: Nightly builds. Automated builds are scheduled on a regular (nightly) basis. (Assume no tests yet.)
- Phase 3: Nightly builds and basic automated tests. We kick off a build whenever new code is committed, and team members can see what changes in the source triggered a particular build. The build script compiles the application and runs a set of automated unit and/or integration tests. The build server alerts team members of integration issues using email and instant messaging.
- Phase 4: Automated code quality and code coverage metrics are now run to help evaluate the quality of the code base. We also build API documentation for the application.
- Phase 5: TDD is now practiced, resulting in a growing confidence in the result of the automated builds.
- Phase 6: Automated acceptance tests/more automated deployment. We use BDD and Acceptance-Test Driven Development to act as communication and documentation tools.
- Phase 7: Continuous deployment. Teams can apply the automated deployment techniques developed in the previous phase to push out new changes directly into production.

# 2: Your First Steps with Jenkins

Need: Git, Java, Github. Start with Java Web Start. First build: just compile and test the sample application.
