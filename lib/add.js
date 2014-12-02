var fs     = require('fs');
var format = require('util').format;
var log    = require('./logger');

exports.component = function (name) {

	try {

		var cwd  = process.cwd();
		var cfg  = require(cwd + '/waffle.json');
		var cdir = cwd + '/app/components/' + name;

		cfg.components.push(name);
		fs.mkdirSync(cdir);
		fs.writeFileSync(cdir + '/index.js', '');
		fs.writeFileSync(cdir + '/style.less', '');
		fs.writeFileSync(cwd + '/waffle.json', JSON.stringify(cfg, null, '\t'));

	} catch (e) {

		log.error('Could not add a new component:', e);
		return;
		
	}

	log.info('Component created');

}

exports.view = function (name) {

	try {

		var cwd  = process.cwd();
		var cfg  = require(cwd + '/waffle.json');
		var vdir = cwd + '/app/views/' + name;

		cfg.views.push(name);
		fs.mkdirSync(vdir);
		fs.writeFileSync(vdir + '/index.js',          '');
		fs.writeFileSync(vdir + '/style.less',        '');
		fs.writeFileSync(vdir + '/' + name + '.html', '');
		
		fs.writeFileSync(cwd + '/waffle.json', JSON.stringify(cfg, null, '\t'));

	} catch (e) {

		log.error('Could not add a new view:', e);
		return;

	}

	log.info('View created');

	
}