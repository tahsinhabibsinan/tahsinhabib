/**
 * Shared validation rules, reused across document schemas so slug/URL
 * rules stay consistent instead of being redefined (and drifting) in each
 * schema file.
 *
 * Untyped `rule` params are intentional: Sanity's per-field Rule builders
 * (StringRule, SlugRule, UrlRule, ...) are structurally compatible but not
 * assignable to a single shared type, so these are written generically and
 * still get full type-checking on the chained calls at each call site via
 * inference.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const requiredSlug = (rule: any) =>
  rule.required().custom((value: { current?: string } | undefined) => {
    if (!value?.current) return "A slug is required.";
    const isValid = /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value.current);
    return isValid || "Slug must be lowercase letters, numbers, and hyphens only (e.g. my-project-name).";
  });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const optionalHttpUrl = (rule: any) =>
  rule.uri({ scheme: ["http", "https"], allowRelative: false });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const requiredTitle = (rule: any) => rule.required().min(2).max(120);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const requiredYear = (rule: any) =>
  rule
    .required()
    .regex(/^(19|20)\d{2}$/, { name: "4-digit year" })
    .error("Enter a 4-digit year, e.g. 2026.");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const requiredEmail = (rule: any) => rule.required().email();
