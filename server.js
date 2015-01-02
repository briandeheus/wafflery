var util   = require('util');
var fs     = require('fs');
var app    = require('express')();
var logger = require('./lib/logger');
var build  = require('./lib/build');
var crc    = require('crc');

app.get('/js', function (req, res) {

	var then = Date.now();
	build.js(function (error, js) {

		if (error) {
			logger.error('Failed to bake a JS waffle', error.message);
			res.status(500)
			res.end();
			return;
		}

		logger.info('Baked a JS waffle in', Date.now() - then, 'ms');
		res.status(200);
		res.send(js);

	});

});

app.get('/js/version', function (req, res) {

	var then = Date.now();
	build.js(function (error, js) {

		if (error) {
			logger.error('Failed to bake a JS hash', error.message);
			res.status(500)
			res.end();
			return;
		}

		var hash = crc.crc32(js).toString(16);
		res.send(hash);

	});

});

app.get('/css', function (req, res) {

	var then = Date.now();
	build.css(function (error, css) {

		if (error) {
			logger.error('Failed to bake a CSS waffle', error);
			res.status(500)
			res.end();
			return;
		}

		logger.info('Baked a CSS waffle in', Date.now() - then, 'ms');
		res.status(200);
		res.send(css);

	});

});

app.get('/css/version', function (req, res) {

	var then = Date.now();
	build.css(function (error, css) {

		if (error) {
			logger.error('Failed to bake a CSS hash', error);
			res.status(500)
			res.end();
			return;
		}

		var hash = crc.crc32(css).toString(16);
		res.send(hash);

	});

});


app.get('/html', function (req, res) {

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

app.get('/html/version', function (req, res) {

	var then = Date.now();
	build.views(function (error, views) {

		if (error) {
			logger.error('Failed to bake a Views hash', error);
			res.status(500)
			res.end();
			return;
		}

		var hash = crc.crc32(views).toString(16);
		res.send(hash);

	});

});

module.exports = function (options, config) {

	var host = options.host;
	var port = options.port;

	if (!options.port) {
		port = 1337;
	}

	if (!options.host) {
		host = 'localhost';
	}

	app.get(config.loader, function (req, res) {

		var loader = build.loader();
		res.status(200);
		res.send(loader);

	});

	var server = app.listen(port, host, function () {

	  logger.info('Wafflery is now serving waffles on', util.format('http://%s:%s', host, port));

	});

};

if (process.argv[2] === 'daemon') {

	var options = JSON.parse(process.argv[3]);
	var config  = JSON.parse(process.argv[4]);

	module.exports(options, config);

}