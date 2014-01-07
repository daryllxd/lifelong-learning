Base URI
Media type
HTTP methods/verbs
HATEOAS gonna hate

 You want only one entry point


 scope "/api/v1 do
   scope "/sweet_cat_pictures" do
   post "/" -> "cats#create"
   get "/" => "cats#index"
   get ":cat_id" => "cats#show"
   put ":cat_id" => "cats#update"

To consumer an API, use ActiveRecord

ApplicationConroller, just include whatever you want to.

So, render json, not render js.

Easier to test because of the entry point thingie.
