import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const TopicsHub: QuartzComponent = ({ allFiles, displayClass }: QuartzComponentProps) => {
  // Extract all unique tags from all files
  const allTags = new Set<string>()
  for (const file of allFiles) {
    const tags = file.frontmatter?.tags ?? []
    tags.forEach((tag: string) => allTags.add(tag))
  }

  // Convert to sorted array and filter out empty tags
  const sortedTags = Array.from(allTags).filter(tag => tag.length > 0).sort()

  if (sortedTags.length === 0) {
    return null
  }

  return (
    <div class={displayClass}>
      <h2>Topics</h2>
      <ul>
        {sortedTags.map((tag) => (
          <li key={tag}>
            <a href={`/tags/${tag}`} class="internal">
              {tag}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

TopicsHub.css = `
.topics-hub ul {
  list-style: none;
  padding-left: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0.5rem;
}

.topics-hub li {
  margin: 0;
}
`

export default (() => TopicsHub) satisfies QuartzComponentConstructor
