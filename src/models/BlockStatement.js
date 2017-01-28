import Token from './Token';

class BlockStatement extends Token {
    constructor() {
        super();

        this.body = [];
    }

    toString() {
        return 'block_statement';
    }
}

export default BlockStatement;