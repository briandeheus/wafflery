var fs     = require('fs');
var format = require('util').format;

exports.component = function (name) {

	var cwd  = process.cwd();
	var cfg  = require(cwd + '/waffle.json');
	var cdir = cwd + '/app/components/' + name;

	cfg.components.push(name);
	fs.mkdirSync(cdir);
	fs.writeFileSync(cdir + '/index.js', '');
	fs.writeFileSync(cdir + '/style.less', '');
	fs.writeFileSync(cwd + '/waffle.json', JSON.stringify(cfg, null, '\t'));

}

exports.view = function (name) {

	var cwd  = process.cwd();
	var cfg  = require(cwd + '/waffle.json');
	var vdir = cwd + '/app/views/' + name;
	var vtmp = '<div id="%sView" class="view">\r\n</div>'
	var vjs  = 'var waffle = require(\'waffle-app\');\r\nvar view = waffle.addView(\'%s\', document.getElementById(\'%sView\'));'

	cfg.views.push(name);
	fs.mkdirSync(vdir);
	fs.writeFileSync(vdir + '/index.js', format(vjs, name, name));
	fs.writeFileSync(vdir + '/style.less', '');
	fs.writeFileSync(vdir + '/' + name + '.html', format(vtmp, name));
	fs.writeFileSync(cwd + '/waffle.json', JSON.stringify(cfg, null, '\t'));
	
}