import Token from './Token';
import BinaryExpression from './BinaryExpression';

class LogicalExpression extends Token {
    constructor() {
        super();

        this.left       = null;
        this.right      = null;
        this.operator   = null;

        Object.seal(this);
    }

    toString() {
        return 'logical_expression';
    }

    get isDoubleBinary() {
        return this.left instanceof BinaryExpression && this.right instanceof BinaryExpression;
    }

    get isNullOrEmptyCheck() {
        return (
            this.isDoubleBinary &&
            this.left.left.content === this.right.left.content &&
            this.left.operator.content === this.right.operator.content &&
            (
                (this.left.right.content === 'null' && this.right.right.content === '') ||
                (this.left.right.content === '' && this.right.right.content === 'null')
            )
        );
    }

    get isIsNullOrEmpty() {
        return this.isNullOrEmptyCheck && this.left.operator.content === '===' && this.operator.content === '||';
    }

    get isIsNotNullOrEmpty() {
        return this.isNullOrEmptyCheck && this.left.operator.content === '!==' && this.operator.content === '&&';
    }

    get nullOrEmptyArgument() {
        return this.isNullOrEmptyCheck ? this.left.left : null;
    }
}

export default LogicalExpression;