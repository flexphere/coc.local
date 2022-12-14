function go(data) {
  return `
  package main

  import (
    "fmt"
  )
  
  var testCases = []map[string]string{
    ${data.map(v=>JSON.stringify(v)).join(",\n    ")}
  }
  
  func main() {
    // solve(testCases[0]["input"])
    runTests()
  }
  
  func solve(input string) string {
    return "your answer here"
  }
  
  func runTests() {
    for i, testCase := range testCases {
      result := solve(testCase["input"])
      if result != testCase["output"] {
        fmt.Printf("[Test%d] \\033[1;31mx Failed\\033[0m expected: %v, actual: %v\n", i+1, testCase["output"], result)
      } else {
        fmt.Printf("[Test%d] \\033[1;32m✔️ Passed\\033[0m\n", i+1)
      }
    }
  }`;
}