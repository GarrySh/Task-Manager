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

watch:
	yarn run watch

build:
	rm -rf dist
	yarn run build

clear:
	rm -rf dist
	rm -rf node_modules

dev:
	yarn run dev