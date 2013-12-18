In general there is no such thing as plug-n-play security. Security depends on the people using the framework, and sometimes on the development method. And it depends on all layers of a web application environment: The back-end storage, the web server and the web application itself (and possibly other layers or applications).

The Gartner Group however estimates that 75% of attacks are at the web application layer, and found out "that out of 300 audited sites, 97% are vulnerable to attack". This is because web applications are relatively easy to attack, as they are simple to understand and manipulate, even by the lay person.

## 2 Sessions

_HTTP is a stateless protocol. Sessions make it stateful._

Without the idea of sessions, the user would have to identify, and probably authenticate, on every request. Every cookie sent to the client's browser includes the session id. And the other way round: the browser will send it to the server on every request from the client. In Rails you can save and retrieve values using the session method:

	session[:user_id] = @current_user.id
	User.find(session[:user_id])

#### 2.2 Session id

The session id is a 32 byte long MD5 hash value.  Currently it is not feasible to brute-force Rails' session ids. To date MD5 is uncompromised, but there have been collisions, so it is theoretically possible to create another input text with the same hash value. But this has had no security impact to date.

#### 2.3 Session Hijacking

Everyone who seizes a cookie from someone else, may use the web application as this user – with possibly severe consequences. Here are some ways to hijack a session, and their countermeasures: 

- Sniff the cookie in an insecure network. In an unencrypted wireless LAN it is especially easy to listen to the traffic of all connected clients.  For the web application builder this means to provide a secure connection over SSL. In Rails 3.1 and later, this could be accomplished by always forcing SSL connection in your application config file:

		config.force_ssl = true

- Provide a clear Log Out button so users because users might forget to log themselves out in a computer terminal.
- XSS exploits aim at obtaining the user's cookie.

#### 2.4 Session Guidelines

Do not store large objects in a session. Instead you should store them in the database and save their id in the session, to eliminate synchronization headaches. This will also be a good idea, if you modify the structure of an object and old versions of it are still in some user's cookies. 

Critical data should not be stored in session. If the user clears his cookies or closes the browser, they will be lost. And with a client-side session storage, the user can read the data.

#### 2.5 Session Storage

CookieStore saves the session hash directly in a cookie on the client-side. The server retrieves the session hash from the cookie and eliminates the need for a session id.  

Storing the current user's database id in a session is usually ok. The client can see everything you store in a session, because it is stored in clear-text (actually Base64-encoded, so not encrypted). So, of course, you don't want to store any secrets here. To prevent session hash tampering, a digest is calculated from the session with a server-side secret and inserted into the end of the cookie.

#### 2.6 Replay Attacks for CookieStore Sessions

	A user receives credits, the amount is stored in a session (which is a bad idea anyway, but we'll do this for demonstration purposes).
	The user buys something.
	His new, lower credit will be stored in the session.
	The dark side of the user forces him to take the cookie from the first step (which he copied) and replace the current cookie in the browser.
	The user has his credit back.

Including a nonce (a random value) in the session solves replay attacks. A nonce is valid only once, and the server has to keep track of all the valid nonces. 

The best solution against it is not to store this kind of data in a session, but in the database. In this case store the credit in the database and the logged_in_user_id in the session.

#### 2.7 Session Fixation

Apart from stealing a user's session id, the attacker may fix a session id known to him. This is called session fixation. 

He gets a legal session id, then runs a JS from the domain ofthe target web app to set the cookie (`<script>document.cookie="_session_id=16d5b78abb28e3d6206b60f22a03c8d9";</script>`). 

#### 2.8 Session Fixation – Countermeasures

The most effective countermeasure is to issue a new session identifier and declare the old one invalid after a successful login. That way, an attacker cannot use the fixed session identifier. This is a good countermeasure against session hijacking, as well.

	reset_session

#### 2.9 Session Expiry

One possibility is to set the expiry time-stamp of the cookie with the session id. However the client can edit cookies that are stored in the web browser so expiring sessions on the server is safer. Here is an example of how to expire sessions in a database table. Call Session.sweep("20 minutes") to expire sessions that were used longer than 20 minutes ago.

	class Session < ActiveRecord::Base
	  def self.sweep(time = 1.hour)
	    if time.is_a?(String)
	      time = time.split.inject { |count, unit| count.to_i.send(unit) }
	    end
	 
	    delete_all "updated_at < '#{time.ago.to_s(:db)}'"
	  end
	end

If someone consistently updates his browser to get around the `updated_at` feature, then modify it or add `created_at`.

## 3 Cross-Site Request Forgery (CSRF)

This attack method works by including malicious code or a link in a page that accesses a web application that the user is believed to have authenticated. If the session for that web application has not timed out, an attacker may execute unauthorized commands.




























