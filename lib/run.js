var fs = require('fs');
var path = require('path');
var NwBuilder = require('nw-builder');
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

// Récupération des infos de l'application
var mdaConfig = require(path.join(curDir,'mda-config.json'));


// Vérifier que le dossier ``.mda`` existe. S'il n'existe pas alors le créer
if(fs.existsSync(mdaDir) == false){
  fs.mkdirSync(mdaDir);
  console.log(' -> '.magenta + '.mda folder created'.green);
}

// Vérifier que le fichier ``.mda/package.json`` n'exite pas. S'il exite alors le supprimer
if(fs.existsSync(path.join(mdaDir,'package.json')) == true){
  fs.unlinkSync(path.join(mdaDir,'package.json'));
  console.log(' -> '.magenta + '.mda/package.json deleted'.green);
}



// Définir l'environement 
process.env.ENVIRON='DEV'

// var nw = new NwBuilder({
//     files: '.mda/*', // use the glob format
//     version: nwjsVersion,
//     platforms: [myPlatform]
// });
//
// process.env.ENVIRON = 'dev';
// nw.run().then(function () {
//    console.log('all done!');
// }).catch(function (error) {
//     console.error(error);
// });
