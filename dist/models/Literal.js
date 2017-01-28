'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Token = require('./Token');

var _Token2 = _interopRequireDefault(_Token);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Literal extends _Token2.default {
    constructor() {
        super();

        /**
         * @type ('string'|'boolean'|'number')
         */

        this.kind = '';
        this.raw = '';
        this.content = '';

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

exports.default = Literal;
//# sourceMappingURL=Literal.js.map