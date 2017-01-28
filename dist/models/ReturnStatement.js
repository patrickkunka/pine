'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Token = require('./Token');

var _Token2 = _interopRequireDefault(_Token);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ReturnStatement extends _Token2.default {
    constructor() {
        super();

        this.argument = null;
    }

    toString() {
        return 'return_statement';
    }
}

exports.default = ReturnStatement;
//# sourceMappingURL=ReturnStatement.js.map