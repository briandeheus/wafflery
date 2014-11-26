var fs         = require('fs');
var browserify = require('browserify');
var format     = require('util').format;
var glob       = require('glob');
var async      = require('async');
var less       = require('less');

var logger     = require('./logger');

exports.loader = function () {

	var appdir      = process.cwd() + '/app';
	var loaderdir   = process.cwd() + '/loader';
	var loaderjs    = format('<script>%s</script>\r\n', fs.readFileSync(loaderdir + '/index.js').toString());
	var loaderstyle = format('<style>%s</style>\r\n', fs.readFileSync(loaderdir + '/style.less').toString());
	var loaderhtml  = fs.readFileSync(loaderdir + '/loader.html').toString();
	var builtLoader = format('%s\r\n%s\r\n\%s', loaderstyle, loaderhtml, loaderjs);
	var settings    = fs.readFileSync(process.cwd() + '/waffle.json').toString();

	var page = fs.readFileSync(appdir + '/page.html').toString().replace('{{loader}}', builtLoader);
	page     = page.replace('{{settings}}', settings);

	return page;
	
}

exports.waffle = function (cb) {

	var waffle = '';

	glob(__dirname + "/../client/waffle/*.js", {}, function (error, files) {
		
		if (error) {

			cb(error);
			return;

		}

		async.forEach(files, function (file, nextFile) {

			waffle += fs.readFileSync(file).toString() + '\r\n';
			nextFile();

		}, function (error) {

			cb(error, waffle);

		});

	});

}

exports.js = function (cb) {

	var appdir = process.cwd() + '/app';
	var b      = browserify({
		 paths: [appdir + '/node_modules', appdir]
	});

	b.add(process.cwd() + '/app/waffle-loader.js');
	b.bundle(function (error, result) {

		if (error) {

			cb(error);
			return;

		}

		cb(null, result);

	});

}

exports.css = function (cb) {

	var css = '';

	glob(process.cwd() + "/app/**/*.less", {}, function (error, files) {

		if (error) {

			cb(error);
			return;

		}

		async.forEach(files, function (file, nextFile) {

			var file = fs.readFileSync(file).toString();
			
			less.render(file, function (error, resultString) {

				if (error) {
					cb(error);
					return;
				}

				css += resultString.css;
				nextFile();

			});


		}, function (error) {

			cb(error, css);

		});

	});
}

exports.appLoader = function (cfg) {

	var appdir = process.cwd() + '/app';
	var loader = 'var waffle = require(\'waffle-app\')\r\n';

	var componentTemplate = 'waffle.addModule(\'%s\', require(\'components/%s\'));\r\n'
	var viewTemplate      = 'require(\'views/%s\');\r\n'
	var dialogTemplate    = 'require(\'dialogs/%s\');\r\n'

	for (var i = 0, l = cfg.components.length; i < l; i++) {
		loader += format(componentTemplate, cfg.components[i], cfg.components[i]);
	}

	for (i = 0, l = cfg.views.length; i < l; i++) {
		loader += format(viewTemplate, cfg.views[i]);
	}

	for (i = 0, l = cfg.dialogs.length; i < l; i++) {
		loader += format(dialogTemplate, cfg.views[i]);
	}

	loader += 'waffle.setup()';
	
	try {
		fs.writeFileSync(appdir + '/waffle-loader.js', loader);
	} catch (e) {
		logger.error('Could not write a waffle loader!', e);
	}

}

exports.views = function (cb) {

	var views = '';

	glob(process.cwd() + "/app/views/**/*.html", {}, function (error, files) {
		
		if (error) {

			cb(error);
			return;

		}

		async.forEach(files, function (file, nextFile) {

			views += fs.readFileSync(file).toString() + '\r\n';
			nextFile();

		}, function (error) {

			cb(error, views);

		});

	});

}