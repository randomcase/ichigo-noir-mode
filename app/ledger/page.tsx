import fs from "node:fs";
import path from "node:path";

export default function LedgerPage() {
  const absolutePath = path.join(process.cwd(), "data/evidence-log.md");
  const text = fs.existsSync(absolutePath) ? fs.readFileSync(absolutePath, "utf8") : "# Evidence Log\n\nNo entries yet.";

  return (
    <div className="card">
      <h2>Ledger</h2>
      <pre style={{ whiteSpace: "pre-wrap" }}>{text}</pre>
    </div>
  );
}