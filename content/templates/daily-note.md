# DAILY NOTE
_<% tp.date.now("dddd, MMMM Do, YYYY") %>_

<%*
try {
  const file = app.vault.getAbstractFileByPath("life-journal-links.json")
  if (!file) throw "Couldn’t find life-journal-links.json at vault root."
  const raw  = await app.vault.read(file)
  const data = JSON.parse(raw)
  const key  = tp.date.now("MM-DD")
  const url  = data[key]
  if (url) {
    tR += `[📖 Today's Reading](${url})`
  } else {
    tR += "📖 No reading found for today."
  }
} catch (e) {
  tR += `🚨 Error loading JSON: ${e}`
}
%>  [✅ Tasks](things:///show?id=today)

---

