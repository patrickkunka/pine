'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Token = require('./Token');

var _Token2 = _interopRequireDefault(_Token);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BinaryExpression extends _Token2.default {
    constructor() {
        super();

        this.left = null;
        this.right = null;
        this.operator = null;

        Object.seal(this);
    }

    toString() {
        return 'binary_expression';
    }
}

exports.default = BinaryExpression;
//# sourceMappingURL=BinaryExpression.js.map