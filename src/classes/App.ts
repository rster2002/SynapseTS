import type Controller from "./Controller";
import { Express } from "express";
import * as express from "express";
import { controllerContext } from "../symbols";
import type BaseMiddlewares from "../types/BaseMiddlewares";

interface AppInit {
    dev?: boolean,
    cors?: boolean
    controllers?: Controller[]
    middlewares?: BaseMiddlewares
}

export default class App {
    private readonly expressInstance: Express;
    private readonly controllers: Controller[];
    private readonly middlewares: BaseMiddlewares;
    cors: boolean;
    dev: boolean;

    constructor(init: AppInit) {
        this.cors = init.cors;
        this.controllers = init.controllers ?? [];
        this.middlewares = init.middlewares ?? {};
        this.dev = init.dev ?? false;

        this.expressInstance = express();

        this.expressInstance.use(express.json());
    }

    start() {
        for (let controller of this.controllers) {
            controller[controllerContext].attachToApp(this, this.expressInstance);
        }

        this.expressInstance.listen(5000);
        console.log("Started on port 5000");
    }

    getMiddlewares() {
        return Object.values(this.middlewares);
    }
}
