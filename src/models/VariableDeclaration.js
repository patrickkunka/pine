import Token from './Token';

class VariableDeclaration extends Token {
    constructor() {
        super();

        this.kind       = '';
        this.identifier = null;
        this.init       = null;

        Object.seal(this);
    }

    toString() {
        return 'variable_declaration';
    }
}

export default VariableDeclaration;