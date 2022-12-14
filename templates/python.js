function python(data) {
  return `
${"'''\n" + data.statement + "'''"}

testCases = [
  ${data.tests.map(v=>JSON.stringify(v)).join(",\n  ")}
]

def solve(input):
  return "your answer here"

def runTests():
  for i, testCase in enumerate(testCases):
    result = solve(testCase["input"])
    if result != testCase["output"]:
      print("[Test%s] \\033[1;31mx Failed\\033[0m expected: %s, actual: %s" % (str(i+1), testCase["output"], result))
    else:
      print("[Test%s] \\033[1;32m✔️ Passed\\033[0m" % str(i+1))

if __name__ == "__main__" :
  # solve(testCases[0]["input"])
  runTests()
`;
}