import Token from './Token';

class NewExpression extends Token {
    constructor() {
        super();

        this.identifier = null;
        this.typing = null;

        Object.seal(this);
    }

    toString() {
        return 'new_expression';
    }
}

export default NewExpression;