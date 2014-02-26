## Introduction

To make it easier to review code, always work in a feature branch. The branch reduces the temptation to push unreviewed code or to wait too long to push code.

The first person who should review every line of your code is you. Before committing new code, read each changed line. Use git’s diff and --patch features to examine code before you commit. Read more about these features using git help add and git help commit.

Look for smells: Extract Method.

Removing resistance: If it is hard to determined where new code belongs, then the code is not readable enough. Rename methods and variables until it's obvious where your change belongs.

Is it hard to change the code without breaking existing code? Add extension points or extract code to be easier to reuse.

Each change should be easy to introduce, if not, refactor.

Bugs and churn: Avoid refactoring areas with low churn.

Metrics: `flog`, `flay` (duplication), `reek`, `churn`, `Code Climate`, `Metric Fu`.

__Getting obsessed with the counts and scores from these tools will distract from the actual issues in your code, but it’s worthwhile to run them continually and watch out for potential warning signs.__
