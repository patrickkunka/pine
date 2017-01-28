import Token from './Token';

class CallExpression extends Token {
    constructor() {
        super();

        this.callee     = null;
        this.arguments  = [];

        Object.seal(this);
    }

    toString() {
        return 'call_expression';
    }
}

export default CallExpression;