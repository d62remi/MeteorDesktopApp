var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var NwBuilder = require('nw-builder');
detectCurrentPlatform = require('nw-builder/lib/detectCurrentPlatform.js');
myPlatform = detectCurrentPlatform();
require('colors');


var curDir = process.cwd();
var mdaDir = path.join(curDir,'.mda');

// Vérification que le fichier ``mda-config.json`` existe. S'il n'existe pas alors afficher le message ``Execute mda init``
console.log('Current directory'.green);
console.log(' -> '.magenta + curDir.green);
if(fs.existsSync(path.join(curDir,'mda-config.json')) == false){
  console.log('/!\\ This folder contains no mda-config.json file'.bold.red);
  console.log('Execute mda init ...'.bold.red);
}

// Vérifier que le dossier ``.mda`` existe. S'il n'existe pas alors le créer
if(fs.existsSync(mdaDir) == false){
  fs.mkdirSync(mdaDir);
  console.log(' -> '.magenta + '.mda folder created'.green);
}

// Vérifier que le fichier ``.mda/package.json`` n'exite pas. S'il exite alors le supprimer
if(fs.existsSync(path.join(mdaDir,'package.json')) == true){
  fs.unlinkSync(path.join(mdaDir,'package.json'));
  console.log(' -> '.magenta + 'current .mda/package.json deleted'.green);
}

// Création du fichier ``.mda/package.json`` grâce au fichier ``mda-config.json``
// Récupération des infos de l'application
var mdaConfig = require(path.join(curDir,'mda-config.json'));
var mdaPackagejson = _.extend(mdaConfig,{
  "main": "index.html",
  "window": {
    "title": "splash screen",
    "toolbar": true,
    "frame": false,
    "width": 400,
    "height": 250,
    "position": "center",
    "resizable": false,
    "always-on-top": true
  },
  "webkit": {
    "plugin": true
  }
});

fs.writeFileSync(path.join(mdaDir,'package.json'),JSON.stringify(mdaPackagejson,null,2)
,'utf8');
console.log(' -> '.magenta + 'new .mda/package.json created'.green);

// Vérifier que le fichier ``.mda/index.html`` existe. S'il n'existe pas alors le créer
if(fs.existsSync(path.join(mdaDir,'index.html')) == false){
  fs.writeFileSync(path.join(mdaDir,'index.html'),
                  fs.readFileSync(path.join(__dirname,'index.html')));
  console.log(' -> '.magenta + '.mda/index.html created'.green);
}

// Définir l'environement
process.env.ENVIRON='DEV'

var nw = new NwBuilder({
    files: '.mda/*', // use the glob format
    version: mdaConfig.nwjs_version,
    platforms: [myPlatform],
    appName: mdaConfig.name,
    appVersion : mdaConfig.version,
    cacheDir: path.join(mdaDir,'.cache')
});

nw.run().then(function () {
   console.log('✔ all done !');
}).catch(function (error) {
    console.error(error);
});
