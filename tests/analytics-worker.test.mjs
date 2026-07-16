import assert from "node:assert/strict";
import test from "node:test";
import worker, {
  browserCategory,
  cleanPath,
  cleanReferrerHost,
  dailyVisitorHash,
  deviceCategory,
} from "../analytics-worker/src/index.js";

function createDatabase() {
  const calls = [];
  return {
    calls,
    prepare(sql) {
      const call = { sql, values: [] };
      calls.push(call);
      return {
        bind(...values) {
          call.values = values;
          return this;
        },
        async run() {
          return { success: true };
        },
      };
    },
  };
}

function analyticsRequest(headers = {}, payload = {}) {
  return new Request("https://analytics.example/collect", {
    method: "POST",
    headers: {
      Origin: "https://yuriljx.github.io",
      "Content-Type": "text/plain;charset=UTF-8",
      "CF-Connecting-IP": "203.0.113.42",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/136.0.0.0 Safari/537.36",
      ...headers,
    },
    body: JSON.stringify({
      path: "/?private=discarded#software",
      referrer: "https://example.org/article?id=private",
      language: "en-US",
      viewport: "xl",
      ...payload,
    }),
  });
}

test("stores only a daily pseudonymous visitor hash and minimized metadata", async () => {
  const DB = createDatabase();
  const response = await worker.fetch(analyticsRequest(), { DB, ANALYTICS_HMAC_KEY: "test-secret" });

  assert.equal(response.status, 204);
  assert.equal(DB.calls.length, 1);
  const values = DB.calls[0].values;
  assert.equal(values[3], "/");
  assert.equal(values[4], "example.org");
  assert.equal(values[7], "Chrome");
  assert.equal(values[8], "desktop");
  assert.equal(values[9], "en-US");
  assert.equal(values[10], "xl");
  assert.match(values[2], /^[a-f0-9]{64}$/);
  assert.ok(!JSON.stringify(values).includes("203.0.113.42"));
  assert.ok(!JSON.stringify(values).includes("private=discarded"));
  assert.ok(!JSON.stringify(values).includes("id=private"));
});

test("honors privacy signals and ignores bots", async () => {
  for (const headers of [
    { DNT: "1" },
    { "Sec-GPC": "1" },
    { "User-Agent": "Googlebot/2.1" },
  ]) {
    const DB = createDatabase();
    const response = await worker.fetch(analyticsRequest(headers), { DB, ANALYTICS_HMAC_KEY: "test-secret" });
    assert.equal(response.status, 204);
    assert.equal(DB.calls.length, 0);
  }
});

test("rejects other origins and exposes no read endpoint", async () => {
  const DB = createDatabase();
  const forbidden = await worker.fetch(
    analyticsRequest({ Origin: "https://attacker.example" }),
    { DB, ANALYTICS_HMAC_KEY: "test-secret" },
  );
  const readAttempt = await worker.fetch(new Request("https://analytics.example/stats"), { DB });
  assert.equal(forbidden.status, 403);
  assert.equal(readAttempt.status, 404);
  assert.equal(DB.calls.length, 0);
});

test("normalization and classification helpers are deterministic", async () => {
  assert.equal(cleanPath("/software?token=secret#view"), "/software");
  assert.equal(cleanPath("https://example.org/not-a-path"), "/");
  assert.equal(cleanReferrerHost("https://Sub.Example.org/a?b=c"), "sub.example.org");
  assert.equal(browserCategory("Mozilla/5.0 Edg/136.0 Chrome/136.0"), "Edge");
  assert.equal(deviceCategory("Mozilla/5.0 (iPhone; CPU iPhone OS 18_0) Mobile"), "mobile");

  const first = await dailyVisitorHash("secret", "2026-07-16", "203.0.113.42");
  const same = await dailyVisitorHash("secret", "2026-07-16", "203.0.113.42");
  const nextDay = await dailyVisitorHash("secret", "2026-07-17", "203.0.113.42");
  assert.equal(first, same);
  assert.notEqual(first, nextDay);
});

test("scheduled cleanup deletes records older than 365 days", async () => {
  const DB = createDatabase();
  let scheduledPromise;
  worker.scheduled({}, { DB }, { waitUntil(promise) { scheduledPromise = promise; } });
  await scheduledPromise;
  assert.match(DB.calls[0].sql, /-365 days/);
});
