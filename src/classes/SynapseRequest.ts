import type { Request as ExpressRequest, Response as ExpressResponse } from "express";
import QueryNotSatisfied from "./error/QueryNotSatisfied";
import Validator from "./internal/Validator";
import BodyNotSatisfied from "./error/BodyNotSatisfied";
import HeaderNotSatisfied from "./error/HeaderNotSatisfied";
import SynapseRoute from "./SynapseRoute";
import SynapseResponse, { resolveExpressResponse } from "./SynapseResponse";
import LiteralValidationDefinition, {
    NumberLiteralValidationDefinition,
    StringLiteralValidationDefinition
} from "../interfaces/LiteralValidationDefinition";
import LiteralValidator from "./internal/LiteralValidator";
import ValidationError from "./error/ValidationError";

export const execute = Symbol();
export const respondWith = Symbol();

export default class SynapseRequest {
    private readonly route: SynapseRoute;
    private readonly internalRequest: ExpressRequest;
    private readonly internalResponse: ExpressResponse;

    private readonly metaData = new Map<string, unknown>();

    private responded = false;

    constructor(route: SynapseRoute, req: ExpressRequest, res: ExpressResponse) {
        this.route = route;
        this.internalRequest = req;
        this.internalResponse = res;
    }

    async [execute]() {
        return await this.route.execute(this);
    }

    getRoute() {
        return this.route;
    }

    [respondWith](response: SynapseResponse) {
        if (!this.responded) {
            response[resolveExpressResponse](this.internalResponse);
            this.responded = true;
        }
    }

    getParam(name: string) {
        return this.internalRequest.params[name] ?? null;
    }

    getPath() {
        return this.internalRequest.path;
    }

    getMetaObject() {
        return this.metaData;
    }

    getMetaData(key: string) {
        let value = this.metaData.get(key);

        if (value === undefined) {
            return this.route.getMetaData(key);
        }

        return value ?? null;
    }

    getHeader(name: string) {
        return this.internalRequest.get(name) ?? null;
    }

    requireHeader(name: string): string
    requireHeader(name: string, validationDefinition: NumberLiteralValidationDefinition): number
    requireHeader(name: string, validationDefinition: StringLiteralValidationDefinition): string
    requireHeader(name: string, validationDefinition?: LiteralValidationDefinition): string | number {
        let header: unknown = this.getHeader(name);

        if (header === undefined) {
            throw new HeaderNotSatisfied(name);
        }

        if (validationDefinition) {
            let validator = new LiteralValidator();
            header = validator.validate(header, validationDefinition);
        }

        return <string | number> header;
    }

    getQuery(key: string): string {
        return <string> this.internalRequest.query[key];
    }

    requireQuery(key: string): string
    requireQuery(key: string, validationDefinition: NumberLiteralValidationDefinition): number
    requireQuery(key: string, validationDefinition: StringLiteralValidationDefinition): string
    requireQuery(key: string, validationDefinition?: LiteralValidationDefinition): string | number {
        let value: unknown = this.getQuery(key);

        if (value === undefined) {
            throw new QueryNotSatisfied(key);
        }

        if (validationDefinition) {
            let validator = new LiteralValidator();
            value = validator.validate(value, validationDefinition);
        }

        return <string | number> value;
    }

    getRawBody() {
        return this.internalRequest.body;
    }

    requireBody<T extends object>(shape: T): T {
        let validator = new Validator(shape);
        let body = this.internalRequest.body;

        if (body === undefined) {
            throw new ValidationError(`Did not send a body where it was required`);
        }

        if (!validator.validate(body)) {
            throw new BodyNotSatisfied(validator.expected, validator.received);
        }

        return body;
    }
}
