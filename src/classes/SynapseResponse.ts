import type { Response as ExpressResponse } from "express";
import type ResponseInit from "../interfaces/ResponseInit";
import HttpStatus from "../enums/HttpStatus";
import SynapseComponent from "./SynapseComponent";

export const resolveExpressResponse = Symbol();

export default class SynapseResponse extends SynapseComponent {
    private status: HttpStatus = HttpStatus.OK;
    private body: unknown;
    private headers = new Map<string, string>();

    constructor(init: ResponseInit = {}) {
        super();

        this.setStatus(init.status);
        this.setBody(init.body);

        this.setHeaders(init.headers);
    }

    setStatus(status: HttpStatus) {
        this.status = status;
    }

    setBody(body: unknown) {
        this.body = body;
    }

    setHeaders(headers: { [key: string]: string }) {
        for (let [key, value] of Object.entries(headers)) {
            this.setHeader(key, value);
        }
    }

    setHeader(key: string, value: string) {
        this.headers.set(key, value);
    }

    removeHeader(key: string) {
        this.headers.delete(key);
    }

    [resolveExpressResponse](response: ExpressResponse) {
        response.status(this.status);

        for (let [key, value] of Array.from(this.headers.entries())) {
            response.setHeader(key, value);
        }

        response.send(this.body);
    }

    static httpStatus(status: HttpStatus): SynapseResponse {
        return new SynapseResponse({
            status,
            body: null,
        });
    }

    static validationError(status: HttpStatus, message?: string) {
        return new SynapseResponse({
            status,
            body: JSON.stringify({
                error: message,
            }),
        });
    }

    static redirect(url: string) {
        return new SynapseResponse({
            status: HttpStatus.TEMPORARY_REDIRECT,
            headers: {
                "Location": url,
            },
        });
    }
}
