class Entities {}

Entities.PUNCTUATORS = [
    '(', ')',
    '[', ']',
    '{', '}',
    '*',
    '+', '++',
    '!', '=', '==', '!=', '===', '!==',
    '-', '--',
    '<', '>',
    '<=', '>=',
    '.', ',', ':', ';',
    '&&'
];

Entities.KEYWORDS = [
    'this',
    'var',
    'let',
    'const',
    'if',
    'else',
    'for',
    'get',
    'set',
    'while',
    'return',
    'null',
    'new',
    'function',
    'class',
    'extends',
    'static'
];

export default Entities;