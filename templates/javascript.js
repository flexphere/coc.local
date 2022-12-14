function javascript(data) {
  return `
    const data = [
      ${data.map(v=>JSON.stringify(v)).join(",\n      ")}
    ];
    
    function solve(input) {
      return "your answer here"
    }

    function runTests() {
      for (const [i, testCase] of Object.entries(data)) {
        const result = solve(testCase["input"])
        if (result != testCase["output"]) {
          console.log(\`[Test\${+i+1}] \x1b[31mx Failed\x1b[0m expected: \${testCase["output"]}, actual: \${result}\n\`)
        } else {
          console.log(\`[Test\${+i+1}] \x1b[32m✔️ Passed\x1b[0m\n\`)
        }
      }
    }

    runTests();
  `;
}