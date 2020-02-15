build:
	bundle install --path vendor/bundle

serve:
	bundle exec jekyll serve --watch

all: build
