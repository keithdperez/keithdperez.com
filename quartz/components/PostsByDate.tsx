import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { getDate } from "./Date"
import { resolveRelative } from "../util/path"
import { classNames } from "../util/lang"
import { GlobalConfiguration } from "../cfg"
import style from "./styles/postsByDate.scss"

interface Options {
  title?: string
  showLatest?: boolean
  limit?: number
  filter?: (f: QuartzPluginData) => boolean
}

const defaultOptions = (cfg: GlobalConfiguration): Options => ({
  title: "Writing",
  showLatest: true,
  limit: undefined,
  filter: (f) => f.dates !== undefined && !f.frontmatter?.draft,
})

function formatCompactDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  return `${year} · ${month}`
}

export default ((userOpts?: Partial<Options>) => {
  const PostsByDate: QuartzComponent = ({
    allFiles,
    fileData,
    displayClass,
    cfg,
  }: QuartzComponentProps) => {
    const opts = { ...defaultOptions(cfg), ...userOpts }

    // Filter posts
    let posts = allFiles.filter(opts.filter ?? defaultOptions(cfg).filter!)

    // Sort by date descending (newest first)
    posts.sort((a, b) => {
      const dateA = getDate(cfg, a)?.getTime() ?? 0
      const dateB = getDate(cfg, b)?.getTime() ?? 0
      return dateB - dateA
    })

    if (opts.limit) {
      posts = posts.slice(0, opts.limit)
    }

    const latestPost = posts[0]
    const remainingPosts = opts.showLatest ? posts.slice(1) : posts

    return (
      <div class={classNames(displayClass, "posts-by-date")}>
        {/* Latest post section */}
        {opts.showLatest && latestPost && (
          <div class="latest-section">
            <h2>Latest</h2>
            <h3 class="latest-title">
              <a href={resolveRelative(fileData.slug!, latestPost.slug!)}>
                {latestPost.frontmatter?.title ?? "Untitled"}
              </a>
            </h3>
            <p class="latest-meta">
              {getDate(cfg, latestPost)?.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            {(latestPost.frontmatter?.description || latestPost.description) && (
              <p class="latest-desc">
                {latestPost.frontmatter?.description || latestPost.description}{" "}
                <a href={resolveRelative(fileData.slug!, latestPost.slug!)}>Keep reading →</a>
              </p>
            )}
          </div>
        )}

        {/* Writing archive section */}
        <div class="writing-section">
          {opts.title && <h2>{opts.title}</h2>}
          <ul class="posts-list">
            {remainingPosts.map((post) => {
              const title = post.frontmatter?.title ?? "Untitled"
              const date = getDate(cfg, post)
              return (
                <li>
                  <span class="post-date">{date ? formatCompactDate(date) : ""}</span>
                  <a href={resolveRelative(fileData.slug!, post.slug!)}>{title}</a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }

  PostsByDate.displayName = "PostsByDate"
  PostsByDate.css = style
  return PostsByDate
}) satisfies QuartzComponentConstructor
