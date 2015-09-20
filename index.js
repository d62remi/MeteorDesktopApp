optimist = require('optimist');
argv = optimist
            .usage('defined help section')
            .argv;

if (argv.h || argv.help) {
    optimist.showHelp();
    process.exit(0);
}

detectCurrentPlatform = require('nw-builder/lib/detectCurrentPlatform.js');
myPlatform = detectCurrentPlatform();

require('./lib/nwFolder');

nwjsVersion = '0.12.3';

switch (argv._[0] || '') {
  case 'run':
    require('./lib/run');
    break;
  case 'build':
    require('./lib/build');
    break;
  default:
    require('./lib/run');
}
