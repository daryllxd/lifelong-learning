# OAuth
[link](https://developer.github.com/v3/oauth/)

OAuth2 is a protocol that lets external apps request authorization to private details in a Github account without getting their password.

1. Redirect users to request Github access

    https://github.com/login/oauth/authorize

Parameters:

    client_id    | string | client_id from Github
    redirect_uri | string | where users will be sent after authorization
    scope        | string | comma-separated list of scope
    state        | string | unguessable random string

2. Github redirects back to your site

If the user accepts your request, Github redirects back to your site with a temporary code in a code parameter as well as the state you provided in the previous step in a state parameter. Check security here cause `state` should be the same.

    POST https://github.com/login/oauth/access_token

Parameters:

    client_id
    client_secret | string
    code          | string | code received as response to step 1
    redirect_uri  | string | url in app where users will be sent after authorization


