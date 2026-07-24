import type { BlogPost } from "./types";

export const localFallbackPosts: BlogPost[] = [
  {
    id: "local-editorial-workflow-v11",
    slug: "source-faithful-hacker-news-editorial-workflow",
    title: "Building a Source-Faithful Hacker News Editorial Workflow",
    description:
      "A practical account of rebuilding an automated n8n publisher so one real source—not a generic AI theme—controls the title, analysis, citations, and review gate.",
    contentHtml: "",
    contentMarkdown: `
An automated news workflow can be technically reliable and still publish the wrong article. The feed request succeeds, the model returns valid JSON, the CMS accepts the post, and the schedule runs on time. Yet the final page may barely cover the story that triggered it.

That was the failure mode in our earlier Hacker News publisher. A real headline entered the workflow, but the prompt also supplied a bundle of unrelated trending stories and broad instructions about AI, automation, and Huygen Studios. The model responded to the combined theme instead of the selected source. A story about a specific GPT result could become a general article about the “future of automation.” The pipeline was operationally successful and editorially unsuccessful.

This article documents the architecture we now use to keep the selected topic in control.

## Start with one editorial object

The workflow first creates a single source record. That record contains the exact Hacker News title, Hacker News item ID, discussion URL, outbound source URL, domain, score, comment count, and selection timestamp. Every downstream step receives that object.

The critical design decision is that other feed items are not passed to the writer. They can be used before selection to rank candidates or reject duplicates, but they are not writing context. Once a story is selected, the editorial scope narrows to one story.

This prevents a subtle form of context contamination. If five headlines are present, a language model often creates a synthesis even when asked to focus on one. Removing irrelevant context is more reliable than adding another sentence that says “do not mention the other stories.”

## Fetch the primary source and the discussion separately

Hacker News provides two useful but different forms of evidence:

1. The linked page explains the claim, release, project, research result, or event.
2. The discussion reveals questions, objections, edge cases, and practitioner experience.

The workflow fetches both. The linked page is converted to clean text with navigation, scripts, cookie notices, repeated whitespace, and obvious boilerplate removed. The Hacker News item and comments are fetched through the public Algolia API. Comments are treated as discussion context, not verified facts.

That distinction matters. A source page can support a statement such as “the project is released under this licence.” A comment can support only a statement such as “some participants questioned the benchmark.” If a comment makes a technical claim that the source does not confirm, the article labels it as an opinion or omits it.

The fetch step also has a stopping rule. If the outbound page is inaccessible, nearly empty, or does not contain enough evidence to explain the headline responsibly, the workflow holds the item for review. It does not fill the gap with general background paragraphs.

## Make title fidelity testable

“Write about the Hacker News topic” is subjective. A quality gate cannot evaluate it consistently. We replaced that instruction with a property the workflow can test:

- In news mode, the output title must begin with the normalized Hacker News title.
- The article body must contain one H1, and that H1 must match the output title.
- The source record is retained beside the draft so the gate can compare them.

Normalization removes punctuation differences and collapses whitespace, but it does not replace the subject with a synonym. If the source is titled “Shackle: A pre-execution HITL gate for AI agents,” an acceptable title can add a clarifying suffix after that title. “A New Era of Responsible Agentic Systems” is rejected because the actual project disappeared.

The same rule is applied after any recovery rewrite. A common automation bug is to enforce constraints on the first draft and forget that a second model call can remove them.

## Ask for an original contribution, not more words

Minimum word counts are a weak proxy for value. Our old parser appended stock sections when a draft was short. That made every article longer and the whole site more repetitive.

The new workflow never pads a draft. Instead, the writing prompt asks for at least one topic-specific contribution:

- a worked example using the actual tool or claim;
- a comparison with a named alternative;
- a failure-mode analysis;
- a decision table;
- an annotated implementation sequence;
- or a calculation that helps a reader evaluate the result.

The contribution must be supported by the source or clearly identified as the studio’s analysis. If the available material cannot support a useful article of roughly 800 words, the item is held. Publishing nothing is better than manufacturing apparent depth.

## Separate evidence, analysis, and attribution

The article format is intentionally flexible, but each draft must make three layers understandable.

**Evidence** covers what the primary source actually says or demonstrates. **Analysis** explains consequences, limitations, comparisons, and practical context. **Attribution** gives readers the original source and Hacker News discussion links.

The prompt forbids copied passages and long quotations. The draft should paraphrase, link, and add context. It also forbids forced studio promotion. Huygen Studios does not need to appear in every introduction, section, and conclusion; the site header and byline already identify the publisher.

## Use a deterministic gate after the model review

A second model checks accuracy, originality, source use, topic fidelity, repetition, and promotional language. That review is useful, but it is not the final authority. The workflow also performs deterministic checks:

- required fields exist;
- title and H1 fidelity pass;
- source and discussion URLs are present in news mode;
- the article has no duplicate H1;
- the content clears the configured word threshold without appended filler;
- quality and originality scores clear their thresholds;
- the source-fetch stage did not report insufficient evidence;
- and publishing credentials are private server credentials, not public keys.

The payload is prepared only when both layers pass.

## Keep human review as the default

The rebuilt workflow defaults to dry-run mode. Automatic publishing is disabled, and human approval is required. A reviewer should open the source, compare the headline and central claims, test every external link, inspect the article for unsupported certainty, and confirm that the original contribution is genuinely useful.

Only after repeated test runs in both morning and evening modes should a team consider changing that default. Even then, sensitive topics, weak sources, and unusual claims should always be routed to a person.

The lesson is broader than Hacker News. Editorial automation becomes safer when the system reduces ambiguity before generation, retains provenance through every node, tests the promises made by the prompt, and allows a weak source to produce no article at all.
`,
    publishedAt: "2026-07-23T13:00:00.000Z",
    updatedAt: "2026-07-23T13:00:00.000Z",
    authors: [{ name: "Huygen Studios Editorial Team", role: "Editorial and automation systems" }],
    category: { name: "AI Automation", slug: "ai-automation" },
    tags: ["n8n", "Hacker News", "Editorial Workflow", "Content Quality"].map((name) => ({ name })),
    coverImage: null,
    readingTime: "7 min read",
    canonicalUrl:
      "https://www.huygenstudios.com/blog/source-faithful-hacker-news-editorial-workflow",
  },
  {
    id: "local-nextjs-marble-sitemap",
    slug: "dynamic-nextjs-sitemap-for-headless-cms",
    title: "A Dynamic Next.js Sitemap for a Headless CMS",
    description:
      "How to keep canonical blog URLs, categories, products, and last-modified dates current when a headless CMS publishes independently of the website deployment.",
    contentHtml: "",
    contentMarkdown: `
A sitemap can return valid XML and still be operationally broken. The file may load at \`/sitemap.xml\`, contain the homepage, and pass a validator while omitting weeks of recently published articles.

That happened on this site because the application and the CMS have different release cycles. Next.js deployed the sitemap route, while Marble CMS continued publishing posts independently. The sitemap had a five-minute revalidation setting, but the production route remained stale and a webhook invalidated the path using the wrong semantics.

The fix required treating the sitemap as a live view of public content rather than a static deployment artifact.

## Define the canonical inventory first

Before changing caching, we listed the URLs that should and should not appear.

The public inventory includes the homepage, service pages, products, the CapInsta overview, About, Contact, legal policies, editorial standards, the author page, the blog index, reviewed articles, and non-empty blog categories. Administrative, authentication, preview, API, internal search, and empty taxonomy URLs are excluded.

This inventory is also useful outside the sitemap. It exposes orphan pages, inconsistent canonicals, and navigation gaps. If a page is important enough for the sitemap but cannot be reached from a relevant navigation or content link, its internal discovery path needs work.

All generated URLs use one origin: \`https://www.huygenstudios.com\`. The sitemap does not mix HTTP and HTTPS, or the root domain and \`www\`. A separate subdomain such as CapInsta should maintain its own sitemap; the main domain links to a canonical product overview on the main site instead of claiming the subdomain URL as part of its sitemap.

## Request fresh CMS data

The sitemap route calls the CMS posts list with a no-store request. This is deliberate. A normal blog page can tolerate a short cache window; the sitemap is small and should reflect the current public inventory whenever a crawler requests it.

The CMS fetch normalizes each post, accepts only published records, encodes the canonical slug, and filters anything awaiting editorial review. A CMS response that cannot be normalized is logged and omitted instead of producing a malformed URL.

For each accepted article, the sitemap uses \`updatedAt\` when available and falls back to \`publishedAt\`. Invalid timestamps fall back to a known site-update date. Categories are added only when at least one accepted article belongs to them, preventing empty archive pages from entering the index.

## Opt out of metadata-route caching explicitly

In the current Next.js version used by this project, metadata routes are cached unless configured otherwise. The sitemap therefore declares:

\`\`\`ts
export const dynamic = "force-dynamic";
export const revalidate = 0;
\`\`\`

The CMS request also uses \`cache: "no-store"\`. The two controls address different layers: route output and upstream data. Relying on only one made the system harder to reason about.

This is also why framework-version documentation matters. Cache APIs and invalidation profiles have changed between Next.js releases. Code copied from an older example may compile while preserving stale behavior.

## Revalidate immediately after CMS changes

Marble or the publishing workflow sends a signed request to the application’s revalidation endpoint after a publish, update, deletion, or slug change. The endpoint authenticates a private header or query secret and then invalidates:

- the blog index;
- the sitemap path;
- the shared Marble posts tag;
- the individual article path and article tag when a slug is supplied;
- and explicitly supplied old paths after a URL change.

For external webhooks, the tag is expired immediately with \`{ expire: 0 }\`. A stale-while-revalidate profile can intentionally serve the old value once more, which is useful for normal browsing but wrong when an external publishing system has just declared that content changed.

Slug changes need special handling. The webhook should send both the new slug and the old article path. The application can then invalidate both. The old URL should either redirect permanently to the new canonical URL or return a real 404 if no replacement exists; it should not keep serving duplicate content.

## Keep robots and canonical signals aligned

The robots file references the sitemap’s production URL and allows public pages. It blocks administrative and utility areas rather than trying to use robots rules as a substitute for \`noindex\`.

Every page emits a self-referencing canonical. Article canonicals are created from normalized slugs, category canonicals use the registered category slug, and the product overview stays canonical to the main domain. This alignment matters because a sitemap is only one signal. A sitemap URL that points to a page canonicalized elsewhere creates ambiguity instead of helping discovery.

Pages awaiting editorial review remain accessible for editors and existing links, but emit \`noindex, follow\` and do not appear in the sitemap or category collections. After review, the same quality predicate allows them back into all discovery surfaces.

## Verify the generated output, not just the source

The final test requests the production build’s actual routes. It checks that \`robots.txt\` and \`sitemap.xml\` return 200 responses with the expected content types, parses every \`<loc>\`, rejects foreign hosts, and confirms the presence of products, trust pages, and categories.

For a CMS-enabled environment, the test also compares the latest reviewed CMS publication timestamp with the newest article in the sitemap. Search Console should then be used to submit the sitemap and inspect representative URLs.

The durable pattern is simple: keep one canonical inventory, fetch external content deliberately, invalidate with the cache semantics of the installed framework version, and verify the output that a crawler actually receives.
`,
    publishedAt: "2026-07-23T12:00:00.000Z",
    updatedAt: "2026-07-23T12:00:00.000Z",
    authors: [{ name: "Huygen Studios Editorial Team", role: "Web and editorial systems" }],
    category: { name: "Cinematic Websites", slug: "cinematic-websites" },
    tags: ["Next.js", "Sitemap", "Technical SEO", "Marble CMS"].map((name) => ({ name })),
    coverImage: null,
    readingTime: "6 min read",
    canonicalUrl:
      "https://www.huygenstudios.com/blog/dynamic-nextjs-sitemap-for-headless-cms",
  },
  {
    id: "local-capinsta-caption-workflow",
    slug: "caption-workflow-for-short-form-video",
    title: "A Practical Caption Workflow for Short-Form Video",
    description:
      "A step-by-step method for generating, reviewing, styling, and exporting captions without treating automatic transcription as the finished edit.",
    contentHtml: "",
    contentMarkdown: `
Automatic captions save time, but the first transcript is not the finished video. Names, mixed-language phrases, sentence breaks, emphasis, and on-screen timing still need editorial judgment. A reliable caption workflow separates transcription from review, visual styling, and export.

CapInsta was built around that sequence. It is a browser-based AI video editor from Huygen Studios that creates word-timed captions, lets a creator correct them in context, and exports either the captioned video or reusable subtitle files. This guide explains the production method rather than promising that one click replaces an editor.

## Prepare the source before upload

Caption accuracy starts with the recording. Use the cleanest available export, avoid background music that competes with speech, and keep the speaker level consistent. If a clip has several takes, remove unused sections before transcription so review time is spent on material that will remain.

For short-form work, decide the intended frame before adding captions. Reframing a horizontal video after styling can place text over a face or outside a platform’s safe area. Leave visual room near the lower third, but remember that platform controls often occupy the bottom edge.

CapInsta supports English, Hinglish, Telgish, and mixed-language workflows. Select the mode that best describes the spoken content. Mixed-language transcription is useful, but brand names, people, places, and specialised terms should always be checked manually.

## Generate, then perform a transcript pass

After upload, generate captions and read the entire transcript before adjusting animation. This first pass answers factual questions:

- Are names and product terms correct?
- Did punctuation change the meaning?
- Are negations such as “not” present?
- Were numbers, prices, dates, or measurements transcribed accurately?
- Does a mixed-language phrase use the spelling the audience expects?

Edit the wording while listening to the corresponding moment. Do not “improve” a quote so much that it no longer represents what the speaker said. If the spoken line is unclear, either preserve the uncertainty, re-record, or remove the segment.

Next, adjust sentence and phrase boundaries. Captions are easier to follow when each visual unit expresses one short idea. A technically correct transcript can still be hard to read if it exposes a long sentence as one dense block.

## Use word emphasis to support comprehension

Active-word highlighting can help viewers follow speech, especially without sound. It becomes distracting when every word uses an aggressive scale, colour, or bounce. Choose a restrained preset, test it against fast and slow passages, and make sure the highlighted state remains readable on the video background.

Emphasis should follow meaning. A key result, contrast, or instruction may deserve stronger treatment; filler words usually do not. If every word appears equally urgent, the design stops providing hierarchy.

Check contrast across the whole clip, not only the opening frame. Text that works on a dark wall can disappear when the scene cuts to a bright screen. A subtle background, outline, or shadow may be necessary. Keep captions clear of faces, UI demonstrations, logos, and platform overlays.

## Review timing at normal speed

Word-level timing is a starting point. Play the full clip at normal speed and watch for captions that appear too late, disappear before a phrase finishes, or change so quickly that the viewer cannot read them.

Pay special attention to pauses, interruptions, and fast lists. A pause may need the previous phrase to remain visible slightly longer, while a rapid list may need fewer words per caption group. The goal is not to mirror every acoustic boundary; it is to preserve the speaker’s rhythm while giving the viewer enough time to understand.

Then perform a silent review. Mute the clip and confirm that the main message still makes sense. This catches missing context and unreadable transitions that are easy to overlook when the audio supplies the meaning.

## Choose the right export

Export a captioned video when the visual treatment is part of the creative and should look the same wherever the file is posted. Export SRT or VTT when captions need to remain selectable, editable, localisable, or accessible to a platform player.

Keeping a subtitle file beside the final video also creates a useful source for descriptions, translations, approvals, and future edits. Review the exported file rather than assuming the render matches the editor preview.

CapInsta currently runs as a free beta without requiring an account. Media is processed through temporary storage and removed after inactivity, but creators should still avoid uploading material they are not authorised to process. For confidential or regulated footage, confirm the applicable requirements before using any browser-based service.

The practical standard is straightforward: let automation produce the timed first draft, then use human review for meaning, readability, emphasis, and final delivery. That division saves time without pretending that transcription and editing are the same task.
`,
    publishedAt: "2026-07-23T11:00:00.000Z",
    updatedAt: "2026-07-23T11:00:00.000Z",
    authors: [{ name: "Huygen Studios Editorial Team", role: "Creative product guidance" }],
    category: { name: "Cinematic Websites", slug: "cinematic-websites" },
    tags: ["CapInsta", "Video Captions", "Short-form Video", "Accessibility"].map((name) => ({ name })),
    coverImage: {
      url: "/creatives/assets/Capinsta.png",
      alt: "CapInsta caption editor interface",
    },
    readingTime: "5 min read",
    canonicalUrl:
      "https://www.huygenstudios.com/blog/caption-workflow-for-short-form-video",
  },
];
