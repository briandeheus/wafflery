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
	
	//Make waffle app
	fs.writeFile(appdir + '/waffle-loader.js', '');
	fse.copySync(root + '/client/loader', cwd + '/loader');
	fse.copySync(root + '/client/page.html', appdir + '/page.html');
	fse.copySync(root + '/client/waffle.json', cwd + '/waffle.json');

	logger.info('Wafflery initialized!');
	logger.info('Be sure to set your host in waffle.json');
	logger.info('');
	logger.info('♥');


}