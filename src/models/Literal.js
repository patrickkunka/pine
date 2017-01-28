import Token from './Token';

class Literal extends Token {
    constructor() {
        super();

        /**
         * @type ('string'|'boolean'|'number')
         */

        this.kind       = '';
        this.raw        = '';
        this.content    = '';

        Object.seal(this);
    }

    toString() {
        return 'literal';
    }

    get isString() {
        return this.kind === 'string';
    }

    get isEmptyString() {
        return this.isString && this.content === '';
    }
}

export default Literal;