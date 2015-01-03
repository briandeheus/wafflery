wafflery
========

Wafflery bakes one-page apps and provides you with a small utility to bootstrap and load your application in the browser or Cordova/Phonegap application.

# Installation
`npm install -g wafflery`

# Getting Started
1. Make a new directory
2. Run: `wafflery init`
3. Serve some waffles: `wafflery serve`
4. Go to localhost:1337/loader and see the magic. There is nothing. I know.
5. Use the -p or -h arguments to set a port or host respectively

# Serving waffles as a daemon
Run `wafflery serve --daemon` to run Wafflery as a daemon. You can use -p and -h to set the port or host respectively.

Run `wafflery serve --stop` to stop serving waffles.

# Wafflery 101

Wafflery contains a server which builds your application and a small loader that takes care of downloading bootstrapping your application. You don't have to to use the loader, but it helps with getting started. The entry point for browserify is `app/waffle-loader`.

## Using the Client Loader

1. The browser makes a request to localhost:1337/loader
2. Wafflery replies with all the files that can be found in the `loader/` directory.
3. This loader contains a script to fetch javascript, html and css from the server.
4. The server builds these files using Browserify from the `app/` directory.

## URL endpoints

Wafflery exposes the following endpoints

### /loader

This builds and loads the files in the "loader" directory. 

### /js

This returns all the JS in your app directory

### /js/version

Returns the current version of your JS files. This is a crc32 hash of all the JS files under the app/ directory.

### /css

This returns all the CSS that can be found in your app directory. Waffle supports LESS by default.

### /css/version

Returns the current version of your LESS files. This is a crc32 hash of all the LESS files under the app/ directory.

### /html

This returns all the HTML from your component and views directory

### /html/version

This returns all the HTML from your component and views directory.

## CLI Commands

### Initializing the project
1. `wafflery init`

### Adding Views
1. `wafflery add view <viewname>`

### Adding Components
1. `wafflery add component <component name>`

### Serving files using wafflery
1. `wafflery serve`, optional -p and -h arguments to select a port and hostname/ip address to bind to.

## Other

### waffle.json
These contain settings that are loaded into the browser and are used for the loader to know where Wafflery is serving pages.