# Changelog

All notable changes to this project are documented here, based on
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added
- Decap CMS admin panel at `/admin/index.html` with Netlify Identity + Git Gateway
  — 5 collections: hero, features, courses, teachers, contact.
- `content-loader.js` — fetches JSON from `/content/` and populates DOM via
  `data-content` attributes, with HTML fallback.
- `publish_mode: editorial_workflow` in CMS config for staged publishing.
- Netlify build hook for auto-deploy after CMS publish.

### Changed
- `athena-netlify-site/admin/config.yml` — all file paths updated to
  `athena-netlify-site/content/...` and `media_folder` to
  `athena-netlify-site/assets/` to match deploy directory.
- `athena-netlify-site/index.html` — added Netlify Identity widget for password
  reset flow.

### Fixed
- CMS changes not appearing on live site — root cause: site deployed via CLI,
  not linked to GitHub for auto-deploy. Fixed by adding build hook URL to config
  and triggering deploys via API.

### Added
- Comprehensive SEO overhaul: `robots.txt`, `sitemap.xml`, JSON-LD `LocalBusiness`
  schema (address, phone, hours, courses), `og:image`, canonical URLs, and
  `<noscript>` teacher-name fallback for Googlebot.
- Google Search Console property verified and sitemap submitted.
- Professional `README.md` with badges, table of contents, tech-stack table,
  project-structure tree, content-management guide, SEO section, and roadmap.
- Clean `.gitignore` excluding OS files, IDE folders, stale root artifacts, and
  Netlify build output.

### Changed
- `README.md` — complete rewrite with shields.io badges, structured sections,
  and deployment documentation.
- `LICENSE` — updated copyright year to 2026.

### Removed
- Stale root-directory files: `athena_school.html`, `netlify-ssl-guide.txt`,
  orphaned `.jpg` images, and `JOSE.jpg` — all superseded by content in
  `athena-netlify-site/`.

## [2026-06-18]

### Added
- Decap CMS admin panel with branded login page (owl logo, school name, slogan,
  orange/blue color scheme).
- Netlify Identity integration with Git Gateway for username+password CMS auth.
- CMS-invited user: `athena2298@gmail.com`.
- Custom domain `123athena.com` configured on Netlify with GoDaddy DNS
  (A record → `75.2.60.5`, CNAME → `athena-language-school.netlify.app`).
- `content-loader.js` — client-side script that fetches JSON data files and
  populates the DOM via `data-content` attributes.
- Editable content collections: hero, features, courses, teachers, contact
  (JSON files in `content/`).

### Changed
- `index.html` — refactored from hardcoded content to `data-content` attribute
  pattern for CMS-driven rendering.
- `admin/index.html` — added branding CSS (owl logo via `::before`, school name
  via `::after`, orange accent, dark sidebar gradient).

## [Initial]

### Added
- Athena Language School marketing website: bilingual (中文 / English) landing
  page, course and teacher sections, free-trial sign-up via Netlify Forms,
  interactive grammar mini-game, and LINE contact. Deployed on Netlify.
