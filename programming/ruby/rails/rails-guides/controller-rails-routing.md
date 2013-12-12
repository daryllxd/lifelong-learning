## The Purpose of the Rails Router

When your Rails application receives an incoming request for:

	GET /patients/17 is interpreted as
	get '/patients/:id', to: 'patients#show'

Jutsu

	get '/patients/:id', to: 'patients#show', as: 'patient'

	# controller
	@patient = Patient.find(17)

	# view
	<%= link_to 'Patient Record', patient_path(@patient) %>

You are able to generate `patients/17`

## Resource Routing: the Rails Default

	resources :photos

This creates seven routes for your model.
	
	HTTP verb	PATH 				Action 	Used for
	GET 		/photos				index	display a list of all photos
	GET 		/photos/new			new		return an HTML form for creating a new photo
	POST 		/photos				create	create a new photo
	GET 		/photos/:id			show	display a specific photo
	GET 		/photos/:id/edit	edit	return an HTML form for editing a photo
	PATH/PUT 	/photos/:id			update	update a specific photo
	DELETE 		/photos/:id			destroy	delete a specific photo

#### Path and URL Helpers

These paths are created, too.

- `photos_path` returns /photos
- `new_photo_path` returns /photos/new
- `edit_photo_path(:id)` returns /photos/:id/edit (for instance, `edit_photo_path(10)` returns /photos/10/edit)
- `photo_path(:id)` returns /photos/:id (for instance, photo_path(10) returns /photos/10)

#### Singular Resources [TODO]

#### Controller Namespaces and Routing [TODO]

#### Nested Resources

These models can become:

	class Magazine < ActiveRecord::Base
	  has_many :ads
	end
	 
	class Ad < ActiveRecord::Base
	  belongs_to :magazine
	end

	resources :magazines do
	  resources :ads
	end	

	GET			/magazines/:magazine_id/ads				index	display a list of all ads for a specific magazine
	GET			/magazines/:magazine_id/ads/new			new		return an HTML form for creating a new ad belonging to a specific magazine
	POST		/magazines/:magazine_id/ads				create	create a new ad belonging to a specific magazine
	GET			/magazines/:magazine_id/ads/:id			show	display a specific ad belonging to a specific magazine
	GET			/magazines/:magazine_id/ads/:id/edit 	edit	return an HTML form for editing an ad belonging to a specific magazine
	PATCH/PUT	/magazines/:magazine_id/ads/:id			update	update a specific ad belonging to a specific magazine
	DELETE		/magazines/:magazine_id/ads/:id			destroy	delete a specific ad belonging to a specific magazine

Avoid deep nesting. You can do this by generating the smallest data only, so that you can't edit. Ex:

	resources :posts do
	  resources :comments, only: [:index, :new, :create]
	end
	resources :comments, only: [:show, :edit, :update, :destroy]

No editing of comments, just creating, and you can view the comment itself also. The shorthand is:

	resources :posts do
	  resources :comments, shallow: true
	end

[TODO]

