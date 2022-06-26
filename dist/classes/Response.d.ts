import type { Response as ExpressResponse } from "express";
import type ResponseInit from "../interfaces/ResponseInit";
import HttpStatus from "../enums/HttpStatus";
import type Controller from "./Controller";
export default class Response implements ResponseInit {
    private controller;
    private controllerContext;
    private expressResponse;
    status: HttpStatus;
    body: string;
    headers: {
        [key: string]: string;
    };
    constructor(init?: ResponseInit);
    setStatus(status: HttpStatus): void;
    setHeader(key: string, value: string): void;
    overrideBody(body: string): void;
    resolveExpressResponse(response: ExpressResponse, controller: Controller): void;
    private resolveCors;
    private resolveHeaders;
    private resolveBody;
    static respondDirectly(req: ExpressResponse, controller: Controller, init?: ResponseInit): void;
}
