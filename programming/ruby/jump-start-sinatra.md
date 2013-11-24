configure?

configure :production do

dynamic settings
	
	set :name, "Frank"
	settings.name to access
	set(:image_folder){ :root + '/images'} to be updatable
	set(:dice_roll){1 + rand(5)} random thingie

sessions in configure block

	heroku run console parang irb sa heroku

	def current?(path='/')
    	(request.path==path || request.path==path+'/') ? "current" : nil
	end

checks if this is the active path or not, then you can add it in the css

flash data?

pony for sending email. in heroku, SendGrid.