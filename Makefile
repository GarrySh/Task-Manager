install:
	yarn install

test:
	yarn run test

start: build
	yarn run prod
	yarn run start

publish:
	yarn publish

lint:
	yarn run eslint .

dev: build
	yarn run dev
	yarn run start

build:
	rm -rf dist
	yarn run build

clear:
	rm -rf dist
	rm -rf node_modules

webpackDev:
	yarn run dev

watch:
	yarn nodemon --exec make dev
