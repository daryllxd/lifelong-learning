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