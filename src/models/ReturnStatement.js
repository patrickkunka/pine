import Token from './Token';

class ReturnStatement extends Token {
    constructor() {
        super();

        this.argument = null;
    }

    toString() {
        return 'return_statement';
    }
}

export default ReturnStatement;