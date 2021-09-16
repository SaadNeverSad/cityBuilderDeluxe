# User stories et tests d'acceptance

## User story 1

**En tant que :** joueur  
**Je veux :** pouvoir visualiser ma ville sur une carte en 2D  
**Afin de :** gérer correctement ma ville  

### Tests d'acceptance

- Le jeu est en 2d isométrique
- Un système de tuiles permet de positionner les différents bâtiments

## User story 2

**En tant que :** joueur  
**Je veux :** ajouter différents bâtiments dans ma ville  
**Afin de :** gérer correctement ma ville  

### Tests d'acceptance

- L'utilisateur dispose d'un inventaire avec un nombre limité de bâtiments.
- L'utilisateur ne peut pas poser un bâtiment sur une case déjà occupée.
- Le curseur se transforme en signe interdit si le batiment ne peut pas être posé.

## User story 3

**En tant que :** joueur  
**Je veux :** pouvoir voir mon score et mes objectifs   
**Afin de :** connaitre mon avancée

### Tests d'acceptance

- Le score ainsi que le score requis pour passer au prochain niveau (objectif) sont affichés en évidence en haut à gauche de l'interface graphique.
- Le score est affiché en temps réel, en particulier quand un bâtiment est placé il augmente.
- Une fois l'objectif atteint, un bâtiment de chaque type est ajouté à l'inventaire.
- Le jeu se finit lorsque l'utilisateur appuie sur "end game" ou lorsqu'il ne peut plus poser de bâtiment (carte remplie ou inventaire vide)

## User story 4

**En tant que :** joueur  
**Je veux :** prévisualiser le score rapporté par chaque bâtiment  
**Afin de :** connaitre mon futur score et élaborer des stratégies

### Tests d'acceptance

- Avec une action de glisser-déposer, il est possible de voir le score que va donner le bâtiment grâce à un nombre sur chaque case adjacente.
- Le score est calculé ainsi (cases laissées vides pour les valeurs inconnues):

|nom du bâtiment|score|portée|arbres|maisons|cirque|éolienne|fontaine|eau|
|---------------|-----|------|------|-------|------|--------|--------|---|
|maisons        |6    |1     |+5    |-1     |+10   |        |+8      |   |
|éoliennes      |15   |2     |-4    |-8     |      |        |        |+10|
|cirque         |     |3     |      |+15    |-25   |        |        |   |
|fontaine       |6    |1     |      |+8     |      |        |        |   |


## User story 5

**En tant que :** joueur  
**Je veux :** pouvoir retourner en arrière  
**Afin de :** régler mes erreurs lorsque je me trompe  

### Tests d'acceptance

- Boutons undo et redo présents dans l'interface qui permettent respectivement d'annuler et de remettre les derniers ajouts de bâtiments.
- Ajouter un nouveau bâtiment efface la pile des redos.

## User story 6

**En tant que :** joueur  
**Je veux :** pouvoir jouer sur des cartes différentes  
**Afin de :** diversifier le jeu 

### Tests d'acceptance

- Au lancement du jeu et après chaque fin de jeu, un menu permet de sélectionner la carte
- Une option permet de jouer sur une carte aléatoire.

## User story 7

**En tant que :** joueur  
**Je veux :** pouvoir me comparer aux autres  
**Afin d' :** assouvir mon besoin de supériorité

### Tests d'acceptance

- Le tableau de scores montre les meilleurs scores.
- Il est ouvrable à n'importe quel moment en cliquant sur un bouton en haut à droite de l'interface.
- Un champ de texte me permet de choisir le nom qui sera affiché sur le tableau de score.
