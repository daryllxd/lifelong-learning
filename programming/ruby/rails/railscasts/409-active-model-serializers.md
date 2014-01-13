## Active Model Serializers

Each article has many comments. I want to provide a JSON API to the view. So I add the `format.json` when I request a json.

Things become messy. We add `gem 'active_model_serializer'` by doing

	$ rails g serializer article
		create app/serializers

Now we have hooks and stuff. So we will find the serializers and shit.

>article_serializer.rb

	class ArticleSerializer < ActiveModel::Serializer
		attributes :id, :name, :content # we choose what we want to show.
	end

>articles_controller.rb

	def show
		@article = Article.find(params[:id])
		respond_to do |format|
			format.html
			format.json { render json: @article } # if you add this, then there will be a node in the json format which is the "Article":  which surrounds the entire article JSON representation.
			format.json { render json: @article, root: false} # this removes the option
	end

However, you can remove having the render the `root: false` by just setting up the default serializer.

>articles_controller.rb

	def default_serializer_options
		{root: false}
	end

Let's say we want to have something that is not in the model, such as the url. We can avoid a delegation to the model by creating a method:

	class ArticleSerializer < ActiveModel::Serializer
		attributes :id, :name, :content, __:url__

		def url
			article_url(object) #references the object passed in
		end
	end

It also has support for associations.

	class ArticleSerializer < ActiveModel::Serializer
		attributes :id, :name, :content, __:url__

		has_many :comments

We can customize the comment serializer

>comments_serializer.rb

	class CommentSerializer < ActiveModel::Serializer
		attribues :id, :content
	end

You can also flatten the thing for efficiency purposes, by doing the `embed`.

[TODO]












