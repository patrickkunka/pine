'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
class Typing {
    constructor() {
        this.kind = '';
    }

    toString() {
        return this.kind;
    }

    get isString() {
        return this.kind === 'string';
    }

    get isBoolean() {
        return this.kind === 'boolean';
    }

    get isNumber() {
        return this.kind === 'number';
    }

    get isPlainObject() {
        return this.kind === 'object';
    }

    get isArray() {
        return this.kind === 'array';
    }

    get isCustomType() {
        return !this.isString && !this.isBoolean && !this.isNumber && !this.isPlainObject && !this.isArray;
    }
}

exports.default = Typing;
//# sourceMappingURL=Typing.js.map