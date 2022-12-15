function rust(data) {
  return `
${"/*\n" + data.statement + "*/"}

fn main() { println!("Hello, world!"); }

#[cfg(test)]
mod tests {
    struct COCIO<'a> {
        input:&'a str,
        output:&'a str
    }

    fn solve(input:&str)->&str{
      return "your answer here"
    }
    
    #[test]
    fn test(){
        let tests:Vec<COCIO> = vec![
          ${data.tests.map(v=>'COCIO'+JSON.stringify(v)).join(",\n          ")}
        ];

        for t in tests {
            if solve(t.input) == t.output{
                println!("Test passed!")
            }
            else{
                panic!("Test failed for {}",t.input);
            }
        }
    }
}
  `;
}