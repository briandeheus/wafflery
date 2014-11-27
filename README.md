wafflery
========

Wafflery allows you to develop and serve one-page HTML5 apps without having to learn a new framework.

# Installation
`npm install -g wafflery`

# Getting started
1. Make a new directory
2. Run: `wafflery init`
3. Serve some waffles: `wafflery serve`
4. Go to localhost:1337 and see the magic. There is nothing. I know.

## Adding views
1. `wafflery add view --name <viewname>`

## Adding components
1. `wafflery add component --name <component name>`

# Wafflery Internals 101

Wafflery contains two major components. The server which builds your application and the frontend that takes care of downloading and running your application.

## Request flow

1. The browser makes a request to localhost:1337
2. Wafflery replies with all the files that can be found in the `loader/` directory.
3. The loader contains a script to fetch javascript, html and css from the server.
4. The server builds these files using Browserify from the `app/` directory.

## Now what?

Now that your application has been loaded in the browser you can have a component, or a view, call

```
var waffle = require('waffle-app');
waffle.hideLoader();
waffle.showApp();
```

To show your app. You can also do this manually if you want by calling `document.getElementById('loader').style.display = 'none'` and `document.getElementById('app').style.display = 'block'`. `waffle.hideLoader()` and `waffle.showApp()` does exactly the same.

## Views

The `waffle-app` component comes with your application by default. You don't have to use it but it makes it easier to get started developing app. Feel free to integrate Angular, Backbone or Ember or whatever in your project. Wafflery won't judge you. Maybe only behind your back.

### view/view.html

This is the view that gets loaded. When you add a new view

```
<div id="welcomeView" class="view">
</div>

```

It makes a view.html file with the content above. Please create your HTML *inside* the file. Again you don't have to, but for the love of god don't make it so hard on yourself.

`waffle-app` has some magical features that allow you map buttons, input, and variables to your view!

```
<div id="welcomeView" class="view">
	<div data-button="iambutton">Click me!</div>
	<var name="iamvar">hello</var>
</div>
```

### view/index.js

You can tap/click actions on the button like so, in your view/index.js

```
var waffle = require('waffle-app'); //Automatically added
var view = waffle.addView('welcome', document.getElementById('welcomeView'), true); //Automatically added

//ontap automatically determines wether touch events are supported or not.
view.buttons.iambutton.ontap = function () {
	view.setVar('iamvar', 'world'); //Change the content of <var> to 'world'
}

```

# Examples

Super simple example can be found here: [example app 1](https://github.com/briandeheus/wafflery-example-1)

