# Pages interactives et chiffres KUHN

Ce document décrit le procédé standard pour intégrer au site une page HTML créée « hors Hugo »
(animation, graphique, tutoriel…) et pour tenir à jour les chiffres KUHN. `docs/` n'est pas lu par Hugo.

En une phrase : **une page interactive = un dossier HTML autonome + une ligne de shortcode**, et
**tous les chiffres viennent de `data/kuhn/`** : ajouter un exercice comptable met à jour les pages,
les tableaux et les graphiques sans toucher au code.

## 1. Où sont les choses

```
data/kuhn/
  sas.yaml          comptes sociaux de KUHN SAS, un bloc par exercice (M€, code DGFiP en commentaire)
  dividendes.yaml   dividende de chaque exercice (estime: true + methode tant qu'il n'est pas publié)
  filiales.yaml     filiales, un bloc par exercice
  groupe.yaml       KUHN Group (rapports Bucher, CHF → €), variations des commandes
  concurrents.yaml  John Deere, AGCO, CNH
  affaire.yaml      paramètres de « L'affaire des 2,6 % » (exercice examiné, chiffres Pappers)
  reglages.yaml     premier exercice affiché, nombre d'actions
  tableaux.yaml     description des tableaux {{< tableau-kuhn >}}
data/glossaire.yaml définitions des termes (bulles)

layouts/partials/kuhn/
  donnees.html      LE calcul : brut + formules + repères + contrôles (errorf / warnf)
  glossaire.html    glossaire avec ses jetons remplis
  publier-donnees.html  publie /interactifs/_donnees/kuhn.js et glossaire.js
  gabarit.html, nombre.html  jetons {x.ventes|1} et nombres à la française (tableaux, glossaire)
layouts/shortcodes/
  interactif.html   {{< interactif … >}}
  tableau-kuhn.html {{< tableau-kuhn … >}}
  bulle-lien.html   {{< bulle-lien … >}} (bulle mouvante : page en plein écran ou lien ; dessins dans
                    layouts/partials/bulle-lien/)
layouts/partials/kuhn/url-interactif.html  adresse d'une page autonome avec son empreinte (?v=…)

static/interactifs/
  _modele/          dossier à copier pour créer une page
  _commun/          base.css, outils.js, integration.js, pleine-largeur.js, plein-ecran.js, polices/ (OFL)
  <nom>/            une page : index.html, style.css, script.js, images/…
                    lire-les-comptes (tutoriel) et ou-va-l-argent (tableau dynamique), ouvertes en plein écran,
                    affaire-2-6 (l'enquête), analyse-* (graphiques de l'article Résultats, _analyse/ commun)
  (_donnees/kuhn.js et glossaire.js : produits par Hugo, jamais écrits à la main)
```

Les formules (valeur ajoutée, EBITDA à méthode constante, effet net des provisions, trésorerie,
taux de distribution, marges, variations, extrêmes…) ne sont écrites **qu'une fois**, dans
`layouts/partials/kuhn/donnees.html`. Les pages et les tableaux lisent les valeurs déjà calculées.

## 2. Intégrer une page dans un article : une ligne

```
{{< interactif nom="ou-va-l-argent" titre="Où va l'argent d'une année ?" >}}
```

| Paramètre | Valeur | Effet |
|---|---|---|
| `nom` | obligatoire | dossier `static/interactifs/<nom>/` |
| `titre` | obligatoire | titre accessible de l'iframe |
| `hauteur` | `auto` (défaut) ou `ecran` | `auto` : l'iframe prend exactement la hauteur du contenu ; `ecran` : l'écran entier sous l'en-tête, la page défile elle-même |
| `pleine_largeur` (ou `pleine-largeur`) | `true` | l'article s'élargit à toute la largeur (comme le menu de hugo-book) ; le texte autour garde une colonne lisible |
| `hauteur_min` (ou `hauteur-min`) | px, défaut `320` | hauteur réservée avant le chargement |

Le shortcode produit une `<iframe>` vers `/interactifs/<nom>/?v=<empreinte>` (l'empreinte change dès
que la page ou les données changent), publie les fichiers de données et fait charger **une seule fois**
`integration.js` par la page (`layouts/partials/docs/inject/body.html`). La requête de l'article est
transmise à l'iframe : `…/lire-les-comptes/?image=3` ouvre l'image 3.

