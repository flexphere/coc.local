const $ = document;

const FileExt = {
  go: "go",
  rust: "rs",
  javascript: "js",
  python: "py",
};

const overlay = $.createElement("div");
overlay.id = "coc_scraper_overlay";
$.body.append(overlay);

const placeholder = $.createElement("div");
placeholder.id = "coc_scraper";
$.body.append(placeholder);

$.addEventListener("keydown", (e) => {
  if (e.key === "/" && e.ctrlKey) {
    placeholder.classList.contains("active") ? hide() : show();
  }
});

$.addEventListener("click", (e) => {
  if (e.target.id === "coc_scraper_overlay") {
    hide();
  }
});

async function start() {
  placeholder.innerHTML = "";
  const testCases = await getTestCases();

  for (const lang of [go, javascript, rust, python]) {
    placeholder.innerHTML += `
      <details>
        <summary>${lang.name}</summary>
        <pre data-src="coc.${FileExt[lang.name]}" data-download-link>
          <code class="language-${lang.name}">${lang(testCases)}</code>
        </pre>
      </details>
    `;
  }

  Prism.highlightAll();
  Prism.plugins.toolbar.registerButton('download-files', function (env) {
    var pre = env.element.parentNode;
    if (!pre || !/pre/i.test(pre.nodeName) || !pre.hasAttribute('data-src')) return;
    var a = document.createElement('a');
    a.textContent = 'Download';
    a.setAttribute('download', '');
    a.setAttribute('target', '_blank');
    a.href = pre.getAttribute('data-src');
    return a;
  });
}

function hide() {
  placeholder.classList.remove("active");
  overlay.classList.remove("active");
}

function show() {
  start();
  placeholder.classList.add("active");
  overlay.classList.add("active");
}

async function getTestCases() {
  const clashId = location.href.split(`/`).at(-1);

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const res = await fetch(
    "https://www.codingame.com/services/TestSession/startTestSession",
    {
      headers,
      method: "POST",
      body: JSON.stringify([clashId]),
    }
  );

  const json = await res.json();

  const alltests = Promise.all(
    json.currentQuestion.question.testCases.map(async (testCases) => {
      return await getSingleTestCase(
        testCases.inputBinaryId,
        testCases.outputBinaryId
      );
    })
  );

  return alltests;
}

async function getSingleTestCase(inputId, outputId) {
  let input, output;
  {
    const res = await fetch(
      `https://static.codingame.com/servlet/fileservlet?id=${inputId}`
    );
    input = await res.text();
  }
  {
    const res = await fetch(
      `https://static.codingame.com/servlet/fileservlet?id=${outputId}`
    );
    output = await res.text();
  }
  return { input, output };
}
