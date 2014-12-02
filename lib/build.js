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
			console.log('ERROR:', error);
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