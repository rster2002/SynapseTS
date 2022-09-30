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
import SynapseComponent from "./SynapseComponent";

export const execute = Symbol();
export const respondWith = Symbol();

export default class SynapseRequest extends SynapseComponent {
    private readonly route: SynapseRoute;
    private readonly internalRequest: ExpressRequest;
    private readonly internalResponse: ExpressResponse;

    private readonly metaData = new Map<string, unknown>();

    private responded = false;

    constructor(route: SynapseRoute, req: ExpressRequest, res: ExpressResponse) {
        super();

        this.route = route;
        this.internalRequest = req;
        this.internalResponse = res;
    }

    async [execute]() {
        return await this.route.execute(this);
    }

    [respondWith](response: SynapseResponse) {
        if (!this.responded) {
            response[resolveExpressResponse](this.internalResponse);
            this.responded = true;
        }
    }

    /**
     * Returns the matched route for this request.
     */
    getRoute() {
        return this.route;
    }

    /**
     * Get a parameter from the url.
     * @example Given the following route: `/users/:id` you can get the value of `:id` using `request.getParam("id");`
     * @param name Name of the parameter to return
     * @returns Returns the value of the parameter or `null` if the parameter does not exist.
     */
    getParam(name: string) {
        return this.internalRequest.params[name] ?? null;
    }

    /**
     * Returns the requested path.
     */
    getPath() {
        return this.internalRequest.path;
    }

    /**
     * Returns the meta map, which can be used to add additional information to the request.
     */
    getMetaObject() {
        return this.metaData;
    }

    /**
     * Directly get a value from the meta map.
     * @param key Key of the value you want to return.
     */
    getMetaData(key: string) {
        let value = this.metaData.get(key);

        if (value === undefined) {
            return this.route.getMetaData(key);
        }

        return value ?? null;
    }

    /**
     * Gets the value of the header.
     * @param name Name of the header to return the value of.
     * @returns Returns the value of the header, or `null` if the header was not present in the request.
     */
    getHeader(name: string) {
        return this.internalRequest.get(name) ?? null;
    }

    /**
     * Ensures that the header is present.
     * @param name Name of the header to return the value of.
     * @return Returns the value of the header. If the header is not present on the request it throws a ValidationError.
     */
    requireHeader(name: string): string

    /**
     * Ensures that the header is present and that the value of the header is a number.
     * @param name Name of the header to return the value of.
     * @param validationDefinition Validation rules for the number.
     * @returns Returns the value of the header as a number. If the header is not present on the request or the value is
     * not a number it throws a ValidationError.
     */
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
    requireQuery(key: string, validationDefinition: "string"): string
    requireQuery(key: string, validationDefinition: "number"): number
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
