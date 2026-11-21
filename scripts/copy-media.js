import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
const root = path.resolve(process.env.CONTENT_DIR || path.join(process.env.HOME || '', 'vault'));
const out = path.resolve('public/media');
const ignoredDirs = new Set(['.obsidian', '.claude', '.copilot', '.trash', '.git', '.agents', 'agent', 'attachments', 'references', 'daily', 'conversations', 'archive', 'templates', 'projects', 'resources', 'production', 'church', 'guides', 'bible', 'journal', 'private']);
const files = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => { const full = path.join(dir, entry.name); if (entry.isDirectory() && (entry.name.startsWith('.') || ignoredDirs.has(entry.name.toLowerCase()))) return []; return entry.isDirectory() ? files(full) : /\.md$/i.test(entry.name) ? [full] : []; });
if (!fs.existsSync(root)) process.exit(0);
fs.rmSync(out, { recursive: true, force: true });
for (const file of files(root)) {
 const { data, content } = matter(fs.readFileSync(file, 'utf8'));
 const categoryRaw = Array.isArray(data.categories) ? data.categories.join(' ') : String(data.categories || '');
 const category = categoryRaw.match(/\[\[([^\]]+)\]\]/)?.[1]?.toLowerCase();
 if (data.publish !== true || !['writing', 'studies', 'reflections', 'music'].includes(category)) continue;
 const refs = [];
 if (data.banner) refs.push(String(data.banner).replace(/^!?\[\[|\]\]$/g, '').replace(/^attachments\//i, ''));
 for (const match of content.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)) if (!/^(https?:|\/)/.test(match[1])) refs.push(match[1]);
 for (const ref of refs) {
  const candidates = [path.resolve(path.dirname(file), ref), path.resolve(root, ref), path.resolve(root, 'attachments', path.basename(ref))];
  const source = candidates.find((candidate) => candidate.startsWith(root + path.sep) && fs.existsSync(candidate) && fs.statSync(candidate).isFile());
  if (!source) continue;
  const dest = path.join(out, path.relative(root, source)); fs.mkdirSync(path.dirname(dest), { recursive: true }); fs.copyFileSync(source, dest);
 }
}
