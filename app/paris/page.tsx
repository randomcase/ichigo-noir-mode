import { getParis } from "@/lib/data";

function tierClass(tier?: string) {
  if (tier === "Paris Gold") {
    return "badge gold";
  }

  if (tier === "Paris Silver") {
    return "badge silver";
  }

  if (tier === "Paris Bronze") {
    return "badge bronze";
  }

  return "badge";
}

export default function ParisPage() {
  const data = getParis();
  const rows = [...data.repos].sort((left, right) => (right.parisScore ?? 0) - (left.parisScore ?? 0));

  return (
    <div className="card">
      <h2>Paris Standard</h2>
      <table>
        <thead>
          <tr>
            <th>Repo</th>
            <th>Score</th>
            <th>Tier</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((repo) => (
            <tr key={repo.name}>
              <td>
                <a href={repo.url} target="_blank" rel="noreferrer">
                  {repo.name}
                </a>
              </td>
              <td>{repo.parisScore ?? "-"}</td>
              <td>
                <span className={tierClass(repo.parisTier)}>{repo.parisTier ?? "N/A"}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}