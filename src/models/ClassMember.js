import Token from './Token';

class ClassMember extends Token {
    constructor() {
        super();

        this.key            = '';
        this.value          = null;
        this.getter         = null;
        this.setter         = null;
        this.typing         = null;
        this.arrayTyping    = null;

        /**
         * @type ('init'|'get')
         */

        this.kind           = '';

        Object.seal(this);
    }

    get hasGetter() {
        return this.getter !== null;
    }
}

export default ClassMember;