'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Token = require('./Token');

var _Token2 = _interopRequireDefault(_Token);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class IfStatement extends _Token2.default {
    constructor() {
        super();

        this.test = null;
        this.consequent = null;
        this.alternate = null;

        Object.seal(this);
    }

    toString() {
        return 'if_statement';
    }

    get hasAlternate() {
        return this.alternate !== null;
    }

    get hasNestedIf() {
        return this.alternate instanceof IfStatement;
    }
}

exports.default = IfStatement;
//# sourceMappingURL=IfStatement.js.map