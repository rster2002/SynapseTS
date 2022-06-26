"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpStatus_1 = require("../enums/HttpStatus");
const symbols_1 = require("../symbols");
class Response {
    constructor(init = {}) {
        this.status = HttpStatus_1.default.OK;
        this.headers = {};
        Object.assign(this, init);
    }
    setStatus(status) {
        this.status = status;
    }
    setHeader(key, value) {
        this.headers[key] = value;
    }
    overrideBody(body) {
        this.body = body;
    }
    resolveExpressResponse(response, controller) {
        this.controller = controller;
        this.controllerContext = controller[symbols_1.controllerContext];
        this.expressResponse = response;
        response.status(this.status);
        console.log("Resolving request");
        this.resolveCors();
        this.resolveHeaders();
        this.resolveBody();
    }
    resolveCors() {
        let allowCors = this.controllerContext.getAllowCors() ?? this.controllerContext.getApp().cors ?? true;
        console.log(allowCors);
        if (allowCors) {
            this.expressResponse.set("Access-Control-Allow-Origin", "*");
            this.expressResponse.set("Access-Control-Allow-Credentials", "true");
            this.expressResponse.set("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
            this.expressResponse.set("Access-Control-Allow-Headers", "Content-Type");
        }
    }
    resolveHeaders() {
        for (let [key, header] of Object.entries(this.headers)) {
            this.expressResponse.set(key, header);
        }
    }
    resolveBody() {
        if (this.body) {
            this.expressResponse.send(this.body);
        }
        else {
            this.expressResponse.end();
        }
    }
    static respondDirectly(req, controller, init = {}) {
        let response = new Response(init);
        response.resolveExpressResponse(req, controller);
    }
}
exports.default = Response;
