import { pathToRoot, joinSegments } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  const baseDir = pathToRoot(fileData.slug!)
  // Use absolute path for avatar to work correctly on all pages including 404
  const imagePath = "/static/new-favicon.png"

  // Get the first category from frontmatter (e.g., "projects" from categories: [projects])
  const categories = fileData.frontmatter?.categories ?? []
  const primaryCategory = Array.isArray(categories) && categories.length > 0 ? categories[0] : null

  // Fallback to folder-based navigation if no category
  const slugParts = fileData.slug?.split("/") ?? []
  const firstFolder = slugParts.length > 1 ? slugParts[0] : null

  // Use category if available, otherwise use folder
  const sectionName = primaryCategory || firstFolder

  // Format section name: capitalize first letter of each word, replace dashes with spaces
  const formatSectionName = (name: string) => {
    return name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  return (
    <div class={classNames(displayClass, "page-title")}>
      <a href={baseDir}>
        <img src={imagePath} alt={title} class="page-title-image" />
      </a>
      {sectionName && (
        <>
          <span class="page-title-separator">/</span>
          <a href={`${baseDir}categories/${sectionName}/`} class="page-title-section">
            {formatSectionName(sectionName)}
          </a>
        </>
      )}
    </div>
  )
}

PageTitle.css = `
.page-title {
  font-size: 1.75rem;
  margin: 0;
  font-family: var(--titleFont);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-grow: 1;
}

.page-title a {
  text-decoration: none;
  display: flex;
  align-items: center;
}

.page-title-image {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.page-title-separator {
  color: var(--gray);
  font-weight: 300;
}

.page-title-section {
  color: var(--gray);
  font-weight: 400;
}

.page-title-section:hover {
  color: var(--secondary);
}
`

export default (() => PageTitle) satisfies QuartzComponentConstructor
