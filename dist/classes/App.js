"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const symbols_1 = require("../symbols");
class App {
    constructor(init) {
        this.cors = init.cors;
        this.controllers = init.controllers ?? [];
        this.middlewares = init.middlewares ?? {};
        this.dev = init.dev ?? false;
        this.expressInstance = express();
        this.expressInstance.use(express.json());
    }
    start() {
        for (let controller of this.controllers) {
            controller[symbols_1.controllerContext].attachToApp(this, this.expressInstance);
        }
        this.expressInstance.listen(5000);
        console.log("Started on port 5000");
    }
    getMiddlewares() {
        return Object.values(this.middlewares);
    }
}
exports.default = App;
