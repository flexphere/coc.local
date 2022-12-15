async function getQuestion(clashId) {
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

  const statement = formatQuestion(json.currentQuestion.question.statement);

  const tests = await Promise.all(
    json.currentQuestion.question.testCases.map(async (testCases) => {
      return await getTestCase(
        testCases.inputBinaryId,
        testCases.outputBinaryId
      );
    })
  );

  const data = {
    statement,
    tests
  }

  sessionStorage.setItem(clashId, JSON.stringify(data));

  return data;
}

async function getTestCase(inputId, outputId) {
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

function formatQuestion(statement) {
    //strip styles
    statement = statement.replace(/<style(.|\n)*\/style>/g, "");

    //strip tags
    statement = statement.replace(/(<([^>]+)>)/gi, "");
  
    //unescape html entities
    let txt = new DOMParser().parseFromString(statement, "text/html");
    statement = txt.documentElement.textContent;
  
    //remove indentation
    statement = statement.replace(/ {2,}/g, "");
    
    //remove recurring newlines
    statement = statement.replace(/\n{3,}/gm, "\n\n");
  
    return statement
}
