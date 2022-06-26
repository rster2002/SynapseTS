"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BodyNotSatisfied extends Error {
    constructor(expected, received) {
        super(`Body did not satisfy the requirements: expected '${expected}' but received '${received}'`);
        this.expected = expected;
        this.received = received;
    }
}
exports.default = BodyNotSatisfied;
