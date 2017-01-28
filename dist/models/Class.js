'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Token = require('./Token');

var _Token2 = _interopRequireDefault(_Token);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Class extends _Token2.default {
    constructor() {
        super();

        this.name = '';
        this.superName = '';
        this.members = [];

        Object.seal(this);
    }
}

exports.default = Class;
//# sourceMappingURL=Class.js.map