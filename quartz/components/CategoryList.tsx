import { FullSlug, resolveRelative } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const CategoryList: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const categories = fileData.frontmatter?.categories
  if (categories && categories.length > 0) {
    return (
      <ul class={classNames(displayClass, "categories")}>
        {categories.map((category) => {
          // Handle wikilink format [[category]] -> category
          const categoryName = category.replace(/\[\[(.*?)\]\]/, "$1")
          const linkDest = resolveRelative(fileData.slug!, `categories/${categoryName}` as FullSlug)
          return (
            <li>
              <a href={linkDest} class="internal category-link">
                {categoryName}
              </a>
            </li>
          )
        })}
      </ul>
    )
  } else {
    return null
  }
}

CategoryList.css = `
.categories {
  list-style: none;
  display: flex;
  padding-left: 0;
  gap: 0.4rem;
  margin: 1rem 0;
  flex-wrap: wrap;
}

.section-li > .section > .categories {
  justify-content: flex-end;
}

.categories > li {
  display: inline-block;
  white-space: nowrap;
  margin: 0;
  overflow-wrap: normal;
}

a.internal.category-link {
  border-radius: 8px;
  background-color: var(--highlight);
  padding: 0.2rem 0.4rem;
  margin: 0 0.1rem;
}
`

export default (() => CategoryList) satisfies QuartzComponentConstructor
