import Token from './Token';

class Punctuator extends Token {
    constructor() {
        super();

        this.content = '';

        Object.seal(this);
    }

    toString() {
        if (['==', '===', '!=', '!==', '<', '>', '>=', '<='].indexOf(this.content) > -1) {
            return 'comparison_operator';
        }

        if (['&&', '||'].indexOf(this.content) > -1) {
            return 'logical_operator';
        }

        return this.content;
    }

    get isEqualityCheck() {
        return this.content === '===' || this.content === '==';
    }

    get isNegativeEqualityCheck() {
        return this.content === '!==' || this.content === '!=';
    }

    get isNotEqualityCheck() {
        return !this.isEqualityCheck && !this.isNegativeEqualityCheck;
    }
}

export default Punctuator;