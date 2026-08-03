import path from "node:path";

import { readJsonFile } from "@/lib/read-json";

import type { Catalog } from "./types";

function p(...x: string[]) {
  return path.join(process.cwd(), ...x);
}

export function getPortfolio(): Catalog {
  return readJsonFile<Catalog>(p("data/snapshots/portfolio-catalog.json"), { repos: [] }, 10_000);
}

export function getScala(): Catalog {
  return readJsonFile<Catalog>(p("data/snapshots/scala-candidates.json"), { repos: [] }, 10_000);
}

export function getParis(): Catalog {
  return readJsonFile<Catalog>(p("data/snapshots/paris-standard.json"), { repos: [] }, 10_000);
}