import project from "./project";
import article from "./article";
import experiment from "./experiment";
import about from "./about";
import siteSettings from "./siteSettings";
import testimonial from "./testimonial";
import seo from "./objects/seo";

// Note: the "cloudinary.asset" object type used by every image/video field
// above is registered globally by the cloudinarySchemaPlugin() in
// sanity.config.ts — it does not need to be (and cannot be) listed here.

export const schemaTypes = [
  // Documents
  project,
  article,
  experiment,
  about,
  siteSettings,
  testimonial,
  // Reusable objects
  seo,
];
