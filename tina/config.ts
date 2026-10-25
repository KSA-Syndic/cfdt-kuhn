import { defineConfig } from "tinacms";

const branch = process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";

// === TEMPLATES POUR LES SHORTCODES HUGO ===

// Templates simples (sans contenu rich-text imbriqué complexe)
const imageTemplate = {
  name: "image",
  label: "Image",
  match: {
    start: "{{<",
    end: ">}}",
    name: "image",
  },
  fields: [
    { name: "src", label: "Image", type: "image", required: true },
    { name: "alt", label: "Texte alternatif", type: "string" },
    { name: "title", label: "Titre", type: "string" },
    { name: "class", label: "Taille", type: "string", options: [{ value: "book-image--narrow", label: "Réduite (zoom au clic)" }] },
    { name: "loading", label: "Chargement", type: "string", options: [{ value: "lazy", label: "Différé (au défilement)" }] },
  ],
};

const iframeTemplate = {
  name: "iframe",
  label: "Iframe (site externe)",
  match: {
    start: "{{<",
    end: ">}}",
    name: "iframe",
  },
  fields: [
    { name: "src", label: "URL du site", type: "string", required: true },
    { name: "height", label: "Hauteur (ex: 600px)", type: "string" },
    { name: "title", label: "Titre (accessibilité)", type: "string" },
  ],
};

const htmlTemplate = {
  name: "html",
  label: "HTML personnalisé",
  match: {
    start: "{{<",
    end: ">}}",
    name: "html",
  },
  fields: [
    { name: "children", label: "Code HTML", type: "string", ui: { component: "textarea" } },
  ],
};

// Pas de template Mermaid : Tina n'enregistre pas un « children » en texte brut.
// Un diagramme s'écrit en bloc de code de langage « mermaid » (render-codeblock-mermaid du thème).

const pdfModalBtnTemplate = {
  name: "pdf_modal_btn",
  label: "Bouton PDF (modal)",
  match: {
    start: "{{<",
    end: ">}}",
    name: "pdf-modal-btn",
  },
  fields: [
    { name: "url", label: "URL du PDF", type: "string", required: true },
    { name: "text", label: "Texte affiché", type: "string", required: true },
    { name: "page", label: "Page à afficher", type: "string" },
    { name: "as", label: "Style", type: "string", options: [{ value: "link", label: "Lien" }, { value: "button", label: "Bouton" }] },
    { name: "title", label: "Titre de la modale (optionnel)", type: "string" },
  ],
};

const buttonTemplate = {
  name: "button",
  label: "Bouton",
  match: {
    start: "{{<",
    end: ">}}",
    name: "button",
  },
  fields: [
    { name: "href", label: "Lien (URL)", type: "string", required: true },
    { name: "text", label: "Texte du bouton", type: "string", required: true },
  ],
};

// === PAGES INTERACTIVES ET CHIFFRES KUHN (docs/pages-interactives.md) ===
// Ajouter ici chaque nouvelle page de static/interactifs/ et chaque tableau de data/kuhn/tableaux.yaml.
const pagesInteractives = [
  { value: "_modele", label: "Modèle (exemple)" },
  { value: "lire-les-comptes", label: "Lire les comptes en images (tutoriel, écran entier)" },
  { value: "ou-va-l-argent", label: "Où va l'argent d'une année ? (tableau dynamique)" },
  { value: "analyse-activite", label: "Résultats : graphique du chiffre d'affaires" },
  { value: "analyse-rentabilite", label: "Résultats : graphique de la marge d'EBITDA" },
  { value: "analyse-provisions", label: "Résultats : graphique de l'effet des provisions" },
  { value: "analyse-dividende", label: "Résultats : graphique du bénéfice et du dividende" },
  { value: "analyse-secteur", label: "Résultats : le secteur (onglets)" },
  { value: "affaire-2-6", label: "L'affaire des 2,6 % (enquête)" },
];

