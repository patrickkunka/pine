'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Token = require('./Token');

var _Token2 = _interopRequireDefault(_Token);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Program extends _Token2.default {
    constructor() {
        super();

        this.body = [];

        Object.seal(this);
    }
}

exports.default = Program;
//# sourceMappingURL=Program.js.map