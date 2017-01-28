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
        this.typing = '';
        this.arrayTyping = '';

        /**
         * @type ('init'|'get')
         */

        this.kind = '';

        Object.seal(this);
    }

    get hasGetter() {
        return this.getter !== null;
    }

    get isString() {
        return this.typing === 'string';
    }

    get isBoolean() {
        return this.typing === 'boolean';
    }

    get isNumber() {
        return this.typing === 'number';
    }

    get isPlainObject() {
        return this.typing === 'object';
    }

    get isArray() {
        return this.typing === 'array';
    }

    get isCustomType() {
        return !this.isString && !this.isBoolean && !this.isNumber && !this.isPlainObject && !this.isArray;
    }
}

exports.default = ClassMember;
//# sourceMappingURL=ClassMember.js.map