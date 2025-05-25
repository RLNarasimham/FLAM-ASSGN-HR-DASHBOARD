

import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import Link from 'next/link';
import { ReactNode } from 'react';

export const metadata = {
  title: 'HR Dashboard',
  description: 'Mini HR Performance Dashboard',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav
          className="navbar navbar-expand-lg px-4"
          style={{ backgroundColor: '#E08F04' }}
        >
          <Link className="navbar-brand text-white fw-bold fs-2 fst-italic" href="/">
            HR DASHBOARD
          </Link>
        </nav>

        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2 min-vh-100 p-3" style={{backgroundColor:'#01BCB6'}}>
              <ul className="nav flex-column">
                <li className="nav-item">
                  <Link
                    className="nav-link fw-semibold"
                    href="/"
                    style={{ color: '#1c193e' }}
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link fw-semibold"
                    href="/bookmarks"
                    style={{ color: '#1c193e' }}
                  >
                    Bookmarks
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link fw-semibold"
                    href="/analytics"
                    style={{ color: '#1c193e' }}
                  >
                    Analytics
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-md-10 p-4">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
