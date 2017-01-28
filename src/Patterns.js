/* eslint-disable max-len */

import Entities from './Entities';

class Patterns {}

Patterns.BOOLEAN                = '^(true|false)(?=([\\s;),]|$))';
Patterns.PUNCTUATOR             = '^(&&|\\|\\||<=|>=|===|!==|==|!=|--|\\+\\+|[-\\.,:;!+=\\<>{}()\\[\\]])';
Patterns.IDENTIFIER             = '^([A-Za-z$_][A-Za-z$_0-9]*)';
Patterns.NUMBER                 = '^([0-9.]+)(?!\\w)';
Patterns.STRING                 = '^("([^"\\n\\\\]|\\\\")*"|\'([^\'\\n\\\\]|\\\\\')*\')';
Patterns.KEYWORD                = '^(' + Entities.KEYWORDS.join('|') + ')(?=([\\s;.]|$))';
Patterns.WHITESPACE             = '^(\\s+)';

Patterns.MEMBER_EXPRESSION      = '(this|identifier|literal)( \\. identifier| \\. member_expression)+';
Patterns.UNARY_EXPRESSION       = '(!|-) (member_expression|identifier|unary_expression|literal)';
Patterns.PARAMETERS_EXPRESSION  = '\\(( identifier| literal| member_expression)( , identifier| , literal| , member_expression)* \\)';
Patterns.ASSIGNMENT_EXPRESSION  = '(member_expression |identifier )= (literal |identifier |this );';
Patterns.BINARY_EXPRESSION      = '(\\( (?=[\\w\\s]+\\)))?(member_expression |identifier |literal |unary_expression |this |null)comparison_operator (member_expression|identifier|literal|unary_expression|this|null)';
Patterns.LOGICAL_EXPRESSION     = '(\\( (?=[\\w\\s]+\\)))?(member_expression |identifier |literal |binary_expression |logical_expression |unary_expression |this )logical_operator (member_expression|identifier|literal|binary_expression|logical_expression|unary_expression|this)';
Patterns.CALL_EXPRESSION        = '(member_expression |identifier )(parameters_expression |\\( \\) );';
Patterns.RETURN_STATEMENT       = 'return (member_expression |identifier |literal |logical_expression |unary_expression |binary_expression |this |null |);';

Patterns.BLOCK_STATEMENT        = '{[^{}]+}';
Patterns.FUNCTION_DECLARATION   = '(function|get|set)( get| set|)( identifier|)( \\( \\)| parameters_expression) block_statement';
Patterns.VARIABLE_DECLARATION   = '(var|const|let) assignment';
Patterns.IF_STATEMENT           = 'if( binary_expression| logical_expression| parameters_expression) block_statement( else block_statement| else if_statement|(?! else))';


export default Patterns;