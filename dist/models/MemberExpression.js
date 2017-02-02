'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Identifier = require('./Identifier');

var _Identifier2 = _interopRequireDefault(_Identifier);

var _Token = require('./Token');

var _Token2 = _interopRequireDefault(_Token);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MemberExpression extends _Token2.default {
    constructor() {
        super();

        this.object = null;
        this.property = null;
        this.parent = null;

        Object.seal(this);
    }

    toString() {
        return 'member_expression';
    }

    get isLengthLookup() {
        return this.property instanceof _Identifier2.default && this.property.content === 'length';
    }

    get isArrayLengthLookup() {
        return this.parent && this.isLengthLookup && this.parent.isArray;
    }

    get isStringLengthLookup() {
        return this.parent && this.isLengthLookup && this.parent.isString;
    }

    get isClassMember() {
        return this.class && this.object && this.object.content === 'this';
    }

    get classMember() {
        if (this.isClassMember) {
            const key = this.property instanceof MemberExpression ? this.property.object.content : this.property.content;

            for (let i = 0, member; member = this.class.members[i]; i++) {
                if (member.key === key) {
                    return member;
                }
            }
        }

        return null;
    }

    get isArray() {
        return this.isClassMember && this.classMember.typing.isArray;
    }

    get isString() {
        return this.isClassMember && this.classMember.typing.isString;
    }
}

exports.default = MemberExpression;
//# sourceMappingURL=MemberExpression.js.map