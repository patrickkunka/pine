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

export default Token;