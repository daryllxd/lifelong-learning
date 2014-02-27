# Solid OOD

Your application will change. How's that gonna work for you?

In a rigid app, everything is connected to everything else. Any change you make causes a cascade.

Fragile apps are rigid but you can't tell by looking. Distant and apparently unrelated code might change.

Immobile apps mean that code is hopelessly entangled and you can't reuse anything. So you just duplicate the files anyway.

Viscous apps mean that it's just easier to edit the whole thing as opposed to how the app designer designed it.

Dependencies are killing you, design can fix you. There is always a time where "you are better off just doing design", much like TDD.

__If you think your application will succeed, design will pay off.__

__Single Responsibility:__ There should neve be more than one reason for a class to change.

__Open/Closed:__ A module should be open for extension but closed for modification (which seems impossible).

__Liskov Substitution:__ Subclasses should be substitutable for their base classes.

__Interface Segregation:__

__Dependency Inversion:__ Depend upon abstractions, not upon concretions.

They shared the theme of managing the dependencies of your application. It means the application has minimum entanglements of each other.

Design is all about Dependencies. If you refer to something, you depend on it. When the things you depend on change, you must change.

####To avoid dependencies, your code should be:
- Loosely coupled
- Highly cohesive: A class should be about one thing.
- Easily composable: App should be made of context-independent objects that you can rearrange.
- Context independent.

#### Interface Segregation.

When you deal with another class, you need to have this interface (for C++ and Java) in between.

In Ruby (dynamic language), in this language your dependency on the other object means you depend on the signature of the method, otherwise its a duck.

#### Liskov Substitution

If you make a class Foo, and you create a subclass Foolish, any place you can put a Foo, you can substitute a Foolish. __Any time you have to ask `is_a?, kind_of?`, you have violated this rule and you have created a dependency.__

If they violate the contract the superclass has, it's not that kind of thing.

#### Coding

__Only mock classes I own.__

__Don't mock/stub the object under test.__

App: Get a CSV file from an FTP server, we want to get that file from the server and put it in our database.

We have test data, an FTP server with configurations on it, and an Active Record target.

> PatentJobSpec

    describe PatentJob do
        it 'should download the csv file from the ftp server'

        it 'should replace the existing patents with new patents'
    end

> Make sure you get the thingie from the server.

    it 'should download the csv file from the ftp server' do
        @job = PatentJob.new
        f = File.read(@job.download_file)
        f.should have(250).characters
        f.include?("just 3 minutes").should be_true
    end

> Make sure it ends up in the database.

    if 'should replace existing patents with new patents' do
        @job = PatentJob.new
        @job.run
        Patent.find(:all).should have(3).rows
        Patent.find_by_name('Anti-Gravity Simulator').should_be....
        Patent.find_by_name('Exo-Skello Jello').should_be....
        Patent.find_by_name('Nap Compressor').should_be....
    end

> PatentJob. Simplest possible implementation.
    
    class PatentJob
        def run
            temp = download_file
            rows = parse(temp)
            update_patents(rows)
        end

        def download_file=

        def parse(temp)=

        def update_patents(rows)=
    end

> Expanded `download_file` method. Tests passed at that point.

    def download_file
        temp = Tempfile.new('patents')
        tempname = temp.path
        temp.close
        Net::FTP.open('localhost', 'foo', 'foopw') do |ftp|
            ftp.getbinaryfile('Public/prod/patents.csv', tempname)
        end
        tempname
    end

#### The code works, and it is the simplest possible implementation, but this code won't tolerate change.
- I have to download the file every time I do the test (lol).
- We're fucked if the ftp host/login/password chagnes.
- What if I need to create another job like this?
- What if I don't want to ftp a file in every test?

__Resistance is a resource. In your personal life, with your children and your dog. It's information you didn't have. You can push back, or you can listen to it. So I can't articu__
