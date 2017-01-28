import Token from './Token';

class Class extends Token {
    constructor() {
        super();

        this.name       = '';
        this.superName  = '';
        this.members    = [];

        Object.seal(this);
    }
}

export default Class;