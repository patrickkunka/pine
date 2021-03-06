'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Token = require('./Token');

var _Token2 = _interopRequireDefault(_Token);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ParametersExpression extends _Token2.default {
    constructor() {
        super();

        this.params = [];

        Object.seal(this);
    }

    toString() {
        return 'parameters_expression';
    }
}

exports.default = ParametersExpression;
//# sourceMappingURL=ParametersExpression.js.map