#!/usr/bin/env node
/**
 * Sync commit activity from the private project repositories into
 * src/data/activity.json.
 *
 * The site is public, so this script records ONLY dates and counts — it never
 * stores commit messages, authors, diffs or file contents.
 *
 * Requirements: the GitHub CLI (`gh`) authenticated with access to the org's
 * private repositories.
 *
 *   npm run sync:activity
 */
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const PROJECTS_TS = resolve(ROOT, "src/data/projects.ts");
const OUT = resolve(ROOT, "src/data/activity.json");

const ORG = "CH4114-Tem-Project-SBS-group";
const DAY_MS = 86400000;
const WINDOW_DAYS = 182;

function slugs() {
  const src = readFileSync(PROJECTS_TS, "utf8");
  return [...src.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
}

function ghJson(args) {
  const out = execFileSync("gh", args, { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
  return out.trim() ? JSON.parse(out) : [];
}

function dayKey(iso) {
  return new Date(iso).toISOString().slice(0, 10);
}

function syncRepo(slug, sinceIso) {
  // Paginated commit list; we only read the commit date.
  const commits = ghJson([
    "api",
    "--paginate",
    `repos/${ORG}/${slug}/commits?since=${sinceIso}&per_page=100`,
  ]);
  const daily = {};
  let last = null;
  for (const c of commits) {
    const iso = c?.commit?.committer?.date ?? c?.commit?.author?.date;
    if (!iso) continue;
    const key = dayKey(iso);
    daily[key] = (daily[key] ?? 0) + 1;
    if (!last || key > last) last = key;
  }
  return { count: Object.values(daily).reduce((a, b) => a + b, 0), last, daily };
}

function main() {
  const since = new Date(Date.now() - WINDOW_DAYS * DAY_MS).toISOString();
  const data = { generatedAt: new Date().toISOString(), windowDays: WINDOW_DAYS, projects: {} };

  for (const slug of slugs()) {
    process.stdout.write(`· ${slug} … `);
    try {
      data.projects[slug] = syncRepo(slug, since);
      process.stdout.write(`${data.projects[slug].count} commits\n`);
    } catch (err) {
      process.stdout.write("skipped (no access?)\n");
      data.projects[slug] = { count: 0, last: null, daily: {} };
    }
  }

  writeFileSync(OUT, JSON.stringify(data, null, 2) + "\n", "utf8");
  console.log(`\nWrote ${OUT}`);
}

main();
