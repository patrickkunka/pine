import Token from './Token';

class Dependency extends Token {
    constructor() {
        this.name = '';
        this.path = '';

        Object.seal(this);
    }
}

export default Dependency;