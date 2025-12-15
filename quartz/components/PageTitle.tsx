import { pathToRoot, joinSegments } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  const baseDir = pathToRoot(fileData.slug!)
  const imagePath = joinSegments(baseDir, "static/new-favicon.png")

  // Get the first folder in the path (e.g., "Writing" from "Writing/my-post")
  const slugParts = fileData.slug?.split("/") ?? []
  const firstFolder = slugParts.length > 1 ? slugParts[0] : null

  // Format folder name: capitalize first letter of each word, replace dashes with spaces
  const formatFolderName = (folder: string) => {
    return folder
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  return (
    <div class={classNames(displayClass, "page-title")}>
      <a href={baseDir}>
        <img src={imagePath} alt={title} class="page-title-image" />
      </a>
      {firstFolder && (
        <>
          <span class="page-title-separator">/</span>
          <a href={`${baseDir}${firstFolder}/`} class="page-title-section">
            {formatFolderName(firstFolder)}
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
