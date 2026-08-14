import type { StructureResolver } from "sanity/structure";
import {
  CaseIcon,
  DocumentTextIcon,
  RocketIcon,
  UserIcon,
  CogIcon,
  CommentIcon,
} from "@sanity/icons";

/**
 * Custom desk structure. `about` and `siteSettings` are singletons — this
 * pins each to exactly one editable document instead of letting editors
 * create duplicates, which is the #1 way singleton-style content breaks in
 * a default Studio.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site Settings")
        .icon(CogIcon)
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.listItem()
        .title("About")
        .icon(UserIcon)
        .child(S.document().schemaType("about").documentId("about")),
      S.divider(),
      S.documentTypeListItem("project").title("Projects").icon(CaseIcon),
      S.documentTypeListItem("article").title("Journal Articles").icon(DocumentTextIcon),
      S.documentTypeListItem("experiment").title("Lab Experiments").icon(RocketIcon),
      S.documentTypeListItem("testimonial").title("Testimonials").icon(CommentIcon),
    ]);
