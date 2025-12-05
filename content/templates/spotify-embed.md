<%*
const editor = this.app.workspace.activeEditor?.editor;
if (!editor) {
  tR = "⚠️ No editor found.";
  return;
}

const selection = editor.getSelection();
const match = selection.match(/track\/([a-zA-Z0-9]+)/);

if (!match) {
  tR = "⚠️ No valid Spotify track ID found in selection.";
} else {
  const trackId = match[1];
  editor.replaceSelection(
    `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/${trackId}" width="100%" height="152" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`
  );
}
%>