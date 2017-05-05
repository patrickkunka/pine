import Token from './Token';

class ClassMember extends Token {
    constructor() {
        super();

        this.key            = '';
        this.value          = null;
        this.getter         = null;
        this.setter         = null;
        this.typing         = null;

        /**
         * @type ('init'|'get')
         */

        this.kind           = '';

        Object.seal(this);
    }

    get hasGetter() {
        return this.getter !== null;
    }

    get isMemberNameReservedWord() {
        return [
            'abstract', 'as', 'base', 'bool', 'break', 'byte',
            'case', 'catch', 'char', 'checked', 'class', 'const',
            'continue', 'decimal', 'default', 'delegate', 'do', 'double',
            'else', 'enum', 'event', 'explicit', 'extern', 'finally',
            'fixed', 'float', 'for', 'foreach', 'goto', 'if',
            'implicit', 'in', 'int', 'interface', 'internal', 'is',
            'lock', 'long', 'namespace', 'new', 'null', 'object',
            'operator', 'out', 'override', 'params', 'private',
            'public', 'readonly', 'ref', 'return', 'sbyte', 'sealed',
            'short', 'sizeof', 'stackalloc', 'static', 'string', 'struct',
            'switch', 'this', 'throw', 'try', 'typeof', 'unit',
            'ulong', 'unchecked', 'unsafe', 'ushort', 'using', 'virtual',
            'void', 'volatile', 'while', 'FALSE', 'TRUE'
        ].indexOf(this.key) > -1;
    }
}

export default ClassMember;