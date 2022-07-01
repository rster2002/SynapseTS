import type { Response as ExpressResponse } from "express";
import type ResponseInit from "../interfaces/ResponseInit";
import HttpStatus from "../enums/HttpStatus";
import type SynapseController from "./SynapseController";
import { controllerContext } from "../symbols";
import type ControllerContext from "./internal/ControllerContext";


export default class SynapseResponse implements ResponseInit {
    private controller: SynapseController;
    private controllerContext: ControllerContext;
    private expressResponse: ExpressResponse;

    status: HttpStatus = HttpStatus.OK;
    body: string;
    headers: { [key: string]: string } = {};

    constructor(init: ResponseInit = {}) {
        Object.assign(this, init);
    }

    setStatus(status: HttpStatus) {
        this.status = status;
    }

    setHeader(key: string, value: string) {
        this.headers[key] = value;
    }

    overrideBody(body: string) {
        this.body = body;
    }

    resolveExpressResponse(response: ExpressResponse, controller: SynapseController) {
        this.controller = controller;
        this.controllerContext = controller[controllerContext];
        this.expressResponse = response;

        response.status(this.status);

        console.log("Resolving request");

        this.resolveCors();
        this.resolveHeaders();
        this.resolveBody();
    }

    private resolveCors() {
        let allowCors = this.controllerContext.getAllowCors() ?? this.controllerContext.getApp().cors ?? true;

        console.log(allowCors);

        if (allowCors) {
            this.expressResponse.set("Access-Control-Allow-Origin", "*");
            this.expressResponse.set("Access-Control-Allow-Credentials", "true");
            this.expressResponse.set("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
            this.expressResponse.set("Access-Control-Allow-Headers", "Content-Type");
        }
    }

    private resolveHeaders() {
        for (let [key, header] of Object.entries(this.headers)) {
            this.expressResponse.set(key, header);
        }
    }

    private resolveBody() {
        if (this.body) {
            this.expressResponse.send(this.body);
        } else {
            this.expressResponse.end();
        }
    }

    static respondDirectly(req: ExpressResponse, controller: SynapseController, init: ResponseInit = {}) {
        let response = new SynapseResponse(init);
        response.resolveExpressResponse(req, controller);
    }
}
