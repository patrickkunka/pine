'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Token = require('./Token');

var _Token2 = _interopRequireDefault(_Token);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FunctionDeclaration extends _Token2.default {
    constructor() {
        super();

        this.identifier = null;
        this.body = null;
        this.params = [];

        Object.seal(this);
    }

    toString() {
        return 'function_declaration';
    }
}

exports.default = FunctionDeclaration;
//# sourceMappingURL=FunctionDeclaration.js.map