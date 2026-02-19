.PHONY: dev build test lint format typecheck storybook build-storybook chromatic

dev:
	npm run dev

build:
	npm run build

test:
	npm run test

test-watch:
	npm run test:watch

test-coverage:
	npm run test:coverage

lint:
	npm run lint

format:
	npm run format

typecheck:
	npm run typecheck

storybook:
	npm run storybook

build-storybook:
	npm run build-storybook

chromatic:
	npm run chromatic
