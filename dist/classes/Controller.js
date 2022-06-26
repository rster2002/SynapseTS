"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Response_1 = require("./Response");
const HttpStatus_1 = require("../enums/HttpStatus");
const symbols_1 = require("../symbols");
class Controller {
    getMiddleware(middleware) {
        let matchedMiddleware = this[symbols_1.controllerContext].getApp().getMiddlewares().find(i => i instanceof middleware);
        return matchedMiddleware ?? null;
    }
    createResponse(init = {}) {
        return new Response_1.default(init);
    }
    notFound(init = {}) {
        return new Response_1.default({
            status: HttpStatus_1.default.NOT_FOUND,
            ...init,
        });
    }
}
exports.default = Controller;
