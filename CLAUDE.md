# cfdt-kuhn : règles pour Claude

## Écrire comme un militant, pas comme une IA

Tout texte lu par un visiteur (`content/**/*.md`, texte visible et `aria-label` des pages
`static/interactifs/`, `data/glossaire.yaml`, titres, légendes, textes alternatifs) doit pouvoir
avoir été écrit à la main par la section syndicale. On bannit les marques reconnaissables d'un
texte généré :

- **Ponctuation :** pas de tiret cadratin « — » ni de double tiret « -- » pour une incise, une
  pause ou après un intitulé en gras. Mettre une virgule, un deux-points, des parenthèses, ou
  couper la phrase en deux. Restent permis : « — » seul pour une valeur absente dans un tableau,
  le demi-cadratin « – » dans une plage (« 2021–2022 »), le signe moins « − », et la syntaxe
  `-->` / `-- texte -->` des schémas Mermaid.
- **Tournures :** pas de « Il ne s'agit pas de X, mais de Y », « Non seulement… mais aussi »,
  « Il est important (essentiel, crucial) de noter que », « En résumé », « En somme »,
  « Force est de constater », « Bonne nouvelle : », « Le résultat ? … » (question suivie de sa
  réponse), « véritable », « incontournable », « au cœur de », « dans un monde où ». Pas de
  phrase de conclusion qui répète ou fait la morale.
- **Rythme :** pas d'énumérations par trois systématiques (« simple, clair et efficace »), pas de
  paragraphes tous taillés pareil. Des phrases courtes, concrètes, au ton direct du site (« tu »).
- **Formatage :** pas de gras à chaque ligne, pas de listes là où une phrase suffit, pas
  d'emoji en tête de ligne ou de paragraphe, pas de titres avec une majuscule à chaque mot,
  pas de schéma « **Intitulé** — texte » en série (préférer un sous-titre ou une phrase).
- Le texte validé d'une maquette se recopie tel quel, **sauf** ces marques : les corriger et
  signaler chaque retouche dans le compte rendu.

Ces règles valent aussi pour les messages de commit et la documentation du dépôt.
