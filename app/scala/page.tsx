import { getScala } from "@/lib/data";

export default function ScalaPage() {
  const data = getScala();
  const rows = [...data.repos].sort((left, right) => (right.scalaScore ?? 0) - (left.scalaScore ?? 0));

  return (
    <div className="card">
      <h2>Scala Candidates</h2>
      <table>
        <thead>
          <tr>
            <th>Repo</th>
            <th>Lang</th>
            <th>Score</th>
            <th>Priority</th>
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
              <td>{repo.language}</td>
              <td>{repo.scalaScore ?? "-"}</td>
              <td>{repo.scalaPriority ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}