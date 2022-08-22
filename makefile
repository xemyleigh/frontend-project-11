develop:
	npx webpack serve

install:
	npm ci

build:
	rm -rf dist
	sass ./src/styles/scss/custom.scss ./dist/style.css
	NODE_ENV=production npx webpack

test:
	npm test

lint:
	npx eslint .

.PHONY: test