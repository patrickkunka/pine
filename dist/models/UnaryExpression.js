'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Token = require('./Token');

var _Token2 = _interopRequireDefault(_Token);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UnaryExpression extends _Token2.default {
    constructor() {
        super();

        this.operator = null;
        this.argument = null;

        Object.seal(this);
    }

    toString() {
        return 'unary_expression';
    }
}

exports.default = UnaryExpression;
//# sourceMappingURL=UnaryExpression.js.map