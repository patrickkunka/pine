import Token from './Token';

class Program extends Token {
    constructor() {
        super();

        this.body = [];

        Object.seal(this);
    }
}

export default Program;