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

test("server-renders the CV-aligned academic portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="en">/);
  assert.match(html, /<title>Jixiao Li, PhD \| Plant Breeding &amp; Non-destructive Phenotyping<\/title>/);
  assert.match(html, /application\/ld\+json/);

  // Identity is aligned with the October 2026 CV.
  assert.match(html, /Experimental Farm, Field Science Center for Northern Biosphere, Hokkaido University/);
  assert.doesNotMatch(html, /Graduate School of Agriculture, Hokkaido University/);
  assert.match(html, /Postdoctoral Researcher/);
  assert.match(html, /mailto:[^"\s<>]+@[^"\s<>]+/);
  assert.match(html, /0000-0003-2377-1011/);
  assert.doesNotMatch(html, /tel:|\+\d[\d\s().-]{7,}/i, "phone numbers must stay off the public site");
  assert.doesNotMatch(html, /\b\d+\s+citations\b|h-index/i, "citation counts are not emphasised");

  // Hero and key numbers.
  assert.match(html, /class="hero-title-word/);
  assert.match(html, /Peer-reviewed journal articles/);
  assert.match(html, /First-author articles/);
  assert.match(html, /Manuscripts submitted \/ under review/);
  assert.match(html, /PI grant proposals under review/);
  assert.match(html, /class="live-figure"/);
  assert.match(html, /role="tablist"/);
  assert.equal((html.match(/class="hero-gallery /g) ?? []).length, 2);
  assert.match(html, /aria-roledescription="carousel"/);

  // Navigation order.
  assert.match(html, /Research<\/a>.*Publications<\/a>.*Software<\/a>.*Talks &amp; teaching<\/a>.*Background<\/a>.*Contact<\/a>/s);
  assert.match(html, /id="research".*id="publications".*id="software".*id="teaching".*id="background".*id="contact"/s);

  // Research themes.
  assert.match(html, /Rice breeding methods/);
  assert.match(html, /Non-destructive phenotyping in the field/);
  assert.match(html, /Ploidy, phenotype and fruit quality/);
  assert.match(html, /0\.931/);
  assert.match(html, /89 detached berries/);

  // Publications and manuscripts.
  assert.equal((html.match(/class="publication-item/g) ?? []).length, 8);
  assert.equal((html.match(/class="publication-item is-first"/g) ?? []).length, 4);
  assert.match(html, /doi\.org\/10\.2503\/hortj\.SZD-110/);
  assert.match(html, /95\(3\), 378–388/);
  assert.match(html, /Plant, Cell &amp; Environment/);
  assert.match(html, /within-family genomic prediction in rice nested association mapping families/);

  // Software: two open packages, five showcase tools, STRIDE-DH retired.
  assert.match(html, /Grape_Length/);
  assert.match(html, /Rice genomic selection: frozen-prediction reproduction/);
  assert.match(html, /10\.5281\/zenodo\.23438608/);
  assert.match(html, /https:\/\/github\.com\/yuriljx\/rice-genomic-selection-validation/);
  assert.equal((html.match(/class="open-card"/g) ?? []).length, 2);
  assert.equal((html.match(/class="tool-card"/g) ?? []).length, 5);
  for (const repo of ["rice-dh-record-system-showcase", "callustrack-showcase", "rice-genome-resource-finder-showcase", "rice-trait-evidence-explorer-showcase", "riceperturbnet-showcase"]) {
    assert.match(html, new RegExp(`https://github\\.com/yuriljx/${repo}`));
  }
  assert.doesNotMatch(html, /STRIDE-DH|stride-dh-showcase/);

  // Talks and teaching.
  assert.match(html, /Beyond disciplinary boundaries/);
  assert.match(html, /youtu\.be\/tVO-jczRqH4/);
  assert.match(html, /youtu\.be\/vgzPPp1OPFU/);
  assert.match(html, /youtu\.be\/hOwTLg4ojQg/);
  assert.match(html, /Show earlier presentations/);
  assert.doesNotMatch(html, /Science and Engineering Fair/);

  // Background, patents, language and theme controls.
  assert.match(html, /Hebei Tongbiao Testing Technology/);
  assert.match(html, /1,480/);
  assert.match(html, /class="patent-summary"[^>]*aria-expanded="false"/);
  assert.match(html, /id="patent-list" hidden=""/);
  for (const number of ["CN117747967A", "CN117747955A", "CN212808065U", "CN109201659A", "CN204460473U", "CN204420843U", "CN203396717U"]) {
    assert.match(html, new RegExp(number));
  }
  assert.match(html, /aria-label="Select language"/);
  assert.match(html, /<span>English<\/span>/);
  assert.match(html, /<span>中文<\/span>/);
  assert.match(html, /<span>日本語<\/span>/);
  assert.match(html, /aria-label="Switch to dark theme"/);
  assert.match(html, /<button type="button" class="floating-back-to-top/);
});

test("emits canonical social metadata and ships required assets", async () => {
  const response = await render();
  const html = await response.text();

  assert.doesNotMatch(html, /codex-preview|Starter Project|Your site is taking shape/i);
  assert.match(html, /property="og:image" content="https:\/\/yuriljx\.github\.io\/og\.png"/);
  assert.match(html, /name="twitter:card" content="summary_large_image"/);

  const requiredAssets = [
    "../public/og.png",
    "../public/brand/li-calligraphy-seal.png",
    "../public/research/anther-culture.webp",
    "../public/research/microspore-fluorescence.webp",
    "../public/research/rice-greenhouse.webp",
    "../public/research/grape-field.webp",
    "../public/research/haskap-field.webp",
    "../public/research/haskap-fruit.webp",
    "../public/software/grape/growth-curve.webp",
    "../public/software/grape/detection-results.webp",
    "../public/software/grape/mature-stage.webp",
    "../public/software/rice-dh/workflow-overview.webp",
    "../public/software/callustrack/annotation-workspace.webp",
    "../public/software/genome/interface-overview.webp",
    "../public/software/trait/evidence-overview.webp",
    "../public/software/riceperturb/architecture-overview.webp",
    "../public/publications/yolo-apple-framework.webp",
    "../public/publications/ice-nuclei-microscopy.webp",
  ];
  await Promise.all(requiredAssets.map((path) => access(new URL(path, import.meta.url))));

  const og = await readFile(new URL("../public/og.png", import.meta.url));
  assert.deepEqual([...og.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
  assert.equal(og.readUInt32BE(16), 1200);
  assert.equal(og.readUInt32BE(20), 630);
});
