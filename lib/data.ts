import fs from "node:fs";
import path from "node:path";

import type { Catalog } from "./types";

function readJson<T>(relPath: string, fallback: T): T {
  const absolutePath = path.join(process.cwd(), relPath);
  if (!fs.existsSync(absolutePath)) {
    return fallback;
  }

  return JSON.parse(fs.readFileSync(absolutePath, "utf8")) as T;
}

export function getPortfolio(): Catalog {
  return readJson<Catalog>("data/portfolio-catalog.json", { repos: [] });
}

export function getScala(): Catalog {
  return readJson<Catalog>("data/scala-candidates.json", { repos: [] });
}

export function getParis(): Catalog {
  return readJson<Catalog>("data/paris-standard.json", { repos: [] });
}