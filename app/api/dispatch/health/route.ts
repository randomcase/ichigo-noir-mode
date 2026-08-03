import { NextResponse } from "next/server";

export async function GET() {
  const missing: string[] = [];

  for (const key of ["GITHUB_TOKEN", "GITHUB_OWNER", "GUI_REPO", "ENGINE_REPO"]) {
    if (!process.env[key]) {
      missing.push(key);
    }
  }

  return NextResponse.json({
    ok: missing.length === 0,
    missing,
    configured: {
      owner: process.env.GITHUB_OWNER || null,
      guiRepo: process.env.GUI_REPO || null,
      engineRepo: process.env.ENGINE_REPO || null
    }
  });
}