Pourquoi une iframe : la page marche seule exactement comme une fois intégrée (aucune collision de CSS
ou de JS avec le thème), ses `@media` suivent la largeur réelle du bloc, Tina ne touche jamais au
HTML, et il n'y a aucune chaîne de compilation JS. Contreparties : le texte de l'iframe n'est pas
indexé avec l'article (le texte de fond et les tableaux restent donc dans le `.md`), les infobulles
restent dans leur cadre, et le cache de GitHub Pages (environ 10 minutes) peut retarder une mise à jour
des fichiers secondaires (`style.css`, `script.js`).

Dans les `.md` :

- un terme du glossaire s'écrit comme un lien natif : `[EBITDA](#def-ebitda)` → bulle au clic ;
- un tableau de chiffres : `{{< tableau-kuhn "rentabilite" >}}` (voir section 6) ;
- **une page interactive qui vit en plein écran** (tutoriel, tableau dynamique) ne s'intègre pas en iframe
  au milieu du texte : on montre une **bulle mouvante** qui l'agrandit en plein écran au clic
  (`static/interactifs/_commun/plein-ecran.js`) :
  `{{< bulle-lien nom="lire-les-comptes" href="/actualites/2026/lire-les-comptes.md" titre="…" texte="…" dessin="comptes" >}}`.
  - `nom` : la page ouverte en plein écran ; `href` (facultatif) : la page ouverte sans JavaScript, ou,
    sans `nom`, la page visée par un simple lien ;
  - `dessin` choisit l'illustration (`comptes`, `tableau` : `layouts/partials/bulle-lien/<dessin>.html`,
    un SVG 240 × 180 ; en ajouter un = ajouter un fichier) ;
  - plusieurs bulles écrites l'une sous l'autre s'alignent côte à côte ; une bulle seule s'affiche en grand
    (c'est ainsi que l'article d'une page plein écran la présente) ;
  - la fenêtre se ferme par « Fermer », Échap ou le bouton Retour ; l'adresse `…/#voir-<nom>` l'ouvre
    directement (lien à utiliser depuis une autre page) ; la requête de l'article (`?image=3`) est transmise ;
  - les animations s'arrêtent en mouvement réduit.

## 3. Contrat d'une page autonome

1. **`<head>`** : `<meta charset="utf-8">`, `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">`,
   `<base target="_top">` (les liens ouvrent le site, pas l'iframe), `<meta name="robots" content="noindex">`,
   `<link rel="stylesheet" href="../_commun/base.css">` puis `style.css`.
2. **Chemins relatifs uniquement.** Scripts classiques (`<script src>`, pas de module, pas de CDN, pas de
   Google Fonts), dans cet ordre : `../_donnees/kuhn.js`, `../_commun/outils.js`, puis `script.js`.
   (`../_donnees/glossaire.js` est chargé tout seul au premier clic sur un terme.)
3. **Mode `auto`** : pas de `vh`, `svh`, ni `height:100%` sur `html` et `body`. **Mode `ecran`** : la page
   remplit sa fenêtre (`100svh`, zones sûres `env(safe-area-inset-*)`) et défile elle-même.
4. **Mobile d'abord** : tester à 360, 390, 768, 1280 et 1440 px ; cibles tactiles d'au moins 44 px ;
   `prefers-reduced-motion` respecté ; aucun effet au survol sous `(hover: none)`.
5. **Contenu** : français simple ; **aucun chiffre ni aucune année en dur** (section 4) ; termes du
   glossaire en `<button class="terme" data-def="ebitda">EBITDA</button>` (bulle flottante) ou, avec
   `data-place="note"`, une définition insérée sous le paragraphe (`.note-def`, à styler par la page).
6. Les ancres internes (`<a href="#section">`) défilent dans la page (géré par `outils.js`).

`KuhnOutils` (outils.js) : `nombre(v, déc)`, `signe(v, déc)`, `meuros`, `pct`, `gabarit(texte, valeurs)`,
`remplir(racine, valeurs)` (remplit les `{cle}` écrits dans le HTML des éléments `[data-gabarit]`),
`mouvementReduit()`, `tactile()`, `parametre(nom)`, `el(balise, attributs, enfants)`,
`badgeEstimation(est)`, `donnees.annees()`, `donnees.dernier()`, `donnees.ex(année)`, `donnees.filiales(année)`.

## 4. Règles de « chiffres vivants »

- Aucune année ni plage d'années écrite en dur dans une page : tout se déduit de
  `KuhnDonnees.meta.annees` et `KuhnDonnees.meta.dernierExercice`.
- Les textes qui contiennent des chiffres sont des **gabarits** remplis par les données :
  `KuhnOutils.gabarit("En {annee}, … {ventes} M€", {…})` dans le script, ou, pour un long texte,
  directement dans le HTML (`<p data-gabarit>En {annee}, …</p>`) rempli par `KuhnOutils.remplir`.
- Les remarques qui comparent des années sont **calculées** : l'année se choisit par une règle (pic, creux,
  dernier exercice…) lue dans `KuhnDonnees.meta.extremes`, puis la valeur se lit dans les données.
- Un chiffre estimé affiche automatiquement le badge « estimation » (`*_estime: true` → `badgeEstimation`).
- Graphiques, sélecteurs d'année et listes acceptent N+1 exercices : retour à la ligne, défilement,
  échelles recalculées sur les valeurs.
- **Exceptions voulues** : les montants de l'Atelier (tutoriel « Lire les comptes en images ») sont un
  exemple fictif et restent fixes ; « L'affaire des 2,6 % » lit l'exercice désigné dans
  `data/kuhn/affaire.yaml`, pas le dernier ; le texte de fond des `.md` reste un texte d'auteur (section 8).

## 5. Créer une page

1. Copier `static/interactifs/_modele/` en `static/interactifs/<nom>/` (minuscules, tirets).
2. Lancer `npm run dev:hugo` (ou `hugo server -D`) et développer la page à l'adresse
   `http://localhost:1313/interactifs/<nom>/` : elle marche seule.
3. Ajouter la ligne `{{< interactif nom="<nom>" titre="…" >}}` dans le `.md` qui l'accueille.
4. Ajouter le nom à la liste de choix « Page interactive » de `tina/config.ts` (`pagesInteractives`).
5. Vérifier l'article à 360, 390, 768, 1280 et 1440 px : pas de barre de défilement ni de bande vide
   autour de l'iframe.

## 6. Tableaux de chiffres : `{{< tableau-kuhn "<id>" >}}`

Les tableaux se décrivent dans `data/kuhn/tableaux.yaml` (colonnes, lignes, textes à jetons) et
sortent en HTML statique à la compilation : indexables, lisibles sans JavaScript, défilant
horizontalement sur mobile. Leurs colonnes suivent les exercices disponibles.

- `exercice="affaire"` (ou une année) change l'exercice de référence ; par défaut, le dernier.
- Types : `series` (une colonne par exercice), `lignes` (tableau classique), `badges`, `cartes`.
- Jetons : `{x.ventes|1}` (exercice choisi, 1 décimale), `{l.…}` (ligne en cours), `{p.…}` (exercice
  précédent), `{fx.totaux.prets|1m}` (filiales de l'exercice), `{m.…}` (repères), `{#}` (année
  choisie), `{@}` (année de la ligne). Formats : `0`, `1`, `2`, `s1` (signe), `z1` (« — » si nul),
  suffixe `m` (M€) ou `p` (%). Le détail est en tête de `tableaux.yaml`.
- Ajouter l'identifiant à la liste de choix « Tableau de chiffres KUHN » de `tina/config.ts` (`tableauxKuhn`).

## 7. Ajouter un exercice

1. Ajouter le bloc de l'année dans `data/kuhn/sas.yaml`, à partir des comptes déposés (même champs,
   montants en M€ à six décimales, code DGFiP en commentaire), puis les autres fichiers concernés :
   `filiales.yaml` (nouveau bloc), `groupe.yaml` et `concurrents.yaml` (rapports annuels),
   `dividendes.yaml` (voir 2). Si le capital change, mettre à jour le nombre d'actions dans `reglages.yaml`
   (le contrôle « dividende rond par action » le signalera).
