var build  = require('./build');
var logger = require('./logger');
var crc    = require('crc');

module.exports = function (type, options) {

	switch (type) {

		case 'loader' :
			console.log(build.loader());	
		break;

		case 'js-version':

			build.js(function (error, js) {

				if (error) {
					logger.error('Failed to bake a JS hash', error.message);
					return;
				}

				var hash = crc.crc32(js).toString(16);
				console.log(hash);

			});

		break;

		case 'js':

			build.js(function (error, js) {

				if (error) {
					logger.error('Failed to bake a JS hash', error.message);
					return;
				}

				console.log(js.toString());

			});

		break;

		case 'css-version':

			build.css(function (error, css) {

				if (error) {
					logger.error('Failed to bake a CSS hash', error.message);
					return;
				}

				var hash = crc.crc32(css).toString(16);
				console.log(hash);

			});

		break;

		case 'css':

			build.css(function (error, css) {

				if (error) {
					logger.error('Failed to bake a CSS hash', error.message);
					return;
				}

				console.log(css);

			});

		break;

		case 'views-version':

			build.views(function (error, js) {

				if (error) {
					logger.error('Failed to bake a views hash', error.message);
					return;
				}

				var hash = crc.crc32(js).toString(16);
				console.log(hash);

			});

		break;

		case 'views':

			build.views(function (error, views) {

				if (error) {
					logger.error('Failed to bake views', error.message);
					return;
				}

				console.log(views);

			});

		break;

	}


}