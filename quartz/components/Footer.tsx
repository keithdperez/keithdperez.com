import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"

interface Options {
  heading?: string
  description?: string
  links: Record<string, string>
}

export default ((opts?: Options) => {
  const Footer: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
    const heading = opts?.heading ?? "Get in touch"
    const description = opts?.description
    const links = opts?.links ?? {}
    const linkEntries = Object.entries(links)

    return (
      <footer class={`${displayClass ?? ""}`}>
        <div class="footer-content">
          <p class="footer-heading">{heading}</p>
          {description && <p class="footer-description">{description}</p>}
          {linkEntries.length > 0 && (
            <p class="footer-links">
              {linkEntries.map(([text, link], index) => (
                <>
                  <a href={link}>{text}</a>
                  {index < linkEntries.length - 1 && <span class="footer-separator"> · </span>}
                </>
              ))}
            </p>
          )}
        </div>
      </footer>
    )
  }

  Footer.css = style
  return Footer
}) satisfies QuartzComponentConstructor
