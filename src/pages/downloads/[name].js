import fs from 'node:fs';
import { getDownloads } from '../../lib/content.js';
export function getStaticPaths() { return getDownloads().map((d) => ({ params: { name: d.name }, props: { file: d.file } })); }
export function GET({ props }) { return new Response(fs.readFileSync(props.file)); }
