'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Token = require('./Token');

var _Token2 = _interopRequireDefault(_Token);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AssignmentExpression extends _Token2.default {
    constructor() {
        super();

        this.left = null;
        this.right = null;
        this.operator = null;

        Object.seal(this);
    }

    toString() {
        return 'assignment';
    }
}

exports.default = AssignmentExpression;
//# sourceMappingURL=AssignmentExpression.js.map