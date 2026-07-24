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
  assert.match(html, /lijixiao327@gmail\.com/);
  assert.doesNotMatch(html, /yuriljx@gmail\.com/);
  assert.match(html, /Rice DH Record System/);
  assert.match(html, /CallusTrack/);
  assert.match(html, /Rice Genome Resource Finder/);
  assert.match(html, /Rice Trait Evidence Explorer/);
  assert.match(html, /RicePerturbNet/);
  assert.match(html, /STRIDE-DH/);
  assert.match(html, /Grape Length/);
  assert.match(html, /View project repository/);
  assert.doesNotMatch(html, /View public code/);
  assert.match(html, /https:\/\/github\.com\/yuriljx\/rice-dh-record-system-showcase/);
  assert.match(html, /https:\/\/github\.com\/yuriljx\/callustrack-showcase/);
  assert.match(html, /https:\/\/github\.com\/yuriljx\/rice-genome-resource-finder-showcase/);
  assert.match(html, /https:\/\/github\.com\/yuriljx\/rice-trait-evidence-explorer-showcase/);
  assert.match(html, /https:\/\/github\.com\/yuriljx\/riceperturbnet-showcase/);
  assert.match(html, /https:\/\/github\.com\/yuriljx\/stride-dh-showcase/);
  assert.match(html, /https:\/\/github\.com\/yuriljx\/Grape_Length/);
  assert.match(html, /v0\.7\.2/);
  assert.match(html, /v7\.14\.0/);
  assert.match(html, /v0\.8\.4/);
  assert.match(html, /v0\.16\.0\.dev2/);
  assert.match(html, /v0\.2\.0/);
  assert.match(html, /v0\.5\.0/);
  assert.doesNotMatch(html, /v0\.5\.12|v7\.9\.8|v0\.1\.1/);
  assert.match(html, /aria-label="Select language"/);
  assert.match(html, /<span>English<\/span>/);
  assert.match(html, /<span>中文<\/span>/);
  assert.match(html, /<span>日本語<\/span>/);
  assert.match(html, /aria-label="Switch to dark theme"/);
  assert.match(html, /EVIDENCE GRAPH/);
  assert.match(html, /class="evidence-graph"/);
  assert.match(html, /Peer-reviewed papers/);
  assert.match(html, /Research software/);
  assert.match(html, /doi\.org\/10\.2503\/hortj\.SZD-110/);
  assert.match(html, /Show earlier presentations/);
  assert.match(html, /Publications<\/a>.*Software<\/a>.*Presentations<\/a>.*Patents<\/a>.*Projects<\/a>/s);
  assert.match(html, /id="presentations".*id="patents".*id="projects"/s);
  assert.match(html, /class="patent-summary"[^>]*aria-expanded="false"/);
  assert.match(html, /id="patent-list" hidden=""/);
  assert.match(html, /7 patent records/);
  assert.match(html, /CN117747967A/);
  assert.match(html, /CN117747955A/);
  assert.match(html, /CN212808065U/);
  assert.match(html, /CN109201659A/);
  assert.match(html, /CN204460473U/);
  assert.match(html, /CN204420843U/);
  assert.match(html, /CN203396717U/);
  assert.equal((html.match(/class="hero-gallery /g) ?? []).length, 2);
  assert.match(html, /aria-roledescription="carousel"/);
  assert.match(html, /Previous visual: Laboratory and culture research visuals/);
  assert.match(html, /Next visual: Field and greenhouse research visuals/);
  assert.match(html, /class="hero-title-word/);
  assert.match(html, /<button type="button" class="floating-back-to-top/);
  assert.doesNotMatch(html, /class="floating-back-to-top[^"]*" href="#top"/);
  assert.doesNotMatch(html, /<figcaption><span>1 \/ [234]<\/span>/);
  assert.doesNotMatch(html, /class="section-code"|class="software-index"|class="talk-code"|01—03/);
  assert.doesNotMatch(html, /Research · Publications · Software/);
  assert.doesNotMatch(html, /P2 Rice DH Record System/);
  assert.match(html, /\/software\/callustrack\/annotation-workspace\.png/);
  assert.match(html, /\/research\/microspore-fluorescence\.webp/);
  assert.match(html, /\/research\/rice-greenhouse\.webp/);
  assert.match(html, /\/research\/grape-field\.webp/);
  assert.doesNotMatch(html, /\/software\/p2\//);
  assert.doesNotMatch(html, /Sun 2023 sample-dependence audit/);
  assert.equal((html.match(/class="software-case"/g) ?? []).length, 7);
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
    "../public/software/rice-dh/workflow-overview.png",
    "../public/software/callustrack/annotation-workspace.png",
    "../public/software/callustrack/review-matrix.png",
    "../public/software/callustrack/controlled-export.png",
    "../public/software/genome/interface-overview.png",
    "../public/software/genome/search-options.png",
    "../public/software/genome/audit-output.png",
    "../public/software/trait/evidence-overview.png",
    "../public/software/trait/comparison-panel.png",
    "../public/software/trait/coverage-dashboard.png",
    "../public/software/riceperturb/architecture-overview.png",
    "../public/software/riceperturb/scope-boundaries.png",
    "../public/software/riceperturb/pca-qc-public-data.png",
    "../public/software/stride/validation-pipeline.png",
    "../public/software/stride/synthetic-calibration.png",
    "../public/software/stride/identifiability-boundary.png",
    "../public/research/microspore-fluorescence.webp",
    "../public/research/rice-greenhouse.webp",
    "../public/research/grape-field.webp",
    "../public/software/grape/growth-curve.png",
    "../public/software/grape/detection-results.webp",
    "../public/publications/yolo-apple-framework.webp",
    "../public/publications/ice-nuclei-microscopy.webp",
  ];
  await Promise.all(requiredAssets.map((path) => access(new URL(path, import.meta.url))));

  const og = await readFile(new URL("../public/og.png", import.meta.url));
  assert.deepEqual([...og.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
});
