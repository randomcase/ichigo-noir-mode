import fs from "node:fs";

import { getCached, setCached } from "@/lib/server-cache";

export function readJsonFile<T>(filePath: string, fallback: T, ttlMs = 5000): T {
  const cached = getCached<T>(filePath);
  if (cached) {
    return cached;
  }

  try {
    const parsed = JSON.parse(fs.readFileSync(filePath, "utf8")) as T;
    setCached(filePath, parsed, ttlMs);
    return parsed;
  } catch {
    return fallback;
  }
}