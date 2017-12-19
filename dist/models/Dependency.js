'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Token = require('./Token');

var _Token2 = _interopRequireDefault(_Token);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Dependency extends _Token2.default {
    constructor() {
        this.name = '';
        this.path = '';

        Object.seal(this);
    }
}

exports.default = Dependency;
//# sourceMappingURL=Dependency.js.map