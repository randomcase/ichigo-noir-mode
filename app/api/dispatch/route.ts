import { NextRequest, NextResponse } from "next/server";

type DispatchBody = {
  repo: "gui" | "engine";
  workflow_id: string;
  ref?: string;
  inputs?: Record<string, string>;
};

function repoName(kind: "gui" | "engine") {
  const owner = process.env.GITHUB_OWNER!;
  const repo = kind === "gui" ? process.env.GUI_REPO! : process.env.ENGINE_REPO!;
  return `${owner}/${repo}`;
}

export async function POST(req: NextRequest) {
  try {
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      return NextResponse.json({ ok: false, error: "Missing GITHUB_TOKEN" }, { status: 500 });
    }

    const body = (await req.json()) as DispatchBody;
    if (!body?.repo || !body?.workflow_id) {
      return NextResponse.json({ ok: false, error: "repo and workflow_id are required" }, { status: 400 });
    }

    const fullRepo = repoName(body.repo);
    const ref = body.ref || "main";
    const url = `https://api.github.com/repos/${fullRepo}/actions/workflows/${body.workflow_id}/dispatches`;

    const gh = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ref,
        inputs: body.inputs || {}
      })
    });

    if (!gh.ok) {
      const text = await gh.text();
      return NextResponse.json({ ok: false, status: gh.status, error: text }, { status: gh.status });
    }

    return NextResponse.json({ ok: true, repo: fullRepo, workflow_id: body.workflow_id, ref });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error?.message || "Unknown error" }, { status: 500 });
  }
}