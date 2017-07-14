'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IF_STATEMENT = exports.VARIABLE_DECLARATION = exports.FUNCTION_DECLARATION = exports.BLOCK_STATEMENT = exports.RETURN_STATEMENT = exports.CALL_EXPRESSION = exports.LOGICAL_EXPRESSION = exports.BINARY_EXPRESSION = exports.ASSIGNMENT_EXPRESSION = exports.PARAMETERS_EXPRESSION = exports.UNARY_EXPRESSION = exports.MEMBER_EXPRESSION = exports.WHITESPACE = exports.KEYWORD = exports.STRING = exports.NUMBER = exports.IDENTIFIER = exports.PUNCTUATOR = exports.BOOLEAN = undefined;

var _Entities = require('./Entities');

const BOOLEAN = exports.BOOLEAN = '^(true|false)(?=([\\s;),]|$))'; /* eslint-disable max-len */

const PUNCTUATOR = exports.PUNCTUATOR = '^(&&|\\|\\||<=|>=|===|!==|==|!=|--|\\+\\+|[-\\.,:;!+=\\<>{}()\\[\\]])';
const IDENTIFIER = exports.IDENTIFIER = '^([A-Za-z$_][A-Za-z$_0-9]*)';
const NUMBER = exports.NUMBER = '^([0-9.]+)(?!\\w)';
const STRING = exports.STRING = '^("([^"\\n\\\\]|\\\\")*"|\'([^\'\\n\\\\]|\\\\\')*\')';
const KEYWORD = exports.KEYWORD = '^(' + _Entities.KEYWORDS.join('|') + ')(?=([\\s;.]|$))';
const WHITESPACE = exports.WHITESPACE = '^(\\s+)';

const MEMBER_EXPRESSION = exports.MEMBER_EXPRESSION = '(this|identifier|literal)( \\. identifier| \\. member_expression)+';
const UNARY_EXPRESSION = exports.UNARY_EXPRESSION = '(!|-) (member_expression|identifier|unary_expression|literal)';
const PARAMETERS_EXPRESSION = exports.PARAMETERS_EXPRESSION = '\\(( identifier| literal| member_expression)( , identifier| , literal| , member_expression)* \\)';
const ASSIGNMENT_EXPRESSION = exports.ASSIGNMENT_EXPRESSION = '(member_expression |identifier )= (literal |identifier |this );';
const BINARY_EXPRESSION = exports.BINARY_EXPRESSION = '(\\( (?=[\\w\\s]+\\)))?(member_expression |identifier |literal |unary_expression |this |null)comparison_operator (member_expression|identifier|literal|unary_expression|this|null)';
const LOGICAL_EXPRESSION = exports.LOGICAL_EXPRESSION = '(\\( (?=[\\w\\s]+\\)))?(member_expression |identifier |literal |binary_expression |logical_expression |unary_expression |this )logical_operator (member_expression|identifier|literal|binary_expression|logical_expression|unary_expression|this)';
const CALL_EXPRESSION = exports.CALL_EXPRESSION = '(member_expression |identifier )(parameters_expression |\\( \\) );';
const RETURN_STATEMENT = exports.RETURN_STATEMENT = 'return (member_expression |identifier |literal |logical_expression |unary_expression |binary_expression |this |null |);';

const BLOCK_STATEMENT = exports.BLOCK_STATEMENT = '{[^{}]+}';
const FUNCTION_DECLARATION = exports.FUNCTION_DECLARATION = '(function|get|set)( get| set|)( identifier|)( \\( \\)| parameters_expression) block_statement';
const VARIABLE_DECLARATION = exports.VARIABLE_DECLARATION = '(var|const|let) assignment';
const IF_STATEMENT = exports.IF_STATEMENT = 'if( binary_expression| logical_expression| parameters_expression) block_statement( else block_statement| else if_statement|(?! else))';
//# sourceMappingURL=Patterns.js.map