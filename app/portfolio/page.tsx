import { getPortfolio } from "@/lib/data";

export default function PortfolioPage() {
  const data = getPortfolio();

  return (
    <div className="card">
      <h2>Portfolio</h2>
      <table>
        <thead>
          <tr>
            <th>Repo</th>
            <th>Lang</th>
            <th>Stars</th>
            <th>Days</th>
            <th>Class</th>
          </tr>
        </thead>
        <tbody>
          {data.repos.map((repo) => (
            <tr key={repo.name}>
              <td>
                <a href={repo.url} target="_blank" rel="noreferrer">
                  {repo.name}
                </a>
              </td>
              <td>{repo.language}</td>
              <td>{repo.stars}</td>
              <td>{repo.daysSinceUpdate}</td>
              <td>{repo.classification}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}