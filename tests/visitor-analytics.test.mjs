import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  ANALYTICS_ENDPOINT,
  referrerOrigin,
  viewportBucket,
} from "../app/visitor-analytics.js";

test("uses the deployed write-only endpoint and coarse viewport buckets", () => {
  assert.equal(ANALYTICS_ENDPOINT, "https://jixiao-visitor-analytics.yuriljx.workers.dev/collect");
  assert.equal(viewportBucket(479), "xs");
  assert.equal(viewportBucket(480), "sm");
  assert.equal(viewportBucket(900), "md");
  assert.equal(viewportBucket(1200), "lg");
  assert.equal(viewportBucket(1920), "xl");
});

test("transmits only the referrer origin", () => {
  assert.equal(referrerOrigin("https://example.org/article?id=private#section"), "https://example.org");
  assert.equal(referrerOrigin("not a url"), "");
});

test("client analytics does not use browser storage or cookies", async () => {
  const source = await readFile(new URL("../app/visitor-analytics.js", import.meta.url), "utf8");
  assert.doesNotMatch(source, /localStorage|sessionStorage|document\.cookie/);
  assert.match(source, /referrerPolicy: "no-referrer"/);
  assert.match(source, /navigator\.doNotTrack === "1"/);
});
