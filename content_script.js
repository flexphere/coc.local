const $ = document;

const overlay = $.createElement("div");
overlay.id = "coc_scraper_overlay";
$.body.append(overlay);

const placeholder = $.createElement("div");
placeholder.id = "coc_scraper";
$.body.append(placeholder);

$.addEventListener("keypress", (e) => {
  if (e.key === "/" && e.ctrlKey) {
    placeholder.classList.contains("active") ? hide() : show();
  }
});

$.addEventListener("click", (e) => {
  if (e.target.id === "coc_scraper_overlay") {
    hide();
  }
});

const testCases = Array.from($.querySelectorAll(".testcase-content")).map(
  (el) => {
    return {
      input: el.querySelector(".testcase-in").innerHTML,
      output: el.querySelector(".testcase-out").innerHTML,
    };
  }
);

for (const lang of [go, javascript, rust, python]) {
  placeholder.innerHTML += `
    <details>
      <summary>${lang.name}</summary>
      <pre>
        <code class="language-${lang.name}">${lang(testCases)}</code>
      </pre>
    </details>
  `;
}

function hide() {
  placeholder.classList.remove("active");
  overlay.classList.remove("active");
}

function show() {
  placeholder.classList.add("active");
  overlay.classList.add("active");
}
