    Gem::Specification.new do |s|  
      s.name        = 'spellchecker'
      s.version     = '0.1.0'
      s.summary     = "This is a spell checker"
      ...
      s.files       = ["lib/spellchecker.rb"]
      s.add_development_dependency 'testinggem', '~> 2.1'
      s.add_runtime_dependency 'wordsgem', '~> 1.1'
      s.homepage    = 'https://rubygems.org/gems/example'
    end  
