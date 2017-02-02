'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Token = require('./Token');

var _Token2 = _interopRequireDefault(_Token);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ClassMember extends _Token2.default {
    constructor() {
        super();

        this.key = '';
        this.value = null;
        this.getter = null;
        this.setter = null;
        this.typing = null;
        this.arrayTyping = null;

        /**
         * @type ('init'|'get')
         */

        this.kind = '';

        Object.seal(this);
    }

    get hasGetter() {
        return this.getter !== null;
    }
}

exports.default = ClassMember;
//# sourceMappingURL=ClassMember.js.map