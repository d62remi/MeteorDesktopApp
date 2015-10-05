var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var os = require('os');
var spawn = require('spawn-cmd').spawn;
var NwBuilder = require('nw-builder');
detectCurrentPlatform = require('nw-builder/lib/detectCurrentPlatform.js');
myPlatform = detectCurrentPlatform();
require('colors');

// Liste des dossiers à traiter
var curDir = process.cwd();
var mdaDir = path.join(curDir,'.mda');

// Vérification que le fichier ``mda-config.json`` existe. S'il n'existe pas alors afficher le message ``Execute mda init``
console.log('Current directory'.green);
console.log(' - '.magenta + curDir.green);
if(fs.existsSync(path.join(curDir,'mda-config.json')) == false){
  console.log('/!\\ This folder contains no mda-config.json file'.bold.red);
  console.log('Execute mda init ...'.bold.red);
  process.exit();
}

// Vérifier que le dossier ``.mda`` existe. S'il n'existe pas alors le créer
if(fs.existsSync(mdaDir) == false){
  fs.mkdirSync(mdaDir);
  console.log('=> .mda folder created'.green);
}

// Vérifier que le fichier ``.mda/package.json`` n'exite pas. S'il exite alors le supprimer
if(fs.existsSync(path.join(mdaDir,'package.json')) == true){
  fs.unlinkSync(path.join(mdaDir,'package.json'));
  console.log('=> current .mda/package.json deleted'.green);
}

// Création du fichier ``.mda/package.json`` grâce au fichier ``mda-config.json``
// Récupération des infos de l'application
var mdaConfig = require(path.join(curDir,'mda-config.json'));
var mdaPackagejson = _.extend(mdaConfig,{
  "main": "index.html",
  "window": _.extend(mdaConfig.splashScreen,{"show":false}),
  "mainWindow": _.extend(mdaConfig.mainWindow,{"show":false}),
  "webkit": {
    "plugin": true
  }
});

fs.writeFileSync(path.join(mdaDir,'package.json'),JSON.stringify(mdaPackagejson,null,2)
,'utf8');
console.log('=> new .mda/package.json created'.green);

// Vérifier que le fichier ``.mda/index.html`` existe. S'il n'existe pas alors le créer
if(fs.existsSync(path.join(mdaDir,'index.html')) == false){
  fs.writeFileSync(path.join(mdaDir,'index.html'),
                  fs.readFileSync(path.join(__dirname,'assets','index.html')));
  console.log('=> .mda/index.html created'.green);
}
// Vérifier que le fichier ``.mda/imgSplashScreen.jpg`` existe. S'il n'existe pas alors le créer
if(fs.existsSync(path.join(mdaDir,'imgSplashScreen.jpg')) == false){
  fs.writeFileSync(path.join(mdaDir,'imgSplashScreen.jpg'),
                  fs.readFileSync(path.join(__dirname,'assets','imgSplashScreen.jpg')));
  console.log('=> .mda/imgSplashScreen.jpg created'.green);
}

if (process.dev_mode === "dev"){
  process.env.DEV_MODE=true;
}

// Définir l'environement
process.env.ENVIRON='DEV'

// Lancer la commande ``meteor`` dans le dossier courant
console.log('### Execution of meteor ###'.bold.gray);
meteor = spawn("meteor",[],{detached: false})
  .on("error",function(err){
    console.log(err.toString().bold.red);
  });

meteor.stdout.on('data', function (data) {
  if(data.toString() != ''){
    console.log(data.toString().replace('\n','').gray);
  }

  // Si meteor est prêt alors on lance nwjs
  if (data.toString().indexOf("mda-starter") != -1){
    console.log('### Execution of nwjs ###'.bold.green);
    var nw = new NwBuilder({
        files: '.mda/*', // use the glob format
        version: mdaConfig.nwjs_version,
        platforms: [myPlatform],
        appName: mdaConfig.name,
        appVersion : mdaConfig.version,
        cacheDir: path.join(mdaDir,'.cache')
    });

    nw.run().then(function () {
      // On quite meteor quand on quite l'application
      meteor.kill('SIGTERM');
      // Tout se termine convenablement
      console.log('✔ all done !'.bold.green);

    }).catch(function (error) {
      // On quite meteor quand on quite l'application
      meteor.kill('SIGTERM');
      // L'application quite par erreur
      console.error(error.bold.red);

    });
  }
});

meteor.stderr.on('data', function (data) {
  console.log(data.toString().bold.red);
});

meteor.on('close', function (code) {
  console.log('meteor process exited with code ' + code);
});

process.on('SIGTERM', function() {
  // On quite meteor quand on quite l'application
  meteor.kill('SIGTERM');
  console.log('meteor kill'.bold.green);
});
