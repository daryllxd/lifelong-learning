- a ton of stuff in libraries folder
	- CurrentUser: Has superclass on current_user_provider to 
	- CanonicalURL
	- Unread: Module which helps them calculate unread and new post counts

config/SiteSettings.yml: A ton of shit

- uncategorized, faq_url, privacy_policy_url, tos_url

>user.rb

has_many
has_one
belongs_to
delegate

validates_presences--
before_save: cook, update_username_lower, ensure_passwrod_is_hashed
after_initialize: add_trust_level, set_default_email_digest
after_initialize: add_trust_level, set_default_email_digest
after_save: update_tracked_topics
after_create: create_user_stat
