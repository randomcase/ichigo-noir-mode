export type RepoRow = {
  name: string;
  url: string;
  language: string;
  stars: number;
  daysSinceUpdate: number;
  classification: string;
  scalaScore?: number;
  scalaPriority?: string;
  parisScore?: number;
  parisTier?: string;
};

export type Catalog = { repos: RepoRow[] };