# WordPress the Missing Manual

Themes - separate content from layout.

Hosting - Free wordpress.com service. Or install WP on your web host's server and build your site there.

Wordpress.org = web address

Pay for: web address, editing fonts, space for files/hosted video.


Self-hosted sites: Pay for host, back up regularly, buy domain, more themes, more widgets/plugins, host videos on YT.

## Installing WP on Your Web Host

Notes: Need to support PHP 5.2.4, MySQL 5.0.

Strategies: Root folder, subfolder, subdomain.

Installing WP with an AutoInstaller: Fantastico/Softaculous.

By hand:

### Create Database

1. Create a MySQL database for WP to use. This usually has a suffix or something of `wp`.
2. Add a new database user.
3. Register your user name with the database.

### Upload FIles

1. Go to `wordpress.org/download`.
2. Figure out the FTP address you need to use and load the FTP program and navigate to your site.
3. Type user name and password.
4. Browse to root folder and delete the `index.html` thing.

### Run Installation Script
1. To start the installation, type the web address where you installed Wordpress, and then add `/wp-admin/install.php` to the end.
2. Create a Configuration file.
3. Fill in the database details. Pick table prefix.
4. Run install and fill in site stuff.
5. Click Install WP to finish the job.

### Choosing a Theme

