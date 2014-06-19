### 66: Custom Rake Tasks

##### Hello world
    task :greet do
      puts "hello wordl"
    end

##### Dependency
    task :ask => [:greet] do
      puts "hello wordl"
    end

##### Load your Rails environment
    task :ask => [:greet] do
      puts "hello wordl"
    end

### 136: Jquery-Ajax-Revised [TODO]

jquery-ujs: Unobstrusive JS, no more inline JS.

Dev tools: Check Resource tab to see if JS is included, Network to see what actually happens.

Create

### 332: RefineryCMS Basics

It uses Rails and you can create an existing one on it, or not.

	$ brew install imagemagick # IM is dependency
	$ gem install refinerycms
	$ refinerycms piano_plus # generate full rails app.
	$ cd piano_plus
	$ rails s

- Register a new user to sign them up.
- Refinery dashboard appears. (You can reorder the menu.)
- There is a content editing thingie there.

Refinery goodies:

	routes.rb # mounts Refinery tehre
	initializers/refinery # customizable stuff, such as for the company name
	layout.css.sass # styling
	You can actually edit the content already hehehe.
	Style design by adding some shit.

In pages, you can add a new "page parts".

	Refinery::Page.first.parts.create! title: "Banner"

### 357: Adding-SSL [TODO]

How do we set up a secured connection in production?

Pow gives your app a consistent domain name so we don't use `localhost:3000` to launch the app.

Nginx

	$ brew install nginx
	$



### 373: Zero-downtime-deployment [TODO]

	sleep 10
	$ cap deploy # restarts the app

