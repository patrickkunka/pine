import Token from './Token';

class FunctionDeclaration extends Token {
    constructor() {
        super();

        this.identifier = null;
        this.body       = null;
        this.params     = [];

        Object.seal(this);
    }

    toString() {
        return 'function_declaration';
    }
}

export default FunctionDeclaration;