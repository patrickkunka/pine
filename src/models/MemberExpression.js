import Identifier   from './Identifier';
import Token        from './Token';

class MemberExpression extends Token {
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
        return this.property instanceof Identifier && this.property.content === 'length';
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

            for (let i = 0, member; (member = this.class.members[i]); i++) {
                if (member.key === key) {
                    return member;
                }
            }
        }

        return null;
    }

    get isArray() {
        return this.isClassMember && this.classMember.isArray;
    }

    get isString() {
        return this.isClassMember && this.classMember.isString;
    }
}

export default MemberExpression;