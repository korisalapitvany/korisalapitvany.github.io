build:
	mkdir -p logo/svg
	mkdir -p images/icons
	# The cleanupIDs plugin messes with the leaves.
	svgo -i src/logo -o logo/svg --disable=cleanupIDs
	svgo -i src/images -o images
	svgo -i src/images/icons -o images/icons --enable=removeTitle

all: build
