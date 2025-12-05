<%*
const kind = await tp.system.suggester(
  ["Embed (iframe)", "Markdown Preview (![] link)"],
  ["iframe", "markdown"]
);

const url = await tp.system.prompt("Paste URL");

if (kind === "iframe") {
  const size = await tp.system.suggester(
    ["Fixed height (reliable)", "Aspect ratio (16:9)", "Aspect ratio (9:16)"],
    ["fixed", "16/9", "9/16"]
  );

  if (size === "fixed") {
    const h = await tp.system.prompt("Height in px (e.g. 560)");
    tR += `<iframe src="${url}" style="width:100%;height:${h}px;border:0;" loading="lazy" allow="autoplay; encrypted-media; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
  } else {
    tR += `<iframe src="${url}" style="width:100%;aspect-ratio:${size};border:0;" loading="lazy" allow="autoplay; encrypted-media; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
  }
}

if (kind === "markdown") {
  tR += `![](${url})`;
}
%>
