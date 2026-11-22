import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';

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
  return categories[key] ? { key, label: categories[key][0], color: categories[key][1] } : null;
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
export function getPosts() {
  if (!fs.existsSync(root)) return [];
  const all = list(root).map((file) => { const parsed = matter(fs.readFileSync(file, 'utf8')); return { file, data: parsed.data, body: parsed.content, sourceKey: sourceKey(file), title: titleFor(parsed.data, file) }; });
  const published = all.filter((post) => post.data.publish === true && categoryFor(post.data) && !isAboutNote(post));
  // Sort before assigning suffixes so collisions resolve the same way on every build.
  published.sort((a, b) => {
    const aPath = path.relative(root, a.file).replace(/\\/g, '/');
    const bPath = path.relative(root, b.file).replace(/\\/g, '/');
    return aPath < bPath ? -1 : aPath > bPath ? 1 : 0;
  });
  const usedSlugs = new Set();
  for (const post of published) {
    const base = slugify(post.title);
    let candidate = base;
    for (let suffix = 2; usedSlugs.has(candidate); suffix += 1) candidate = `${base}-${suffix}`;
    post.slug = candidate;
    usedSlugs.add(candidate);
  }
  const index = new Map();
  for (const post of published) {
    for (const key of [post.title.toLowerCase(), path.basename(post.file, '.md').toLowerCase(), post.sourceKey, post.slug]) {
      if (!index.has(key)) index.set(key, post);
    }
  }
  return published.map((post) => {
    const category = categoryFor(post.data);
    const bannerRef = post.data.banner && String(post.data.banner).replace(/^!?\[\[|\]\]$/g, '');
    const bannerCandidates = bannerRef ? [path.resolve(path.dirname(post.file), bannerRef), path.resolve(root, bannerRef), path.resolve(root, 'attachments', path.basename(bannerRef))] : [];
    const bannerFile = bannerCandidates.find((candidate) => candidate.startsWith(root + path.sep) && fs.existsSync(candidate) && fs.statSync(candidate).isFile());
    const banner = bannerFile ? `/media/${encodeURIComponent(path.relative(root, bannerFile)).replace(/%2F/g, '/')}` : null;
    const date = post.data.date || post.data.created || post.data.published || '';
    const legacy = quartzSlug(post.file);
    const formattedDate = formatDate(date);
    const html = render(post.body, index, post.file, root);
    const plain = post.body.replace(/```[\s\S]*?```/g, '').replace(/[#>*_`\[\]]/g, ' ').replace(/\s+/g, ' ').trim();
    return { ...post, legacy, featured: post.data.featured === true, category, banner, date, formattedDate, html, deck: post.data.description || post.data.subtitle || plain.slice(0, 160), words: plain ? plain.split(/\s+/).length : 0 };
  }).sort((a, b) => String(b.date).localeCompare(String(a.date)));
}
function render(source, index, currentFile, contentRoot) {
  let text = source.replace(/```bible\s*\n([\s\S]*?)```/g, (_, block) => {
    const lines = block.trim().split('\n'); const ref = lines.pop() || '';
    const verses = lines.map((line) => line.replace(/^\s*(\d+)\s+/, '<sup>$1</sup>')).join(' ');
    return `<div class="scripture">${verses}<span class="ref">${ref.replace(/^\[\[|\]\]$/g, '')}</span></div>`;
  });
  text = text.replace(/^>\s*\[!quote\]\s*\n((?:>.*\n?)*)/gm, (_, quote) => `\n<div class="pull">${quote.split('\n').map((line) => line.replace(/^>\s?/, '')).join(' ')}</div>\n`);
  const resolve = (target) => { const t = target.replace(/\\/g, '/').replace(/\.md$/i, '').toLowerCase(); return index.get(t) || index.get(t.split('/').pop()); };
  text = text.replace(/^[ \t]*[-*][ \t]+\[\[([^\]|#]+)(?:#[^\]|]+)?(?:\|[^\]]+)?\]\][ \t]*$\n?/gm, (line, target) => (resolve(target) ? line : ''));
  text = text.replace(/^(?:---\s*\n+)?See also:\s*\n(?!\s*[-*] )/gm, '');
  text = text.replace(/\[([^\]]+)\]\((\/(?!essays\/|category\/|about\/|rss\.xml)[^)]*)\)/g, '$1');
  text = text.replace(/\[\[([^\]|#]+)(?:#[^\]|]+)?(?:\|([^\]]+))?\]\]/g, (_, target, label) => {
    const normalizedTarget = target.replace(/\\/g, '/').replace(/\.md$/i, '').toLowerCase();
    const key = normalizedTarget.split('/').pop(); const match = index.get(normalizedTarget) || index.get(key);
    return match ? `[${label || match.title}](/essays/${match.slug}/)` : (label || target.split('/').pop());
  });
  // Images use vault-relative paths; links to non-Markdown files resolve beside the note.
  text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (whole, alt, sourcePath) => {
    if (/^(https?:|\/)/.test(sourcePath)) return whole;
    const filePath = path.resolve(path.dirname(currentFile || contentRoot), sourcePath);
    return fs.existsSync(filePath) ? `![${alt}](/media/${encodeURIComponent(path.relative(contentRoot, filePath)).replace(/%2F/g, '/')})` : whole;
  });
  let html = marked.parse(text);
  const firstParagraph = html.indexOf('<p>');
  if (firstParagraph !== -1) html = `${html.slice(0, firstParagraph)}${html.slice(firstParagraph).replace('<p>', '<p class="first">')}`;
  const lastParagraph = html.lastIndexOf('</p>');
  if (lastParagraph !== -1) html = `${html.slice(0, lastParagraph)}<span class="end" aria-label="End of essay"></span>${html.slice(lastParagraph)}`;
  return html;
}
export function getAbout() {
  const file = path.join(root, 'about.md');
  if (!fs.existsSync(file)) return null;
  const parsed = matter(fs.readFileSync(file, 'utf8'));
  if (parsed.data.publish !== true) return null;
  const index = new Map(getPosts().map((post) => [post.title.toLowerCase(), post]));
  return { html: render(parsed.content, index, file, root).replace('<span class="end" aria-label="End of essay"></span>', ''), file, legacy: quartzSlug(file) };
}
export function categoriesInUse() { const seen = new Map(); for (const post of getPosts()) seen.set(post.category.key, post.category); return [...seen.values()]; }
export function publishablePaths() { return getPosts().map(({ file, slug, title }) => ({ file, slug, title })); }
