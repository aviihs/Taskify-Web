# Taskify SEO rollout

The homepage is the primary marketing destination for Taskify, Taskify app and
Taskify web searches. The current product supports Android and iOS. Browser
access is planned and must not be described as available before launch.

## After this branch is deployed

1. Check the correct Search Console property for
   `https://taskify.bhusalshiva.com.np`. Verification can use DNS or an existing
   account-owned verification method; no account-specific token is in this repo.
2. Submit `https://taskify.bhusalshiva.com.np/sitemap.xml`.
3. Use URL Inspection for the homepage and `/help/getting-started`. Check the
   live rendered page, indexing status and Google's selected canonical. Request
   indexing of the updated pages where appropriate.
4. Review the existing About, Contact and Privacy URLs for indexing issues.
5. Add the confirmed Google Play and App Store URLs to `src/data/home.json` when
   those listings are public. Update the availability copy in Home and Contact
   at the same time. Pricing is intentionally unspecified until confirmed.
6. Measure mobile performance and fix any observed loading or layout issues.
   This branch does not assume that a performance problem exists.
7. Track impressions, clicks and landing pages for Taskify, Taskify app, Taskify
   web and Taskify by Shiva Bhusal. Compare equivalent date ranges after pages
   have been crawled; the absence of a `site:` result alone is not an indexing
   diagnosis.

Add a relevant link to this marketing site from the creator's Taskify portfolio
entry and the app listings. Those external properties are outside this repo.

## Content maintenance

- The five public pages are `/`, `/help/getting-started`, `/about`, `/contact`
  and `/privacy-policy`.
- Keep each page's canonical URL, title, description, visible content and social
  card consistent. The production domain is the default canonical origin.
- `PUBLIC_ROUTES` in `src/lib/seo.ts` supplies the sitemap and plain-text site
  map. Update a route's `lastModified` after a significant content, metadata or
  link change. Update the guide's `lastUpdated` at the same time as its route
  date. Do not reset dates merely because a new build was deployed.
- The privacy policy's effective date describes the policy itself; its sitemap
  modification date can also reflect changes to page metadata or navigation.
- Update guide instructions against the app's released behaviour when the UI
  changes. Existing promotional images are labelled as app previews.
- Keep `/demo`, `/ocean` and private application routes out of the public sitemap.
- Structured data uses current product facts. Add prices or review information
  only when supported by real, visible product information.

## Browser launch: prepare `/web`

Publish this page when there is substantive verified browser-product information
or usable beta access. Do not publish an empty placeholder to target a keyword.

- Title: `Taskify Web | Manage Projects and Tasks in Your Browser`.
- H1: `Taskify Web — manage team tasks in your browser`.
- Include actual browser screenshots, supported features, account requirements,
  mobile/browser synchronisation details and a short setup explanation.
- Link a prominent `Open Taskify Web` action to the confirmed application URL.
- Add a self-referencing canonical, page metadata, a social card, breadcrumbs
  and accurate WebApplication structured data.
- Add `/web` to `PUBLIC_ROUTES`, the header, the footer and the homepage's product
  and platform sections. Link it to the getting-started guide and support.
- Update the planned-browser wording in Home, About, Contact, the guide,
  structured data, social cards and plain-text summaries together.
- Keep private browser workspaces and account pages out of search.

Further feature, pricing, comparison or blog pages should answer distinct user
questions supported by product knowledge or search data. No ranking position is
guaranteed by these changes.
