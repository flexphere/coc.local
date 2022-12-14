async function getTestCases() {
  const clashId = location.href.split(`/`).at(-1);

  const cache = sessionStorage.getItem(clashId);
  if (cache) {
    return JSON.parse(cache);
  }

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

  const alltests = await Promise.all(
    json.currentQuestion.question.testCases.map(async (testCases) => {
      return await getSingleTestCase(
        testCases.inputBinaryId,
        testCases.outputBinaryId
      );
    })
  );

  sessionStorage.setItem(clashId, JSON.stringify(alltests));

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
