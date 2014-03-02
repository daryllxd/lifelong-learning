## Deploying to a VPS 

For a reasonable monthly amount VPSes such as Linode or Webbynode give us a decently-sized server that should be perfectly adequate for hosting a small to medium-sized Rails application. 

The tricky part with these services is that you’re pretty much on your own. You’re provided with a blank server and it’s up to you to set it up from scratch.

- OS: Ubuntu 10.04
- Nginx as web server
- Unicorn as Rails app (can use Passenger)
- PostgreSQL db
- rbenv on the server or rvm/compile ruby from source

Steps

1. __Create application to deploy.__
    
        $ rails new blog -d postgresql
        $ raisl g scaffold name content:text

2. __Configure a Linode VPS.__ Rebuild server, selecting Ubuntu 10.04 LTS and enterring a root password.

    Once the server has booted we can use the ssh command to log into the server.

        $ ssh root@178.xxx.xxx.xxx

3. __Connected to server.__

        # Update packages to the latest version
        root@li349-144:~# apt-get update 

        # Install packages that might come useful later.
        root@li349-144:~# apt-get -y install curl git-core python-software-properties 

        # Install Nginx.
        root@li349-144:~# add-apt-repository ppa:nginx/stable
        root@li349-144:~# apt-get update
        root@li349-144:~# apt-get -y install nginx
        root@li349-144:~# service nginx start
        Starting nginx: nginx.

    When you see __Welcome to nginx__ it's working.

4. __Installing PostgreSQL__.
    
        # Install via repository to get latest version
        root@li349-144:~# add-apt-repository ppa:pitti/postgresql

        root@li349-144:~# apt-get update
        root@li349-144:~# apt-get install postgresql libpq-dev

        root@li349-144:~# sudo -u postgres psql

[TODO]



    


