import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { resolveRelative, simplifySlug } from "../util/path"
import { classNames } from "../util/lang"

interface LinkedMentionsOptions {
  hideWhenEmpty: boolean
  title: string
}

const defaultOptions: LinkedMentionsOptions = {
  hideWhenEmpty: true,
  title: "Linked mentions",
}

export default ((opts?: Partial<LinkedMentionsOptions>) => {
  const options: LinkedMentionsOptions = { ...defaultOptions, ...opts }

  const LinkedMentions: QuartzComponent = ({
    fileData,
    allFiles,
    displayClass,
  }: QuartzComponentProps) => {
    const slug = simplifySlug(fileData.slug!)
    const backlinkFiles = allFiles.filter((file) => file.links?.includes(slug))

    if (options.hideWhenEmpty && backlinkFiles.length === 0) {
      return null
    }

    return (
      <div class={classNames(displayClass, "linked-mentions")}>
        <h3>{options.title}</h3>
        <div class="linked-mentions-grid">
          {backlinkFiles.map((f) => {
            const description = f.description ?? f.frontmatter?.description ?? ""
            return (
              <a href={resolveRelative(fileData.slug!, f.slug!)} class="linked-mention-card">
                <div class="linked-mention-title">{f.frontmatter?.title ?? f.slug}</div>
                {description && <div class="linked-mention-description">{description}</div>}
              </a>
            )
          })}
        </div>
      </div>
    )
  }

  LinkedMentions.css = `
.linked-mentions {
  margin-top: 4rem;
  padding-top: 4rem;
  border-top: 1px solid var(--lightgray);
}

.linked-mentions > h3 {
  font-size: 1.2rem;
  font-weight: 400;
  color: var(--gray);
  margin: 0 0 1.5rem 0;
}

.linked-mentions-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

@media (max-width: 600px) {
  .linked-mentions-grid {
    grid-template-columns: 1fr;
  }
}

.linked-mention-card {
  display: block;
  padding: 1rem;
  border: 1px solid var(--lightgray);
  border-radius: 6px;
  text-decoration: none;
  transition: border-color 0.2s ease;
}

.linked-mention-card:hover {
  border-color: var(--gray);
}

.linked-mention-title {
  font-weight: 500;
  color: var(--dark);
  margin-bottom: 0.5rem;
  line-height: 1.3;
}

.linked-mention-description {
  font-size: 0.9rem;
  color: var(--gray);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
`

  return LinkedMentions
}) satisfies QuartzComponentConstructor
