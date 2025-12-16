import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
// Simplified layout inspired by stephango.com - navigation at top
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [Component.PageTitle(), Component.Nav(), Component.Darkmode()],
  afterBody: [],
  footer: Component.Footer({
    heading: "",
    description: "Feel free to reach out via email or check out my work",
    links: {
      "keith@thencreate.design": "mailto:keith@thencreate.design",
      "then, create.": "https://thencreate.design",
      RSS: "/index.xml",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
// Minimal single-column layout like stephango.com
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [Component.ArticleTitle(), Component.ContentMeta()],
  left: [],
  right: [],
}

// components for pages that display lists of pages (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.ArticleTitle(), Component.ContentMeta()],
  left: [],
  right: [],
}