const tableauxKuhn = [
  { value: "rentabilite", label: "Rentabilité, année par année" },
  { value: "trois-perimetres", label: "Trois chiffres d'affaires (groupe, SAS, filiales)" },
  { value: "ebitda-mesures", label: "Trois mesures de l'EBITDA" },
  { value: "ebitda-par-annee", label: "Marges d'EBITDA : Pappers et méthode constante" },
  { value: "dividendes", label: "Dividendes reconstitués" },
  { value: "filiales", label: "Filiale par filiale" },
  { value: "fiabilite", label: "Fiabilité des chiffres" },
  { value: "badges-activite", label: "Badges : activité" },
  { value: "badges-rentabilite", label: "Badges : rentabilité" },
  { value: "badges-provisions", label: "Badges : provisions" },
  { value: "badges-dividende", label: "Badges : dividende" },
  { value: "flux-filiales", label: "Cartes : flux avec les filiales" },
];

// Page autonome de static/interactifs/<nom>/ dans une iframe
const interactifTemplate = {
  name: "interactif",
  label: "Page interactive",
  match: {
    start: "{{<",
    end: ">}}",
    name: "interactif",
  },
  fields: [
    { name: "nom", label: "Page", type: "string", required: true, options: pagesInteractives },
    { name: "titre", label: "Titre (accessibilité)", type: "string", required: true },
    {
      name: "hauteur",
      label: "Hauteur",
      type: "string",
      options: [
        { value: "auto", label: "Hauteur du contenu" },
        { value: "ecran", label: "Écran entier (la page défile elle-même)" },
      ],
    },
    { name: "pleine_largeur", label: "Pleine largeur", type: "string", options: [{ value: "true", label: "Oui" }] },
    { name: "hauteur_min", label: "Hauteur minimale avant chargement (px)", type: "string" },
  ],
};

// Tableau de data/kuhn/tableaux.yaml, produit à la compilation
const tableauKuhnTemplate = {
  name: "tableau_kuhn",
  label: "Tableau de chiffres KUHN",
  match: {
    start: "{{<",
    end: ">}}",
    name: "tableau-kuhn",
  },
  fields: [
    { name: "_value", label: "Tableau", type: "string", required: true, options: tableauxKuhn },
  ],
};

// Bulle mouvante : ouvre une page interactive en plein écran, ou mène à une page (layouts/shortcodes/bulle-lien.html)
const bulleLienTemplate = {
  name: "bulle_lien",
  label: "Bulle-lien (plein écran ou lien)",
  match: {
    start: "{{<",
    end: ">}}",
    name: "bulle-lien",
  },
  fields: [
    { name: "nom", label: "Page interactive à ouvrir en plein écran", type: "string", options: pagesInteractives },
    { name: "href", label: "Page visée sans plein écran (lien vers le .md)", type: "string" },
    { name: "titre", label: "Titre", type: "string", required: true },
    { name: "texte", label: "Phrase sous le titre", type: "string" },
    {
      name: "dessin",
      label: "Dessin",
      type: "string",
      options: [
        { value: "comptes", label: "Paysage et convoi (lire les comptes)" },
        { value: "tableau", label: "Tableau dynamique" },
        { value: "enquete", label: "Tableau de liège (l'enquête des 2,6 %)" },
      ],
    },
  ],
};

// Templates utilisables à l'intérieur des conteneurs (hint, details) : tous sauf les conteneurs eux-mêmes
const innerTemplates = [
  imageTemplate,
  iframeTemplate,
  htmlTemplate,
  pdfModalBtnTemplate,
  buttonTemplate,
  interactifTemplate,
  tableauKuhnTemplate,
  bulleLienTemplate,
];

// Template Hint (encarts colorés) - peut contenir des shortcodes
// note, tip, important et caution reprennent les couleurs des encadrés > [!NOTE] du thème
const hintTemplate = {
  name: "hint",
  label: "Encart coloré (Hint)",
  match: {
    start: "{{<",
    end: ">}}",
    name: "hint",
  },
  fields: [
    {
      name: "type",
      label: "Type",
      type: "string",
      required: true,
      options: [
        { value: "info", label: "ℹ️ Info (bleu)" },
        { value: "note", label: "📝 Note (bleu)" },
        { value: "warning", label: "⚠️ Attention (jaune)" },
        { value: "success", label: "💡 Succès/Astuce (vert)" },
        { value: "tip", label: "✅ Conseil (vert)" },
        { value: "important", label: "❗ Important (violet)" },
        { value: "danger", label: "🚨 Danger (rouge)" },
        { value: "caution", label: "🛑 Prudence (rouge)" },
      ],
    },
    {
      name: "children",
      label: "Contenu",
      type: "rich-text",
      templates: innerTemplates,
    },
  ],
};

