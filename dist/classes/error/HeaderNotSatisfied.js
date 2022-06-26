"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HeaderNotSatisfied extends Error {
    constructor(key) {
        super(`Expected header as not provided: '${key}'`);
    }
}
exports.default = HeaderNotSatisfied;
