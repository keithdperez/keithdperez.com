import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

interface Options {
  title?: string
  displayMode?: "grid" | "inline"
  showCounts?: boolean
}

const defaultOptions: Options = {
  title: "Explore by Category",
  displayMode: "grid",
  showCounts: true,
}

export default ((userOpts?: Partial<Options>) => {
  const CategoriesHub: QuartzComponent = ({ allFiles, displayClass }: QuartzComponentProps) => {
    const opts = { ...defaultOptions, ...userOpts }

    // Extract all unique categories from all files with counts
    const categoryCounts = new Map<string, number>()

    for (const file of allFiles) {
      const categories = file.frontmatter?.categories ?? []
      categories.forEach((category: string) => {
        // Handle wikilink format [[category]] -> category
        const categoryName = category.replace(/\[\[(.*?)\]\]/, "$1")
        if (categoryName.length > 0) {
          categoryCounts.set(categoryName, (categoryCounts.get(categoryName) || 0) + 1)
        }
      })
    }

    // Convert to sorted array
    const sortedCategories = Array.from(categoryCounts.entries()).sort(([a], [b]) =>
      a.localeCompare(b),
    )

    if (sortedCategories.length === 0) {
      return null
    }

    if (opts.displayMode === "inline") {
      return (
        <div class={classNames(displayClass, "categories-hub-inline")}>
          {opts.title && <h2>{opts.title}</h2>}
          <p class="topics-list">
            {sortedCategories.map(([category, count], index) => (
              <>
                <a href={`/categories/${category}`} class="internal topic-link">
                  {category}
                </a>
                {index < sortedCategories.length - 1 && ", "}
              </>
            ))}
          </p>
        </div>
      )
    }

    return (
      <div class={displayClass}>
        {opts.title && <h2>{opts.title}</h2>}
        <ul class="categories-grid">
          {sortedCategories.map(([category, count]) => (
            <li key={category}>
              <a href={`/categories/${category}`} class="internal category-card">
                <span class="category-name">{category}</span>
                {opts.showCounts && <span class="category-count">{count}</span>}
              </a>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  CategoriesHub.css = `
.categories-hub {
  margin: 3rem 0;
}

.categories-hub h2 {
  font-size: 1.1rem;
  font-weight: 400;
  margin: 0 0 1.5rem 0;
  opacity: 0.6;
}

.categories-grid {
  list-style: none;
  padding-left: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin: 0;
}

.categories-grid li {
  margin: 0;
}

.category-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border: 1px solid var(--lightgray);
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.category-card:hover {
  border-color: var(--secondary);
  background-color: var(--highlight);
}

.category-name {
  font-weight: 500;
  text-transform: capitalize;
}

.category-count {
  font-size: 0.9rem;
  opacity: 0.6;
  background-color: var(--lightgray);
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
}

/* Inline topics style */
.categories-hub-inline {
  margin: 2rem 0;
}

.categories-hub-inline h2 {
  font-size: 1rem;
  font-weight: 400;
  margin: 0 0 0.5rem 0;
  opacity: 0.6;
}

.topics-list {
  line-height: 1.8;
  margin: 0;
}

.topic-link {
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.topic-link:hover {
  opacity: 0.6;
}
`

  return CategoriesHub
}) satisfies QuartzComponentConstructor