// Template Details (accordéon) - peut contenir des shortcodes, encarts compris
const detailsTemplate = {
  name: "details",
  label: "Accordéon (Details)",
  match: {
    start: "{{<",
    end: ">}}",
    name: "details",
  },
  fields: [
    { name: "title", label: "Titre (visible)", type: "string", required: true },
    {
      name: "children",
      label: "Contenu (caché)",
      type: "rich-text",
      templates: [hintTemplate, ...innerTemplates],
    },
  ],
};

// Liste complète des templates pour le body
const shortcodeTemplates = [hintTemplate, detailsTemplate, ...innerTemplates];

// Champ body avec shortcodes
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const bodyFieldWithShortcodes: any = {
  type: "rich-text",
  name: "body",
  label: "Contenu",
  isBody: true,
  templates: shortcodeTemplates,
};

// === PAGE D'ACCUEIL : cartes en colonnes ===
// Les cartes se posent directement dans les colonnes, sans liste à puces : Tina colle sur une seule
// ligne une carte placée dans un élément de liste (titre et texte fusionnés).
const cardTemplate = {
  name: "card",
  label: "Carte",
  match: {
    start: "{{<",
    end: ">}}",
    name: "card",
  },
  fields: [
    { name: "href", label: "Lien (facultatif, toute la carte devient cliquable)", type: "string" },
    { name: "children", label: "Contenu", type: "rich-text" },
  ],
};

const columnsTemplate = {
  name: "columns",
  label: "Colonnes de cartes",
  match: {
    start: "{{%",
    end: "%}}",
    name: "columns",
  },
  fields: [
    { name: "children", label: "Cartes (côte à côte)", type: "rich-text", templates: [cardTemplate] },
  ],
};

