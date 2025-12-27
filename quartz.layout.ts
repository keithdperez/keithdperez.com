import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
// Simplified layout inspired by stephango.com - breadcrumb navigation
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [
    Component.PageTitle(),
    Component.Breadcrumbs({ spacerSymbol: "/", rootName: "", showCurrentPage: false }),
    Component.Spacer(),
    Component.Nav(),
    Component.Darkmode(),
  ],
  afterBody: [
    // Latest note (only on index)
    Component.ConditionalRender({
      component: Component.PostsByDate({ title: "Latest", limit: 1, showLatest: true }),
      condition: (props) => props.fileData.slug === "index",
    }),
    // Topics hub (only on index)
    Component.ConditionalRender({
      component: Component.TopicsHub(),
      condition: (props) => props.fileData.slug === "index",
    }),
    // My Work (only on index)
    Component.ConditionalRender({
      component: Component.PostsByDate({
        title: "My Work",
        showLatest: false,
        tag: "projects",
        viewAllSlug: undefined,
      }),
      condition: (props) => props.fileData.slug === "index",
    }),
    // Writing hub page
    Component.ConditionalRender({
      component: Component.PostsByDate({
        title: "Writing",
        showLatest: false,
        tag: "writing",
        viewAllSlug: undefined,
      }),
      condition: (props) => props.fileData.slug === "Writing",
    }),
    // Resources hub page
    Component.ConditionalRender({
      component: Component.PostsByDate({
        title: "Resources",
        showLatest: false,
        tag: "resources",
        viewAllSlug: undefined,
      }),
      condition: (props) => props.fileData.slug === "Resources",
    }),
    // Projects hub page (on /work)
    Component.ConditionalRender({
      component: Component.PostsByDate({
        title: "Projects",
        showLatest: false,
        tag: "projects",
        viewAllSlug: undefined,
      }),
      condition: (props) => props.fileData.slug === "work",
    }),
    Component.LinkedMentions(),
    Component.Search(),
  ],
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
  beforeBody: [
    Component.ArticleTitle(),
    Component.ConditionalRender({
      component: Component.ContentMeta(),
      condition: (props) => props.fileData.slug !== "index",
    }),
  ],
  left: [],
  right: [],
}

// components for pages that display lists of pages (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.ArticleTitle()],
  left: [],
  right: [],
}
