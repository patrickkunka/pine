'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Token = require('./Token');

var _Token2 = _interopRequireDefault(_Token);

var _BinaryExpression = require('./BinaryExpression');

var _BinaryExpression2 = _interopRequireDefault(_BinaryExpression);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class LogicalExpression extends _Token2.default {
    constructor() {
        super();

        this.left = null;
        this.right = null;
        this.operator = null;

        Object.seal(this);
    }

    toString() {
        return 'logical_expression';
    }

    get isDoubleBinary() {
        return this.left instanceof _BinaryExpression2.default && this.right instanceof _BinaryExpression2.default;
    }

    get isNullOrEmptyCheck() {
        return this.isDoubleBinary && this.left.left.content === this.right.left.content && this.left.operator.content === this.right.operator.content && (this.left.right.content === 'null' && this.right.right.content === '' || this.left.right.content === '' && this.right.right.content === 'null');
    }

    get isIsNullOrEmpty() {
        return this.isNullOrEmptyCheck && this.left.operator.content === '===' && this.operator.content === '||';
    }

    get isIsNotNullOrEmpty() {
        return this.isNullOrEmptyCheck && this.left.operator.content === '!==' && this.operator.content === '&&';
    }

    get nullOrEmptyArgument() {
        return this.isNullOrEmptyCheck ? this.left.left : null;
    }
}

exports.default = LogicalExpression;
//# sourceMappingURL=LogicalExpression.js.map