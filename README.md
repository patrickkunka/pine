# Pine

Pine is a lightweight JavaScript AST Parser for Node.js.

Initially created to power [Cortex](https://github.com/wearecolony/cortex-js)'s JavaScript to C# class transpiler, Pine currently supports only a subset of JavaScript syntax neccasary for the evaluation of class "getter" functions, the content of which can be explicity understood in C#.

The following syntax is currently supported:

```
MEMBER_EXPRESSION
UNARY_EXPRESSION
PARAMETERS_EXPRESSION
ASSIGNMENT_EXPRESSION
BINARY_EXPRESSION
LOGICAL_EXPRESSION
CALL_EXPRESSION
VARIABLE_DECLARATION
RETURN_STATEMENT
BLOCK_STATEMENT
FUNCTION_DECLARATION
IF_STATEMENT
```

The intention is to add support for a wider range of syntaxes, with the option to provide a stricter subset to the parser at runtime.

## API

```js
import Pine from 'pine';

programString = 'var foo = "bar";';

const program = Pine.parse(programString);
```

The above example returns an instance of `pine.Models.Program` which can be considered the AST root. In the above example, the returned value is as follows:

```js
Program {
    body: [
        VariableDeclaration {
            kind: 'var'
            identifier: Identifier {
                content: 'foo'
            }
            init: Literal {
                kind: 'string',
                content: 'bar'
            }
        }
    ]
}
```

## Requirements

Node >= 7

---
*&copy; 2017 Patrick Kunka / KunkaLabs Ltd*
