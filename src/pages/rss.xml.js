import { getPosts } from '../lib/content.js';
export async function GET({ site }) {
 const base = site || new URL('https://keithdperez.com');
 const items = getPosts().map((post) => `<item><title><![CDATA[${post.title}]]></title><link>${base}${post.slug}/</link><guid>${base}${post.slug}/</guid><description><![CDATA[${post.deck}]]></description>${post.date ? `<pubDate>${new Date(post.date).toUTCString()}</pubDate>` : ''}</item>`).join('');
 return new Response(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Keith D. Perez</title><link>${base}</link><description>Essays, studies, and reflections by Keith D. Perez.</description>${items}</channel></rss>`, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
