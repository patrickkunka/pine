'use strict';

var _Patterns = require('./Patterns');

var patterns = _interopRequireWildcard(_Patterns);

var _chai = require('chai');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

describe('Patterns', () => {
    // /^("([^"\n\\]|\\")*"|'([^'\n\\]|\\')*')/

    describe('#STRING', () => {
        it('should recognise a string literal wrapped in double quotes', () => {
            const code = '"foo"';
            const re = new RegExp(patterns.STRING);
            const match = re.exec(code);

            _chai.assert.isOk(re);
            _chai.assert.equal(match[1], '"foo"');
        });

        it('should recognise a string literal wrapped in single quotes', () => {
            const code = "'foo'"; // eslint-disable-line quotes
            const re = new RegExp(patterns.STRING);
            const match = re.exec(code);

            _chai.assert.isOk(re);
            _chai.assert.equal(match[1], "'foo'"); // eslint-disable-line quotes
        });

        it('should recognise an empty string literal', () => {
            const code = '""';
            const re = new RegExp(patterns.STRING);
            const match = re.exec(code);

            _chai.assert.isOk(re);
            _chai.assert.equal(match[1], '""');
        });

        it('should recognise a string literal containing varied characters', () => {
            const code = '"Lorem ipsum sit dolor 12345. Hello world!"';
            const re = new RegExp(patterns.STRING);
            const match = re.exec(code);

            _chai.assert.isOk(match);
            _chai.assert.equal(match[1], code);
        });

        it('should recognise a string literal containing escaped quotes', () => {
            const code = '"Lorem ipsum \\"sit\\" dolor"';
            const re = new RegExp(patterns.STRING);
            const match = re.exec(code);

            _chai.assert.isOk(match);
            _chai.assert.equal(match[1], code);
        });

        it('should not recognise a string literal starting with an escaped quote', () => {
            const code = '\\"Lorem ipsum\\"';
            const re = new RegExp(patterns.STRING);
            const match = re.exec(code);

            _chai.assert.isNotOk(match);
        });

        it('should only match the first string of multiple', () => {
            const code = '"Lorem ipsum" === "Sit dolor"';
            const re = new RegExp(patterns.STRING);
            const match = re.exec(code);

            _chai.assert.isOk(match);
            _chai.assert.equal(match[1], '"Lorem ipsum"');
        });
    });

    // /^(true|false)(?=([\s;),]|$))/

    describe('#BOOLEAN', () => {
        it('should recognise a `true` boolean', () => {
            const code = 'true';
            const re = new RegExp(patterns.BOOLEAN);
            const match = re.exec(code);

            _chai.assert.isOk(match);
            _chai.assert.equal(match[1], 'true');
        });

        it('should recognise a `false` boolean', () => {
            const code = 'false';
            const re = new RegExp(patterns.BOOLEAN);
            const match = re.exec(code);

            _chai.assert.isOk(match);
            _chai.assert.equal(match[1], 'false');
        });

        it('should recognise a boolean followed by a ";"', () => {
            const code = 'false;';
            const re = new RegExp(patterns.BOOLEAN);
            const match = re.exec(code);

            _chai.assert.isOk(match);
            _chai.assert.equal(match[1], 'false');
        });

        it('should recognise a boolean followed by a ")"', () => {
            const code = 'false)';
            const re = new RegExp(patterns.BOOLEAN);
            const match = re.exec(code);

            _chai.assert.isOk(match);
            _chai.assert.equal(match[1], 'false');
        });

        it('should recognise a boolean followed by a ","', () => {
            const code = 'false,';
            const re = new RegExp(patterns.BOOLEAN);
            const match = re.exec(code);

            _chai.assert.isOk(match);
            _chai.assert.equal(match[1], 'false');
        });

        it('should not recognise a sequence of characters starting with the word `true`', () => {
            const code = 'truent';
            const re = new RegExp(patterns.BOOLEAN);
            const match = re.exec(code);

            _chai.assert.isNotOk(match);
        });

        it('should not recognise a sequence of characters ending with the word `true`', () => {
            const code = 'isUntrue';
            const re = new RegExp(patterns.BOOLEAN);
            const match = re.exec(code);

            _chai.assert.isNotOk(match);
        });

        it('should not recognise a sequence of characters starting with the word `false`', () => {
            const code = 'falsetto';
            const re = new RegExp(patterns.BOOLEAN);
            const match = re.exec(code);

            _chai.assert.isNotOk(match);
        });

        it('should not recognise a sequence of characters ending with the word `false`', () => {
            const code = 'isUnfalse';
            const re = new RegExp(patterns.BOOLEAN);
            const match = re.exec(code);

            _chai.assert.isNotOk(match);
        });
    });

    // /^(&&|\|\||<=|>=|===|!==|==|!=|--|\+\+|[-\.,:;!+=\<>{}()\[\]])/

    describe('#PUNCTUATOR', () => {
        it('should recognise a `-` punctuator', () => {
            const code = '-';
            const re = new RegExp(patterns.PUNCTUATOR);
            const match = re.exec(code);

            _chai.assert.isOk(match);
            _chai.assert.equal(match[1], code);
        });

        it('should recognise a `.` punctuator', () => {
            const code = '.';
            const re = new RegExp(patterns.PUNCTUATOR);
            const match = re.exec(code);

            _chai.assert.isOk(match);
            _chai.assert.equal(match[1], code);
        });

        it('should recognise a `,` punctuator', () => {
            const code = ',';
            const re = new RegExp(patterns.PUNCTUATOR);
            const match = re.exec(code);

            _chai.assert.isOk(match);
            _chai.assert.equal(match[1], code);
        });

        it('should recognise a `:` punctuator', () => {
            const code = ':';
            const re = new RegExp(patterns.PUNCTUATOR);
            const match = re.exec(code);

            _chai.assert.isOk(match);
            _chai.assert.equal(match[1], code);
        });

        it('should recognise a `;` punctuator', () => {
            const code = ';';
            const re = new RegExp(patterns.PUNCTUATOR);
            const match = re.exec(code);

            _chai.assert.isOk(match);
            _chai.assert.equal(match[1], code);
        });

        it('should recognise a `!` punctuator', () => {
            const code = '!';
            const re = new RegExp(patterns.PUNCTUATOR);
            const match = re.exec(code);

            _chai.assert.isOk(match);
            _chai.assert.equal(match[1], code);
        });

        it('should recognise a `+` punctuator', () => {
            const code = '+';
            const re = new RegExp(patterns.PUNCTUATOR);
            const match = re.exec(code);

            _chai.assert.isOk(match);
            _chai.assert.equal(match[1], code);
        });

        it('should recognise a `=` punctuator', () => {
            const code = '=';
            const re = new RegExp(patterns.PUNCTUATOR);
            const match = re.exec(code);

            _chai.assert.isOk(match);
            _chai.assert.equal(match[1], code);
        });

        it('should not recognise a bitwise `|` punctuator', () => {
            const code = '|';
            const re = new RegExp(patterns.PUNCTUATOR);
            const match = re.exec(code);

            _chai.assert.isNotOk(match);
        });

        it('should not recognise a bitwise `&` punctuator', () => {
            const code = '&';
            const re = new RegExp(patterns.PUNCTUATOR);
            const match = re.exec(code);

            _chai.assert.isNotOk(match);
        });

        it('should recognise a `<` punctuator', () => {
            const code = '<';
            const re = new RegExp(patterns.PUNCTUATOR);
            const match = re.exec(code);

            _chai.assert.isOk(match);
            _chai.assert.equal(match[1], code);
        });

        it('should recognise a `>` punctuator', () => {
            const code = '>';
            const re = new RegExp(patterns.PUNCTUATOR);
            const match = re.exec(code);

            _chai.assert.isOk(match);
            _chai.assert.equal(match[1], code);
        });

        it('should recognise a `{` punctuator', () => {
            const code = '{';
            const re = new RegExp(patterns.PUNCTUATOR);
            const match = re.exec(code);

            _chai.assert.isOk(match);
            _chai.assert.equal(match[1], code);
        });

        it('should recognise a `}` punctuator', () => {
            const code = '}';
            const re = new RegExp(patterns.PUNCTUATOR);
            const match = re.exec(code);

            _chai.assert.isOk(match);
            _chai.assert.equal(match[1], code);
        });

        it('should recognise a `[` punctuator', () => {
            const code = '[';
            const re = new RegExp(patterns.PUNCTUATOR);
            const match = re.exec(code);

            _chai.assert.isOk(match);
            _chai.assert.equal(match[1], code);
        });

        it('should recognise a `]` punctuator', () => {
            const code = ']';
            const re = new RegExp(patterns.PUNCTUATOR);
            const match = re.exec(code);

            _chai.assert.isOk(match);
            _chai.assert.equal(match[1], code);
        });

        it('should recognise a `(` punctuator', () => {
            const code = '(';
            const re = new RegExp(patterns.PUNCTUATOR);
            const match = re.exec(code);

            _chai.assert.isOk(match);
            _chai.assert.equal(match[1], code);
        });

        it('should recognise a `)` punctuator', () => {
            const code = ')';
            const re = new RegExp(patterns.PUNCTUATOR);
            const match = re.exec(code);

            _chai.assert.isOk(match);
            _chai.assert.equal(match[1], code);
        });

        it('should recognise a `&&` punctuator', () => {
            const code = '&&';
            const re = new RegExp(patterns.PUNCTUATOR);
            const match = re.exec(code);

            _chai.assert.isOk(match);
            _chai.assert.equal(match[1], code);
        });

        it('should recognise a `||` punctuator', () => {
            const code = '||';
            const re = new RegExp(patterns.PUNCTUATOR);
            const match = re.exec(code);

            _chai.assert.isOk(match);
            _chai.assert.equal(match[1], code);
        });

        it('should recognise a `==` punctuator', () => {
            const code = '==';
            const re = new RegExp(patterns.PUNCTUATOR);
            const match = re.exec(code);

            _chai.assert.isOk(match);
            _chai.assert.equal(match[1], code);
        });

        it('should recognise a `!=` punctuator', () => {
            const code = '!=';
            const re = new RegExp(patterns.PUNCTUATOR);
            const match = re.exec(code);

            _chai.assert.isOk(match);
            _chai.assert.equal(match[1], code);
        });

        it('should recognise a `!==` punctuator', () => {
            const code = '!==';
            const re = new RegExp(patterns.PUNCTUATOR);
            const match = re.exec(code);

            _chai.assert.isOk(match);
            _chai.assert.equal(match[1], code);
        });

        it('should recognise a `++` punctuator', () => {
            const code = '++';
            const re = new RegExp(patterns.PUNCTUATOR);
            const match = re.exec(code);

            _chai.assert.isOk(match);
            _chai.assert.equal(match[1], code);
        });

        it('should recognise a `--` punctuator', () => {
            const code = '--';
            const re = new RegExp(patterns.PUNCTUATOR);
            const match = re.exec(code);

            _chai.assert.isOk(match);
            _chai.assert.equal(match[1], code);
        });

        it('should recognise a `<=` punctuator', () => {
            const code = '<=';
            const re = new RegExp(patterns.PUNCTUATOR);
            const match = re.exec(code);

            _chai.assert.isOk(match);
            _chai.assert.equal(match[1], code);
        });

        it('should recognise a `>=` punctuator', () => {
            const code = '>=';
            const re = new RegExp(patterns.PUNCTUATOR);
            const match = re.exec(code);

            _chai.assert.isOk(match);
            _chai.assert.equal(match[1], code);
        });

        it('should should only match the first valid character(s) of arbitrary collections of punctuators', () => {
            const code = '("';
            const re = new RegExp(patterns.PUNCTUATOR);
            const match = re.exec(code);

            _chai.assert.isOk(match);
            _chai.assert.notEqual(match[1], code);
            _chai.assert.equal(match[1], '(');
        });
    });

    // /^([A-Za-z$_][A-Za-z$_0-9]*)/

    describe('#IDENTIFIER', () => {
        it('should recognise a variable identifier', () => {
            const code = 'foo';
            const re = new RegExp(patterns.IDENTIFIER);
            const match = re.exec(code);

            _chai.assert.isOk(match);
            _chai.assert.equal(match[1], code);
        });

        it('should recognise a camel cased variable identifier', () => {
            const code = 'isFoo';
            const re = new RegExp(patterns.IDENTIFIER);
            const match = re.exec(code);

            _chai.assert.isOk(match);
            _chai.assert.equal(match[1], code);
        });

        it('should recognise a pascal cased variable identifier', () => {
            const code = 'FooModel';
            const re = new RegExp(patterns.IDENTIFIER);
            const match = re.exec(code);

            _chai.assert.isOk(match);
            _chai.assert.equal(match[1], code);
        });

        it('should recognise a variable identifier containing a number', () => {
            const code = 'FooModel0';
            const re = new RegExp(patterns.IDENTIFIER);
            const match = re.exec(code);

            _chai.assert.isOk(match);
            _chai.assert.equal(match[1], code);
        });

        it('should not recognise a variable identifier starting with a number', () => {
            const code = '0FooModel';
            const re = new RegExp(patterns.IDENTIFIER);
            const match = re.exec(code);

            _chai.assert.isNotOk(match);
        });

        it('should recognise a variable identifier starting with a "$"', () => {
            const code = '$container';
            const re = new RegExp(patterns.IDENTIFIER);
            const match = re.exec(code);

            _chai.assert.isOk(match);
            _chai.assert.equal(match[1], code);
        });

        it('should recognise a variable identifier starting with a "_"', () => {
            const code = '_private';
            const re = new RegExp(patterns.IDENTIFIER);
            const match = re.exec(code);

            _chai.assert.isOk(match);
            _chai.assert.equal(match[1], code);
        });
    });

    // /^(this|var|let.. )(?=([\s;.]|$))/

    describe('#KEYWORDS', () => {
        it('should recognise a keyword', () => {
            const code = 'this';
            const re = new RegExp(patterns.KEYWORD);
            const match = re.exec(code);

            _chai.assert.isOk(match);
            _chai.assert.equal(match[1], code);
        });

        it('should recognise a keyword followed by a "."', () => {
            const code = 'this.foo';
            const re = new RegExp(patterns.KEYWORD);
            const match = re.exec(code);

            _chai.assert.isOk(match);
            _chai.assert.equal(match[1], 'this');
        });

        it('should recognise a keyword followed by a ";"', () => {
            const code = 'this;';
            const re = new RegExp(patterns.KEYWORD);
            const match = re.exec(code);

            _chai.assert.isOk(match);
            _chai.assert.equal(match[1], 'this');
        });

        it('should recognise a keyword followed by whitespace', () => {
            const code = 'this ';
            const re = new RegExp(patterns.KEYWORD);
            const match = re.exec(code);

            _chai.assert.isOk(match);
            _chai.assert.equal(match[1], 'this');
        });

        it('should not recognise a sequence of characters ending in a keyword', () => {
            const code = 'thistle';
            const re = new RegExp(patterns.KEYWORD);
            const match = re.exec(code);

            _chai.assert.isNotOk(match);
        });

        it('should not recognise a sequence of characters starting in a keyword', () => {
            const code = 'fuckthis';
            const re = new RegExp(patterns.KEYWORD);
            const match = re.exec(code);

            _chai.assert.isNotOk(match);
        });
    });

    // /^([0-9.]+)(?!\w)/

    describe('#NUMBER', () => {
        it('should regonise an integer', () => {
            const code = '3';
            const re = new RegExp(patterns.NUMBER);
            const match = re.exec(code);

            _chai.assert.isOk(match);
            _chai.assert.equal(match[1], code);
        });

        it('should regonise a decimal', () => {
            const code = '3.14';
            const re = new RegExp(patterns.NUMBER);
            const match = re.exec(code);

            _chai.assert.isOk(match);
            _chai.assert.equal(match[1], code);
        });

        it('should not regonise a number followed by non-numeric characters', () => {
            const code = '3rdAttempt';
            const re = new RegExp(patterns.NUMBER);
            const match = re.exec(code);

            _chai.assert.isNotOk(match);
        });
    });

    // /^(\s+)/

    describe('#WHITESPACE', () => {
        it('should recognise a single space character', () => {
            const code = ' ';
            const re = new RegExp(patterns.WHITESPACE);
            const match = re.exec(code);

            _chai.assert.isOk(match);
            _chai.assert.equal(match[1], code);
        });

        it('should recognise multiple single space characters', () => {
            const code = '   ';
            const re = new RegExp(patterns.WHITESPACE);
            const match = re.exec(code);

            _chai.assert.isOk(match);
            _chai.assert.equal(match[1], code);
        });

        it('should recognise a single tab character', () => {
            const code = '	';
            const re = new RegExp(patterns.WHITESPACE);
            const match = re.exec(code);

            _chai.assert.isOk(match);
            _chai.assert.equal(match[1], code);
        });

        it('should recognise whitespace over multiple lines', () => {
            const code = `

                `;

            const re = new RegExp(patterns.WHITESPACE);
            const match = re.exec(code);

            _chai.assert.isOk(match);
            _chai.assert.equal(match[1], code);
        });
    });
});
//# sourceMappingURL=Patterns.tests.js.map