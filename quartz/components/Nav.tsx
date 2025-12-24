import { pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const Nav: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const baseDir = pathToRoot(fileData.slug!)
  return (
    <nav class={classNames(displayClass, "site-nav")}>
      <a href={`${baseDir}about`}>About</a>
      <a href={`${baseDir}now`}>Now</a>
    </nav>
  )
}

Nav.css = `
.site-nav {
  display: flex;
  gap: 1.5rem;
}

.site-nav a {
  color: var(--gray);
  text-decoration: none;
  font-weight: 400;
}

.site-nav a:hover {
  color: var(--darkgray);
}

@media (max-width: 800px) {
  .site-nav {
    display: none;
  }
}
`

export default (() => Nav) satisfies QuartzComponentConstructor
