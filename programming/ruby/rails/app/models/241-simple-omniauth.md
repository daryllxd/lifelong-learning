We use Omniauth to make users sign in through an external service such as Facebook or Twitter.

Twitter: `gem 'omniauth_twitter'`

Create `config/initializers/omniauth.rb`

    Rails.application.config.middleware.use OmniAuth::Builder do
      # provider :developer unless Rails.env.production?
      provider :twitter, ENV['TWITTER_KEY'], ENV['TWITTER_SECRET']
    end

You won't use the provider developer if you don't want a placeholder.

Go to the Twitter Development site and create a new application.

    <%= link_to "Sign in with Twitter", "/auth/twitter"%>

Once you click the Sign In, you'll be redirected back to the application with the path `/auth/twitter/callback` and an `oauth_token` parameter. You need the Rails app to be able to respond to this path to complete the authentication.

> /config/routes.rb

    Blog::Application.routes.draw do
      resources :articles
      root to: 'articles#index'
      match 'auth/twitter/callback', to: 'sessions#create'

      #or we can just do
      match 'auth/:provider/callback', to: 'sessions#create'
    end

