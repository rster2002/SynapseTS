"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const QueryNotSatisfied_1 = require("./error/QueryNotSatisfied");
const Validator_1 = require("./internal/Validator");
const BodyNotSatisfied_1 = require("./error/BodyNotSatisfied");
const HeaderNotSatisfied_1 = require("./error/HeaderNotSatisfied");
class Request {
    constructor(req) {
        this.metaData = new Map();
        this.internalRequest = req;
    }
    getPath() {
        return this.internalRequest.path;
    }
    getQuery(key) {
        return this.internalRequest.query[key];
    }
    getHeader(name) {
        return this.internalRequest.get(name) ?? null;
    }
    requireHeader(name) {
        let header = this.getHeader(name);
        if (header === undefined) {
            throw new HeaderNotSatisfied_1.default(name);
        }
        return header;
    }
    getSlug(name) {
        return this.internalRequest.params[name] ?? null;
    }
    requireQuery(key) {
        let value = this.getQuery(key);
        if (value === undefined) {
            throw new QueryNotSatisfied_1.default(key);
        }
        return value;
    }
    getRawBody() {
        return this.internalRequest.body;
    }
    requireBody(shape) {
        let validator = new Validator_1.default(shape);
        let body = this.internalRequest.body;
        if (!validator.validate(body)) {
            throw new BodyNotSatisfied_1.default(validator.expected, validator.received);
        }
        return body;
    }
}
exports.default = Request;
