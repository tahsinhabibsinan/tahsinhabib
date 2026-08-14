import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { cloudinarySchemaPlugin } from "sanity-plugin-cloudinary";
import { schemaTypes } from "./schemaTypes";
import { structure } from "./structure";
import { SINGLETON_TYPES } from "./singletons";

/**
 * Sanity Studio configuration.
 *
 * This is a standalone project (its own package.json/node_modules) so its
 * dependency tree — and React version — never collides with the Next.js
 * app at the repo root. Run it from inside /sanity:
 *
 *   cd sanity
 *   npm install
 *   npm run dev        # local studio at http://localhost:3333
 *   npm run deploy      # publishes to https://<your-studio-name>.sanity.studio
 *
 * See docs/SANITY.md for full setup steps, including creating the project
 * and setting CORS origins, and docs/CLOUDINARY.md for the one-time
 * in-Studio Cloudinary connection step the plugin below needs.
 */
export default defineConfig({
  name: "default",
  title: process.env.SANITY_STUDIO_TITLE || "Tahsin Habib — Portfolio CMS",

  // Set these in sanity/.env (see .env.example in this folder).
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || "",
  dataset: process.env.SANITY_STUDIO_DATASET || "production",

  plugins: [
    structureTool({ structure }),
    visionTool(),
    // Adds a real "cloudinary.asset" field type: editors click Browse,
    // then search/upload/select through Cloudinary's own Media Library
    // widget. Public ID, dimensions, and format are captured automatically
    // — no manual copy-pasting of IDs. Cloud name + API key are entered
    // once inside the Studio (Settings → Cloudinary), stored as a private
    // dataset document — never in this repo. See docs/CLOUDINARY.md.
    cloudinarySchemaPlugin(),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    // Singletons (Site Settings, About) never appear in the global "new
    // document" search/command palette — only the pinned desk-pane entry
    // in structure.ts can open them, so a second copy can't be created.
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === "global") {
        return prev.filter((template) => !SINGLETON_TYPES.has(template.templateId));
      }
      return prev;
    },
    // Singletons also lose "Duplicate" and "Delete" from their document
    // menu — duplicating would create a second one, deleting would leave
    // the site without required global content.
    actions: (prev, { schemaType }) => {
      if (SINGLETON_TYPES.has(schemaType)) {
        return prev.filter(({ action }) => !["duplicate", "delete"].includes(action ?? ""));
      }
      return prev;
    },
  },
});
