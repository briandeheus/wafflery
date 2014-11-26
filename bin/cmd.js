#!/usr/bin/env node

var program = require('commander');
var pkg     = require('../package.json');
var logger  = require('../lib/logger');
var add     = require('../lib/add');
var build   = require('../lib/build');
var cwd     = process.cwd();

program
  .version(pkg.version);

program
	.command('init')
	.description('Initialize a new Wafflery')
	.action(function(options){

		require('../lib/init')();

	});

program
	.command('serve')
	.description('Serves your waffle to hungry clients')
	.option('-p, --port [port]', 'Port to run on e.g 1337')
	.option('-h, --host [host]', 'Address to listen on e.g 127.0.0.1')
	.action(function(options){

		require('../server')(options);

	});

program
	.command('add [type]')
	.description('Add a view or component')
	.option('-n, --name [name]', 'Name of the view or component to add')
	.action(function(type, options){

		try {

			var config = require(cwd + '/waffle.json');

		} catch (e) {

			logger.error('No Waffle config file found. Run mofos init to create a Mofos config file.')
			return;

		}
		
		switch (type) {

			case 'view':
				add.view(options.name);
				build.appLoader(config);
			break;

			case 'component':
				add.component(options.name);
				build.appLoader(config);
			break;

			default:
				logger.error('Unknown type:', type);
			break;

		}

	});

program.parse(process.argv);