var fs     = require('fs');
var fse    = require('fs-extra');
var build  = require('./build');
var logger = require('./logger');

module.exports = function () {

	logger.info('Building new Wafflery');

	var cwd    = process.cwd();
	var appdir = cwd + '/app';
	var root   = __dirname + '/..';

	//Make dirs
	fs.mkdirSync(cwd + '/loader');
	fs.mkdirSync(appdir);
	fs.mkdirSync(appdir + '/views');
	fs.mkdirSync(appdir + '/components');
	fs.mkdirSync(appdir + '/dialogs');

	//Make waffle app
	build.waffle(function (error, data) {

		fs.writeFile(appdir + '/waffle-app.js', data);
		fse.copySync(root + '/client/loader', cwd + '/loader');
		fse.copySync(root + '/client/page.html', appdir + '/page.html');
		fse.copySync(root + '/client/waffle.json', cwd + '/waffle.json');
		logger.info('Wafflery build!');
		logger.info('Be sure to set your hostname in waffle.json');
		logger.info('');
		logger.info('♥');

	})


}