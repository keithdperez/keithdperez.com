import { defineConfig } from 'astro/config';
// Previews are viewed from Keith's phone over Tailscale (Keith, 2026-11-22).
const tailnet = ['.ts.net'];
export default defineConfig({
  output: 'static',
  site: 'https://keithdperez.com',
  build: { format: 'directory' },
  server: { host: true, allowedHosts: tailnet },
  vite: { server: { allowedHosts: tailnet }, preview: { allowedHosts: tailnet } },
});
