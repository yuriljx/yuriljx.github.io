const ALLOWED_ORIGINS = new Set(["https://yuriljx.github.io"]);
const MAX_BODY_BYTES = 2048;
const VIEWPORT_BUCKETS = new Set(["xs", "sm", "md", "lg", "xl"]);
const BOT_PATTERN = /bot|crawler|spider|slurp|bingpreview|facebookexternalhit|headless|lighthouse|pagespeed/i;

function corsHeaders(origin) {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function emptyResponse(status, origin) {
  return new Response(null, {
    status,
    headers: origin && ALLOWED_ORIGINS.has(origin) ? corsHeaders(origin) : undefined,
  });
}

function cleanPath(value) {
  if (typeof value !== "string") return "/";
  const path = value.split(/[?#]/, 1)[0].trim();
  if (!path.startsWith("/")) return "/";
  return path.slice(0, 200) || "/";
}

function cleanReferrerHost(value) {
  if (typeof value !== "string" || !value) return null;
  try {
    const hostname = new URL(value).hostname.toLowerCase();
    return hostname.slice(0, 100) || null;
  } catch {
    return null;
  }
}

function cleanLanguage(value) {
  if (typeof value !== "string") return null;
  const language = value.trim().slice(0, 20);
  return /^[a-z0-9-]+$/i.test(language) ? language : null;
}

function cleanLocation(value, maxLength) {
  if (typeof value !== "string") return null;
  const location = value.trim().toUpperCase().slice(0, maxLength);
  return /^[A-Z0-9-]+$/.test(location) ? location : null;
}

function browserCategory(userAgent) {
  if (/Edg\//.test(userAgent)) return "Edge";
  if (/(Chrome|CriOS)\//.test(userAgent)) return "Chrome";
  if (/(Firefox|FxiOS)\//.test(userAgent)) return "Firefox";
  if (/Safari\//.test(userAgent) && !/(Chrome|CriOS|Android)\//.test(userAgent)) return "Safari";
  return "Other";
}

function deviceCategory(userAgent) {
  if (/(iPad|Tablet|PlayBook|Silk)/i.test(userAgent)) return "tablet";
  if (/(Mobi|iPhone|Android)/i.test(userAgent)) return "mobile";
  return "desktop";
}

async function dailyVisitorHash(secret, visitDay, ipAddress) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(`${visitDay}\u0000${ipAddress}`));
  return Array.from(new Uint8Array(signature), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function parsePayload(request) {
  const declaredSize = Number(request.headers.get("Content-Length") ?? "0");
  if (declaredSize > MAX_BODY_BYTES) return null;

  const body = await request.text();
  if (new TextEncoder().encode(body).byteLength > MAX_BODY_BYTES) return null;

  try {
    const payload = JSON.parse(body);
    return payload && typeof payload === "object" && !Array.isArray(payload) ? payload : null;
  } catch {
    return null;
  }
}

async function collect(request, env) {
  const origin = request.headers.get("Origin") ?? "";
  if (!ALLOWED_ORIGINS.has(origin)) return emptyResponse(403);
  if (request.headers.get("DNT") === "1" || request.headers.get("Sec-GPC") === "1") {
    return emptyResponse(204, origin);
  }

  const userAgent = request.headers.get("User-Agent") ?? "";
  if (!userAgent || BOT_PATTERN.test(userAgent)) return emptyResponse(204, origin);

  const ipAddress = request.headers.get("CF-Connecting-IP");
  if (!ipAddress || !env.ANALYTICS_HMAC_KEY || !env.DB) return emptyResponse(204, origin);

  const payload = await parsePayload(request);
  if (!payload) return emptyResponse(400, origin);

  const now = new Date();
  const visitedAt = Math.floor(now.getTime() / 1000);
  const visitDay = now.toISOString().slice(0, 10);
  const visitorHash = await dailyVisitorHash(env.ANALYTICS_HMAC_KEY, visitDay, ipAddress);
  const viewport = VIEWPORT_BUCKETS.has(payload.viewport) ? payload.viewport : null;
  const cf = request.cf ?? {};

  await env.DB.prepare(
    `INSERT INTO visits (
      visited_at, visit_day, visitor_hash, path, referrer_host,
      country, region, browser, device, language, viewport
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  ).bind(
    visitedAt,
    visitDay,
    visitorHash,
    cleanPath(payload.path),
    cleanReferrerHost(payload.referrer),
    cleanLocation(cf.country, 3),
    cleanLocation(cf.regionCode, 10),
    browserCategory(userAgent),
    deviceCategory(userAgent),
    cleanLanguage(payload.language),
    viewport,
  ).run();

  return emptyResponse(204, origin);
}

async function handleRequest(request, env) {
  const url = new URL(request.url);
  const origin = request.headers.get("Origin") ?? "";

  if (url.pathname !== "/collect") return emptyResponse(404);
  if (request.method === "OPTIONS") {
    return ALLOWED_ORIGINS.has(origin) ? emptyResponse(204, origin) : emptyResponse(403);
  }
  if (request.method !== "POST") return emptyResponse(405, origin);

  try {
    return await collect(request, env);
  } catch {
    return emptyResponse(204, origin);
  }
}

async function deleteExpiredVisits(env) {
  await env.DB.prepare("DELETE FROM visits WHERE visited_at < unixepoch('now', '-365 days')").run();
}

export {
  browserCategory,
  cleanPath,
  cleanReferrerHost,
  dailyVisitorHash,
  deleteExpiredVisits,
  deviceCategory,
  handleRequest,
};

const worker = {
  fetch: handleRequest,
  scheduled(_controller, env, ctx) {
    ctx.waitUntil(deleteExpiredVisits(env));
  },
};

export default worker;
