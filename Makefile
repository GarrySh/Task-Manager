install:
	yarn install

test:
	yarn run test

publish:
	yarn publish

lint:
	yarn run eslint .

clear:
	rm -rf dist
	rm -rf node_modules
	rm db.development.sqlite

app-build:
	yarn run build

app-watch:
	DEBUG='app' yarn nodemon --exec yarn gulp browser-sync

app-debug: app-build
	DEBUG='*' yarn run start

app-start: 
	yarn run start

app-init: app-build db-init

db-init:
	yarn sequelize db:migrate
