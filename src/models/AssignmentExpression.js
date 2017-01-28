import Token from './Token';

class AssignmentExpression extends Token {
    constructor() {
        super();

        this.left       = null;
        this.right      = null;
        this.operator   = null;

        Object.seal(this);
    }

    toString() {
        return 'assignment';
    }
}

export default AssignmentExpression;