// Bloc d'ouverture (layouts/shortcodes/hero.html) : remplace un <div class="book-hero"> brut, verrouillé dans Tina
const heroTemplate = {
  name: "hero",
  label: "Bloc d'ouverture (logo, grand titre, présentation)",
  match: {
    start: "{{%",
    end: "%}}",
    name: "hero",
  },
  fields: [
    { name: "children", label: "Contenu", type: "rich-text", templates: innerTemplates },
  ],
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const bodyFieldAccueil: any = {
  ...bodyFieldWithShortcodes,
  templates: [heroTemplate, columnsTemplate, cardTemplate, ...shortcodeTemplates],
};

export default defineConfig({
  branch,
  clientId: process.env.TINA_PUBLIC_CLIENT_ID,
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "static",
  },
  media: {
    tina: {
      publicFolder: "static",
      mediaRoot: "uploads",
    },
  },

  // Recherche de l'admin : index construit au déploiement (tinacms build) et envoyé à TinaCloud.
  // Clé : TinaCloud > projet > Tokens > Search, en secret GitHub TINA_SEARCH_TOKEN (et dans .env en local).
  search: {
    tina: {
      indexerToken: process.env.TINA_SEARCH_TOKEN,
      stopwordLanguages: ["fra"],
    },
    indexBatchSize: 100,
    maxSearchIndexFieldLength: 100,
  },

  schema: {
    collections: [
      // === 0. ACCUEIL ===
      {
        name: "page_accueil",
        label: "Accueil",
        path: "content",
        format: "md",
        match: {
          include: "_index",
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          { type: "string", name: "title", label: "Titre", isTitle: true, required: true },
          // pas de case « Brouillon » : cochée par erreur, elle retirerait la page d'accueil du site
          { type: "datetime", name: "date", label: "Date" },
          { type: "boolean", name: "bookToC", label: "Afficher table des matières latérale" },
          bodyFieldAccueil,
        ],
      },

      // === 1. ACTUALITÉS ===
      {
        name: "mon_actualite",
        label: "Actualités",
        path: "content/actualites",
        format: "md",
        match: {
          include: "**/*",
          exclude: "_*",
        },
        defaultItem: () => ({
          date: new Date().toISOString(),
          draft: true,
          bookToC: false,
          type: "posts",
        }),
        ui: {
          filename: {
            slugify: (values) => {
              const date = new Date().toISOString().split("T")[0];
              const slug = values.title?.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "") || "nouvelle";
              return `${date}-${slug}`;
            },
          },
        },
        fields: [
          { type: "string", name: "title", label: "Titre", isTitle: true, required: true },
          { type: "datetime", name: "date", label: "Date" },
          { type: "boolean", name: "draft", label: "Brouillon" },
          { type: "boolean", name: "bookToC", label: "Afficher table des matières latérale" },
          { type: "string", name: "type", label: "Type", options: ["posts"], ui: { component: "hidden" } },
          { type: "string", name: "tags", label: "Tags", list: true, ui: { component: "tags" } },
          bodyFieldWithShortcodes,
        ],
      },

      // === 2. DROITS ===
      {
        name: "mes_droits",
        label: "Droits",
        path: "content/droits",
        format: "md",
        match: {
          include: "**/*",
          exclude: "_*",
        },
        defaultItem: () => ({
          date: new Date().toISOString(),
          draft: true,
          bookToC: true,
          type: "docs",
        }),
        fields: [
          { type: "string", name: "title", label: "Titre", isTitle: true, required: true },
          { type: "datetime", name: "date", label: "Date" },
          { type: "boolean", name: "draft", label: "Brouillon" },
          { type: "boolean", name: "bookToC", label: "Afficher table des matières latérale" },
          { type: "string", name: "type", label: "Type", options: ["docs"], ui: { component: "hidden" } },
          { type: "string", name: "tags", label: "Tags", list: true, ui: { component: "tags" } },
          bodyFieldWithShortcodes,
        ],
      },

      // === 3. OUTILS ===
      {
        name: "mes_outils",
        label: "Outils",
        path: "content/outils",
        format: "md",
        match: {
          include: "**/*",
          exclude: "_*",
        },
        defaultItem: () => ({
          date: new Date().toISOString(),
          draft: true,
          bookToC: false,
          type: "docs",
        }),
        fields: [
          { type: "string", name: "title", label: "Titre", isTitle: true, required: true },
          { type: "datetime", name: "date", label: "Date" },
          { type: "boolean", name: "draft", label: "Brouillon" },
          { type: "boolean", name: "bookToC", label: "Afficher table des matières latérale" },
          { type: "string", name: "type", label: "Type", options: ["docs"], ui: { component: "hidden" } },
          { type: "string", name: "tags", label: "Tags", list: true, ui: { component: "tags" } },
          { type: "number", name: "weight", label: "Ordre d'affichage" },
          bodyFieldWithShortcodes,
        ],
      },

      // === 4. DOCUMENTS ===
      {
        name: "page_documents",
        label: "Documents",
        path: "content",
        format: "md",
        match: {
          include: "documents",
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          { type: "string", name: "title", label: "Titre", isTitle: true, required: true },
          { type: "datetime", name: "date", label: "Date" },
          { type: "boolean", name: "bookToC", label: "Afficher table des matières latérale" },
          { type: "string", name: "type", label: "Type", options: ["posts"], ui: { component: "hidden" } },
          bodyFieldWithShortcodes,
        ],
      },

      // === 5. CONTACT ===
      {
        name: "page_contact",
        label: "Contact",
        path: "content",
        format: "md",
        match: {
          include: "contact",
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          { type: "string", name: "title", label: "Titre", isTitle: true, required: true },
          { type: "datetime", name: "date", label: "Date" },
          { type: "boolean", name: "bookToC", label: "Afficher table des matières latérale" },
          { type: "string", name: "type", label: "Type", options: ["posts"], ui: { component: "hidden" } },
          bodyFieldWithShortcodes,
        ],
      },
    ],
  },
});
