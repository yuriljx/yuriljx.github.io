import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("https://portfolio.example/", {
      headers: {
        accept: "text/html",
        host: "portfolio.example",
        "x-forwarded-host": "portfolio.example",
        "x-forwarded-proto": "https",
      },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the finished academic portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="en">/);
  assert.match(html, /<title>Jixiao Li \| Plant Science &amp; Research Software<\/title>/);
  assert.match(html, /Graduate School of Agriculture, Hokkaido University/);
  assert.match(html, /Postdoctoral Researcher/);
  assert.match(html, /yuriljx@gmail\.com/);
  assert.match(html, /Rice DH Record System/);
  assert.match(html, /Rice Genome Resource Finder/);
  assert.match(html, /Rice Trait Evidence Explorer/);
  assert.match(html, /RicePerturbNet/);
  assert.match(html, /STRIDE-DH/);
  assert.match(html, /Grape Length/);
  assert.match(html, />English<\/button>/);
  assert.match(html, />中文<\/button>/);
  assert.match(html, />日本語<\/button>/);
  assert.match(html, /doi\.org\/10\.2503\/hortj\.SZD-110/);
  assert.match(html, /Show earlier presentations/);
  assert.match(html, /Publications<\/a>.*Software<\/a>.*Presentations<\/a>/s);
  assert.doesNotMatch(html, /P2 Rice DH Record System|Aphros Trait Tool/);
  assert.equal((html.match(/class="software-case"/g) ?? []).length, 6);
});

test("keeps profile scope narrow and emits canonical social metadata", async () => {
  const response = await render();
  const html = await response.text();

  assert.doesNotMatch(html, /教育背景|工作经历|employment history|curriculum vitae/i);
  assert.doesNotMatch(html, /codex-preview|Starter Project|Your site is taking shape/i);
  assert.match(html, /property="og:image" content="https:\/\/yuriljx\.github\.io\/og\.png"/);
  assert.match(html, /name="twitter:card" content="summary_large_image"/);

  const requiredAssets = [
    "../public/og.png",
    "../public/software/p2/dashboard.png",
    "../public/software/genome/overview.png",
    "../public/software/trait/home.png",
    "../public/software/riceperturb/framework.png",
    "../public/software/grape/growth-curve.png",
    "../public/software/grape/detection-results.webp",
    "../public/publications/yolo-apple-framework.webp",
    "../public/publications/ice-nuclei-microscopy.webp",
  ];
  await Promise.all(requiredAssets.map((path) => access(new URL(path, import.meta.url))));

  const og = await readFile(new URL("../public/og.png", import.meta.url));
  assert.deepEqual([...og.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
});
