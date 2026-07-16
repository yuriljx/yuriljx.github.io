# Private visitor analytics

This Worker is the write-only analytics backend for `https://yuriljx.github.io`.

## Privacy design

- Raw IP addresses are never written to D1 or application logs.
- The Worker derives a daily HMAC-SHA-256 value from the visitor IP and a secret Worker binding. Including the UTC date makes the pseudonymous identifier rotate every day.
- The browser does not set cookies, local storage, or tracking identifiers.
- `Do Not Track` and `Global Privacy Control` signals are respected.
- Query strings, URL fragments, full referrers, and full user-agent strings are discarded.
- Records older than 365 days are deleted by a daily cron trigger.
- `/collect` accepts writes only from the production GitHub Pages origin. No public statistics endpoint exists.
- `/locale` returns only `zh`, `ja`, or `en` from Cloudflare's request country and does not write a database record.

## Administration

Run these commands from the repository root after authenticating Wrangler:

```powershell
node scripts/visitor-stats.mjs summary 30
node scripts/visitor-stats.mjs daily 30
node scripts/visitor-stats.mjs pages 30
node scripts/visitor-stats.mjs recent 20
```

`summary`, `daily`, and `pages` use a day range. `recent` uses a row limit. Daily unique visitor counts are estimates based on the daily rotating IP-derived hash; they cannot identify a person or link the same visitor across different UTC dates.
