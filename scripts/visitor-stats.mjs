import { spawnSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const wrangler = resolve(root, "node_modules", "wrangler", "bin", "wrangler.js");
const config = resolve(root, "analytics-worker", "wrangler.jsonc");
const database = "jixiao-visitor-analytics";
const mode = process.argv[2] ?? "summary";
const numericArgument = Number(process.argv[3] ?? (mode === "recent" ? 20 : 30));

function boundedInteger(value, minimum, maximum, label) {
  if (!Number.isInteger(value) || value < minimum || value > maximum) {
    throw new Error(`${label} must be an integer between ${minimum} and ${maximum}.`);
  }
  return value;
}

const days = mode === "recent" ? null : boundedInteger(numericArgument, 1, 3650, "days");
const limit = mode === "recent" ? boundedInteger(numericArgument, 1, 100, "limit") : null;
const since = days === null ? null : `unixepoch('now', '-${days} days')`;

const queries = {
  summary: `WITH daily AS (
    SELECT visit_day, COUNT(*) AS page_views, COUNT(DISTINCT visitor_hash) AS unique_visitors
    FROM visits WHERE visited_at >= ${since} GROUP BY visit_day
  )
  SELECT COALESCE(SUM(page_views), 0) AS page_views,
         COALESCE(SUM(unique_visitors), 0) AS daily_unique_visitors,
         MIN(visit_day) AS first_day, MAX(visit_day) AS last_day
  FROM daily;`,
  daily: `SELECT visit_day, COUNT(*) AS page_views,
                 COUNT(DISTINCT visitor_hash) AS unique_visitors
          FROM visits WHERE visited_at >= ${since}
          GROUP BY visit_day ORDER BY visit_day DESC;`,
  pages: `SELECT path, COUNT(*) AS page_views,
                 COUNT(DISTINCT visit_day || ':' || visitor_hash) AS daily_unique_visitors
          FROM visits WHERE visited_at >= ${since}
          GROUP BY path ORDER BY page_views DESC, path ASC LIMIT 50;`,
  recent: `SELECT datetime(visited_at, 'unixepoch') AS visited_at_utc,
                  substr(visitor_hash, 1, 12) AS visitor,
                  path, referrer_host, country, region, browser, device, language, viewport
           FROM visits ORDER BY visited_at DESC LIMIT ${limit};`,
};

if (!(mode in queries)) {
  throw new Error("Mode must be one of: summary, daily, pages, recent.");
}

const result = spawnSync(
  process.execPath,
  [wrangler, "d1", "execute", database, "--remote", "--config", config, "--command", queries[mode]],
  { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] },
);

if (result.stdout) process.stdout.write(result.stdout);
if (result.stderr) process.stderr.write(result.stderr);
process.exitCode = result.status ?? 1;
