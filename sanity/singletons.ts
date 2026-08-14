/**
 * Document types that must exist as exactly one document. Referenced by
 * both structure.ts (pins the desk pane to a single document) and
 * sanity.config.ts (removes these types from the global "new document"
 * search/command palette and strips their duplicate/delete actions) — the
 * desk-pane restriction alone isn't enough, since the global "+" menu and
 * command palette can otherwise create a second one directly.
 */
export const SINGLETON_TYPES = new Set(["siteSettings", "about"]);
