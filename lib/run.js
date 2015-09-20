var NwBuilder = require('nw-builder');


var nw = new NwBuilder({
    files: 'nw-app/*', // use the glob format
    version: nwjsVersion,
    platforms: [myPlatform]
});

process.env.ENVIRON = 'dev';
nw.run().then(function () {
   console.log('all done!');
}).catch(function (error) {
    console.error(error);
});
