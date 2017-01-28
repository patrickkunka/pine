import Token from './Token';

class BinaryExpression extends Token {
    constructor() {
        super();

        this.left       = null;
        this.right      = null;
        this.operator   = null;

        Object.seal(this);
    }

    toString() {
        return 'binary_expression';
    }
}

export default BinaryExpression;