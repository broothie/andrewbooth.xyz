
serve:
	fileserver

sass:
	sass --watch src/scss/style.scss:assets/css/style.css

html:
	filewatcher 'index.mustache.html site.yml' 'ruby mustache.rb'
