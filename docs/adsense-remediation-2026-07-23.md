# Huygen Studios AdSense, content, and indexing remediation

Date: 23 July 2026  
Production origin: `https://www.huygenstudios.com`

## Executive assessment

The repeated “low value content” decision is consistent with the previous public blog, even though it contained many posts. Quantity was not the problem. The audit found 46 articles published in roughly two weeks, with strong signs of scaled, template-driven production. Several posts did not faithfully cover the source in their slug, repeated generic structures and promotional studio paragraphs, and combined unrelated Hacker News stories into one broad article.

The clearest example was the URL about “GPT-5.6 … convex optimization.” Its page title and H1 were “The AI Efficiency Paradox: Navigating the New Era of Automation and Oversight,” while the article mixed that story with unrelated Hacker News items. The page contained repeated Huygen Studios promotion and a stock implementation checklist. Morning articles also showed a repeated pattern: similar length, similar conversion-oriented framing, and six to seven studio mentions per article.

This conflicts with Google’s emphasis on unique, useful content and a good user experience, its prohibition on low-value or replicated publisher content, and its warning that scaled generative content without added value can violate spam policies:

- [AdSense: make sure your site has unique, high-quality content and a good user experience](https://support.google.com/adsense/answer/10015918)
- [Google Publisher Policies: low-value and replicated content](https://support.google.com/publisherpolicies/answer/11112688?hl=en-GB)
- [Google Search guidance for generative AI content](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content)
- [Google Search spam policies](https://developers.google.com/search/docs/essentials/spam-policies)

No code change can guarantee AdSense approval. The remediation removes the clearest policy and quality risks, improves trust and discovery, and introduces a safer publishing process. The old CMS batch still requires human review before it should return to the index.

## Issues found

### Content and editorial quality

1. Forty-six posts were published over a short period by an automated workflow.
2. Hacker News headlines were present in slugs but often absent from the page title and H1.
3. The writer received multiple unrelated stories, encouraging generic synthesis instead of one source-faithful article.
4. Articles included repeated introductions, broad “new era” framing, stock conclusions, FAQs, and checklists.
5. The parser padded short drafts with generic sections instead of rejecting them.
6. Studio promotion appeared repeatedly in informational articles, regardless of relevance.
7. The blog claimed “original research … sourced directly from developer sandboxes and live builds,” which was not an accurate description of the automated source process.
8. Hacker News discussions and linked sources were not consistently separated or attributed.
9. The company was marked up as a `Person` author, with no meaningful author or editorial page.
10. Existing category controls behaved like client filters, not durable crawlable category collections.
11. Pre-remediation morning articles were also visibly templated, not only the evening Hacker News articles.

### Trust and navigation

1. The site lacked a disclaimer, editorial standards, and a dedicated author page.
2. Footer trust navigation did not expose editorial or disclaimer information.
3. The main navigation did not include Products.
4. CapInsta had no substantial first-party overview on the main domain.
5. Huygen Creatives contained dead `#` links and a thin/noindex presentation dominated by client-rendered WebGL.
6. The old text logo remained in the main header; the supplied brand assets were unused.
7. Analytics loaded without an explicit site preference control.

### Sitemap and indexing

1. The live sitemap contained only eight posts through 10 July while the public blog contained 46 posts through 23 July.
2. The metadata sitemap route was cached even though Marble CMS publishes independently of deployments.
3. The revalidation endpoint called `revalidatePath("/sitemap.xml", "layout")` instead of invalidating the literal metadata path.
4. The webhook used a stale-while-revalidate tag profile, which could serve the old CMS list once more after publishing.
5. `robots.txt` blocked only `/api/` and did not state the intended treatment of admin, auth, preview, search, and utility routes.
6. Empty taxonomy pages had no explicit protection from becoming crawlable navigation targets.
7. Huygen Creatives was accidentally excluded from indexing despite now having a useful public purpose.
8. RSS referenced a deleted Android icon and used the same cached CMS behavior.
9. Several deleted favicon assets were still referenced by metadata before the update.
10. The Creatives page produced a duplicated brand suffix in its title.

## Changes made

### Editorial containment and new first-party content

- All CMS articles published on or before the 23 July remediation cutoff are treated as an editorial archive.
- Archived articles are excluded from the blog catalog, RSS, categories, and sitemap.
- A directly requested archived URL can remain available for review but emits `noindex, follow, nocache` and an archive notice when the CMS is connected.
- Three substantial, first-party cornerstone articles were added:
  - the source-faithful Hacker News workflow rebuild;
  - the dynamic Next.js/Marble sitemap implementation;
  - a practical CapInsta caption-production workflow.
- The three articles contain approximately 900–1,200 words each, have self canonicals, dates, categories, bylines, and `BlogPosting` structured data.
- The false “original research from developer sandboxes” claim was removed.
- Blog navigation now exposes only categories that contain reviewed, indexable articles.

### n8n workflow v11

The corrected follow-up file is `docs/automation/Huygen Hybrid SEO + HN Latest Auto Publisher v11.1 Evidence Gated Draft Safe.json`.

The new evening path:

1. selects one uncovered Hacker News item;
2. retains its exact title, item ID, source URL, and discussion URL;
3. fetches the primary linked page;
4. fetches the Hacker News item and discussion through Algolia;
5. builds a prompt containing only that selected story;
6. requires the output title to begin with the exact Hacker News title;
7. requires the single H1 to match the output title;
8. distinguishes source facts, discussion opinions, and original analysis;
9. requires source and discussion attribution;
10. rejects unrelated stories, generic theme substitution, copied passages, filler, and forced studio promotion.

The morning path now requires a topic-specific original contribution such as a worked example, comparison, decision table, failure-mode analysis, calculation, or annotated workflow. It explicitly varies openings and section order and does not require a stock FAQ, checklist, conclusion, or promotional paragraph.

The parser no longer appends filler to reach a word count. One focused recovery attempt is allowed. The deterministic gate checks source attribution, title/H1 fidelity, topic adherence, minimum useful length, quality, originality, credentials, and configured human approval.

Safety defaults:

- `EDITORIAL_CLEANUP_MODE=true`
- `AUTO_PUBLISH_ENABLED=false`
- `REQUIRE_HUMAN_REVIEW=true`
- `HUMAN_REVIEW_APPROVED=false`
- recommended `MIN_WORD_COUNT=800`
- recommended `MIN_QUALITY_SCORE=88`
- recommended `MIN_ORIGINALITY_SCORE=88`

The schedule now contains only 09:00 IST and 20:00 IST. The accidental extra schedule entry was removed.

The v11.1 morning path is also evidence-gated. It will not generate a generic
SEO article unless an approved `MORNING_EDITORIAL_BRIEF_JSON` supplies real
first-party evidence, a real original asset description, and a written
explanation of how the angle differs from existing articles.

### Dynamic sitemap and revalidation

- `/sitemap.xml` is request-time dynamic with `revalidate = 0`.
- Marble posts are fetched fresh for the sitemap.
- Only reviewed, canonical public posts are included.
- Non-empty blog categories are derived from those reviewed posts.
- Static routes include the homepage, service pages, products, CapInsta, trust pages, author page, blog, Creatives, and legal policies.
- `lastmod` uses CMS `updatedAt`, then `publishedAt`, with a safe fallback.
- Cover images are included where valid.
- The revalidation endpoint immediately expires the Marble list and article tags using `{ expire: 0 }`.
- Publish/update/delete webhooks invalidate the blog, sitemap, and article path; custom old paths can be supplied for slug changes.
- RSS is dynamic, uses fresh reviewed content, and references the new logo.

### Robots, canonicals, and metadata

- `robots.txt` allows public content and references the production sitemap.
- Admin, authentication, login, preview, API, thin search, and query-preview routes are disallowed.
- Main pages, products, categories, author, editorial, legal, and article pages have self-referencing canonicals.
- Important pages retain `index, follow`; the pre-remediation archive uses `noindex, follow`.
- Product and article structured data were added or corrected.
- The root Organization schema uses the new logo and an honest organization identity.
- The false `Person` author markup was replaced with an Organization author linked to the editorial-team page.

### Branding, Products, and CapInsta

- Added a reusable theme-aware brand component using all four supplied logo files.
- Dark navigation displays the white mark; `.theme-light` or `[data-theme="light"]` displays the black mark.
- Desktop uses the horizontal version; compact mobile navigation uses the vertical/compact version.
- Updated the main website and Huygen Creatives navigation.
- Added Products to the main and secondary navigation and footer.
- Added one product card only: CapInsta.
- Added `/products` and `/products/capinsta`.
- The CapInsta overview explains the audience, problem, workflow, features, exports, supported language modes, temporary storage, free-beta status, relationship to Huygen Studios, and the distinction between the main-domain overview and the product subdomain.
- Added `SoftwareApplication` structured data without duplicating the full subdomain page.

### Trust, consent, and usability

- Added Editorial Standards, Disclaimer, and Huygen Studios Editorial Team pages.
- Expanded the About page with ownership, process, editorial, and product context.
- Added visible publication/update information and byline links.
- Added a cookie preference notice; Google Analytics loads only after analytics consent.
- Updated the Cookie Policy to describe the preference storage and consent behavior.
- Added a useful 404 page.
- Added crawlable explanatory content and real internal links to Huygen Creatives.

## Verification completed

- `npm run lint`: passes with no errors; three unrelated pre-existing unused-variable warnings remain in `PortfolioMarquee3D.tsx`.
- `npm run build`: passes under Next.js 16.2.6, including TypeScript and all application routes.
- Local production smoke test:
  - 26 canonical sitemap URLs;
  - three reviewed article URLs;
  - two non-empty category URLs;
  - Products, CapInsta, Creatives, editorial, author, and legal pages present;
  - all sitemap hosts canonical to `https://www.huygenstudios.com`;
  - reviewed articles return 200, `index, follow`, self canonicals, and `BlogPosting` schema;
  - article word counts in rendered output are approximately 914, 1,031, and 1,202;
  - RSS returns successfully and uses the new logo.
- Workflow validation:
  - JSON parses;
  - 52 nodes;
  - all Code-node programs compile;
  - 09:00 and 20:00 schedules only;
  - primary-source, discussion-context, and source-faithful prompt nodes are connected;
  - old filler paragraph fragments are absent.

## Manual actions still required

1. Deploy these changes and verify the production build has `MARBLE_API_KEY`, `HUYGEN_REVALIDATE_SECRET`, and the review-cutoff variables.
2. Import v11 as a new n8n workflow. Keep v10.5 inactive.
3. Run manual executions in both `seo` and `news` modes with automatic publishing off.
4. Configure Marble and n8n publish/update/delete events to POST to `/api/revalidate` with `x-revalidate-secret`.
5. Review every pre-remediation CMS post. Substantively rewrite, merge, or delete it. Do not remove the cutoff until the old batch has been reviewed.
6. When an old URL is deleted or renamed, add an appropriate permanent redirect only when a genuine replacement exists.
7. Confirm that `pub-1790543418739606` in `ads.txt` and site metadata is the correct AdSense account.
8. Use a Google-certified consent-management platform before serving AdSense in regions where Google requires one. The local analytics choice is not a substitute for an AdSense-certified CMP.
9. Add real named contributor bios and credentials when the people are ready to be publicly identified; do not invent identities.
10. Give the CapInsta subdomain its own canonical, robots, sitemap, structured data, and Search Console property. A main-domain sitemap should not contain another host.
11. Add a visible “Built by Huygen Studios” link on the CapInsta subdomain back to `https://www.huygenstudios.com/products/capinsta`. The CapInsta application source is not present in this repository, so that backlink cannot be implemented here.
12. In Search Console, submit `/sitemap.xml`, inspect representative pages, request indexing after deployment, and monitor excluded/archive URLs.
13. Check AdSense Policy Center and Search Console manual actions/security reports before reapplying.

## Reapplication checklist

- [ ] Production deployment complete and visually checked on phone and desktop.
- [ ] New white/black logos render correctly on every active theme.
- [ ] v10.5 publisher deactivated.
- [ ] v11 morning and evening dry runs manually approved.
- [ ] No unreviewed workflow output is auto-published.
- [ ] Pre-remediation CMS batch reviewed, merged, rewritten, or left `noindex`.
- [ ] At least the three cornerstone articles remain live, useful, and internally linked.
- [ ] No empty categories or archive pages are linked.
- [ ] Sitemap contains current reviewed posts and returns valid XML.
- [ ] Robots references the canonical sitemap.
- [ ] Search Console sees the canonical HTTPS `www` property and current sitemap.
- [ ] Trust, editorial, author, contact, privacy, cookie, terms, and disclaimer pages are public.
- [ ] AdSense publisher ID and `ads.txt` verified.
- [ ] Certified AdSense CMP configured where required.
- [ ] Broken-link and mobile checks repeated on production.
- [ ] Wait for Google to recrawl the new information architecture before requesting another review.
