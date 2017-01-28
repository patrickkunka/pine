'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Token = require('./Token');

var _Token2 = _interopRequireDefault(_Token);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Keyword extends _Token2.default {
    constructor() {
        super();

        this.content = '';

        Object.seal(this);
    }

    toString() {
        return this.content;
    }
}

exports.default = Keyword;
//# sourceMappingURL=Keyword.js.map