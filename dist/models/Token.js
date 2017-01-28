'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
class Token {
    constructor() {
        this.class = null;
        this.start = -1;
        this.end = -1;

        Object.defineProperties(this, {
            type: {
                enumerable: true,
                get() {
                    return this.constructor.name;
                }
            }
        });
    }

    toString() {
        return 'unknown_token';
    }
}

exports.default = Token;
//# sourceMappingURL=Token.js.map