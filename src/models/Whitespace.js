import Token from './Token';

class Whitespace extends Token {
    constructor() {
        super();

        this.content = '';

        Object.seal(this);
    }

    toString() {
        return ' ';
    }
}

export default Whitespace;