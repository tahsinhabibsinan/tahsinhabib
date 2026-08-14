/**
 * Centralized GROQ queries. Nothing outside lib/sanity should write raw
 * GROQ strings — import from here so query shape stays in one place and
 * stays in sync with lib/sanity/types.ts.
 */

const cloudinaryAssetFields = `
  _type,
  public_id,
  secure_url,
  resource_type,
  format,
  width,
  height
`;

const seoFields = `
  seo {
    title,
    description,
    ogImage { ${cloudinaryAssetFields} }
  }
`;

export const projectFields = `
  _id,
  title,
  slug,
  year,
  category,
  role,
  services,
  technologies,
  shortDescription,
  challenge,
  solution,
  process,
  result,
  thumbnail { ${cloudinaryAssetFields} },
  gallery[] { ${cloudinaryAssetFields} },
  video { ${cloudinaryAssetFields} },
  liveUrl,
  githubUrl,
  featured,
  sortOrder,
  publishedAt,
  ${seoFields}
`;

export const allProjectsQuery = `
  *[_type == "project"] | order(sortOrder asc, publishedAt desc) { ${projectFields} }
`;

export const featuredProjectsQuery = `
  *[_type == "project" && featured == true] | order(sortOrder asc, publishedAt desc) { ${projectFields} }
`;

export const projectBySlugQuery = `
  *[_type == "project" && slug.current == $slug][0] { ${projectFields} }
`;

export const allProjectSlugsQuery = `
  *[_type == "project" && defined(slug.current)][].slug.current
`;

const articleFields = `
  _id,
  title,
  slug,
  excerpt,
  coverImage { ${cloudinaryAssetFields} },
  body,
  author,
  publishedAt,
  updatedAt,
  tags,
  featured,
  ${seoFields}
`;

export const allArticlesQuery = `
  *[_type == "article"] | order(publishedAt desc) { ${articleFields} }
`;

export const articleBySlugQuery = `
  *[_type == "article" && slug.current == $slug][0] { ${articleFields} }
`;

export const allArticleSlugsQuery = `
  *[_type == "article" && defined(slug.current)][].slug.current
`;

const experimentFields = `
  _id,
  title,
  slug,
  description,
  technologies,
  image { ${cloudinaryAssetFields} },
  gallery[] { ${cloudinaryAssetFields} },
  liveUrl,
  githubUrl,
  featured,
  sortOrder,
  publishedAt
`;

export const allExperimentsQuery = `
  *[_type == "experiment"] | order(sortOrder asc, publishedAt desc) { ${experimentFields} }
`;

export const featuredExperimentsQuery = `
  *[_type == "experiment" && featured == true] | order(sortOrder asc, publishedAt desc) { ${experimentFields} }
`;

export const aboutQuery = `
  *[_type == "about"][0] {
    _id,
    name,
    headline,
    introduction,
    biography,
    profileImage { ${cloudinaryAssetFields} },
    currentFocus,
    timeline,
    capabilities,
    experience,
    skills,
    ${seoFields}
  }
`;

export const siteSettingsQuery = `
  *[_type == "siteSettings"][0] {
    _id,
    name,
    shortName,
    role,
    location,
    email,
    hero {
      eyebrow,
      headline,
      subline,
      highlight,
      description,
      image { ${cloudinaryAssetFields} },
      imageAlt,
      ctaText,
      ctaUrl
    },
    availabilityStatus,
    availabilityText,
    social,
    seo {
      siteTitle,
      siteDescription,
      ogImage { ${cloudinaryAssetFields} }
    }
  }
`;

export const allTestimonialsQuery = `
  *[_type == "testimonial"] | order(sortOrder asc) {
    _id,
    name,
    role,
    company,
    avatar { ${cloudinaryAssetFields} },
    quote,
    rating,
    featured,
    sortOrder
  }
`;

export const featuredTestimonialsQuery = `
  *[_type == "testimonial" && featured == true] | order(sortOrder asc) {
    _id,
    name,
    role,
    company,
    avatar { ${cloudinaryAssetFields} },
    quote,
    rating,
    featured,
    sortOrder
  }
`;
