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

let timer = setInterval(() => {
  testCases = getTestCases();
  if (testCases.length) {
    clearInterval(timer);
    generateTests();
    Prism.highlightAll();
  }
}, 1000);

function getTestCases() {
  const testCases = Array.from($.querySelectorAll(".testcase-content,.statement-inout")).map(
    (el) => {
      return {
        input: el.querySelectorAll(".testcase-in,.question-statement-example-in")[0].innerHTML,
        output: el.querySelectorAll(".testcase-out,.question-statement-example-out")[0].innerHTML,
      };
    }
  );
  return testCases;
}

function generateTests() {
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
}

function hide() {
  placeholder.classList.remove("active");
  overlay.classList.remove("active");
}

function show() {
  placeholder.classList.add("active");
  overlay.classList.add("active");
}
