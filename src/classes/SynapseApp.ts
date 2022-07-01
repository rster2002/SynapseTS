import type SynapseController from "./SynapseController";
import { Express } from "express";
import express from "express";
import { controllerContext } from "../symbols";
import SynapseMiddleware from "./SynapseMiddleware";

interface AppInit {
    dev?: boolean,
    cors?: boolean
    controllers?: SynapseController[]
    middlewares?: SynapseMiddleware[]
}

export default class SynapseApp {
    private readonly expressInstance: Express;
    private readonly controllers: SynapseController[];
    private readonly middlewares: SynapseMiddleware[];
    cors: boolean;
    dev: boolean;

    constructor(init: AppInit) {
        this.cors = init.cors;
        this.controllers = init.controllers ?? [];
        this.middlewares = init.middlewares ?? [];
        this.dev = init.dev ?? false;

        this.expressInstance = express();

        this.expressInstance.use(express.json());
    }

    start(port: number) {
        for (let controller of this.controllers) {
            controller[controllerContext].attachToApp(this, this.expressInstance);
        }

        this.expressInstance.listen(port);
        console.log(`Started on port ${port}`);
    }

    getMiddlewares() {
        return Object.values(this.middlewares);
    }
}
