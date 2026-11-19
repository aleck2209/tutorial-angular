# Homes — first-app

Application réalisée en suivant le tutoriel officiel d'Angular **« Build your first Angular app »** ([angular.dev/tutorials/first-app](https://angular.dev/tutorials/first-app)). Le but est d'apprendre : chaque partie du code correspond à une leçon du tutoriel.

L'application présente une liste de logements. On peut :

- filtrer les logements par ville ;
- ouvrir la page de détail d'un logement ;
- remplir un formulaire de candidature pour y habiter.

Les données viennent d'une petite API REST locale, servie par `json-server` à partir du fichier `db.json`.

---

## Lancer le projet

### Prérequis

- Node.js (LTS ou plus récent)
- Angular CLI 22, installée globalement : `npm install -g @angular/cli`
- json-server, installé globalement : `npm install -g json-server`

### Démarrage

Il faut **deux terminaux**, ouverts dans le dossier `first-app`.

1. Installer les dépendances (une seule fois) :

   ```bash
   npm install
   ```

2. **Terminal 1** : démarrer l'API de données.

   ```bash
   json-server --watch db.json
   ```

   Vérifier que [http://localhost:3000/locations](http://localhost:3000/locations) renvoie bien la liste des logements.

3. **Terminal 2** : démarrer l'application.

   ```bash
   ng serve
   ```

   Ouvrir [http://localhost:4200](http://localhost:4200).

> Si l'API n'est pas démarrée, l'application s'affiche mais la liste reste vide : le service n'a rien à récupérer.

---

## Architecture

```
first-app/
├── db.json                         Données servies par json-server
├── angular.json                    Configuration du projet pour la CLI
└── src/
    ├── main.ts                     Démarrage de l'application + routeur
    ├── index.html                  Page HTML unique contenant <app-root>
    ├── styles.css                  Styles globaux
    ├── public/                     Logo et icônes (servis sous /public)
    └── app/
        ├── app.ts                  Composant racine : en-tête + <router-outlet>
        ├── routes.ts               Table des routes
        ├── housinglocation.ts      Interface HousingLocationInfo
        ├── housing-service.ts      Service d'accès aux données
        ├── home/                   Page d'accueil : recherche + liste
        ├── housing-location/       Carte d'un logement
        └── details/                Page de détail + formulaire
```

### Rôle de chaque pièce

| Fichier | Rôle |
|---|---|
| `main.ts` | Lance `App` et active le routeur avec `provideRouter(routeConfig)`. |
| `app.ts` | Coquille de l'application : logo cliquable vers l'accueil, puis `<router-outlet />` où s'affiche la page courante. |
| `routes.ts` | Deux routes : `''` affiche `Home`, `details/:id` affiche `Details`. |
| `housinglocation.ts` | Décrit la forme d'un logement (`id`, `name`, `city`, `state`, `photo`, `availableUnits`, `wifi`, `laundry`). |
| `housing-service.ts` | Récupère les logements avec `fetch` et reçoit les candidatures. |
| `home/home.ts` | Charge tous les logements, gère le filtre par ville, affiche une carte par logement. |
| `housing-location/` | Reçoit un logement en entrée et l'affiche (photo, nom, ville, lien « Learn More »). |
| `details/` | Lit l'`id` dans l'URL, charge le logement correspondant, affiche ses caractéristiques et le formulaire. |

### Circulation des données

```
db.json ──► json-server (port 3000) ──► HousingService (fetch)
                                              │
                         ┌────────────────────┴────────────────────┐
                         ▼                                         ▼
                Home (liste + filtre)                 Details (lit :id dans l'URL)
                         │                                         │
            [housingLocation]="..." (input)              formulaire → submitApplication()
                         ▼
                HousingLocation (carte)
```

---

## Notions apprises, leçon par leçon

| # | Leçon | Notion | Où la retrouver |
|---|---|---|---|
| 1 | Hello world | `ng serve`, composant racine | `app.ts` |
| 2 | Create Home component | `ng generate component`, métadonnées `@Component` | `home/home.ts` |
| 3 | Create HousingLocation component | Composition : un composant dans un autre via `imports` | `home/home.ts` |
| 4 | Create an interface | Interface TypeScript comme type de données | `housinglocation.ts` |
| 5 | Add inputs to components | Entrée obligatoire `input.required<T>()` | `housing-location/housing-location.ts` |
| 6 | Add property binding | Passer une donnée du parent à l'enfant : `[housingLocation]="..."` | `home/home.ts` |
| 7 | Add dynamic values to templates | Interpolation `{{ }}`, liaison `[src]`, lecture d'une entrée avec `()` | `housing-location/housing-location.html` |
| 8 | Use the @for block | Boucle `@for (...; track ...)` | `home/home.ts` |
| 9 | Angular services | Service `@Service()` et injection avec `inject()` | `housing-service.ts`, `home/home.ts` |
| 10 | Add routing | `provideRouter`, `Routes`, `RouterLink`, `<router-outlet />` | `main.ts`, `routes.ts`, `app.ts` |
| 11 | Customize the details page | Paramètre de route `:id`, `ActivatedRoute`, `[routerLink]` en tableau | `details/details.ts`, `housing-location.html` |
| 12 | Integrate Angular forms | Formulaire réactif : `FormGroup`, `FormControl`, `formControlName`, `(submit)` | `details/` |
| 13 | Add search functionality | Variable de template `#filter`, événement `(click)`, `Array.filter` | `home/home.ts` |
| 14 | Add HTTP communication | Chargement asynchrone avec `fetch`, `ChangeDetectorRef.markForCheck()` | `housing-service.ts`, `home/home.ts`, `details/details.ts` |

---

## Points clés à retenir

- **Une entrée signal se lit en l'appelant.** `housingLocation` est déclaré avec `input.required()`, donc le template écrit `housingLocation().name`, avec les parenthèses.
- **`track` est obligatoire dans `@for`.** Il dit à Angular comment reconnaître chaque élément quand la liste change (après un filtre, par exemple).
- **Un service centralise l'accès aux données.** Les composants ne savent pas d'où viennent les logements ; ils demandent au service. Passer d'une liste en dur (leçon 9) à une API (leçon 14) n'a changé que le service, plus l'attente des résultats dans les composants.
- **`?.` protège l'affichage avant l'arrivée des données.** Dans `details.html`, `housingLocation?.name` évite une erreur tant que le logement n'est pas encore chargé.
- **`markForCheck()` prévient Angular d'un changement.** Les données arrivent après l'affichage, dans le `.then(...)`. Comme l'état n'est pas stocké dans des signaux, Angular ne le remarque pas tout seul ; `markForCheck()` lui demande de revérifier le composant.
- **Le paramètre de route est une chaîne.** `route.snapshot.params['id']` renvoie du texte, d'où le `parseInt(..., 10)` avant de chercher le logement.

---

## Problèmes rencontrés

| Symptôme | Cause | Solution |
|---|---|---|
| `Cannot find module '@angular/core'` alors que le dossier existe | `node_modules` incomplet : les `package.json` de nombreux paquets manquaient (installation faite pendant qu'un `ng serve` tournait) | Arrêter `ng serve`, supprimer `node_modules`, relancer `npm install`. Vérifier avec `npm ls`. |
| Erreur sur `outDir` dans `tsconfig.json` | TypeScript 6 exige `rootDir` dès qu'un dossier de sortie est indiqué | Ajouter `"rootDir": "./src"` |
| `This command is not available when running the Angular CLI outside a workspace` | Fichier `angular.json` absent | Recréer `angular.json` (projet `first-app`, dossiers `src/assets` et `src/public` copiés) |
| `Property 'changeDetectorRef' does not exist` | `markForCheck()` appelé sans avoir déclaré la propriété | Importer `ChangeDetectorRef` et le déclarer avec `inject(ChangeDetectorRef)` |
| Liste vide à l'écran | `json-server` non démarré | Lancer `json-server --watch db.json` dans un second terminal |

---

## Pour aller plus loin

Exercices possibles, une fois le tutoriel terminé :

1. **Signaux** : transformer `filteredLocationList` et `housingLocation` en signaux, puis supprimer les appels à `markForCheck()`.
2. **`track` par identifiant** : remplacer `track $index` par l'`id` du logement dans le `@for`.
3. **`HttpClient`** : remplacer `fetch` par le client HTTP d'Angular (cité par la leçon 14 comme l'option plus avancée).
4. **Chargement et erreurs** : afficher un message pendant le chargement, et un autre si l'API ne répond pas.
5. **Recherche en direct** : filtrer à chaque frappe au lieu d'attendre le clic sur « Search ».
6. **Validation** : rendre les champs du formulaire obligatoires et vérifier le format de l'e-mail avec `Validators`.

---

## Ressources

- Tutoriel suivi : [Build your first Angular app](https://angular.dev/tutorials/first-app)
- Leçon HTTP : [Add HTTP communication to your app](https://angular.dev/tutorials/first-app/14-http)
- Référence : [ChangeDetectorRef](https://angular.dev/api/core/ChangeDetectorRef)
- Documentation générale : [angular.dev](https://angular.dev)
