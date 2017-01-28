import Token from './Token';

class UnaryExpression extends Token {
    constructor() {
        super();

        this.operator = null;
        this.argument = null;

        Object.seal(this);
    }

    toString() {
        return 'unary_expression';
    }
}

export default UnaryExpression;