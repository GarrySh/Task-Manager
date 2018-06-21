install:
	yarn install

publish:
	yarn publish

lint:
	yarn run eslint .

clear:
	rm -rf dist
	rm -rf node_modules
	rm db.development.sqlite

test:
	yarn run test

start: app.start

test.watch:
	yarn jest --watch

app.build:
	yarn run install

app.watch:
	DEBUG='app, flash_middleware' yarn nodemon --exec yarn gulp browser-sync

app.debug: app.build
	DEBUG='*' yarn run start

app.start: 
	yarn run start

app.init: app.build db.init

app.console:
	yarn console

db.init:
	yarn run initDb

db.clear:
	rm db.development.sqlite
	yarn run initDb
