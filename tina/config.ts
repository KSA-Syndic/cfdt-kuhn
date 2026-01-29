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

const mermaidTemplate = {
  name: "mermaid",
  label: "Diagramme Mermaid",
  match: {
    start: "{{<",
    end: ">}}",
    name: "mermaid",
  },
  fields: [
    { name: "children", label: "Code Mermaid", type: "string", ui: { component: "textarea" } },
  ],
};

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

// Template Hint (encarts colorés) - peut contenir des shortcodes (ou pas)
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
        { value: "warning", label: "⚠️ Attention (jaune)" },
        { value: "success", label: "💡 Succès/Astuce (vert)" },
        { value: "danger", label: "🚨 Danger (rouge)" },
      ],
    },
    {
      name: "children",
      label: "Contenu",
      type: "rich-text",
    },
  ],
};

// Template Details (accordéon) - peut contenir des shortcodes (ou pas)
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
    },
  ],
};

// Liste complète des templates pour le body
// pdfModalBtnTemplate et buttonTemplate sont déjà dans innerTemplates
const shortcodeTemplates = [
  hintTemplate,
  detailsTemplate,
  imageTemplate,
  iframeTemplate,
  htmlTemplate,
  mermaidTemplate,
  pdfModalBtnTemplate,
  buttonTemplate,
];

// Champ body avec shortcodes
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const bodyFieldWithShortcodes: any = {
  type: "rich-text",
  name: "body",
  label: "Contenu",
  isBody: true,
  templates: shortcodeTemplates,
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

  schema: {
    collections: [
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
