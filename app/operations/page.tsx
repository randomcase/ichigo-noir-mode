import DispatchButtons from "@/components/DispatchButtons";

const requiredVars = ["GITHUB_TOKEN", "GITHUB_OWNER", "GUI_REPO", "ENGINE_REPO"];

export default function OperationsPage() {
  return (
    <div className="card">
      <h2>Operations</h2>
      <table>
        <thead>
          <tr>
            <th>Env Var</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          {requiredVars.map((name) => (
            <tr key={name}>
              <td>{name}</td>
              <td>{name === "GITHUB_TOKEN" ? "Server-side GitHub workflow dispatch token" : "Repository routing"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <DispatchButtons />
    </div>
  );
}