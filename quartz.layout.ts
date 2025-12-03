import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [Component.PageTitle(), Component.Spacer(), Component.Search(), Component.Darkmode()],
  afterBody: [
    Component.Backlinks(),
  ],
  footer: Component.Footer({
    links: {
      "Then Create": "https://thencreate.design",
      "Oro En Marrow": "https://open.spotify.com/artist/3K1o0ml4fP5YK0123UTTRs",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [Component.DesktopOnly(Component.TableOfContents())],
  right: [
    Component.DesktopOnly(
      Component.Graph({
        localGraph: {
          depth: 2,
          scale: 1.2,
          repelForce: 0.5,
          centerForce: 0.3,
          linkDistance: 30,
          fontSize: 0.5,
          focusOnHover: true,
        },
      })
    ),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [],
  right: [],
}
