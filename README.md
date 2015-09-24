# MeteorDesktopApp
Build stand-alone Meteor desktop app

# TODO
- [ ] Lister les différentes commandes (Command line tools)
  - [ ] $ mda init
    - [X] Vérification que le dossier ``.meteor`` existe. S'il n'existe pas alors afficher le message ``This folder contains no meteor project``
    - [ ] Création du fichier ``mda-config.json`` avec toutes les options obligatoires renseignées (Si le fichier existe déjà le supprimer)
  - [ ] $ mda run
    - [ ] Vérifier que le fichier ``mda-config.json`` existe. S'il n'existe pas alors afficher le message ``Execute mda init``
    - [ ] Vérifier que les infos obligatoires sont bien renseignées
    - [ ] Vérifier que le dossier ``.mda`` existe. S'il n'existe pas alors le créer
    - [ ] Vérifier que le fichier ``.mda/package.json`` n'exite pas. S'il exite alors le supprimer
    - [ ] Création du fichier ``.mda/package.json`` grâce au fichier ``mda-config.json``
    - [ ] Vérifier que le fichier ``.mda/index.html`` existe. S'il n'existe pas alors le créer
    - [ ] Définir ``process.env.ENVIRON='DEV'``
    - [ ] Lancer la commande ``meteor`` dans le dossier courant
    - [ ] Lancer NWBuilder().run() ``https://github.com/nwjs/nw-builder``
    - [ ] Le fichier ``.mda/index.html`` correspond au splash screen. Il ouvre une nouvelle fenêtre sur ``http://localhost:3000`` dans l'environement ``process.env.ENVIRON='DEV'``
  - [ ] $ mda build
  - [ ] $ mda reset
