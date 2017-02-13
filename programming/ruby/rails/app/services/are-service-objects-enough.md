## Are Service Objects Enough?
[link](https://blog.ragnarson.com/2016/10/19/are-service-objects-enough.html)

- Add logic to an existing service object--do we create another service object and run it after the first one or process it within the initial one? If we want to get some data from the service object after it does its job, should we create a method or a return value from the main method? Should service objects even return something?

Command object from the controller that can call many service objects.

Return value: broadcasting events, like the `wisper` gem.

    class User::Register
      include Wisper::Publisher

      def call(email)
        return broadcast(:invalid) if email.blank?
        user = User.create!(email: email)
        broadcast(:ok, user.id)
      end

      def create
        register_user = User::Register.new
        register_user.on(:invalid) do
          @user = User.new
          render :new
        end

#### Comments

- `wisper` gem introduces too much magic and non-conventional flow. Response PORO objects represent cases when multiple return values are available. Service object returns new Response object that can respond to `success?` or any other needed attributes.
- Try to validate user input in the form objects before calling the service.
