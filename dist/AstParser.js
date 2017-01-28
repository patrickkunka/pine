'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Util = require('./Util');

var _Util2 = _interopRequireDefault(_Util);

var _Models = require('./Models');

var _Models2 = _interopRequireDefault(_Models);

var _Mappings = require('./Mappings');

var _Mappings2 = _interopRequireDefault(_Mappings);

var _Patterns = require('./Patterns');

var _Patterns2 = _interopRequireDefault(_Patterns);

var _flow = require('./flow.json');

var _flow2 = _interopRequireDefault(_flow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AstParser {
    /**
     * @param   {string} programString
     * @param   {object} [classInstance=null]
     * @return  {Program}
     */

    static parse(programString, classInstance = null) {
        const Program = new _Models2.default.Program();
        const tokens = AstParser.ingestProgramString(programString);

        AstParser.parseTokensIntoAst(tokens, classInstance);

        Program.body = tokens;

        return Program;
    }

    /**
     * @param   {string} programString
     * @return  {Array.<Token>}
     */

    static ingestProgramString(programString) {
        const tokens = [];

        let startIndex = 0;
        let token = null;

        while (token = AstParser.matchToken(programString, startIndex)) {
            if (!(token instanceof _Models2.default.Whitespace)) {
                tokens.push(token);
            }

            startIndex = token.end;

            if (startIndex > programString.length - 1) {
                // End of string

                break;
            }
        }

        return tokens;
    }

    /**
     * @param   {string} programString
     * @param   {number} startIndex
     * @return  {Token|null}
     */

    static matchToken(programString, startIndex) {
        const slice = programString.slice(startIndex);

        let match = null;

        if (match = new RegExp(_Patterns2.default.BOOLEAN).exec(slice)) {
            return _Mappings2.default.getLiteral(match, startIndex, 'boolean');
        }if (match = new RegExp(_Patterns2.default.NUMBER).exec(slice)) {
            return _Mappings2.default.getLiteral(match, startIndex, 'number');
        } else if (match = new RegExp(_Patterns2.default.KEYWORD).exec(slice)) {
            return _Mappings2.default.getKeyword(match, startIndex);
        } else if (match = new RegExp(_Patterns2.default.PUNCTUATOR).exec(slice)) {
            return _Mappings2.default.getPunctuator(match, startIndex);
        } else if (match = new RegExp(_Patterns2.default.STRING).exec(slice)) {
            return _Mappings2.default.getLiteral(match, startIndex, 'string');
        } else if (match = new RegExp(_Patterns2.default.IDENTIFIER).exec(slice)) {
            return _Mappings2.default.getIdentifier(match, startIndex);
        } else if (match = new RegExp(_Patterns2.default.WHITESPACE).exec(slice)) {
            return _Mappings2.default.getWhitespace(match, startIndex);
        }

        throw new Error('[ast-parser] Unknown token');
    }

    /**
     * @param   {Array.<Token>}   tokens
     * @param   {Models.Class}    classInstance
     * @return  {void}
     */

    static parseTokensIntoAst(tokens, classInstance) {
        for (let i = 0, type; i < _flow2.default.length; i++) {
            type = _flow2.default[i];

            let Model = _Models2.default[_Util2.default.pascalCase(type)];
            let mapper = _Mappings2.default['map' + _Util2.default.pascalCase(type)];
            let pattern = _Patterns2.default[type];

            AstParser.traverseTokens(tokens, Model, mapper, pattern, classInstance);
        }
    }

    /**
     * @static
     * @param   {Array.<Token>}   tokens
     * @param   {string}          pattern
     * @return  {number}
     */

    static testTokensAgainstPattern(tokens, pattern) {
        const tokensString = tokens.join(' ');
        const re = new RegExp(pattern, 'g');
        const match = re.exec(tokensString);

        const startIndex = match ? AstParser.getStartIndexFromMatch(match, tokensString) : -1;

        return startIndex;
    }

    /**
     * @static
     * @param {Array.<Token>}       tokens
     * @param {function}            Model
     * @param {function}            Mapper
     * @param {string}              pattern
     * @param {Models.Class|null}   classInstance
     */

    static traverseTokens(tokens, Model, mapper, pattern, classInstance) {
        let startIndex = -1;

        while ((startIndex = AstParser.testTokensAgainstPattern(tokens, pattern)) > -1) {
            let structure = new Model();

            structure.class = classInstance;

            mapper(structure, tokens, startIndex);

            if (structure.toString() === 'block_statement') {
                AstParser.parseTokensIntoAst(structure.body, classInstance);
            }
        }
    }

    /**
     * @static
     * @param   {object} match
     * @param   {string} tokensString
     * @return  {number}
     */

    static getStartIndexFromMatch(match, tokensString) {
        const matchIndex = match.index;
        const stringBefore = tokensString.slice(0, matchIndex);
        const startIndex = stringBefore.split(' ').length;

        return startIndex - 1;
    }
}

exports.default = AstParser;
//# sourceMappingURL=AstParser.js.map