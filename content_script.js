const overlay = document.createElement("div");
overlay.id = "coc_scraper_overlay";
document.body.append(overlay);

const placeholder = document.createElement("div");
placeholder.id = "coc_scraper";
document.body.append(placeholder);

document.addEventListener("keydown", (e) => {
  if (e.key === "/" && e.ctrlKey) {
    placeholder.classList.contains("active") ? reset() : generate();
  }
});

document.addEventListener("click", (e) => {
  if (e.target.id === "coc_scraper_overlay") {
    reset();
  }
});

async function generate() {
  const testCases = await getTestCases();

  for (const lang of [go, javascript, rust, python]) {
    const code = lang(testCases);
    const { name, url } = createDataUrl(code, lang);
    placeholder.innerHTML += `
      <details>
        <summary>${lang.name}</summary>
        <pre data-src="${url}" data-filename="${name}">
          <code class="language-${lang.name}">${code}</code>
        </pre>
      </details>
    `;
  }

  Prism.highlightAll();

  placeholder.classList.add("active");
  overlay.classList.add("active");
}

function reset() {
  placeholder.classList.remove("active");
  overlay.classList.remove("active");
  placeholder.innerHTML = "";
}