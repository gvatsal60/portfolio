# Default target
.DEFAULT_GOAL := help

help: ## Show this help message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'


.PHONY: all help test clean

# Makefile for Jekyll site
# This Makefile is used to build and serve a Jekyll site.

# It defines the source and destination paths for the site,
# and provides targets for building, serving, and cleaning the site.
# The default target is to build the site and serve it with live-reload.
# The clean target removes the generated site files and caches.
# The test target is a placeholder for running tests, but is not implemented.
# The Makefile uses the Jekyll build command to generate the site,
# and the bundle command to manage dependencies.

# The source path is set to ./src and the destination path is set to ./_site.
SRC_PATH := ./src
DEST_PATH := ./_site

# Bundle install command
BUNDLE_INSTALL := bundle install
# Jekyll build command
JEKYLL_BUILD := bundle exec jekyll build --incremental --source $(SRC_PATH) --destination $(DEST_PATH)
# Jekyll serve command
JEKYLL_SERVE := bundle exec jekyll serve --incremental --source $(SRC_PATH) --destination $(DEST_PATH)

# Default target to build and serve the site
all: serve ## Build and serve the Jekyll site

install: ## Install dependencies
	@echo "Installing dependencies..."
	@$(BUNDLE_INSTALL)
	@echo "Dependencies installed."

build: install ## Build the Jekyll site
	@echo "Building Jekyll site..."
	@$(JEKYLL_BUILD)
	@echo "Build complete."

serve: install ## Serve the Jekyll site with live-reload
	@echo "Serving Jekyll site..."
	@$(JEKYLL_SERVE)

test: install ## Run tests
	@echo "Running tests..."
	@echo "No tests implemented yet."
	@echo "Tests complete."

clean: ## Clean up generated files
	@echo "Cleaning up..."
	@rm -rf _site
	@rm -rf .jekyll-cache
	@rm -rf .jekyll-metadata
	@rm -rf .sass-cache
	@rm -rf .jekyll-cache
	@rm -rf .jekyll-metadata
	@rm -rf .sass-cache
	@rm -rf Gemfile.lock
	@echo "Clean complete."
