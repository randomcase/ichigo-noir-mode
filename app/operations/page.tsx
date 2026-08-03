import path from "node:path";

import DispatchButtons from "@/components/DispatchButtons";
import LifecycleControls from "@/components/LifecycleControls";
import { readJsonFile } from "@/lib/read-json";

export const revalidate = 30;

export default function OperationsPage() {
  const manifest = readJsonFile<any>(
    path.join(process.cwd(), "data/meta/manifest.json"),
    { updatedAt: null, mode: "unknown", snapshots: [] },
    5000
  );

  const lifecycle = readJsonFile<any>(path.join(process.cwd(), "data/meta/lifecycle-registry.json"), { repos: [] }, 5000);

  const updatedAt = manifest.updatedAt ? new Date(manifest.updatedAt) : null;
  const stale = updatedAt ? (Date.now() - updatedAt.getTime()) / 36e5 > 24 : true;

  return (
    <div>
      <div className="card">
        <h2>Operations</h2>
        <p>
          <strong>Mode:</strong> {manifest.mode}
        </p>
        <p>
          <strong>Last Sync:</strong> {manifest.updatedAt ?? "never"}
        </p>
        <p>
          <strong>Health:</strong> {stale ? "⚠ stale (>24h)" : "✅ fresh"}
        </p>
      </div>

      <DispatchButtons />

      <div className="card">
        <h3>Lifecycle Registry</h3>
        <table>
          <thead>
            <tr>
              <th>Repo</th>
              <th>State</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody>
            {(lifecycle.repos || []).slice(0, 200).map((entry: any) => (
              <tr key={entry.name}>
                <td>{entry.name}</td>
                <td>{entry.state}</td>
                <td>{entry.updatedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <LifecycleControls repo="randomcase/vulcan-etna-mt" />
    </div>
  );
}