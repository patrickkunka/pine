import {assert} from 'chai';

import AstParser, {Models} from './AstParser';

describe('AstParser', function() {
    it('should recognise a string literal', () => {
        const code = '"foo"';
        const program = AstParser.parse(code);
        const token = program.body[0];

        assert.instanceOf(token, Models.Literal);
        assert.equal(token.kind, 'string');
        assert.equal(token.content, 'foo');
        assert.equal(token.raw, '"foo"');
    });

    it('should recognise an empty string literal', () => {
        const code = '""';
        const program = AstParser.parse(code);
        const token = program.body[0];

        assert.instanceOf(token, Models.Literal);
        assert.equal(token.kind, 'string');
        assert.equal(token.content, '');
        assert.equal(token.raw, '""');
    });

    it('should recognise a number literal', () => {
        const code = '0';
        const program = AstParser.parse(code);
        const token = program.body[0];

        assert.instanceOf(token, Models.Literal);
        assert.equal(token.kind, 'number');
        assert.equal(token.content, '0');
    });

    it('should recognise a `true` boolean literal', () => {
        const code = 'true';
        const program = AstParser.parse(code);
        const token = program.body[0];

        assert.instanceOf(token, Models.Literal);
        assert.equal(token.kind, 'boolean');
        assert.equal(token.content, 'true');
    });

    it('should recognise a `false` boolean literal', () => {
        const code = 'false';
        const program = AstParser.parse(code);
        const token = program.body[0];

        assert.instanceOf(token, Models.Literal);
        assert.equal(token.kind, 'boolean');
        assert.equal(token.content, 'false');
    });

    it('should recognise a member expression', () => {
        const code = 'foo.bar';
        const program = AstParser.parse(code);
        const token = program.body[0];

        assert.instanceOf(token, Models.MemberExpression);

        assert.instanceOf(token.object, Models.Identifier);
        assert.equal(token.object.content, 'foo');

        assert.instanceOf(token.property, Models.Identifier);
        assert.equal(token.property.content, 'bar');
    });

    it('should recognise a member expression using `this`', () => {
        const code = 'this.bar';
        const program = AstParser.parse(code);
        const token = program.body[0];

        assert.instanceOf(token, Models.MemberExpression);

        assert.instanceOf(token.object, Models.Keyword);
        assert.equal(token.object.content, 'this');

        assert.instanceOf(token.property, Models.Identifier);
        assert.equal(token.property.content, 'bar');
    });

    it('should recognise a nested member expression', () => {
        const code = 'this.foo.bar';
        const program = AstParser.parse(code);
        const token = program.body[0];

        assert.instanceOf(token, Models.MemberExpression);

        assert.instanceOf(token.object, Models.Keyword);
        assert.equal(token.object.content, 'this');

        assert.instanceOf(token.property, Models.MemberExpression);

        assert.instanceOf(token.property.object, Models.Identifier);
        assert.equal(token.property.object.content, 'foo');

        assert.instanceOf(token.property.property, Models.Identifier);
        assert.equal(token.property.property.content, 'bar');
    });

    it('should recognise a unary expression with an identifier as its argument', () => {
        const code = '!foo';

        const program = AstParser.parse(code);
        const token = program.body[0];

        assert.instanceOf(token, Models.UnaryExpression);
        assert.instanceOf(token.argument, Models.Identifier);

        assert.equal(token.operator.content, '!');
    });

    it('should recognise a unary expression with a member expression as its argument', () => {
        const code = '!this.isFoo';

        const program = AstParser.parse(code);
        const token = program.body[0];

        assert.instanceOf(token, Models.UnaryExpression);
        assert.instanceOf(token.argument, Models.MemberExpression);

        assert.equal(token.operator.content, '!');
    });

    it('should recognise assignment of identifier to identifier', () => {
        const code = 'foo = bar;';
        const program = AstParser.parse(code);
        const token = program.body[0];

        assert.instanceOf(token, Models.AssignmentExpression);

        assert.instanceOf(token.left, Models.Identifier);
        assert.equal(token.left.content, 'foo');

        assert.equal(token.operator.content, '=');

        assert.instanceOf(token.right, Models.Identifier);
        assert.equal(token.right.content, 'bar');
    });

    it('should recognise assignment of a literal to an identifier', () => {
        const code = 'foo = 2;';
        const program = AstParser.parse(code);
        const token = program.body[0];

        assert.instanceOf(token, Models.AssignmentExpression);

        assert.instanceOf(token.left, Models.Identifier);
        assert.equal(token.left.content, 'foo');

        assert.equal(token.operator.content, '=');

        assert.instanceOf(token.right, Models.Literal);
        assert.equal(token.right.kind, 'number');
        assert.equal(token.right.content, '2');
    });

    it('should recognise assignment of a keyword to a member exression', () => {
        const code = 'this.foo.bar = this;';
        const program = AstParser.parse(code);
        const token = program.body[0];

        assert.instanceOf(token, Models.AssignmentExpression);
        assert.instanceOf(token.left, Models.MemberExpression);

        assert.equal(token.operator.content, '=');

        assert.instanceOf(token.right, Models.Keyword);
        assert.equal(token.right.content, 'this');
    });

    it('should recognise a binary expression', () => {
        const code = 'foo > 2';
        const program = AstParser.parse(code);
        const token = program.body[0];

        assert.instanceOf(token, Models.BinaryExpression);
        assert.instanceOf(token.left, Models.Identifier);

        assert.equal(token.operator.content, '>');

        assert.instanceOf(token.right, Models.Literal);
        assert.equal(token.right.content, '2');
    });

    it('should recognise a binary expression', () => {
        const code = 'foo > 2';
        const program = AstParser.parse(code);
        const token = program.body[0];

        assert.instanceOf(token, Models.BinaryExpression);
        assert.instanceOf(token.left, Models.Identifier);

        assert.equal(token.operator.content, '>');

        assert.instanceOf(token.right, Models.Literal);
        assert.equal(token.right.content, '2');
    });

    it('should recognise a binary expression with a double compound operator', () => {
        const code = 'this <= 10';
        const program = AstParser.parse(code);
        const token = program.body[0];

        assert.instanceOf(token, Models.BinaryExpression);
        assert.instanceOf(token.left, Models.Keyword);

        assert.equal(token.operator.content, '<=');

        assert.instanceOf(token.right, Models.Literal);
        assert.equal(token.right.content, '10');
    });

    it('should recognise a binary expression with containing a unary expression', () => {
        const code = 'this > -1';
        const program = AstParser.parse(code);
        const token = program.body[0];

        assert.instanceOf(token, Models.BinaryExpression);
        assert.instanceOf(token.left, Models.Keyword);

        assert.equal(token.operator.content, '>');

        assert.instanceOf(token.right, Models.UnaryExpression);
        assert.equal(token.right.argument.content, '1');
        assert.equal(token.right.operator.content, '-');
    });

    it('should recognise a binary expression with a triple compound operator', () => {
        const code = 'foo !== bar';
        const program = AstParser.parse(code);
        const token = program.body[0];

        assert.instanceOf(token, Models.BinaryExpression);
        assert.instanceOf(token.left, Models.Identifier);

        assert.equal(token.operator.content, '!==');

        assert.instanceOf(token.right, Models.Identifier);
        assert.equal(token.right.content, 'bar');
    });

    it('should recognise a binary expression containing a null pointer', () => {
        const code = 'foo !== null';
        const program = AstParser.parse(code);
        const token = program.body[0];

        assert.instanceOf(token, Models.BinaryExpression);
        assert.instanceOf(token.left, Models.Identifier);

        assert.equal(token.operator.content, '!==');

        assert.instanceOf(token.right, Models.Keyword);
        assert.equal(token.right.content, 'null');
    });

    it('should recognise a binary expression wrapped in parentheses', () => {
        const code = '(foo === bar)';
        const program = AstParser.parse(code);
        const token = program.body[0];

        assert.instanceOf(token, Models.BinaryExpression);

        assert.instanceOf(token.left, Models.Identifier);

        assert.equal(token.operator.content, '===');

        assert.instanceOf(token.right, Models.Identifier);
        assert.equal(token.right.content, 'bar');
    });

    it('should recognise a logical expression', () => {
        const code = 'foo && bar';
        const program = AstParser.parse(code);
        const token = program.body[0];

        assert.instanceOf(token, Models.LogicalExpression);

        assert.instanceOf(token.left, Models.Identifier);
        assert.equal(token.left.content, 'foo');

        assert.equal(token.operator.content, '&&');

        assert.instanceOf(token.right, Models.Identifier);
        assert.equal(token.right.content, 'bar');
    });

    it('should recognise a logical expression wrapped in parentheses', () => {
        const code = '(foo && bar)';
        const program = AstParser.parse(code);
        const token = program.body[0];

        assert.instanceOf(token, Models.LogicalExpression);

        assert.instanceOf(token.left, Models.Identifier);
        assert.equal(token.left.content, 'foo');

        assert.equal(token.operator.content, '&&');

        assert.instanceOf(token.right, Models.Identifier);
        assert.equal(token.right.content, 'bar');
    });

    it('should recognise a logical expression containing a unary expression', () => {
        const code = 'foo && !bar';
        const program = AstParser.parse(code);
        const token = program.body[0];

        assert.instanceOf(token, Models.LogicalExpression);

        assert.instanceOf(token.left, Models.Identifier);
        assert.equal(token.left.content, 'foo');

        assert.equal(token.operator.content, '&&');

        assert.instanceOf(token.right, Models.UnaryExpression);
        assert.equal(token.right.argument.content, 'bar');
        assert.equal(token.right.operator.content, '!');
    });

    it('should recognise a logical expression containing a binary expression', () => {
        const code = 'foo && bar > 4';
        const program = AstParser.parse(code);
        const token = program.body[0];

        assert.instanceOf(token, Models.LogicalExpression);

        assert.instanceOf(token.left, Models.Identifier);
        assert.equal(token.left.content, 'foo');

        assert.equal(token.operator.content, '&&');

        assert.instanceOf(token.right, Models.BinaryExpression);

        assert.instanceOf(token.right.left, Models.Identifier);
        assert.equal(token.right.left.content, 'bar');

        assert.equal(token.right.operator.content, '>');

        assert.instanceOf(token.right.right, Models.Literal);
        assert.equal(token.right.right.content, '4');
    });

    it('should recognise a logical expression containing two binary expressions', () => {
        const code = '(this.bar !== null && this.bar !== "")';
        const program = AstParser.parse(code);
        const token = program.body[0];

        assert.equal(program.body.length, 1);
        assert.instanceOf(token, Models.LogicalExpression);

        assert.instanceOf(token.left, Models.BinaryExpression);

        assert.instanceOf(token.left.left, Models.MemberExpression);
        assert.equal(token.left.left.property.content, 'bar');

        assert.equal(token.left.operator.content, '!==');

        assert.instanceOf(token.left.right, Models.Keyword);
        assert.equal(token.left.right.content, 'null');

        assert.equal(token.operator.content, '&&');

        assert.instanceOf(token.right, Models.BinaryExpression);

        assert.instanceOf(token.right.left, Models.MemberExpression);
        assert.instanceOf(token.right.left.object, Models.Keyword);

        assert.equal(token.right.operator.content, '!==');

        assert.instanceOf(token.right.right, Models.Literal);
        assert.equal(token.right.right.content, '');
    });

    it('should parse compound logical expressions from left to right', () => {
        const code = 'foo && bar || baz';
        const program = AstParser.parse(code);
        const token = program.body[0];

        assert.instanceOf(token, Models.LogicalExpression);
        assert.instanceOf(token.left, Models.LogicalExpression);

        assert.equal(token.operator.content, '||');

        assert.instanceOf(token.right, Models.Identifier);
    });

    it('should parse compound logical expressions according to parentheses placement', () => {
        const code = 'foo && (bar || baz)';
        const program = AstParser.parse(code);
        const token = program.body[0];

        assert.instanceOf(token, Models.LogicalExpression);
        assert.instanceOf(token.left, Models.Identifier);

        assert.equal(token.operator.content, '&&');

        assert.instanceOf(token.right, Models.LogicalExpression);
    });

    it('should recognise a call expression upon an identifier', () => {
        const code = 'foo();';
        const program = AstParser.parse(code);
        const token = program.body[0];

        assert.instanceOf(token, Models.CallExpression);
        assert.instanceOf(token.callee, Models.Identifier);

        assert.equal(token.callee.content, 'foo');
        assert.equal(token.arguments.length, 0);
    });

    it('should recognise a call expression with an arbitrary number of arguments', () => {
        const code = 'foo(foo, 2, false);';
        const program = AstParser.parse(code);
        const token = program.body[0];

        assert.instanceOf(token, Models.CallExpression);
        assert.instanceOf(token.callee, Models.Identifier);

        assert.equal(token.callee.content, 'foo');
        assert.equal(token.arguments.length, 3);

        assert.instanceOf(token.arguments[0], Models.Identifier);
        assert.instanceOf(token.arguments[1], Models.Literal);
        assert.instanceOf(token.arguments[2], Models.Literal);
    });

    it('should recognise a call expression upon a member expression', () => {
        const code = 'console.log("foo");';
        const program = AstParser.parse(code);
        const token = program.body[0];

        assert.instanceOf(token, Models.CallExpression);
        assert.instanceOf(token.callee, Models.MemberExpression);
        assert.instanceOf(token.callee.object, Models.Identifier);

        assert.equal(token.callee.object.content, 'console');

        assert.instanceOf(token.callee.property, Models.Identifier);

        assert.equal(token.callee.property.content, 'log');
        assert.equal(token.arguments.length, 1);

        assert.instanceOf(token.arguments[0], Models.Literal);
    });

    it('should recognise a variable declaration with keyword `var`', () => {
        const code = 'var foo = "bar";';
        const program = AstParser.parse(code);
        const token = program.body[0];

        assert.instanceOf(token, Models.VariableDeclaration);

        assert.equal(token.kind, 'var');

        assert.instanceOf(token.identifier, Models.Identifier);

        assert.equal(token.identifier.content, 'foo');

        assert.instanceOf(token.init, Models.Literal);

        assert.equal(token.init.content, 'bar');
    });

    it('should recognise a variable declaration with keyword `const`', () => {
        const code = 'const foo = false;';
        const program = AstParser.parse(code);
        const token = program.body[0];

        assert.instanceOf(token, Models.VariableDeclaration);

        assert.equal(token.kind, 'const');

        assert.instanceOf(token.identifier, Models.Identifier);

        assert.equal(token.identifier.content, 'foo');

        assert.instanceOf(token.init, Models.Literal);

        assert.equal(token.init.content, 'false');
    });

    it('should recognise a variable declaration with keyword `let`', () => {
        const code = 'let foo = 10;';
        const program = AstParser.parse(code);
        const token = program.body[0];

        assert.instanceOf(token, Models.VariableDeclaration);

        assert.equal(token.kind, 'let');

        assert.instanceOf(token.identifier, Models.Identifier);

        assert.equal(token.identifier.content, 'foo');

        assert.instanceOf(token.init, Models.Literal);

        assert.equal(token.init.content, '10');
    });

    it('should recognise a return statement with no argument', () => {
        const code = 'return;';
        const program = AstParser.parse(code);
        const token = program.body[0];

        assert.instanceOf(token, Models.ReturnStatement);

        assert.equal(token.argument, null);
    });

    it('should recognise a return statement with an identifier as an argument', () => {
        const code = 'return foo;';
        const program = AstParser.parse(code);
        const token = program.body[0];

        assert.instanceOf(token, Models.ReturnStatement);

        assert.instanceOf(token.argument, Models.Identifier);

        assert.equal(token.argument.content, 'foo');
    });

    it('should recognise a return statement with a logical expression as an argument', () => {
        const code = 'return foo && bar;';
        const program = AstParser.parse(code);
        const token = program.body[0];

        assert.instanceOf(token, Models.ReturnStatement);
        assert.instanceOf(token.argument, Models.LogicalExpression);
    });

    it('should recognise a return statement with a binary expression as an argument', () => {
        const code = 'return foo > 3;';
        const program = AstParser.parse(code);
        const token = program.body[0];

        assert.instanceOf(token, Models.ReturnStatement);
        assert.instanceOf(token.argument, Models.BinaryExpression);
    });

    it('should recognise a return statement with a compound logical expression as an argument', () => {
        const code = 'return this.foo === "bar" && this.isFoo && this.isBar;';
        const program = AstParser.parse(code);
        const token = program.body[0];
        const logicalExpression = token.argument;

        assert.instanceOf(token, Models.ReturnStatement);
        assert.instanceOf(logicalExpression, Models.LogicalExpression);

        assert.instanceOf(logicalExpression.left, Models.LogicalExpression);
        assert.instanceOf(logicalExpression.left.left, Models.BinaryExpression);
        assert.instanceOf(logicalExpression.left.right, Models.MemberExpression);
        assert.instanceOf(logicalExpression.right, Models.MemberExpression);
    });

    it('should recognise a return statement with a unary expression as an argument', () => {
        const code = 'return !this.isFoo;';
        const program = AstParser.parse(code);
        const token = program.body[0];

        assert.instanceOf(token, Models.ReturnStatement);
        assert.instanceOf(token.argument, Models.UnaryExpression);

        assert.equal(token.argument.operator.content, '!');
    });

    it('should recognise an abstract block statement', () => {
        const code = (
            `{
                var foo = 'bar';
            }`
        );

        const program = AstParser.parse(code);
        const token = program.body[0];
        const blockBody = program.body[0].body;

        assert.instanceOf(token, Models.BlockStatement);
        assert.instanceOf(blockBody[0], Models.VariableDeclaration);
    });

    it('should recognise an abstract block statement with multiple statements', () => {
        const code = (
            `{
                var foo = 'bar';

                return foo || false;
            }`
        );

        const program = AstParser.parse(code);
        const token = program.body[0];
        const blockBody = program.body[0].body;

        assert.instanceOf(token, Models.BlockStatement);
        assert.instanceOf(blockBody[0], Models.VariableDeclaration);
        assert.instanceOf(blockBody[1], Models.ReturnStatement);
    });

    it('should recognise a function declaration', () => {
        const code = (
            `function foo() {
                var bar = 'foo';

                return bar;
            }`
        );

        const program = AstParser.parse(code);
        const token = program.body[0];
        const functionBody = token.body.body;

        assert.instanceOf(token, Models.FunctionDeclaration);
        assert.instanceOf(token.identifier, Models.Identifier);

        assert.equal(token.params.length, 0);

        assert.instanceOf(functionBody[0], Models.VariableDeclaration);
        assert.instanceOf(functionBody[1], Models.ReturnStatement);
    });

    it('should recognise a function declaration with one or more paramters', () => {
        const code = (
            `function foo(x, y) {
                return x > y;
            }`
        );

        const program = AstParser.parse(code);
        const token = program.body[0];
        const functionBody = token.body.body;

        assert.instanceOf(token, Models.FunctionDeclaration);
        assert.instanceOf(token.identifier, Models.Identifier);

        assert.equal(token.params.length, 2);
        assert.equal(token.params[0].content, 'x');
        assert.equal(token.params[1].content, 'y');

        assert.instanceOf(functionBody[0], Models.ReturnStatement);
    });

    it('should recognise an if statement with only a consequent', () => {
        const code = (
            `if (x > y) {
                return true;
            }`
        );

        const program = AstParser.parse(code);
        const token = program.body[0];
        const consequent = token.consequent;

        assert.instanceOf(token, Models.IfStatement);
        assert.instanceOf(token.test, Models.BinaryExpression);

        assert.instanceOf(consequent.body[0], Models.ReturnStatement);
    });

    it('should recognise an if statement with a single identifier as a test', () => {
        const code = (
            `if (isFoo) {
                return true;
            }`
        );

        const program = AstParser.parse(code);
        const token = program.body[0];
        const consequent = token.consequent;

        assert.instanceOf(token, Models.IfStatement);
        assert.instanceOf(token.test, Models.Identifier);

        assert.instanceOf(consequent.body[0], Models.ReturnStatement);
    });

    it('should recognise an if statement with a single member expression as a test', () => {
        const code = (
            `if (this.isFoo) {
                return true;
            }`
        );

        const program = AstParser.parse(code);
        const token = program.body[0];
        const consequent = token.consequent;

        assert.instanceOf(token, Models.IfStatement);
        assert.instanceOf(token.test, Models.MemberExpression);

        assert.instanceOf(consequent.body[0], Models.ReturnStatement);
    });

    it('should recognise an if statement with a consequent and alternate', () => {
        const code = (
            `if (x > y) {
                return true;
            } else {
                return false;
            }`
        );

        const program = AstParser.parse(code);
        const token = program.body[0];
        const consequent = token.consequent;
        const alternate = token.alternate;

        assert.instanceOf(token, Models.IfStatement);
        assert.instanceOf(token.test, Models.BinaryExpression);

        assert.instanceOf(consequent.body[0], Models.ReturnStatement);
        assert.instanceOf(alternate.body[0], Models.ReturnStatement);
    });

    it('should recognise an if statement with a nested if statement within the alternate', () => {
        const code = (
            `if (x > y) {
                return true;
            } else if (x < y) {
                return false;
            }`
        );

        const program = AstParser.parse(code);
        const token = program.body[0];
        const consequent = token.consequent;
        const alternate = token.alternate;

        assert.instanceOf(token, Models.IfStatement);
        assert.instanceOf(token.test, Models.BinaryExpression);

        assert.instanceOf(consequent.body[0], Models.ReturnStatement);
        assert.instanceOf(alternate, Models.IfStatement);

        assert.instanceOf(alternate.consequent.body[0], Models.ReturnStatement);
        assert.equal(alternate.altenative, null);
    });

    it('should recognise an if statement with a full nested if statement within the alternate', () => {
        const code = (
            `if (x > y) {
                return true;
            } else if (x < y) {
                return false;
            } else {
                return;
            }`
        );

        const program = AstParser.parse(code);
        const token = program.body[0];
        const consequent = token.consequent;
        const alternate = token.alternate;

        assert.instanceOf(token, Models.IfStatement);
        assert.instanceOf(token.test, Models.BinaryExpression);

        assert.instanceOf(consequent.body[0], Models.ReturnStatement);
        assert.instanceOf(alternate, Models.IfStatement);

        assert.instanceOf(alternate.consequent.body[0], Models.ReturnStatement);
        assert.instanceOf(alternate.alternate.body[0], Models.ReturnStatement);
    });
});