"use client";

import { useState } from "react";

async function trigger(payload: unknown) {
  const response = await fetch("/api/dispatch", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  return response.json();
}

export default function DispatchButtons() {
  const [log, setLog] = useState<string>("");

  async function runDataSync() {
    setLog("Triggering data-sync...");
    const result = await trigger({
      repo: "gui",
      workflow_id: "data-sync.yml",
      ref: "main"
    });
    setLog(JSON.stringify(result, null, 2));
  }

  async function runParisOrchestrator() {
    setLog("Triggering paris-standard-orchestrator...");
    const result = await trigger({
      repo: "engine",
      workflow_id: "paris-standard-orchestrator.yml",
      ref: "main",
      inputs: { apply_issues: "false" }
    });
    setLog(JSON.stringify(result, null, 2));
  }

  return (
    <div className="card">
      <h3>Dispatch Workflows</h3>
      <button onClick={runDataSync}>Run GUI data-sync</button>{" "}
      <button onClick={runParisOrchestrator}>Run Engine orchestrator (dry-run)</button>
      <pre style={{ whiteSpace: "pre-wrap", marginTop: 12 }}>{log}</pre>
    </div>
  );
}