'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
class Util {
    /**
     * Converts a dash or snake-case string to camel case.
     *
     * @param   {string}    str
     * @return  {string}
     */

    static camelCase(str) {
        return str.toLowerCase().replace(/([_-][a-z0-9])/g, $1 => $1.toUpperCase().replace(/[_-]/, ''));
    }

    /**
     * Converts a dash or snake-case string to pascal case.
     *
     * @param   {string}    str
     * @return  {string}
     */

    static pascalCase(str) {
        return (str = Util.camelCase(str)).charAt(0).toUpperCase() + str.slice(1);
    }
}

exports.default = Util;
//# sourceMappingURL=Util.js.map