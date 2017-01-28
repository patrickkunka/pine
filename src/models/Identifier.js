import Token from './Token';

class Identifier extends Token {
    constructor() {
        super();

        this.content = '';

        Object.seal(this);
    }

    toString() {
        return 'identifier';
    }
}

export default Identifier;