import fs from "node:fs";
import path from "node:path";

import yaml from "yaml";

const root = process.cwd();
const cfgPath = path.join(root, "config/modes.yml");
const cfg = yaml.parse(fs.readFileSync(cfgPath, "utf8"));

const RAW_DIR = path.join(root, cfg.paths.raw);
const SNAP_DIR = path.join(root, cfg.paths.snapshots);
const META_DIR = path.join(root, cfg.paths.meta);

fs.mkdirSync(RAW_DIR, { recursive: true });
fs.mkdirSync(SNAP_DIR, { recursive: true });
fs.mkdirSync(META_DIR, { recursive: true });

function readJson(file, fallback = null) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return fallback;
  }
}

function writeJson(file, obj) {
  fs.writeFileSync(file, JSON.stringify(obj, null, 2));
}

function latest(prefix) {
  const files = fs
    .readdirSync(RAW_DIR)
    .filter((file) => file.startsWith(prefix) && file.endsWith(".json"))
    .sort();
  return files.length ? path.join(RAW_DIR, files[files.length - 1]) : null;
}

const normalizers = {
  portfolio: (value) => ({
    repos: (value?.repos || []).map((repo) => ({
      name: String(repo.name ?? ""),
      url: String(repo.url ?? ""),
      language: String(repo.language ?? "unknown"),
      stars: Number(repo.stars ?? 0),
      daysSinceUpdate: Number(repo.daysSinceUpdate ?? 9999),
      classification: String(repo.classification ?? "maintain")
    }))
  }),
  scala: (value) => ({ repos: Array.isArray(value?.repos) ? value.repos : [] }),
  paris: (value) => ({ repos: Array.isArray(value?.repos) ? value.repos : [] })
};

const manifest = { mode: cfg.mode, updatedAt: new Date().toISOString(), snapshots: [] };

for (const key of ["portfolio", "scala", "paris"]) {
  const source = latest(key);
  const raw = source ? readJson(source, {}) : { repos: [] };
  const normalized = normalizers[key](raw);
  const output = path.join(
    SNAP_DIR,
    `${key === "portfolio" ? "portfolio-catalog" : key === "scala" ? "scala-candidates" : "paris-standard"}.json`
  );

  writeJson(output, normalized);
  manifest.snapshots.push({ key, source: source || "none", output, count: normalized.repos.length });
}

writeJson(path.join(META_DIR, "manifest.json"), manifest);
console.log(`[normalize] mode=${cfg.mode} complete`);