build:
	mkdir -p images/icons logo/svg css js
	svgo -i src/images -o images
	svgo -i src/images/icons -o images/icons --enable=removeTitle
	# The cleanupIDs plugin messes with the leaves.
	svgo -i src/logo -o logo/svg --disable=cleanupIDs
	# Install Jekyll to vendor/bundle.
	bundle install --path vendor/bundle

watch: build
	scss --watch src/scss/main.scss:css/main.css

all: build
