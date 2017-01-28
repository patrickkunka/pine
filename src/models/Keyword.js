import Token from './Token';

class Keyword extends Token {
    constructor() {
        super();

        this.content = '';

        Object.seal(this);
    }

    toString() {
        return this.content;
    }
}

export default Keyword;