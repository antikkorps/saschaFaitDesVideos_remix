import type { LinksFunction } from "@remix-run/node"
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react"
import Navbar from "./components/Navbar"
import ThemeToggle from "./components/ThemeToggle"
import { ThemeProvider, themeScript } from "./contexts/ThemeContext"

import "./tailwind.css"

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Notable&family=Public+Sans:ital,wght@0,100..900;1,100..900&display=swap",
  },
]

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <Links />
      </head>
      <ThemeProvider>
        <body>
          <Navbar />
          {children}
          <ScrollRestoration />
          <Scripts />
          <div className="fixed bottom-2 right-2">
            <ThemeToggle />
          </div>
        </body>
      </ThemeProvider>
    </html>
  )
}

export default function App() {
  return <Outlet />
}
