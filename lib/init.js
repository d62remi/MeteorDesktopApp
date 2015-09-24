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
console.log(' -> '.magenta + curDir.green);
if(fs.existsSync(path.join(curDir,'.meteor')) == false){
  console.log('/!\\ This folder contains no meteor project'.bold.red);
  console.log('Execute meteor create ...'.bold.red);
}



// Création du fichier ``mda-config.json`` avec toutes les options obligatoires renseignées (Si le fichier existe déjà le supprimer)
if(fs.existsSync(path.join(curDir,'mda-config.json')) == true){
  fs.unlinkSync(path.join(curDir,'mda-config.json'));
  console.log(' -> '.magenta + 'mda-config.json deleted'.green);
}



fs.writeFileSync(path.join(curDir,'mda-config.json'),JSON.stringify({},null,2)
,'utf8');
console.log('');
console.log('✔ initialization is complete'.bold.green);
