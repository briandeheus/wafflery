var util   = require('util');
var fs     = require('fs');
var app    = require('express')();
var logger = require('./lib/logger');
var build  = require('./lib/build');

app.get('/', function (req, res) {

	var loader = build.loader();
	res.status(200);
	res.send(loader);

});

app.get('/js', function (req, res) {

	var then = Date.now();
	build.js(function (error, js) {

		if (error) {
			logger.error('Failed to bake a JS-flavored waffle', error);
			res.status(500)
			res.end();
			return;
		}

		logger.info('Baked a JS-flavored waffle in', Date.now() - then, 'ms');
		res.status(200);
		res.send(js);

	});

});

app.get('/styles', function (req, res) {

	var then = Date.now();
	build.css(function (error, css) {

		if (error) {
			logger.error('Failed to bake a CSS-flavored waffle', error);
			res.status(500)
			res.end();
			return;
		}

		logger.info('Baked a CSS-flavored waffle in', Date.now() - then, 'ms');
		res.status(200);
		res.send(css);

	});

});

app.get('/views', function (req, res) {

	var then = Date.now();
	build.views(function (error, views) {

		if (error) {
			logger.error('Failed to bake a View waffle', error);
			res.status(500)
			res.end();
			return;
		}

		logger.info('Baked a View waffle in', Date.now() - then, 'ms');
		res.status(200);
		res.send(views);

	});

});

module.exports = function (options) {

	var host = options.host;
	var port = options.port;

	if (!options.port) {
		port = 1337;
	}

	if (!options.host) {
		host = 'localhost';
	}

	var server = app.listen(port, host, function () {

	  logger.info('Wafflery is now serving waffles on', util.format('http://%s:%s', host, port));

	});

};