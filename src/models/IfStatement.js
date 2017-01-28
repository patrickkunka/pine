import Token from './Token';

class IfStatement extends Token {
    constructor() {
        super();

        this.test       = null;
        this.consequent = null;
        this.alternate  = null;

        Object.seal(this);
    }

    toString() {
        return 'if_statement';
    }

    get hasAlternate() {
        return this.alternate !== null;
    }

    get hasNestedIf() {
        return this.alternate instanceof IfStatement;
    }
}

export default IfStatement;