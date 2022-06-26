"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpMethod_1 = require("../enums/HttpMethod");
const httpMethodDecoratorFactory_1 = require("./httpMethodDecoratorFactory");
function Get(path) {
    return (0, httpMethodDecoratorFactory_1.default)(path, HttpMethod_1.default.GET);
}
exports.default = Get;
