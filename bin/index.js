#! /usr/bin/env node
var program = require('commander');

program
  .version('0.1.0')

program
  .command('init')
  .description('Initialization of the application')
  .action(function(){
    console.log('init')
    require('../lib/init.js');
  });

program
  .command('run')
  .option("-d, --dev_mode", "Show Dev Tools")
  .description('Run the development environment')
  .action(function(options){
    process.dev_mode = options.dev_mode ? "dev" : "";
    require('../lib/run.js');
  });

program
  .command('build')
  .description('Build the application')
  .option("-d, --output_dir [dir]", "specify the build dir")
  .action(function(){
    console.log('build')
  });

program
  .command('reset')
  .description('Reset the application')
  .action(function(){
    console.log('reset')
  });


program.parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp();
  }
