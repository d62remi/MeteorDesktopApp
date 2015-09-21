var fs = require('fs');
var path = require('path');

var rls = require('readline-sync');


var curDir = process.cwd();

// On regarde si l'application nwjs est créée
if(fs.existsSync(path.join(curDir,'nw-app')) == false){
  // Si elle n'existe pas alors on la créée
  // création du dossier
  fs.mkdirSync(path.join(curDir,'nw-app'));

}

nwAppDir = path.join(curDir,'nw-app');
// Création du manifest package.json
if(fs.existsSync(path.join(nwAppDir,'package.json')) == false){

  //Console.log('Please answer a few questions to complete the manifest');
  var name = '';
  while (name == ''){
    name    = rls.question('Manifest name ? ');
  }

  var version = '';
  while (version == ''){
    version = rls.question('Manifest version (ex:1.0.0)? ');
  }

  manifestOutput = {
	"name" : name,
	"version" : version,
	"main" : 'index.html',
	"window": {
		"toolbar": true,
		"frame" : false,
		"show" : true
	},
	"webkit": {
		"plugin": true
	}
  }



  // Création du manifest package.json
  fs.writeFileSync(path.join(nwAppDir,'package.json'),JSON.stringify(manifestOutput,null,2),'utf8');

}
// Copie du fichier
if(fs.existsSync(path.join(nwAppDir,'index.html')) == false){
  fs.writeFileSync(path.join(nwAppDir,'index.html'),
                  fs.readFileSync(path.join(curDir,'lib','index.html')));

}
