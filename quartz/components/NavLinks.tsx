import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { pathToRoot, joinSegments } from "../util/path"

interface Options {
  links: Record<string, string>
}

export default ((opts?: Options) => {
  const NavLinks: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
    const links = opts?.links ?? {}
    const baseDir = pathToRoot(fileData.slug!)
    const entries = Object.entries(links)

    return (
      <nav class={`nav-links ${displayClass ?? ""}`}>
        {entries.map(([text, link], index) => {
          const href = link.startsWith("http") ? link : joinSegments(baseDir, link)
          return (
            <>
              <a href={href}>{text}</a>
              {index < entries.length - 1 && <span class="nav-separator">&nbsp;&nbsp;|&nbsp;&nbsp;</span>}
            </>
          )
        })}
      </nav>
    )
  }

  NavLinks.css = `
.nav-links {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0;
}

.nav-links a {
  color: var(--secondary);
  font-weight: 600;
  font-size: 0.9rem;
  background: none !important;
  padding: 0 !important;
}

.nav-links a:hover {
  color: var(--tertiary);
}

.nav-separator {
  color: var(--gray);
  font-weight: 300;
}

@media all and (max-width: 600px) {
  .nav-links {
    display: none;
  }
}
`

  return NavLinks
}) satisfies QuartzComponentConstructor
