'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Token = require('./Token');

var _Token2 = _interopRequireDefault(_Token);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CallExpression extends _Token2.default {
    constructor() {
        super();

        this.callee = null;
        this.arguments = [];

        Object.seal(this);
    }

    toString() {
        return 'call_expression';
    }
}

exports.default = CallExpression;
//# sourceMappingURL=CallExpression.js.map