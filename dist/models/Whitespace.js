'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Token = require('./Token');

var _Token2 = _interopRequireDefault(_Token);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Whitespace extends _Token2.default {
    constructor() {
        super();

        this.content = '';

        Object.seal(this);
    }

    toString() {
        return ' ';
    }
}

exports.default = Whitespace;
//# sourceMappingURL=Whitespace.js.map