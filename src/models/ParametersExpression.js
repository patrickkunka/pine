import Token from './Token';

class ParametersExpression extends Token {
    constructor() {
        super();

        this.params = [];

        Object.seal(this);
    }

    toString() {
        return 'parameters_expression';
    }
}

export default ParametersExpression;