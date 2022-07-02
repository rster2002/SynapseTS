import type SynapseController from "./SynapseController";
import { Express } from "express";
import express from "express";
import { appSymbol, controllerContextSymbol } from "../symbols";
import SynapseMiddleware from "./SynapseMiddleware";
import SynapseRequest, { respondWith } from "./SynapseRequest";
import RequestHelper from "./internal/RequestHelper";
import MiddlewareHelper from "./internal/MiddlewareHelper";

export const devMode = Symbol();

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

    private readonly middlewareHelper = new MiddlewareHelper(this);
    private readonly routeHelper = new RequestHelper(this);

    [devMode] = false;

    constructor(init: AppInit) {
        this.expressInstance = express();

        this.controllers = init.controllers ?? [];
        this.middlewares = init.middlewares ?? [];

        this[devMode] = init.dev ?? false;
    }

    start(port: number) {
        for (let controller of this.controllers) {
            controller[appSymbol] = this;

            for (let route of controller[controllerContextSymbol].getRoutes()) {
                this.expressInstance[route.getMethod()](route.getPath(), async (req, res) => {
                    let request = new SynapseRequest(route, req, res);

                    let middlewareResponse = await this.middlewareHelper.handleRequest(request);
                    if (middlewareResponse) {
                        request[respondWith](middlewareResponse);
                        return;
                    }

                    let response = await this.routeHelper.handleRequest(request);
                    request[respondWith](response);
                });
            }
        }

        this.expressInstance.listen(port);
        console.log(`Started on port ${port}`);
    }

    getMiddlewares() {
        return this.middlewares;
    }
}
