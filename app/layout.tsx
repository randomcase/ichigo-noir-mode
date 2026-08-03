import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";

export const metadata: Metadata = {
  title: "Paris Dashboard",
  description: "v4.4 control panel for portfolio, learning, and migration"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="header">
          <h1>Paris Dashboard</h1>
          <nav>
            <a href="/">Home</a>
            <a href="/portfolio">Portfolio</a>
            <a href="/scala">Scala</a>
            <a href="/paris">Paris Standard</a>
            <a href="/operations">Operations</a>
            <a href="/ledger">Ledger</a>
          </nav>
        </header>
        <main className="container">{children}</main>
      </body>
    </html>
  );
}