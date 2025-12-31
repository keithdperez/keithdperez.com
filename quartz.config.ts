import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Keith Perez",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "keithdperez.com",
    ignorePatterns: ["private", "templates", ".obsidian", "bible", "daily", "songs", ".claude", "_NoteCompanion"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "local",
      cdnCaching: false,
      typography: {
        header: "TAYBarro",
        body: "iA Writer Duo",
        code: "iA Writer Mono",
      },
      colors: {
        // Flexoki Light (Paper)
        lightMode: {
          light: "#FFFCF0", // --flexoki-paper (background)
          lightgray: "#E6E4D9", // --flexoki-100 (borders, subtle backgrounds)
          gray: "#6F6E69", // --flexoki-600 (muted text)
          darkgray: "#100F0F", // --flexoki-black (body text)
          dark: "#100F0F", // --flexoki-black (headings)
          secondary: "#24837B", // --flexoki-cyan-600 (links, accents)
          tertiary: "#3AA99F", // --flexoki-cyan-400 (hover states)
          highlight: "rgba(206, 205, 195, 0.15)", // subtle highlight
          textHighlight: "#F6E2A088", // --flexoki-yellow-100 (text highlight)
        },
        // Flexoki Dark (Black)
        darkMode: {
          light: "#100F0F", // --flexoki-black (background)
          lightgray: "#282726", // --flexoki-900 (borders, subtle backgrounds)
          gray: "#878580", // --flexoki-500 (muted text)
          darkgray: "#CECDC3", // --flexoki-200 (secondary text)
          dark: "#CECDC3", // --flexoki-200 (primary text)
          secondary: "#3AA99F", // --flexoki-cyan-400 (links, accents)
          tertiary: "#24837B", // --flexoki-cyan-600 (hover states)
          highlight: "rgba(87, 86, 83, 0.15)", // subtle highlight
          textHighlight: "#3A2D0488", // --flexoki-yellow-900 (text highlight)
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "vitesse-light",
          dark: "vitesse-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.ExplicitPublish()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.CategoryPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Plugin.CustomOgImages(), // Disabled - requires Google Fonts
    ],
  },
}

export default config
