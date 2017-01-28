'use strict';

var _AstParser = require('./AstParser.js');

var _AstParser2 = _interopRequireDefault(_AstParser);

var _Models = require('./Models.js');

var _Models2 = _interopRequireDefault(_Models);

var _chai = require('chai');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('AstParser', function () {
    it('should recognise a string literal', () => {
        const code = '"foo"';
        const program = _AstParser2.default.parse(code);
        const token = program.body[0];

        _chai.assert.instanceOf(token, _Models2.default.Literal);
        _chai.assert.equal(token.kind, 'string');
        _chai.assert.equal(token.content, 'foo');
        _chai.assert.equal(token.raw, '"foo"');
    });

    it('should recognise an empty string literal', () => {
        const code = '""';
        const program = _AstParser2.default.parse(code);
        const token = program.body[0];

        _chai.assert.instanceOf(token, _Models2.default.Literal);
        _chai.assert.equal(token.kind, 'string');
        _chai.assert.equal(token.content, '');
        _chai.assert.equal(token.raw, '""');
    });

    it('should recognise a number literal', () => {
        const code = '0';
        const program = _AstParser2.default.parse(code);
        const token = program.body[0];

        _chai.assert.instanceOf(token, _Models2.default.Literal);
        _chai.assert.equal(token.kind, 'number');
        _chai.assert.equal(token.content, '0');
    });

    it('should recognise a `true` boolean literal', () => {
        const code = 'true';
        const program = _AstParser2.default.parse(code);
        const token = program.body[0];

        _chai.assert.instanceOf(token, _Models2.default.Literal);
        _chai.assert.equal(token.kind, 'boolean');
        _chai.assert.equal(token.content, 'true');
    });

    it('should recognise a `false` boolean literal', () => {
        const code = 'false';
        const program = _AstParser2.default.parse(code);
        const token = program.body[0];

        _chai.assert.instanceOf(token, _Models2.default.Literal);
        _chai.assert.equal(token.kind, 'boolean');
        _chai.assert.equal(token.content, 'false');
    });

    it('should recognise a member expression', () => {
        const code = 'foo.bar';
        const program = _AstParser2.default.parse(code);
        const token = program.body[0];

        _chai.assert.instanceOf(token, _Models2.default.MemberExpression);

        _chai.assert.instanceOf(token.object, _Models2.default.Identifier);
        _chai.assert.equal(token.object.content, 'foo');

        _chai.assert.instanceOf(token.property, _Models2.default.Identifier);
        _chai.assert.equal(token.property.content, 'bar');
    });

    it('should recognise a member expression using `this`', () => {
        const code = 'this.bar';
        const program = _AstParser2.default.parse(code);
        const token = program.body[0];

        _chai.assert.instanceOf(token, _Models2.default.MemberExpression);

        _chai.assert.instanceOf(token.object, _Models2.default.Keyword);
        _chai.assert.equal(token.object.content, 'this');

        _chai.assert.instanceOf(token.property, _Models2.default.Identifier);
        _chai.assert.equal(token.property.content, 'bar');
    });

    it('should recognise a nested member expression', () => {
        const code = 'this.foo.bar';
        const program = _AstParser2.default.parse(code);
        const token = program.body[0];

        _chai.assert.instanceOf(token, _Models2.default.MemberExpression);

        _chai.assert.instanceOf(token.object, _Models2.default.Keyword);
        _chai.assert.equal(token.object.content, 'this');

        _chai.assert.instanceOf(token.property, _Models2.default.MemberExpression);

        _chai.assert.instanceOf(token.property.object, _Models2.default.Identifier);
        _chai.assert.equal(token.property.object.content, 'foo');

        _chai.assert.instanceOf(token.property.property, _Models2.default.Identifier);
        _chai.assert.equal(token.property.property.content, 'bar');
    });

    it('should recognise a unary expression with an identifier as its argument', () => {
        const code = '!foo';

        const program = _AstParser2.default.parse(code);
        const token = program.body[0];

        _chai.assert.instanceOf(token, _Models2.default.UnaryExpression);
        _chai.assert.instanceOf(token.argument, _Models2.default.Identifier);

        _chai.assert.equal(token.operator.content, '!');
    });

    it('should recognise a unary expression with a member expression as its argument', () => {
        const code = '!this.isFoo';

        const program = _AstParser2.default.parse(code);
        const token = program.body[0];

        _chai.assert.instanceOf(token, _Models2.default.UnaryExpression);
        _chai.assert.instanceOf(token.argument, _Models2.default.MemberExpression);

        _chai.assert.equal(token.operator.content, '!');
    });

    it('should recognise assignment of identifier to identifier', () => {
        const code = 'foo = bar;';
        const program = _AstParser2.default.parse(code);
        const token = program.body[0];

        _chai.assert.instanceOf(token, _Models2.default.AssignmentExpression);

        _chai.assert.instanceOf(token.left, _Models2.default.Identifier);
        _chai.assert.equal(token.left.content, 'foo');

        _chai.assert.equal(token.operator.content, '=');

        _chai.assert.instanceOf(token.right, _Models2.default.Identifier);
        _chai.assert.equal(token.right.content, 'bar');
    });

    it('should recognise assignment of a literal to an identifier', () => {
        const code = 'foo = 2;';
        const program = _AstParser2.default.parse(code);
        const token = program.body[0];

        _chai.assert.instanceOf(token, _Models2.default.AssignmentExpression);

        _chai.assert.instanceOf(token.left, _Models2.default.Identifier);
        _chai.assert.equal(token.left.content, 'foo');

        _chai.assert.equal(token.operator.content, '=');

        _chai.assert.instanceOf(token.right, _Models2.default.Literal);
        _chai.assert.equal(token.right.kind, 'number');
        _chai.assert.equal(token.right.content, '2');
    });

    it('should recognise assignment of a keyword to a member exression', () => {
        const code = 'this.foo.bar = this;';
        const program = _AstParser2.default.parse(code);
        const token = program.body[0];

        _chai.assert.instanceOf(token, _Models2.default.AssignmentExpression);
        _chai.assert.instanceOf(token.left, _Models2.default.MemberExpression);

        _chai.assert.equal(token.operator.content, '=');

        _chai.assert.instanceOf(token.right, _Models2.default.Keyword);
        _chai.assert.equal(token.right.content, 'this');
    });

    it('should recognise a binary expression', () => {
        const code = 'foo > 2';
        const program = _AstParser2.default.parse(code);
        const token = program.body[0];

        _chai.assert.instanceOf(token, _Models2.default.BinaryExpression);
        _chai.assert.instanceOf(token.left, _Models2.default.Identifier);

        _chai.assert.equal(token.operator.content, '>');

        _chai.assert.instanceOf(token.right, _Models2.default.Literal);
        _chai.assert.equal(token.right.content, '2');
    });

    it('should recognise a binary expression', () => {
        const code = 'foo > 2';
        const program = _AstParser2.default.parse(code);
        const token = program.body[0];

        _chai.assert.instanceOf(token, _Models2.default.BinaryExpression);
        _chai.assert.instanceOf(token.left, _Models2.default.Identifier);

        _chai.assert.equal(token.operator.content, '>');

        _chai.assert.instanceOf(token.right, _Models2.default.Literal);
        _chai.assert.equal(token.right.content, '2');
    });

    it('should recognise a binary expression with a double compound operator', () => {
        const code = 'this <= 10';
        const program = _AstParser2.default.parse(code);
        const token = program.body[0];

        _chai.assert.instanceOf(token, _Models2.default.BinaryExpression);
        _chai.assert.instanceOf(token.left, _Models2.default.Keyword);

        _chai.assert.equal(token.operator.content, '<=');

        _chai.assert.instanceOf(token.right, _Models2.default.Literal);
        _chai.assert.equal(token.right.content, '10');
    });

    it('should recognise a binary expression with containing a unary expression', () => {
        const code = 'this > -1';
        const program = _AstParser2.default.parse(code);
        const token = program.body[0];

        _chai.assert.instanceOf(token, _Models2.default.BinaryExpression);
        _chai.assert.instanceOf(token.left, _Models2.default.Keyword);

        _chai.assert.equal(token.operator.content, '>');

        _chai.assert.instanceOf(token.right, _Models2.default.UnaryExpression);
        _chai.assert.equal(token.right.argument.content, '1');
        _chai.assert.equal(token.right.operator.content, '-');
    });

    it('should recognise a binary expression with a triple compound operator', () => {
        const code = 'foo !== bar';
        const program = _AstParser2.default.parse(code);
        const token = program.body[0];

        _chai.assert.instanceOf(token, _Models2.default.BinaryExpression);
        _chai.assert.instanceOf(token.left, _Models2.default.Identifier);

        _chai.assert.equal(token.operator.content, '!==');

        _chai.assert.instanceOf(token.right, _Models2.default.Identifier);
        _chai.assert.equal(token.right.content, 'bar');
    });

    it('should recognise a binary expression containing a null pointer', () => {
        const code = 'foo !== null';
        const program = _AstParser2.default.parse(code);
        const token = program.body[0];

        _chai.assert.instanceOf(token, _Models2.default.BinaryExpression);
        _chai.assert.instanceOf(token.left, _Models2.default.Identifier);

        _chai.assert.equal(token.operator.content, '!==');

        _chai.assert.instanceOf(token.right, _Models2.default.Keyword);
        _chai.assert.equal(token.right.content, 'null');
    });

    it('should recognise a binary expression wrapped in parentheses', () => {
        const code = '(foo === bar)';
        const program = _AstParser2.default.parse(code);
        const token = program.body[0];

        _chai.assert.instanceOf(token, _Models2.default.BinaryExpression);

        _chai.assert.instanceOf(token.left, _Models2.default.Identifier);

        _chai.assert.equal(token.operator.content, '===');

        _chai.assert.instanceOf(token.right, _Models2.default.Identifier);
        _chai.assert.equal(token.right.content, 'bar');
    });

    it('should recognise a logical expression', () => {
        const code = 'foo && bar';
        const program = _AstParser2.default.parse(code);
        const token = program.body[0];

        _chai.assert.instanceOf(token, _Models2.default.LogicalExpression);

        _chai.assert.instanceOf(token.left, _Models2.default.Identifier);
        _chai.assert.equal(token.left.content, 'foo');

        _chai.assert.equal(token.operator.content, '&&');

        _chai.assert.instanceOf(token.right, _Models2.default.Identifier);
        _chai.assert.equal(token.right.content, 'bar');
    });

    it('should recognise a logical expression wrapped in parentheses', () => {
        const code = '(foo && bar)';
        const program = _AstParser2.default.parse(code);
        const token = program.body[0];

        _chai.assert.instanceOf(token, _Models2.default.LogicalExpression);

        _chai.assert.instanceOf(token.left, _Models2.default.Identifier);
        _chai.assert.equal(token.left.content, 'foo');

        _chai.assert.equal(token.operator.content, '&&');

        _chai.assert.instanceOf(token.right, _Models2.default.Identifier);
        _chai.assert.equal(token.right.content, 'bar');
    });

    it('should recognise a logical expression containing a unary expression', () => {
        const code = 'foo && !bar';
        const program = _AstParser2.default.parse(code);
        const token = program.body[0];

        _chai.assert.instanceOf(token, _Models2.default.LogicalExpression);

        _chai.assert.instanceOf(token.left, _Models2.default.Identifier);
        _chai.assert.equal(token.left.content, 'foo');

        _chai.assert.equal(token.operator.content, '&&');

        _chai.assert.instanceOf(token.right, _Models2.default.UnaryExpression);
        _chai.assert.equal(token.right.argument.content, 'bar');
        _chai.assert.equal(token.right.operator.content, '!');
    });

    it('should recognise a logical expression containing a binary expression', () => {
        const code = 'foo && bar > 4';
        const program = _AstParser2.default.parse(code);
        const token = program.body[0];

        _chai.assert.instanceOf(token, _Models2.default.LogicalExpression);

        _chai.assert.instanceOf(token.left, _Models2.default.Identifier);
        _chai.assert.equal(token.left.content, 'foo');

        _chai.assert.equal(token.operator.content, '&&');

        _chai.assert.instanceOf(token.right, _Models2.default.BinaryExpression);

        _chai.assert.instanceOf(token.right.left, _Models2.default.Identifier);
        _chai.assert.equal(token.right.left.content, 'bar');

        _chai.assert.equal(token.right.operator.content, '>');

        _chai.assert.instanceOf(token.right.right, _Models2.default.Literal);
        _chai.assert.equal(token.right.right.content, '4');
    });

    it('should recognise a logical expression containing two binary expressions', () => {
        const code = '(this.bar !== null && this.bar !== "")';
        const program = _AstParser2.default.parse(code);
        const token = program.body[0];

        _chai.assert.equal(program.body.length, 1);
        _chai.assert.instanceOf(token, _Models2.default.LogicalExpression);

        _chai.assert.instanceOf(token.left, _Models2.default.BinaryExpression);

        _chai.assert.instanceOf(token.left.left, _Models2.default.MemberExpression);
        _chai.assert.equal(token.left.left.property.content, 'bar');

        _chai.assert.equal(token.left.operator.content, '!==');

        _chai.assert.instanceOf(token.left.right, _Models2.default.Keyword);
        _chai.assert.equal(token.left.right.content, 'null');

        _chai.assert.equal(token.operator.content, '&&');

        _chai.assert.instanceOf(token.right, _Models2.default.BinaryExpression);

        _chai.assert.instanceOf(token.right.left, _Models2.default.MemberExpression);
        _chai.assert.instanceOf(token.right.left.object, _Models2.default.Keyword);

        _chai.assert.equal(token.right.operator.content, '!==');

        _chai.assert.instanceOf(token.right.right, _Models2.default.Literal);
        _chai.assert.equal(token.right.right.content, '');
    });

    it('should parse compound logical expressions from left to right', () => {
        const code = 'foo && bar || baz';
        const program = _AstParser2.default.parse(code);
        const token = program.body[0];

        _chai.assert.instanceOf(token, _Models2.default.LogicalExpression);
        _chai.assert.instanceOf(token.left, _Models2.default.LogicalExpression);

        _chai.assert.equal(token.operator.content, '||');

        _chai.assert.instanceOf(token.right, _Models2.default.Identifier);
    });

    it('should parse compound logical expressions according to parentheses placement', () => {
        const code = 'foo && (bar || baz)';
        const program = _AstParser2.default.parse(code);
        const token = program.body[0];

        _chai.assert.instanceOf(token, _Models2.default.LogicalExpression);
        _chai.assert.instanceOf(token.left, _Models2.default.Identifier);

        _chai.assert.equal(token.operator.content, '&&');

        _chai.assert.instanceOf(token.right, _Models2.default.LogicalExpression);
    });

    it('should recognise a call expression upon an identifier', () => {
        const code = 'foo();';
        const program = _AstParser2.default.parse(code);
        const token = program.body[0];

        _chai.assert.instanceOf(token, _Models2.default.CallExpression);
        _chai.assert.instanceOf(token.callee, _Models2.default.Identifier);

        _chai.assert.equal(token.callee.content, 'foo');
        _chai.assert.equal(token.arguments.length, 0);
    });

    it('should recognise a call expression with an arbitrary number of arguments', () => {
        const code = 'foo(foo, 2, false);';
        const program = _AstParser2.default.parse(code);
        const token = program.body[0];

        _chai.assert.instanceOf(token, _Models2.default.CallExpression);
        _chai.assert.instanceOf(token.callee, _Models2.default.Identifier);

        _chai.assert.equal(token.callee.content, 'foo');
        _chai.assert.equal(token.arguments.length, 3);

        _chai.assert.instanceOf(token.arguments[0], _Models2.default.Identifier);
        _chai.assert.instanceOf(token.arguments[1], _Models2.default.Literal);
        _chai.assert.instanceOf(token.arguments[2], _Models2.default.Literal);
    });

    it('should recognise a call expression upon a member expression', () => {
        const code = 'console.log("foo");';
        const program = _AstParser2.default.parse(code);
        const token = program.body[0];

        _chai.assert.instanceOf(token, _Models2.default.CallExpression);
        _chai.assert.instanceOf(token.callee, _Models2.default.MemberExpression);
        _chai.assert.instanceOf(token.callee.object, _Models2.default.Identifier);

        _chai.assert.equal(token.callee.object.content, 'console');

        _chai.assert.instanceOf(token.callee.property, _Models2.default.Identifier);

        _chai.assert.equal(token.callee.property.content, 'log');
        _chai.assert.equal(token.arguments.length, 1);

        _chai.assert.instanceOf(token.arguments[0], _Models2.default.Literal);
    });

    it('should recognise a variable declaration with keyword `var`', () => {
        const code = 'var foo = "bar";';
        const program = _AstParser2.default.parse(code);
        const token = program.body[0];

        _chai.assert.instanceOf(token, _Models2.default.VariableDeclaration);

        _chai.assert.equal(token.kind, 'var');

        _chai.assert.instanceOf(token.identifier, _Models2.default.Identifier);

        _chai.assert.equal(token.identifier.content, 'foo');

        _chai.assert.instanceOf(token.init, _Models2.default.Literal);

        _chai.assert.equal(token.init.content, 'bar');
    });

    it('should recognise a variable declaration with keyword `const`', () => {
        const code = 'const foo = false;';
        const program = _AstParser2.default.parse(code);
        const token = program.body[0];

        _chai.assert.instanceOf(token, _Models2.default.VariableDeclaration);

        _chai.assert.equal(token.kind, 'const');

        _chai.assert.instanceOf(token.identifier, _Models2.default.Identifier);

        _chai.assert.equal(token.identifier.content, 'foo');

        _chai.assert.instanceOf(token.init, _Models2.default.Literal);

        _chai.assert.equal(token.init.content, 'false');
    });

    it('should recognise a variable declaration with keyword `let`', () => {
        const code = 'let foo = 10;';
        const program = _AstParser2.default.parse(code);
        const token = program.body[0];

        _chai.assert.instanceOf(token, _Models2.default.VariableDeclaration);

        _chai.assert.equal(token.kind, 'let');

        _chai.assert.instanceOf(token.identifier, _Models2.default.Identifier);

        _chai.assert.equal(token.identifier.content, 'foo');

        _chai.assert.instanceOf(token.init, _Models2.default.Literal);

        _chai.assert.equal(token.init.content, '10');
    });

    it('should recognise a return statement with no argument', () => {
        const code = 'return;';
        const program = _AstParser2.default.parse(code);
        const token = program.body[0];

        _chai.assert.instanceOf(token, _Models2.default.ReturnStatement);

        _chai.assert.equal(token.argument, null);
    });

    it('should recognise a return statement with an identifier as an argument', () => {
        const code = 'return foo;';
        const program = _AstParser2.default.parse(code);
        const token = program.body[0];

        _chai.assert.instanceOf(token, _Models2.default.ReturnStatement);

        _chai.assert.instanceOf(token.argument, _Models2.default.Identifier);

        _chai.assert.equal(token.argument.content, 'foo');
    });

    it('should recognise a return statement with a logical expression as an argument', () => {
        const code = 'return foo && bar;';
        const program = _AstParser2.default.parse(code);
        const token = program.body[0];

        _chai.assert.instanceOf(token, _Models2.default.ReturnStatement);
        _chai.assert.instanceOf(token.argument, _Models2.default.LogicalExpression);
    });

    it('should recognise a return statement with a binary expression as an argument', () => {
        const code = 'return foo > 3;';
        const program = _AstParser2.default.parse(code);
        const token = program.body[0];

        _chai.assert.instanceOf(token, _Models2.default.ReturnStatement);
        _chai.assert.instanceOf(token.argument, _Models2.default.BinaryExpression);
    });

    it('should recognise a return statement with a compound logical expression as an argument', () => {
        const code = 'return this.foo === "bar" && this.isFoo && this.isBar;';
        const program = _AstParser2.default.parse(code);
        const token = program.body[0];
        const logicalExpression = token.argument;

        _chai.assert.instanceOf(token, _Models2.default.ReturnStatement);
        _chai.assert.instanceOf(logicalExpression, _Models2.default.LogicalExpression);

        _chai.assert.instanceOf(logicalExpression.left, _Models2.default.LogicalExpression);
        _chai.assert.instanceOf(logicalExpression.left.left, _Models2.default.BinaryExpression);
        _chai.assert.instanceOf(logicalExpression.left.right, _Models2.default.MemberExpression);
        _chai.assert.instanceOf(logicalExpression.right, _Models2.default.MemberExpression);
    });

    it('should recognise a return statement with a unary expression as an argument', () => {
        const code = 'return !this.isFoo;';
        const program = _AstParser2.default.parse(code);
        const token = program.body[0];

        _chai.assert.instanceOf(token, _Models2.default.ReturnStatement);
        _chai.assert.instanceOf(token.argument, _Models2.default.UnaryExpression);

        _chai.assert.equal(token.argument.operator.content, '!');
    });

    it('should recognise an abstract block statement', () => {
        const code = `{
                var foo = 'bar';
            }`;

        const program = _AstParser2.default.parse(code);
        const token = program.body[0];
        const blockBody = program.body[0].body;

        _chai.assert.instanceOf(token, _Models2.default.BlockStatement);
        _chai.assert.instanceOf(blockBody[0], _Models2.default.VariableDeclaration);
    });

    it('should recognise an abstract block statement with multiple statements', () => {
        const code = `{
                var foo = 'bar';

                return foo || false;
            }`;

        const program = _AstParser2.default.parse(code);
        const token = program.body[0];
        const blockBody = program.body[0].body;

        _chai.assert.instanceOf(token, _Models2.default.BlockStatement);
        _chai.assert.instanceOf(blockBody[0], _Models2.default.VariableDeclaration);
        _chai.assert.instanceOf(blockBody[1], _Models2.default.ReturnStatement);
    });

    it('should recognise a function declaration', () => {
        const code = `function foo() {
                var bar = 'foo';

                return bar;
            }`;

        const program = _AstParser2.default.parse(code);
        const token = program.body[0];
        const functionBody = token.body.body;

        _chai.assert.instanceOf(token, _Models2.default.FunctionDeclaration);
        _chai.assert.instanceOf(token.identifier, _Models2.default.Identifier);

        _chai.assert.equal(token.params.length, 0);

        _chai.assert.instanceOf(functionBody[0], _Models2.default.VariableDeclaration);
        _chai.assert.instanceOf(functionBody[1], _Models2.default.ReturnStatement);
    });

    it('should recognise a function declaration with one or more paramters', () => {
        const code = `function foo(x, y) {
                return x > y;
            }`;

        const program = _AstParser2.default.parse(code);
        const token = program.body[0];
        const functionBody = token.body.body;

        _chai.assert.instanceOf(token, _Models2.default.FunctionDeclaration);
        _chai.assert.instanceOf(token.identifier, _Models2.default.Identifier);

        _chai.assert.equal(token.params.length, 2);
        _chai.assert.equal(token.params[0].content, 'x');
        _chai.assert.equal(token.params[1].content, 'y');

        _chai.assert.instanceOf(functionBody[0], _Models2.default.ReturnStatement);
    });

    it('should recognise an if statement with only a consequent', () => {
        const code = `if (x > y) {
                return true;
            }`;

        const program = _AstParser2.default.parse(code);
        const token = program.body[0];
        const consequent = token.consequent;

        _chai.assert.instanceOf(token, _Models2.default.IfStatement);
        _chai.assert.instanceOf(token.test, _Models2.default.BinaryExpression);

        _chai.assert.instanceOf(consequent.body[0], _Models2.default.ReturnStatement);
    });

    it('should recognise an if statement with a single identifier as a test', () => {
        const code = `if (isFoo) {
                return true;
            }`;

        const program = _AstParser2.default.parse(code);
        const token = program.body[0];
        const consequent = token.consequent;

        _chai.assert.instanceOf(token, _Models2.default.IfStatement);
        _chai.assert.instanceOf(token.test, _Models2.default.Identifier);

        _chai.assert.instanceOf(consequent.body[0], _Models2.default.ReturnStatement);
    });

    it('should recognise an if statement with a single member expression as a test', () => {
        const code = `if (this.isFoo) {
                return true;
            }`;

        const program = _AstParser2.default.parse(code);
        const token = program.body[0];
        const consequent = token.consequent;

        _chai.assert.instanceOf(token, _Models2.default.IfStatement);
        _chai.assert.instanceOf(token.test, _Models2.default.MemberExpression);

        _chai.assert.instanceOf(consequent.body[0], _Models2.default.ReturnStatement);
    });

    it('should recognise an if statement with a consequent and alternate', () => {
        const code = `if (x > y) {
                return true;
            } else {
                return false;
            }`;

        const program = _AstParser2.default.parse(code);
        const token = program.body[0];
        const consequent = token.consequent;
        const alternate = token.alternate;

        _chai.assert.instanceOf(token, _Models2.default.IfStatement);
        _chai.assert.instanceOf(token.test, _Models2.default.BinaryExpression);

        _chai.assert.instanceOf(consequent.body[0], _Models2.default.ReturnStatement);
        _chai.assert.instanceOf(alternate.body[0], _Models2.default.ReturnStatement);
    });

    it('should recognise an if statement with a nested if statement within the alternate', () => {
        const code = `if (x > y) {
                return true;
            } else if (x < y) {
                return false;
            }`;

        const program = _AstParser2.default.parse(code);
        const token = program.body[0];
        const consequent = token.consequent;
        const alternate = token.alternate;

        _chai.assert.instanceOf(token, _Models2.default.IfStatement);
        _chai.assert.instanceOf(token.test, _Models2.default.BinaryExpression);

        _chai.assert.instanceOf(consequent.body[0], _Models2.default.ReturnStatement);
        _chai.assert.instanceOf(alternate, _Models2.default.IfStatement);

        _chai.assert.instanceOf(alternate.consequent.body[0], _Models2.default.ReturnStatement);
        _chai.assert.equal(alternate.altenative, null);
    });

    it('should recognise an if statement with a full nested if statement within the alternate', () => {
        const code = `if (x > y) {
                return true;
            } else if (x < y) {
                return false;
            } else {
                return;
            }`;

        const program = _AstParser2.default.parse(code);
        const token = program.body[0];
        const consequent = token.consequent;
        const alternate = token.alternate;

        _chai.assert.instanceOf(token, _Models2.default.IfStatement);
        _chai.assert.instanceOf(token.test, _Models2.default.BinaryExpression);

        _chai.assert.instanceOf(consequent.body[0], _Models2.default.ReturnStatement);
        _chai.assert.instanceOf(alternate, _Models2.default.IfStatement);

        _chai.assert.instanceOf(alternate.consequent.body[0], _Models2.default.ReturnStatement);
        _chai.assert.instanceOf(alternate.alternate.body[0], _Models2.default.ReturnStatement);
    });
});
//# sourceMappingURL=AstParser.tests.js.map