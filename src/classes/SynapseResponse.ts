import type { Response as ExpressResponse } from "express";
import type ResponseInit from "../interfaces/ResponseInit";
import HttpStatus from "../enums/HttpStatus";

export const resolveExpressResponse = Symbol();

export default class SynapseResponse {
    private status: HttpStatus = HttpStatus.OK;
    private body: unknown;

    constructor(init: ResponseInit = {}) {
        this.setStatus(init.status);
        this.setBody(init.body);
    }

    setStatus(status: HttpStatus) {
        this.status = status;
    }

    setBody(body: unknown) {
        this.body = body;
    }

    [resolveExpressResponse](response: ExpressResponse) {
        response.status(this.status);
        response.send(this.body);
    }
}
