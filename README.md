# Apprentissage Angular — tutoriel officiel

Ce dépôt garde la trace de mon apprentissage d'Angular avec le tutoriel officiel **« Build your first Angular app »** publié sur [angular.dev](https://angular.dev/tutorials/first-app).

L'objectif n'est pas de produire une application finie, mais de **comprendre chaque notion** en la pratiquant : un commit par étape du tutoriel, et des notes sur ce qui a été appris et sur les problèmes rencontrés.

---

## Contenu

| Dossier | Description |
|---|---|
| [`first-app/`](./first-app/README.md) | Application « Homes » : liste de logements, recherche par ville, page de détail et formulaire de candidature, données chargées depuis une API locale. |

Le détail de l'application (installation, architecture, notions par leçon) est dans [`first-app/README.md`](./first-app/README.md).

---

## Parcours suivi

Le tutoriel compte 14 leçons. Chaque étape a fait l'objet d'un commit.

| # | Leçon du tutoriel | Commit |
|---|---|---|
| 1 | Hello world | `03ee7d7` first commit |
| 2 | Create Home component | `d874136` ajouter le component home |
| 3 | Create HousingLocation component | `d5be260` ajouter les components home et housing-location |
| 4 | Create an interface | `822e25a` ajouter l'interface HousingLocationInfo |
| 5–7 | Inputs, property binding, interpolation | `fcb1d57` utiliser l'interpolation et input() |
| 8 | Use the @for block | `28e0c32` utiliser @for pour itérer les logements |
| 9 | Angular services | `4991ea1` ajouter un service et l'injecter dans Home |
| 10 | Add routing | `2855cc5` ajouter le routage pour la SPA |
| 11 | Customize the details page | `daaa081` page détails avec les paramètres de route |
| 12 | Integrate Angular forms | `5c3be8f` intégrer le formulaire |
| 13 | Add search functionality | `4890416` réaliser la recherche dans Home |
| 14 | Add HTTP communication | `d3012d0` ajouter le serveur, configurer le service et les composants |

Pour revoir l'état du code à une étape précise : `git checkout <commit>`, puis `git checkout master` pour revenir.

---

## Démarrage rapide

```bash
cd first-app
npm install
json-server --watch db.json   # terminal 1 : API sur http://localhost:3000
ng serve                      # terminal 2 : application sur http://localhost:4200
```

Les prérequis et les explications sont dans [`first-app/README.md`](./first-app/README.md#lancer-le-projet).

---

## Environnement utilisé

| Outil | Version |
|---|---|
| Node.js | 26.10 |
| npm | 11.19 |
| Angular CLI | 22.2 |
| Angular | 22.2 |
| TypeScript | 6.0 |
| Système | Windows 10 |

---

## Leçons tirées de l'environnement

Quelques réflexes appris en dehors du code Angular lui-même :

- **Arrêter `ng serve` avant un `npm install`.** Sous Windows, les fichiers utilisés par le serveur sont verrouillés ; l'installation reste alors à moitié faite et produit des erreurs trompeuses comme `Cannot find module '@angular/core'`.
- **`npm ls` diagnostique une installation cassée.** Un paquet marqué « invalid » signale un `node_modules` incomplet.
- **Le `.gitignore` ne concerne que les fichiers non suivis.** Il doit exister avant le premier `git add`. Si un dossier a déjà été ajouté, il faut le retirer de l'index avec `git rm -r --cached <dossier>`.
- **Recharger VS Code** (`Developer: Reload Window`) efface les erreurs anciennes que TypeScript garde en mémoire après une réparation.

### Fichiers exclus de git

```
node_modules/   dépendances, reconstruites par npm install
.angular/       cache de compilation
dist/           résultat de ng build
```

---

## Conventions

- Messages de commit en français, préfixés par le type de changement : `feat: ...`.
- Un commit par leçon (ou groupe de leçons très liées).

---

## Ressources

- [Build your first Angular app](https://angular.dev/tutorials/first-app) — le tutoriel suivi ici
- [Learn Angular in your browser](https://angular.dev/tutorials/learn-angular) — tutoriel complémentaire sur les bases
- [Documentation Angular](https://angular.dev)