2. Dans `dividendes.yaml`, ajouter l'exercice avec `{ estime: true, methode: taux-moyen, sur: 4 }` tant
   que le dividende n'est pas publié ; remplacer l'estimation de l'exercice précédent par son
   `montant` réel dès qu'il est connu (comptes de l'année suivante).
3. Lancer `hugo` : les contrôles de `donnees.html` signalent tout manque (`ERROR`) et toute identité
   comptable qui ne tombe pas juste (`WARN`).
4. Vérifier les pages (section 5, étape 5) : le nouvel exercice apparaît partout, choisi par défaut.
5. Relire les textes d'auteur listés en section 8, **titres compris** : « Résultats 2016–2024 » devient
   « Résultats 2016–2025 ».

**Attention, comptes 2025 :** la réforme du plan comptable (règlement ANC n° 2022-06), applicable aux
exercices ouverts à partir de 2025, supprime les transferts de charges (ligne FP) et change la définition du
chiffre d'affaires. Pour 2025, `reprises_et_transferts` ne contiendra plus de transferts : l'EBITDA « à méthode
constante » et la valeur ajoutée ne seront plus directement comparables aux années précédentes. Le signaler
dans les textes (et, si besoin, adapter les formules de `donnees.html` en le documentant ici). La phrase de la scène 9 de
« Lire les comptes en images » sur les transferts de charges se masque d'elle-même quand ils sont nuls.

