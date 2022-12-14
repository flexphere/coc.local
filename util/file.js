const FileExt = {
  go: ".go",
  rust: ".rs",
  javascript: ".js",
  python: ".py",
};

function createDataUrl(data, lang, prefix="coc") {
  const name = prefix + FileExt[lang.name];
  const blob = new Blob([data], {type:"text/plain"})
  const url = URL.createObjectURL(blob);
  return {name, url};
}