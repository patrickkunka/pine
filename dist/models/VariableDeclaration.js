'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Token = require('./Token');

var _Token2 = _interopRequireDefault(_Token);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class VariableDeclaration extends _Token2.default {
    constructor() {
        super();

        this.kind = '';
        this.identifier = null;
        this.init = null;

        Object.seal(this);
    }

    toString() {
        return 'variable_declaration';
    }
}

exports.default = VariableDeclaration;
//# sourceMappingURL=VariableDeclaration.js.map