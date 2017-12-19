'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Program = require('./Program');

var _Program2 = _interopRequireDefault(_Program);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Namespace extends _Program2.default {
    constructor() {
        super();

        this.name = '';
        this.dependencies = [];

        Object.seal(this);
    }
}

exports.default = Namespace;
//# sourceMappingURL=Namespace.js.map