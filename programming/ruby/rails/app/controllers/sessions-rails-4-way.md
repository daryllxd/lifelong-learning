# 13: Session Management

HTTP is stateless. Without the concept of a session, there'd be no way to know that any HTTP request was related to another one.

Session = the time the user is using the application/the persistent data structure we keep around for that user. When a new session is created, Rails automatically sends a cookie to the browser containing the session id, for future reference.

The Rails way is to have minimal use of the session for storage of stateful data.

## What to Store in the Session

*The Current User. Not the current user object, but its ID.* The authentication system should take care of loading the user instance from the database prior to each request and making it available.

Guidelines on storing objects in the session:

- Must be serializable by Ruby's Marshal API (???), which excludes stuff like a database connection.
- Size limit for sessions.
- No critical data (it can be lost by the user ending his session).
- Objects with attributes that change often, no.
- Clear old sessions to prevent weird shit from happening.

Rails' default behavior is to store session data as cookies in the browser, but if you need to exceed the 4KB storage limit, you need another session store (also, there is some concern about session-replay attacks involving cookies).

# Memcached

The `memcached` server daemon is a remote-process memory cache that helps power some of the most highly trafficked sites on the Internet.

    gem 'dalli'

> `config/environments/production.rb`

    config.cache_store = :mem_cache_store


