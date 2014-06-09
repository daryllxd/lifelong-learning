# Recommendations on Branching
[link](https://secure.phabricator.com/book/phabflavor/article/recommendations_on_branching/)

- Never put feature branches in the remote/origin/trunk.
- Control access to new features with runtime configuration, not branching.

## Feature Branches

Traditional: Create a branch for this feature in the remote, develop the feature on the branch over some period of time, then merge the entire branch back into master when complete.

Drawbacks:

- You have to merge. Merging can be painful and error prone.
- This aggregates risk into a single high-risk merge event at the end of development: both explicitly (everything is merged at once) and subtly (commits on the branch aren't immediately available/so easier to hold them to a lower bar of quality).
- When you have multiple feature branches, it's impossible to test interactions between the features.
- You generally can't A/B test code in feature branches, can't roll it out to a small percentage of uses, and can't easily turn it on for just employees since it is in a separate branch.

Advantages:

- Before the merge, no impact on production.

## Advantages of not Feature Branching:

- You don't have to do merges.
- Risk is spread out more evenly into a large number of small risks.
- You can test interactions between features in development easily.
- You can A/B test and do controlled rollouts easily.

## Controlling Access to Features

*Build a runtime configuration which defines which features are visible, based on the tier (dev, testing, prod), the logged in user, global config, A/B test groups, whatever else. It should look like this:*

    if (is_feature_launched('poke')) {
      show_poke();
    }
