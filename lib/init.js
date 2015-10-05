var fs = require('fs');
var path = require('path');
require('colors');

console.log(" _______  ______   _______ ".bold.blue);
console.log("(       )(  __  \\ (  ___  )".bold.blue);
console.log("| () () || (  \\  )| (   ) |".bold.blue);
console.log("| || || || |   ) || (___) |".bold.blue);
console.log("| |(_)| || |   | ||  ___  |".bold.blue);
console.log("| |   | || |   ) || (   ) |".bold.blue);
console.log("| )   ( || (__/  )| )   ( |".bold.blue);
console.log("|/     \\|(______/ |/     \\|".bold.blue);
console.log("");
console.log("### Initialization of the application".bold.green);
console.log('');



// Vérification que le dossier ``.meteor`` existe. S'il n'existe pas alors afficher le message ``This folder contains no meteor project``
var curDir = process.cwd();
console.log('Current directory'.green);
console.log(' - '.magenta + curDir.green);
if(fs.existsSync(path.join(curDir,'.meteor')) == false){
  console.log('/!\\ This folder contains no meteor project'.bold.red);
  console.log('Execute meteor create ...'.bold.red);
  process.exit(1);
}



// Création du fichier ``mda-config.json`` avec toutes les options obligatoires renseignées (Si le fichier existe déjà le supprimer)
if(fs.existsSync(path.join(curDir,'mda-config.json')) == true){
  fs.unlinkSync(path.join(curDir,'mda-config.json'));
  console.log('=> current mda-config.json deleted'.green);
}

var mdaConfig = {
    "name": "mda-app",
    "version": "0.1.0",
    "main": "index.html",
    "description": "mda-app description",
    "keywords": [ "mda-app", "meteor", "desktop", "app" ],
    "splashScreen" : {
      "title": "splash screen",
      "toolbar": false,
      "frame": false,
      "width": 620,
      "height": 350,
      "position": "center",
      "resizable": false,
      "always-on-top": true,
      "image": "imgSplashScreen.jpg"
    },
    "mainWindow": {
        "frame": true,
        "toolbar": false,
        "width": 800,
        "height": 500,
        "position": "center"
    },
    "platforms":["osx32", "osx64", "win32", "win64"],
    "nwjs_version": "0.12.3",
    "node_version": "0.10.36",
    "mongo_version": "2.6.9"
};

fs.writeFileSync(path.join(curDir,'mda-config.json'),JSON.stringify(mdaConfig,null,2)
,'utf8');
console.log('=> new mda-config.json created'.green);
console.log('');
console.log('✔ initialization is complete'.bold.green);
console.log('=> you can modify mda-config.json'.bold.green);