## 8. À relire à chaque nouvel exercice

Textes d'auteur qui citent des chiffres ou des années (ils ne se mettent pas à jour tout seuls) :

- `data/glossaire.yaml` :
  - `ebitda-norme` (« 2021–2022 ») et `pappers` (années 2021 à 2024 des marges Pappers) — propres à
    « L'affaire des 2,6 % », à garder tels quels ;
  - `transferts-de-charges` et `frais-refactures` (« la réforme comptable de 2025… ») : à revoir avec les
    comptes 2025 (voir l'avertissement de la section 7).
- `data/kuhn/tableaux.yaml` : textes des colonnes et des lignes fixes (`trois-perimetres`, `ebitda-mesures`,
  `fiabilite`).
- `data/kuhn/groupe.yaml` : `commandes` (variations publiées par Bucher) à compléter.
- `content/actualites/2026/kuhn-resultats.md` (« Résultats 2016–2024 ») : le titre (`title`) et l'intertitre
  « Résultats 2016–2024 : l'analyse », puis le texte de l'analyse, qui cite des chiffres et des années :
  - « En bref » : pic de 2023, −18 %, marge d'EBITDA 9,2 % → 7,9 %, dividende 93 à 99 % ;
  - constat 1 : 979 M€ en 2023, 799 M€ en 2024 ; commandes du groupe « dès 2022 » ;
  - constat 2 : 9,2 % (2021) → 7,9 % (2024), niveau de 2018–2019, marge d'exploitation « autour de 7 % » ;
    l'encadré et le bloc « D'où vient le fossé » (20 M€, 2,6 %, 42,3 M€, 20,6 / 62,9 M€) portent sur l'exercice
    de `affaire.yaml`, à laisser tels quels, sauf la phrase sur la « rupture de 2023 » et la réforme qui
    « ne s'applique qu'aux comptes ouverts à partir de 2025 », à revoir avec les comptes 2025 (section 7) ;
  - constat 3 : « de 2018 à 2023 », 14,5 M€ en 2021, +4,4 M€ en 2024 ; bloc « 77,5 M€ de reprises » (35,2 /
    42,3 / 30,8 M€) ; stock de provisions 18,7 M€ (2016), 39,6 M€ (2023), 35,8 M€ (2024), « une première
    depuis 2019 » ;
  - constat 4 : « 93 à 99 % » (titre compris), 1 218 000 actions ;
  - constat 5 : 7 à 13 M€, 37 à 63 M€, encours de 61,5 M€ fin 2024 ;
    Blanchard et Artec ;
  - le secteur : « entre 70 et 75 en 2025 » ;
  - points de vigilance : −26 % entre 2022 et 2024, 9,6 % / 12,0 % / 11,7 %, 93 à 99 %.
  Les badges, cartes, tableaux et graphiques de cet article se mettent à jour tout seuls.
- « L'affaire des 2,6 % » (`static/interactifs/affaire-2-6/`, page entière intégrée par
  `content/actualites/2026/affaire-2-6.md`) : ses textes sont des gabarits qui lisent l'exercice désigné
  dans `data/kuhn/affaire.yaml` (2024, comparé à 2022) ; ils ne bougent pas avec un nouvel exercice, sauf
  la conclusion « chaque année, 93 à 99 % du bénéfice partent en dividende », recalculée sur les dividendes
  publiés. Restent à relire : la `description` du `.md` (9 %, 2,6 %, 2022, 2024), le « niveau de
  2018–2019 » (`niveau_comparable` dans `affaire.yaml`) et les phrases d'auteur de la page (« John Deere,
  AGCO et CNH ont connu le même reflux », « avant le boom »).
