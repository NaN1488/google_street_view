# -*- encoding: utf-8 -*-
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'GoogleStreetView/version'

Gem::Specification.new do |gem|
  gem.name          = "GoogleStreetView"
  gem.version       = GoogleStreetView::VERSION
  gem.authors       = ["NaN1488, Nahuel Sciaratta"]
  gem.email         = ["nahuelsciaratta@gmail.com"]
  gem.description   = %q{Google Street View generator}
  gem.summary       = %q{cut images and generate javascript code for you}
  gem.homepage      = ""

  gem.add_development_dependency 'rmagick'


  gem.files         = `git ls-files`.split($/)
  gem.executables   = gem.files.grep(%r{^bin/}).map{ |f| File.basename(f) }
  gem.test_files    = gem.files.grep(%r{^(test|spec|features)/})
  gem.require_paths = ["lib"]
end
