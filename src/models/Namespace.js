import Program from './Program';

class Namespace extends Program {
    constructor() {
        this.dependencies = [];

        Object.seal(this);
    }
}

export default Namespace;