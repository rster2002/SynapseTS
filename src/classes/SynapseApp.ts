import type SynapseController from "./SynapseController";
import express, { Express } from "express";
import { appSymbol, controllerContextSymbol } from "../symbols";
import SynapseMiddleware from "./SynapseMiddleware";
import ExpressSynapseRequest, { respondWith } from "./ExpressSynapseRequest";
import RequestHelper from "./internal/RequestHelper";
import MiddlewareHelper from "./internal/MiddlewareHelper";
import cors from "cors";
import { setController } from "./SynapseRoute";
import SynapseComponent from "./SynapseComponent";
import * as dotenv from "dotenv";
import ControllerContext from "./internal/ControllerContext";

export const devMode = Symbol();

interface AppInit {
    dev?: boolean,
    cors?: boolean
    envPath?: string
    controllers?: SynapseController[]
    middlewares?: SynapseMiddleware[]
}

export default class SynapseApp extends SynapseComponent {
    private readonly expressInstance: Express;
    private readonly controllers: SynapseController[];
    private readonly middlewares: SynapseMiddleware[];

    private readonly middlewareHelper = new MiddlewareHelper(this);
    private readonly routeHelper = new RequestHelper(this);

    [devMode] = false;
    private readonly envPath?: string;

    constructor(init: AppInit) {
        super();

        this.expressInstance = express();

        this.expressInstance.use(express.json({type: '*/*'}));
        this.expressInstance.use(cors());

        this.controllers = init.controllers ?? [];
        this.middlewares = init.middlewares ?? [];

        this[devMode] = init.dev ?? false;
        this.envPath = init.envPath;
    }

    start(port: number) {
        dotenv.config({ path: this.envPath, });

        for (let controller of this.controllers) {
            controller[appSymbol] = this;
            controller[controllerContextSymbol] = controller[controllerContextSymbol] ?? new ControllerContext(controller);

            for (let route of controller[controllerContextSymbol].getRoutes()) {
                route[setController](controller);

                this.expressInstance[route.getMethod()](route.getPath(), async (req, res) => {
                    let request = new ExpressSynapseRequest(route, req, res);

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
