require 'mustache'
require 'yaml'

template = File.read('index.mustache.html')
data = YAML.load_file('site.yml')

html = Mustache.render(template, data)
File.write('index.html', html)
puts "Wrote #{html.length} to index.html"
