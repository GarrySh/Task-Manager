install:
	yarn install

test:
	yarn run test

start: build
	NODE_ENV=production yarn run start

publish:
	yarn publish

lint:
	yarn run eslint .

build:
	rm -rf dist
	yarn run build

clear:
	rm -rf dist
	rm -rf node_modules

watch:
	DEBUG='app' yarn nodemon --exec yarn gulp browser-sync

debug: build
	NODE_ENV=development DEBUG='*' yarn run start
