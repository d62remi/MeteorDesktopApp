var argv = require('optimist').argv;
var NwBuilder = require('nw-builder');
detectCurrentPlatform = require('nw-builder/lib/detectCurrentPlatform.js');
require('./lib/nwFolder');

myPlatform = detectCurrentPlatform();

nwjsVersion = '0.12.3';

var nw = new NwBuilder({
    files: 'nw-app/*.*', // use the glob format
    version: nwjsVersion,
    platforms: [myPlatform]
});


nw.run().then(function () {
   console.log('all done!');
}).catch(function (error) {
    console.error(error);
});
