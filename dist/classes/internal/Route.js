"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const symbols_1 = require("../../symbols");
const QueryNotSatisfied_1 = require("../error/QueryNotSatisfied");
const Response_1 = require("../Response");
const HttpStatus_1 = require("../../enums/HttpStatus");
const BodyNotSatisfied_1 = require("../error/BodyNotSatisfied");
const Request_1 = require("../Request");
const HeaderNotSatisfied_1 = require("../error/HeaderNotSatisfied");
class Route {
    constructor(route, method, key) {
        this.middlewareResponded = false;
        this.metadata = new Map();
        this.route = route;
        this.method = method;
        this.key = key;
    }
    setController(controller) {
        this.controller = controller;
    }
    getControllerContext() {
        return this.controller?.[symbols_1.controllerContext];
    }
    getRoute() {
        return this.route;
    }
    getMethod() {
        return this.method;
    }
    getKey() {
        return this.key;
    }
    attach(express) {
        console.log("Attaching here", this.getMethod(), this.getRoute());
        express[this.getMethod()](this.getRoute(), (req, res) => {
            console.log(`[${this.getMethod()}] Incoming request`);
            this.middlewareResponded = false;
            this.matchedMiddlewares = [];
            this.currentRequest = req;
            this.currentResponse = res;
            this.request = new Request_1.default(this.currentRequest);
            this.resolveMiddlewares();
            if (this.middlewareResponded) {
                return;
            }
            this.resolveRequest();
        });
    }
    resolveMiddlewares() {
        try {
            this.matchedMiddlewares = this.getControllerContext()
                .getApp()
                .getMiddlewares()
                .filter(middleware => middleware.matchRoute(this));
            for (let middleware of this.matchedMiddlewares) {
                middleware.processRequest(this.request);
                let result = middleware.getPossibleResponse();
                if (result) {
                    this.middlewareResponded = true;
                    return this.handleResult(result);
                }
            }
        }
        catch (e) {
            this.middlewareResponded = true;
            this.handleError(e);
        }
    }
    resolveRequest() {
        try {
            let handler = this.controller[this.getKey()];
            if (!handler) {
                throw new Error();
            }
            let result = handler.call(this.controller, this.request);
            this.handleResult(result);
        }
        catch (e) {
            this.handleError(e);
        }
    }
    handleResponseMiddlewares(response) {
        if (!this.middlewareResponded) {
            for (let matchedMiddleware of this.matchedMiddlewares) {
                matchedMiddleware.processResponse(response);
            }
        }
    }
    respond(init) {
        let response = new Response_1.default(init);
        this.handleResponseMiddlewares(response);
        return response.resolveExpressResponse(this.currentResponse, this.controller);
    }
    handleError(error) {
        if (error instanceof QueryNotSatisfied_1.default) {
            return this.respond({
                status: HttpStatus_1.default.BAD_REQUEST,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    error: error.message,
                }),
            });
        }
        if (error instanceof BodyNotSatisfied_1.default) {
            return this.respond({
                status: HttpStatus_1.default.BAD_REQUEST,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    error: error.message,
                }),
            });
        }
        if (error instanceof HeaderNotSatisfied_1.default) {
            return this.respond({
                status: HttpStatus_1.default.BAD_REQUEST,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    error: error.message,
                }),
            });
        }
        if (this.getControllerContext().getApp().dev) {
            this.respond({
                status: HttpStatus_1.default.INTERNAL_SERVER_ERROR,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    error: error.message,
                    stack: error.stack,
                }),
            });
        }
        return this.respond({
            status: HttpStatus_1.default.INTERNAL_SERVER_ERROR,
        });
    }
    async handleResult(result) {
        if (result instanceof Promise) {
            result = await result;
        }
        if (result instanceof Response_1.default) {
            this.handleResponseMiddlewares(result);
            result.resolveExpressResponse(this.currentResponse, this.controller);
        }
        if (typeof result === "string") {
            return this.respond({
                status: HttpStatus_1.default.OK,
                body: result,
            });
        }
        if (typeof result === "object") {
            return this.respond({
                status: HttpStatus_1.default.OK,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(result),
            });
        }
        return this.respond({
            status: HttpStatus_1.default.NOT_IMPLEMENTED,
        });
    }
}
exports.default = Route;
