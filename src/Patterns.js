/* eslint-disable max-len */

import {KEYWORDS} from './Entities';

export const BOOLEAN                = '^(true|false)(?=([\\s;),]|$))';
export const PUNCTUATOR             = '^(&&|\\|\\||<=|>=|===|!==|==|!=|--|\\+\\+|[-\\.,:;!+=\\<>{}()\\[\\]])';
export const IDENTIFIER             = '^([A-Za-z$_][A-Za-z$_0-9]*)';
export const NUMBER                 = '^([0-9.]+)(?!\\w)';
export const STRING                 = '^("([^"\\n\\\\]|\\\\")*"|\'([^\'\\n\\\\]|\\\\\')*\')';
export const KEYWORD                = '^(' + KEYWORDS.join('|') + ')(?=([\\s;.]|$))';
export const WHITESPACE             = '^(\\s+)';

export const MEMBER_EXPRESSION      = '(this|identifier|literal)( \\. identifier| \\. member_expression)+';
export const UNARY_EXPRESSION       = '(!|-) (member_expression|identifier|unary_expression|literal)';
export const PARAMETERS_EXPRESSION  = '\\(( identifier| literal| member_expression)( , identifier| , literal| , member_expression)* \\)';
export const ASSIGNMENT_EXPRESSION  = '(member_expression |identifier )= (literal |identifier |this );';
export const BINARY_EXPRESSION      = '(\\( (?=[\\w\\s]+\\)))?(member_expression |identifier |literal |unary_expression |this |null)comparison_operator (member_expression|identifier|literal|unary_expression|this|null)';
export const LOGICAL_EXPRESSION     = '(\\( (?=[\\w\\s]+\\)))?(member_expression |identifier |literal |binary_expression |logical_expression |unary_expression |this )logical_operator (member_expression|identifier|literal|binary_expression|logical_expression|unary_expression|this)';
export const CALL_EXPRESSION        = '(member_expression |identifier )(parameters_expression |\\( \\) );';
export const RETURN_STATEMENT       = 'return (member_expression |identifier |literal |logical_expression |unary_expression |binary_expression |this |null |);';

export const BLOCK_STATEMENT        = '{[^{}]+}';
export const FUNCTION_DECLARATION   = '(function|get|set)( get| set|)( identifier|)( \\( \\)| parameters_expression) block_statement';
export const VARIABLE_DECLARATION   = '(var|const|let) assignment';
export const IF_STATEMENT           = 'if( binary_expression| logical_expression| parameters_expression) block_statement( else block_statement| else if_statement|(?! else))';