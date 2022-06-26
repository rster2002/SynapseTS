"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Validator {
    constructor(shape) {
        this.shape = shape;
    }
    validate(object) {
        return this.validateValue(this.shape, object);
    }
    validateValue(expected, value) {
        if (Array.isArray(expected)) {
            if (!Array.isArray(value)) {
                this.expected = expected;
                this.received = value;
                return false;
            }
            return value.every(valueElement => {
                let anyPass = false;
                for (let expectedElement of expected) {
                    if (this.validateValue(expectedElement, valueElement)) {
                        anyPass = true;
                    }
                }
                if (!anyPass) {
                    this.expected = expected;
                    this.received = value;
                }
                return anyPass;
            });
        }
        if (typeof expected === "object" && expected !== undefined) {
            return Object.entries(expected).every(([key, expectedValue]) => {
                return this.validateValue(expectedValue, value[key]);
            });
        }
        let passValue = typeof expected === typeof value;
        if (!passValue) {
            this.expected = expected;
            this.received = value;
        }
        return passValue;
    }
}
exports.default = Validator;
