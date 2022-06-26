"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const symbols_1 = require("../symbols");
const ControllerContext_1 = require("../classes/internal/ControllerContext");
const Route_1 = require("../classes/internal/Route");
function httpMethodDecoratorFactory(path, httpMethod) {
    return function (target, fieldName) {
        target[symbols_1.controllerContext] = target[symbols_1.controllerContext] ?? new ControllerContext_1.default(target);
        target[symbols_1.controllerContext].registerRoute(new Route_1.default(path, httpMethod, fieldName));
    };
}
exports.default = httpMethodDecoratorFactory;
