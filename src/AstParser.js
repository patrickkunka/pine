import Util     from './Util';

import * as models from './models';
import * as patterns from './Patterns';
import Mappings from './Mappings';
import flow     from './flow.json';

class AstParser {
    /**
     * @param   {string} programString
     * @param   {object} [classInstance=null]
     * @return  {Program}
     */

    static parse(programString, classInstance=null) {
        const Program = new models.Program();
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

        while ((token = AstParser.matchToken(programString, startIndex))) {
            if (!(token instanceof models.Whitespace)) {
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

        if ((match = new RegExp(patterns.BOOLEAN).exec(slice))) {
            return Mappings.getLiteral(match, startIndex, 'boolean');
        } if ((match = new RegExp(patterns.NUMBER).exec(slice))) {
            return Mappings.getLiteral(match, startIndex, 'number');
        } else if ((match = new RegExp(patterns.KEYWORD).exec(slice))) {
            return Mappings.getKeyword(match, startIndex);
        } else if ((match = new RegExp(patterns.PUNCTUATOR).exec(slice))) {
            return Mappings.getPunctuator(match, startIndex);
        } else if ((match = new RegExp(patterns.STRING).exec(slice))) {
            return Mappings.getLiteral(match, startIndex, 'string');
        } else if ((match = new RegExp(patterns.IDENTIFIER).exec(slice))) {
            return Mappings.getIdentifier(match, startIndex);
        } else if ((match = new RegExp(patterns.WHITESPACE).exec(slice))) {
            return Mappings.getWhitespace(match, startIndex);
        }

        throw new Error('[ast-parser] Unknown token');
    }

    /**
     * @param   {Array.<Token>}   tokens
     * @param   {Models.Class}    classInstance
     * @return  {void}
     */

    static parseTokensIntoAst(tokens, classInstance) {
        for (let i = 0, type; i < flow.length; i++) {
            type = flow[i];

            let Model = models[Util.pascalCase(type)];
            let mapper = Mappings['map' + Util.pascalCase(type)];
            let pattern = patterns[type];

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

AstParser.Models   = models;
AstParser.Patterns = patterns;

export default AstParser;