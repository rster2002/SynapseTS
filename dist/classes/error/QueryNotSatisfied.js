"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueryNotSatisfied extends Error {
    constructor(key) {
        super(`Expected query parameter as not provided: '${key}'`);
    }
}
exports.default = QueryNotSatisfied;
