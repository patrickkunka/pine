'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Token = require('./Token');

var _Token2 = _interopRequireDefault(_Token);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class NewExpression extends _Token2.default {
    constructor() {
        super();

        this.identifier = null;
        this.typing = null;

        Object.seal(this);
    }

    toString() {
        return 'new_expression';
    }
}

exports.default = NewExpression;
//# sourceMappingURL=NewExpression.js.map