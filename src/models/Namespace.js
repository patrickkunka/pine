import Program from './Program';

class Namespace extends Program {
    constructor() {
        super();

        this.name = '';
        this.dependencies = [];

        Object.seal(this);
    }
}

export default Namespace;