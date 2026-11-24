---
target: the site
total_score: 23
max_score: 32
na_heuristics: 7,10
p0_count: 2
p1_count: 3
timestamp: 2026-11-24T19-37-26Z
slug: src-layouts-base-astro
---
Target: keithdperez.com Astro rebuild (src/layouts/Base.astro, src/pages/*). Heuristics 23/32 (7,10 n/a).
P0: production build ships empty (no reviewed:true notes); /writing/ link dead.
P0: inline source links invisible (no .body a style) — curator voice erased.
P1: [verse=] shortcode leaks raw (/firstfruits/).
P1: the gift sits last and reads as one more link; no gift index; no OG image.
P1: structure is Aeon magazine (hero + 4-up pigment cards) for ~11 short pieces in one category → wall of identical teal blocks, title shown twice.
P2: no focus styles, no skip link, nav 9-12px with no padding (tap targets), no aria-current, h1→h3 skip.
P2: 312KB render-blocking CSS (base64 fonts) + Archivo from Google with a local() stub that can shadow it.
P3: drop cap on one-line openers; dates default Dec 31 2025; word count shown on 33-word pieces; no 404.
