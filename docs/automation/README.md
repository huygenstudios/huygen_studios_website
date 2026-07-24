# Content publisher workflow

Use the v11.1 evidence-gated workflow in this directory. It is generated from
the uploaded v10.5 workflow by `scripts/update-n8n-workflow.mjs`.

Import v11.1 as a new workflow and keep v10.5 and v11 inactive. Test both
content modes manually before activating the schedule.

## Publication safety

These are the safe defaults:

- `EDITORIAL_CLEANUP_MODE=true`
- `REQUIRE_HUMAN_REVIEW=true`
- `HUMAN_REVIEW_APPROVED=false`
- `AUTO_PUBLISH_ENABLED=false`
- `MIN_WORD_COUNT=800`
- `MIN_QUALITY_SCORE=88`
- `MIN_ORIGINALITY_SCORE=88`

`EDITORIAL_CLEANUP_MODE=true` is an additional hard stop. It prevents the
workflow from writing to Marble even if old n8n environment variables still
have automatic publishing enabled. Keep it enabled until the pre-remediation
CMS batch has been reviewed.

## Morning evidence brief

Morning mode no longer chooses a generic topic from a rotating SEO list. It
refuses to generate unless `MORNING_EDITORIAL_BRIEF_JSON` contains a reviewed,
first-party evidence pack.

Example:

```json
{
  "briefId": "capinsta-caption-timing-2026-07",
  "approvedForDraft": true,
  "topic": "What CapInsta's caption-timing review revealed about mixed-language video",
  "primaryKeyword": "mixed language video captions",
  "cluster": "CapInsta engineering",
  "searchIntent": "informational",
  "slug": "capinsta-mixed-language-caption-timing-review",
  "firstPartyEvidence": "Describe the real test setup, clips, observed transcription or timing failures, corrections, limitations, and measurements here. Use at least 200 characters. Do not provide claims that have not been checked.",
  "originalAssetDescription": "An anonymized timing comparison table from the actual test run, with clip type, correction type, and before/after timing notes.",
  "angleDifference": "Explain in at least 80 characters how this evidence and conclusion differ from every existing Huygen Studios article.",
  "sourceUrls": [],
  "relevantInternalLinks": [
    "/products/capinsta"
  ],
  "authorByline": "Huygen Studios Editorial Team",
  "reviewer": "Huygen Studios Editorial Team"
}
```

The workflow stops when the evidence, asset, approval, or distinct-angle fields
are missing. A language model is not allowed to invent the evidence pack.

## Evening source handling

News mode selects one Hacker News item, fetches its primary source, fetches the
discussion separately, and requires the exact HN title to lead both the article
title and H1. It rejects unrelated stories, generic AI reframing, filler
padding, unsupported source claims, and forced studio promotion.

The parser never appends checklists or generic sections to reach a word count.
One focused recovery attempt may remove problems, but it cannot introduce new
evidence or unrelated material.
