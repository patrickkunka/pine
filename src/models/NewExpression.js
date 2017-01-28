import Token from './Token';

class NewExpression extends Token {
    constructor() {
        super();

        this.identifier = null;
        this.arrayItemIdentifier = null;

        Object.seal(this);
    }

    toString() {
        return 'new_expression';
    }

    get isArray() {
        return this.arrayItemIdentifier !== null;
    }
}

export default NewExpression;