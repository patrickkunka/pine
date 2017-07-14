import * as patterns from './patterns';
import * as models   from './models';

import {
    KEYWORDS
} from './Entities';

class Mappings {
    static getLiteral(match, startIndex, type) {
        const literal   = new models.Literal();
        const captured  = match[1];

        literal.kind    = type;
        literal.start   = startIndex;
        literal.end     = startIndex + captured.length;

        if (type === 'string') {
            literal.content = captured.replace(/["']/g, '');
            literal.raw = captured;
        } else {
            literal.content = captured;
        }

        return literal;
    }

    static getKeyword(match, startIndex) {
        const keyword   = new models.Keyword();
        const captured  = match[1];

        keyword.content = captured;
        keyword.start   = startIndex;
        keyword.end     = startIndex + captured.length;

        if (KEYWORDS.indexOf(captured) < 0) {
            throw new Error(`[mappings] Illegal token ${captured}`);
        }

        return keyword;
    }

    static getIdentifier(match, startIndex) {
        const identifier    = new models.Identifier();
        const captured      = match[1];

        identifier.content  = captured;
        identifier.start    = startIndex;
        identifier.end      = startIndex + captured.length;

        return identifier;
    }

    static getWhitespace(match, startIndex) {
        const whitespace    = new models.Whitespace();
        const captured      = match[1];

        whitespace.content  = captured;
        whitespace.start    = startIndex;
        whitespace.end      = startIndex + captured.length;

        return whitespace;
    }

    static getPunctuator(match, startIndex) {
        const punctuator    = new models.Punctuator();
        const captured      = match[1];

        punctuator.content  = captured;
        punctuator.start    = startIndex;
        punctuator.end      = startIndex + captured.length;

        return punctuator;
    }

    static mapCompoundPunctuator(compoundPunctuator, tokens, startIndex) {
        const segment = tokens.slice(startIndex);

        let token = null;
        let total = -1;
        let i     = -1;

        for (i = 0; (token = segment[i]); i++) {
            let tokenString = token.toString();

            if (token.type !== 'Punctuator' || tokenString === ';') {
                total = i - 1;

                break;
            } else {
                compoundPunctuator.content += token.content;
            }
        }

        tokens.splice(startIndex + 1, total);

        tokens[startIndex] = compoundPunctuator;
    }

    static mapUnaryExpression(unaryExpression, tokens, startIndex) {
        unaryExpression.operator = tokens[startIndex];
        unaryExpression.argument = tokens[startIndex + 1];

        tokens.splice(startIndex + 1, 1);

        tokens[startIndex] = unaryExpression;
    }

    static mapMemberExpression(memberExpression, tokens, startIndex, parent=null) {
        const segment = tokens.slice(startIndex);

        let i = -1;

        for (i = 0; i <= 2; i++) {
            let token = segment[i];
            let tokenString = token.toString();
            let re = new RegExp('^' + patterns.MEMBER_EXPRESSION);

            if (tokenString === '.') continue;

            if (parent) {
                memberExpression.parent = parent;
            }

            if (i === 0) {
                if (tokenString !== 'identifier' && parent) {
                    throw new Error(`[mapper#mapMemberExpression] Illegal token ${tokenString}`);
                }

                memberExpression.object = token;
            } else {
                let segmentString = tokens.slice(startIndex + i).join(' ');

                if (re.test(segmentString)) {
                    memberExpression.property = new models.MemberExpression();

                    Mappings.mapMemberExpression(memberExpression.property, tokens, startIndex + i, memberExpression);
                } else {
                    memberExpression.property = token;
                }
            }
        }

        tokens.splice(startIndex + 1, 2);

        tokens[startIndex] = memberExpression;
    }

    static mapAssignmentExpression(assignmentExpression, tokens, startIndex) {
        Mappings.mapBalancedExpression(...arguments);

        tokens.splice(startIndex + 1, 1);
    }

    static mapLogicalExpression() {
        Mappings.mapBalancedExpression(...arguments);
    }

    static mapBinaryExpression() {
        Mappings.mapBalancedExpression(...arguments);
    }

    static mapBalancedExpression(balancedExpression, tokens, startIndex) {
        const segment = tokens.slice(startIndex);

        let hasParentheses = false;
        let token = null;
        let i = -1;

        for (i = 0; (token = segment[i]); i++) {
            let tokenString = token.toString();

            if ((i === 0 && tokenString === '(') || (hasParentheses && tokenString === ')')) {
                hasParentheses = true;

                continue;
            } else if (['comparison_operator', 'logical_operator', '='].indexOf(tokenString) > -1) {
                if (balancedExpression.operator !== null) {
                    if (hasParentheses) {
                        startIndex++;
                        i--;
                    }

                    break;
                }

                balancedExpression.operator = token;
            } else if (balancedExpression.left === null) {
                balancedExpression.left = token;
            } else if (balancedExpression.right === null) {
                balancedExpression.right = token;
            } else {
                break;
            }
        }

        tokens.splice(startIndex + 1, i - 1);

        tokens[startIndex] = balancedExpression;
    }

    static mapReturnStatement(returnStatement, tokens, startIndex) {
        const segment = tokens.slice(startIndex);

        let token = null;
        let i = -1;

        for (i = 0; (token = segment[i]); i++) {
            let tokenString = token.toString();

            if (tokenString === 'return') {
                continue;
            } else if (tokenString === ';') {
                break;
            } else {
                returnStatement.argument = token;
            }
        }

        tokens.splice(startIndex + 1, i);

        tokens[startIndex] = returnStatement;
    }

    static mapBlockStatement(blockExpression, tokens, startIndex) {
        let i = startIndex + 1;
        let token = null;

        while ((token = tokens[i]) && token.toString() !== '}') {
            blockExpression.body.push(token);

            i++;
        }

        tokens.splice(startIndex + 1, blockExpression.body.length + 1);

        tokens[startIndex] = blockExpression;
    }

    static mapVariableDeclaration(variableDeclaration, tokens, startIndex) {
        const assignmentOffset = 1;
        const assignment = tokens[assignmentOffset];

        variableDeclaration.kind        = tokens[startIndex].content;
        variableDeclaration.identifier  = assignment.left;
        variableDeclaration.init        = assignment.right;

        tokens.splice(startIndex + 1, 1);

        tokens[startIndex] = variableDeclaration;
    }

    static mapParametersExpression(parametersExpression, tokens, startIndex) {
        const segment = tokens.slice(startIndex);

        let token = null;
        let i = -1;

        for (i = 0; (token = segment[i]); i++) {
            let tokenString = token.toString();

            if (['(', ','].indexOf(tokenString) > -1) {
                continue;
            } else if (tokenString === ')') {
                break;
            } else {
                parametersExpression.params.push(token);
            }
        }

        if (parametersExpression.params.length > 1) {
            tokens.splice(startIndex + 1, i);
        } else {
            tokens.splice(startIndex + 1, 2);
        }

        tokens[startIndex] = parametersExpression;
    }

    static mapFunctionDeclaration(functionDeclaration, tokens, startIndex) {
        const segment = tokens.slice(startIndex);

        let token = null;
        let i     = -1;

        for (i = 0; (token = segment[i]); i++) {
            let tokenString = token.toString();

            if (['function', '(', ')', 'get', 'set'].indexOf(tokenString) > -1) continue;

            switch (tokenString) {
                case 'identifier':
                    functionDeclaration.identifier = token;

                    break;
                case 'parameters_expression':
                    functionDeclaration.params = token.params;

                    break;
                case 'block_statement':
                    functionDeclaration.body = token;

                    break;
                default:
                    throw new Error('[mapping#mapFunctionDeclaration()] Unexpected token');
            }
        }

        tokens.splice(startIndex + 1, i);

        tokens[startIndex] = functionDeclaration;
    }

    static mapCallExpression(callExpression, tokens, startIndex) {
        const segment = tokens.slice(startIndex);

        let token = null;
        let i     = -1;

        loop:
        for (i = 0; (token = segment[i]); i++) {
            let tokenString = token.toString();

            if (['(', ')', ';'].indexOf(tokenString) > -1) continue;

            switch (tokenString) {
                case 'identifier':
                case 'member_expression':
                    callExpression.callee = token;

                    break;
                case 'parameters_expression':
                    callExpression.arguments = token.params;

                    break;
                default:
                    break loop;
            }
        }

        tokens.splice(startIndex + 1, i - 1);

        tokens[startIndex] = callExpression;
    }

    static mapIfStatement(ifStatement, tokens, startIndex) {
        const segment = tokens.slice(startIndex);

        let token = null;
        let i     = -1;

        for (i = 0; (token = segment[i]); i++) {
            let tokenString = token.toString();

            if (['if', 'else', '(', ')'].indexOf(tokenString) > -1) continue;

            if (['logical_expression', 'binary_expression', 'parameters_expression'].indexOf(tokenString) > -1) {
                ifStatement.test = tokenString === 'parameters_expression' ? token.params[0] : token;
            } else if (['block_statement', 'if_statement'].indexOf(tokenString) > -1) {
                if (ifStatement.consequent) {
                    ifStatement.alternate = token;
                } else {
                    ifStatement.consequent = token;
                }
            } else {
                break;
            }
        }

        tokens.splice(startIndex + 1, i - 1);

        tokens[startIndex] = ifStatement;
    }
}

export default Mappings;