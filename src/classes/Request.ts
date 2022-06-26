import type { Request as ExpressRequest } from "express";
import QueryNotSatisfied from "./error/QueryNotSatisfied";
import Validator from "./internal/Validator";
import BodyNotSatisfied from "./error/BodyNotSatisfied";
import HeaderNotSatisfied from "./error/HeaderNotSatisfied";

export default class Request {
    private internalRequest: ExpressRequest;
    metaData = new Map<string, unknown>();

    constructor(req: ExpressRequest) {
        this.internalRequest = req;
    }

    getPath() {
        return this.internalRequest.path;
    }

    getQuery(key: string) {
        return this.internalRequest.query[key];
    }

    getHeader(name: string) {
        return this.internalRequest.get(name) ?? null;
    }

    requireHeader(name: string) {
        let header = this.getHeader(name);

        if (header === undefined) {
            throw new HeaderNotSatisfied(name);
        }

        return header;
    }

    getSlug(name: string) {
        return this.internalRequest.params[name] ?? null;
    }

    requireQuery(key: string) {
        let value = this.getQuery(key);

        if (value === undefined) {
            throw new QueryNotSatisfied(key);
        }

        return value;
    }

    getRawBody() {
        return this.internalRequest.body;
    }

    requireBody<T extends object>(shape: T): T {
        let validator = new Validator(shape);
        let body = this.internalRequest.body;

        if (!validator.validate(body)) {
            throw new BodyNotSatisfied(validator.expected, validator.received);
        }

        return body;
    }
}
