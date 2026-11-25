import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { Marked } from 'marked';

const root = path.resolve(process.env.CONTENT_DIR || path.join(process.env.HOME || '', 'vault'));
const ignoredDirs = new Set(['.obsidian', '.claude', '.copilot', '.trash', '.git', '.agents', 'agent', 'attachments', 'references', 'daily', 'conversations', 'archive', 'templates', 'projects', 'resources', 'production', 'church', 'guides', 'bible', 'journal', 'private']);
const categories = { reflections: ['Reflection', '#7a2f66'], studies: ['Study', '#2c4f9e'], writing: ['Writing', '#2d7766'], music: ['Music', '#b58515'] };
const list = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
  const full = path.join(dir, entry.name);
  if (entry.isDirectory() && (entry.name.startsWith('.') || ignoredDirs.has(entry.name.toLowerCase()))) return [];
  return entry.isDirectory() ? list(full) : /\.md$/i.test(entry.name) ? [full] : [];
});
function categoryFor(data) {
  const raw = Array.isArray(data.categories) ? data.categories.join(' ') : String(data.categories || '');
  const key = raw.match(/\[\[([^\]]+)\]\]|([\w-]+)/)?.[1]?.toLowerCase() || raw.match(/[\w-]+/)?.[0]?.toLowerCase();
  return categories[key] ? { key, name: key, href: `/${key}/`, label: categories[key][0], color: categories[key][1] } : null;
}
function slugify(value) {
  return String(value)
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[→←↔⟶⟵⇒⇐]/g, ' ')
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') || 'note';
}
export const RESERVED = ['about', 'writing', 'studies', 'reflections', 'music', 'downloads', 'media', 'fonts', 'rss.xml', '404', 'index'];
const SLUG_RULE = /^[a-z0-9]+(-[a-z0-9]+)?$/;
function isAboutNote(post) { return path.basename(post.file, '.md').toLowerCase() === 'about' || post.title.toLowerCase() === 'about'; }
// Old Quartz addresses: vault path with spaces as hyphens, case and apostrophes kept.
export function quartzSlug(file) { return path.relative(root, file).replace(/\\/g, '/').replace(/\.md$/i, '').replace(/\s/g, '-').replace(/&/g, '-and-').replace(/%/g, '-percent').replace(/[?#]/g, ''); }
function sourceKey(file) { return path.relative(root, file).replace(/\\/g, '/').replace(/\.md$/i, '').toLowerCase(); }
function titleFor(data, file) { return String(data.title || path.basename(file, '.md')).replace(/\s+/g, ' ').trim(); }
function formatDate(value) {
  if (!value) return '';
  let date;
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split('-').map(Number);
    date = new Date(Date.UTC(year, month - 1, day, 12));
  } else {
    date = value instanceof Date ? value : new Date(value);
  }
  if (Number.isNaN(date.getTime())) return String(value);
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'America/Chicago' }).format(date);
}
// A gift is optional; when a piece has one, it leads (Keith, 2026-11-24: sometimes the writing is plenty).
// `gives:` names it; `gives_link:` is a URL or a vault file, served at /downloads/<name>.
function resolveGives(post) {
  const label = post.data.gives ? String(post.data.gives).trim() : '';
  const raw = post.data.gives_link ? String(post.data.gives_link).trim().replace(/^!?\[\[|\]\]$/g, '').split('|')[0] : '';
  const where = path.relative(root, post.file);
  if (!label || !raw) {
    if (label && !raw && post.data.reviewed === true) throw new Error(`${where}: gives: is set but gives_link: is missing`);
    return null;
  }
  if (/^https?:\/\//.test(raw)) { const s = sourceKind(raw); return { label, href: raw, file: null, kind: s.kind === 'Song' ? 'song' : 'link', meta: s.kind === 'Song' ? `Listen · ${s.host}` : s.host, action: s.kind === 'Song' ? 'Listen' : 'Open' }; }
  const candidates = [path.resolve(path.dirname(post.file), raw), path.resolve(root, raw), path.resolve(root, 'attachments', path.basename(raw))];
  const file = candidates.find((c) => c.startsWith(root + path.sep) && fs.existsSync(c) && fs.statSync(c).isFile());
  if (!file) { if (post.data.reviewed === true) throw new Error(`${where}: gives_link "${raw}" not found in the vault`); return null; }
  const ext = path.extname(file).toLowerCase();
  const name = `${slugify(path.basename(file, ext))}${ext}`;
  const kb = Math.max(1, Math.round(fs.statSync(file).size / 1024));
  const size = kb >= 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${kb} KB`;
  return { label, href: `/downloads/${name}`, file, name, kind: 'download', meta: `${ext.slice(1).toUpperCase()} · ${size}`, action: 'Download' };
}
// Where a link points, said plainly: the margin names the kind of source (Keith is a curator, not an authority).
const SOURCE_HOSTS = [
  [/biblegateway|bible\.com|esv\.org|biblehub|blueletterbible/, 'Scripture'],
  [/bookshop|macmillan|amazon|goodreads|penguinrandomhouse|harpercollins|ivpress|zondervan|bakerbookhouse/, 'Book'],
  [/spotify|music\.apple|bandcamp|soundcloud|tidal|music\.youtube/, 'Song'],
  [/youtube|youtu\.be|vimeo/, 'Video'],
  [/podcasts\.apple|overcast|pca\.st/, 'Podcast'],
];
function sourceKind(href) {
  let host = '';
  try { host = new URL(href).hostname.replace(/^www\./, ''); } catch { return { kind: 'Link', host: href }; }
  const hit = SOURCE_HOSTS.find(([re]) => re.test(host));
  return { kind: hit ? hit[1] : 'Link', host };
}
export function getDownloads() { return getPosts().filter((p) => p.gives && p.gives.file).map((p) => p.gives); }
// Live only when Keith has read it and called it his: `publish: true` and `reviewed: true` (Keith, 2026-11-22).
export function getPosts() {
  if (!fs.existsSync(root)) return [];
  const all = list(root).map((file) => { const parsed = matter(fs.readFileSync(file, 'utf8')); return { file, data: parsed.data, body: parsed.content, sourceKey: sourceKey(file), title: titleFor(parsed.data, file) }; });
  const published = all.filter((post) => post.data.publish === true && (post.data.reviewed === true || process.env.INCLUDE_UNREVIEWED === '1') && categoryFor(post.data) && !isAboutNote(post));
  // Sort before assigning suffixes so collisions resolve the same way on every build.
  published.sort((a, b) => {
    const aPath = path.relative(root, a.file).replace(/\\/g, '/');
    const bPath = path.relative(root, b.file).replace(/\\/g, '/');
    return aPath < bPath ? -1 : aPath > bPath ? 1 : 0;
  });
  // Addresses are keithdperez.com/<slug>: one plain word, two at most (Keith, 2026-11-22).
  // Set `slug:` in the note; once live, a slug never changes.
  const usedSlugs = new Set(RESERVED);
  for (const post of published) {
    const chosen = post.data.slug ? String(post.data.slug).trim() : '';
    if (chosen && !SLUG_RULE.test(chosen)) throw new Error(`slug "${chosen}" in ${path.relative(root, post.file)}: use one lowercase word, two at most (e.g. sabbath, inner-court)`);
    const slug = chosen || slugify(post.title);
    if (usedSlugs.has(slug)) throw new Error(`slug "${slug}" in ${path.relative(root, post.file)} is taken or reserved; set a different slug:`);
    post.slug = slug;
    usedSlugs.add(slug);
  }
  const index = new Map();
  for (const post of published) {
    for (const key of [post.title.toLowerCase(), path.basename(post.file, '.md').toLowerCase(), post.sourceKey, post.slug]) {
      if (!index.has(key)) index.set(key, post);
    }
  }
  return published.map((post) => {
    // The category marks a note as blog material; the site shows no labels (Keith, 2026-11-24).
    const category = categoryFor(post.data);
    const bannerRef = post.data.banner && String(post.data.banner).replace(/^!?\[\[|\]\]$/g, '');
    const bannerCandidates = bannerRef ? [path.resolve(path.dirname(post.file), bannerRef), path.resolve(root, bannerRef), path.resolve(root, 'attachments', path.basename(bannerRef))] : [];
    const bannerFile = bannerCandidates.find((candidate) => candidate.startsWith(root + path.sep) && fs.existsSync(candidate) && fs.statSync(candidate).isFile());
    const banner = bannerFile ? `/media/${encodeURIComponent(path.relative(root, bannerFile)).replace(/%2F/g, '/')}` : null;
    const date = post.data.date || post.data.created || post.data.published || '';
    const legacy = quartzSlug(post.file);
    const gives = resolveGives(post);
    const formattedDate = formatDate(date);
    const { html, sources } = render(post.body, index, post.file, root);
    const plain = post.body.replace(/```[\s\S]*?```/g, '').replace(/[#>*_`\[\]]/g, ' ').replace(/\s+/g, ' ').trim();
    return { ...post, legacy, gives, featured: post.data.featured === true, category, banner, date, formattedDate, html, sources, deck: post.data.description || post.data.subtitle || plain.slice(0, 160), words: plain ? plain.split(/\s+/).length : 0 };
  }).sort((a, b) => String(b.date).localeCompare(String(a.date)) || a.title.localeCompare(b.title))
    .map((post, i, all) => ({ ...post, number: all.length - i }));
}
function render(source, index, currentFile, contentRoot) {
  let text = source.replace(/```bible\s*\n([\s\S]*?)```/g, (_, block) => {
    const lines = block.trim().split('\n'); const ref = lines.pop() || '';
    const verses = lines.map((line) => line.replace(/^\s*(\d+)\s+/, '<sup>$1</sup>')).join(' ');
    return `<div class="scripture">${verses}<span class="ref">${ref.replace(/^\[\[|\]\]$/g, '')}</span></div>`;
  });
  // Obsidian's verse plugin fetches text at read time; the site never invents a quote, so it points to the passage.
  text = text.replace(/```mybible\s*\n([\s\S]*?)```/g, (_, block) => block.replace(/>?\s*\[verse="([^"]+)"\]/g, (__, raw) => {
    const m = raw.trim().match(/^(.*?)(?:\s+([A-Z]{2,6}))?$/); const ref = m[1]; const version = m[2] || 'ESV';
    const href = `https://www.biblegateway.com/passage/?search=${encodeURIComponent(ref)}&version=${version}`;
    return `<p class="scripture passage"><a href="${href}">Read ${ref.replace(/-/g, '–')}</a><span class="ref">${version}</span></p>`;
  }));
  text = text.replace(/^>\s*\[!quote\]\s*\n((?:>.*\n?)*)/gm, (_, quote) => `\n<div class="pull">${quote.split('\n').map((line) => line.replace(/^>\s?/, '')).join(' ')}</div>\n`);
  const resolve = (target) => { const t = target.replace(/\\/g, '/').replace(/\.md$/i, '').toLowerCase(); return index.get(t) || index.get(t.split('/').pop()); };
  text = text.replace(/^[ \t]*[-*][ \t]+\[\[([^\]|#]+)(?:#[^\]|]+)?(?:\|[^\]]+)?\]\][ \t]*$\n?/gm, (line, target) => (resolve(target) ? line : ''));
  text = text.replace(/^(?:---\s*\n+)?See also:\s*\n(?!\s*[-*] )/gm, '');
  const known = new Set([...RESERVED, ...[...index.values()].map((p) => p.slug)]);
  text = text.replace(/\[([^\]]+)\]\(\/([^)\/]*)[^)]*\)/g, (whole, label, first) => (known.has(first.toLowerCase()) ? whole : label));
  text = text.replace(/\[\[([^\]|#]+)(?:#[^\]|]+)?(?:\|([^\]]+))?\]\]/g, (_, target, label) => {
    const normalizedTarget = target.replace(/\\/g, '/').replace(/\.md$/i, '').toLowerCase();
    const key = normalizedTarget.split('/').pop(); const match = index.get(normalizedTarget) || index.get(key);
    return match ? `[${label || match.title}](/${match.slug}/)` : (label || target.split('/').pop());
  });
  // Images use vault-relative paths; links to non-Markdown files resolve beside the note.
  text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (whole, alt, sourcePath) => {
    if (/^(https?:|\/)/.test(sourcePath)) return whole;
    const filePath = path.resolve(path.dirname(currentFile || contentRoot), sourcePath);
    return fs.existsSync(filePath) ? `![${alt}](/media/${encodeURIComponent(path.relative(contentRoot, filePath)).replace(/%2F/g, '/')})` : whole;
  });
  // Outside links become numbered sources: a note in the margin on wide screens, a list at the end everywhere.
  const sources = [];
  const md = new Marked({ renderer: { link({ href, title, tokens }) {
    const label = this.parser.parseInline(tokens);
    if (/^https?:\/\//.test(href)) { const { kind, host } = sourceKind(href); sources.push({ n: sources.length + 1, href, label: label.replace(/<[^>]+>/g, ''), kind, host }); }
    return `<a href="${href}"${title ? ` title="${title}"` : ''}>${label}</a>`;
  } } });
  let html = md.parse(text);
  const firstParagraph = html.indexOf('<p>');
  if (firstParagraph !== -1) {
    const close = html.indexOf('</p>', firstParagraph);
    const firstText = html.slice(firstParagraph, close).replace(/<[^>]+>/g, '');
    // A drop cap needs a paragraph to drop into.
    if (firstText.length > 140) html = `${html.slice(0, firstParagraph)}${html.slice(firstParagraph).replace('<p>', '<p class="first">')}`;
  }
  const lastParagraph = html.lastIndexOf('</p>');
  if (lastParagraph !== -1) html = `${html.slice(0, lastParagraph)}<span class="end" role="img" aria-label="End"></span>${html.slice(lastParagraph)}`;
  return { html, sources };
}
export function getAbout() {
  const file = path.join(root, 'about.md');
  if (!fs.existsSync(file)) return null;
  const parsed = matter(fs.readFileSync(file, 'utf8'));
  if (parsed.data.publish !== true) return null;
  const index = new Map(getPosts().map((post) => [post.title.toLowerCase(), post]));
  const { html, sources } = render(parsed.content, index, file, root);
  return { html: html.replace('<span class="end" role="img" aria-label="End"></span>', ''), sources, file, legacy: quartzSlug(file), tagline: parsed.data.tagline ? String(parsed.data.tagline) : (parsed.content.trim().split(/(?<=[.!?])\s/)[0] || '') };
}
export function categoriesInUse() { const seen = new Map(); for (const post of getPosts()) seen.set(post.category.key, post.category); return [...seen.values()]; }
export function publishablePaths() { return getPosts().map(({ file, slug, title }) => ({ file, slug, title })); }
