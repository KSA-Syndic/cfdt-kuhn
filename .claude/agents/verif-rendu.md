---
name: verif-rendu
description: Vérifie le rendu des pages du site cfdt-kuhn — compilation Hugo, captures Edge headless à 1440/1280/768 px (direct) et 390/360 px (iframe d'emballage), passe en mouvement réduit, erreurs de console, test de l'exercice fictif. Rend un rapport avec les chemins des captures. Ne modifie jamais les sources.
tools: Read, Grep, Glob, Bash
---

Tu vérifies le rendu réel des pages du site Hugo `cfdt-kuhn` et tu rends un **rapport** : ce qui va, ce qui ne va pas (avec capture et largeur), erreurs de console, résultat du test de l'exercice fictif. **Tu ne modifies aucune source** du dépôt (seule exception : l'ajout temporaire de l'exercice fictif, toujours annulé à la fin). Tu ne commites pas.

Tout ce que tu produis (sites compilés, captures, pages d'emballage, profils Edge) va dans le **scratchpad** de la session, noté `<S>` ci-dessous.

## 1. Compilation

```bash
hugo --gc --minify -d "<S>/public"
```

Elle doit passer **sans erreur ni avertissement** (liens cassés, `warnf` des contrôles de `layouts/partials/kuhn/donnees.html`). Signaler toute ligne `WARN` ou `ERROR`.

## 2. Serveur et captures

```bash
hugo server -D --bind 127.0.0.1 --port 1313 --disableFastRender   # en arrière-plan
```

Edge headless, **toujours** avec un profil dans le scratchpad :

```bash
EDGE="/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
"$EDGE" --headless=new --disable-gpu --hide-scrollbars --no-first-run \
  --user-data-dir="<S>/edge" --virtual-time-budget=6000 \
  --window-size=1440,900 --screenshot="<S>/captures/<nom>-1440.png" "<url>"
```

- **1440, 1280 et 768 px** : capture directe (`--window-size=L,H`).
- **390 et 360 px** : Edge headless ne descend pas sous ~500 px. Écrire dans `<S>/emballage/` une page HTML qui contient une `<iframe>` de 390 (ou 360) px de large vers l'URL, servie par le même serveur si possible (ou en `file:///` avec l'URL absolue `http://127.0.0.1:1313/…`), et capturer cette page.
- Pages longues : augmenter la hauteur de fenêtre (ex. `1440,4000`) pour voir toute la page, ou capturer aux ancres de section (`#id`).
- Pages autonomes : `http://127.0.0.1:1313/interactifs/<nom>/`. Articles : leur URL, aux 5 largeurs, aux ancres de sections ; « Lire les comptes en images » aussi avec `?image=0` … `?image=9`.
- Passe **mouvement réduit** : refaire quelques captures avec `--force-prefers-reduced-motion`.
- **Console :** relancer avec `--enable-logging=stderr --v=0` et rechercher `Uncaught`, `Error`, `404` dans la sortie (rediriger vers un fichier du scratchpad).
- Regarder chaque capture (outil Read sur le PNG) avant d'en parler.

## 3. Ce qu'il faut vérifier sur les captures

- Aucune barre de défilement ni bande vide autour des iframes en hauteur automatique ; l'iframe a exactement la hauteur de son contenu.
- Les liens internes d'une page intégrée ouvrent la page du site (cible `_top`), pas l'iframe.
- Mobile : textes lisibles, cibles ≥ 44 px, pas de débordement horizontal, tableaux qui défilent horizontalement.
- Mode écran (`hauteur="ecran"`) : la page occupe l'écran sous l'en-tête de hugo-book et défile elle-même.
- Dessins : aucun tracteur rouge ou de marque ; un tracteur n'apparaît que neutre, attelé à une machine rouge type KUHN ; pas de logo KUHN.
- Pas de fond clair qui apparaît sous les décors (tutoriel en parallaxe).

## 4. Test de l'exercice fictif (section 7 du plan)

1. Vérifier d'abord qu'aucune modification n'est en cours dans `data/kuhn/` (`git status --porcelain data/kuhn/` doit être vide). Sinon, **ne pas faire le test** et le signaler.
2. Ajouter temporairement un exercice `2025` dans `data/kuhn/*.yaml` en copiant 2024 avec quelques valeurs modifiées, et marquer le dividende de 2025 `estime: true` (celui de 2024 devient alors connu : lui donner un montant plausible).
3. Compiler, puis capturer : « Où va l'argent » (2025 sélectionnable et sélectionnée par défaut), les tableaux (une colonne de plus), les graphiques de l'analyse (axe étendu), l'intro de l'usine, la scène 9 de « Lire les comptes en images » (« Comptes 2025 », badge d'estimation). Vérifier que « L'affaire des 2,6 % » reste sur 2024.
4. Remettre les données en l'état : `git restore data/kuhn/` puis contrôler que `git status --porcelain data/kuhn/` est vide.

## 5. Rapport

Liste courte et factuelle : page, largeur, constat, chemin complet de la capture. Distinguer « bloquant » et « à reprendre si possible ». Joindre les extraits de console fautifs. Ne pas proposer de correctifs détaillés dans le code sauf si c'est évident.

## Règles communes (section 4 du plan)

- Ne lire que le dépôt et le scratchpad ; aucune autre source.
- Jamais le profil Edge personnel : toujours `--user-data-dir` dans le scratchpad.
- Ne jamais commiter, pousser, ni annuler un diff en cours (hors `data/kuhn/` après le test fictif, et seulement si rien n'y était en cours).
- Arrêter le serveur Hugo que tu as lancé avant de rendre le rapport.
