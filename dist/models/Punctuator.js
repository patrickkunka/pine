'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Token = require('./Token');

var _Token2 = _interopRequireDefault(_Token);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Punctuator extends _Token2.default {
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

exports.default = Punctuator;
//# sourceMappingURL=Punctuator.js.map