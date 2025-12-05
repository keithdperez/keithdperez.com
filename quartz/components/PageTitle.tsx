import { pathToRoot, joinSegments } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  const baseDir = pathToRoot(fileData.slug!)
  const iconPath = joinSegments(baseDir, "static/new-favicon.png")
  return (
    <h2 class={classNames(displayClass, "page-title")}>
      <a href={baseDir}>
        <img src={iconPath} alt={title} />
      </a>
    </h2>
  )
}

PageTitle.css = `
.page-title {
  margin: 0;
}

.page-title a {
  display: flex;
  align-items: center;
}

.page-title img {
  height: 80px;
  width: 80px;
  min-width: 80px;
  min-height: 80px;
  border-radius: 50%;
  object-fit: cover;
}
`

export default (() => PageTitle) satisfies QuartzComponentConstructor
