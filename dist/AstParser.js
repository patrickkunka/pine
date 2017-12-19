'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Patterns = exports.Models = undefined;

var _models = require('./models');

var Models = _interopRequireWildcard(_models);

var _Patterns = require('./Patterns');

var Patterns = _interopRequireWildcard(_Patterns);

var _Util = require('./Util');

var _Util2 = _interopRequireDefault(_Util);

var _Mappings = require('./Mappings');

var _Mappings2 = _interopRequireDefault(_Mappings);

var _parsingOrder = require('./parsingOrder.json');

var _parsingOrder2 = _interopRequireDefault(_parsingOrder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

class AstParser {
    /**
     * @param   {string} programString
     * @param   {object} [classInstance=null]
     * @return  {Program}
     */

    static parse(programString, classInstance = null) {
        const Program = new Models.Program();
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
            if (!(token instanceof Models.Whitespace)) {
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

        if (match = new RegExp(Patterns.BOOLEAN).exec(slice)) {
            return _Mappings2.default.getLiteral(match, startIndex, 'boolean');
        }if (match = new RegExp(Patterns.NUMBER).exec(slice)) {
            return _Mappings2.default.getLiteral(match, startIndex, 'number');
        } else if (match = new RegExp(Patterns.KEYWORD).exec(slice)) {
            return _Mappings2.default.getKeyword(match, startIndex);
        } else if (match = new RegExp(Patterns.PUNCTUATOR).exec(slice)) {
            return _Mappings2.default.getPunctuator(match, startIndex);
        } else if (match = new RegExp(Patterns.STRING).exec(slice)) {
            return _Mappings2.default.getLiteral(match, startIndex, 'string');
        } else if (match = new RegExp(Patterns.IDENTIFIER).exec(slice)) {
            return _Mappings2.default.getIdentifier(match, startIndex);
        } else if (match = new RegExp(Patterns.WHITESPACE).exec(slice)) {
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
        for (let i = 0, type; i < _parsingOrder2.default.length; i++) {
            type = _parsingOrder2.default[i];

            let Model = Models[_Util2.default.pascalCase(type)];
            let mapper = _Mappings2.default['map' + _Util2.default.pascalCase(type)];
            let pattern = Patterns[type];

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

exports.Models = Models;
exports.Patterns = Patterns;
exports.default = AstParser;
//# sourceMappingURL=AstParser.js.map