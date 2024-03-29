import type SynapseController from "./SynapseController";
import { Express } from "express";
import express from "express";
import { appSymbol, controllerContextSymbol } from "../symbols";
import SynapseMiddleware from "./SynapseMiddleware";
import SynapseRequest, { respondWith } from "./SynapseRequest";
import RequestHelper from "./internal/RequestHelper";
import MiddlewareHelper from "./internal/MiddlewareHelper";
import path from "path";
import cors from "cors";
import asyncGlob from "../utils/asyncGlob";
import SynapseComponent from "./SynapseComponent";

export const devMode = Symbol();

interface AppInit {
    /**
     * Enables additional logging and returns the contents of internal server errors during requests.
     * @default false
     */
    dev?: boolean;

    /**
     * Globally enables or disables CORS.
     * @default true
     */
    cors?: boolean;

    /**
     * Array of SynapseController instances which are used for handling incoming requests.
     */
    controllers?: SynapseController[];

    /**
     * Array of SynapseMiddleware instances which are used to hook into requests and responses.
     */
    middlewares?: SynapseMiddleware[];

    /**
     * Enables automatic component detection. Allows the app to check the default paths for components for files and
     * automatically instantiates them and adds them to the application.
     * @default false
     */
    auto?: boolean;

    /**
     * Required when `auto` is set to true. Sets the root directory of the application from which the app will search
     * for components to automatically load.
     */
    appDir?: string;
}

/**
 * Main object of the application. This is where different components are registered to and where global options are
 * set.
 */
export default class SynapseApp extends SynapseComponent {
    private readonly expressInstance: Express;
    private readonly controllers: SynapseController[];
    private readonly middlewares: SynapseMiddleware[];

    private readonly middlewareHelper = new MiddlewareHelper(this);
    private readonly routeHelper = new RequestHelper(this);

    private readonly automaticComponentResolution: boolean = false;
    private readonly appDirectory: string;

    [devMode] = false;

    constructor(init: AppInit) {
        super();

        this.expressInstance = express();

        this.expressInstance.use(express.json({type: '*/*'}));
        this.expressInstance.use(cors());

        this.controllers = init.controllers ?? [];
        this.middlewares = init.middlewares ?? [];

        this[devMode] = init.dev ?? false;

        if (init.auto) {
            this.automaticComponentResolution = true;

            if (init.appDir === undefined) {
                throw new Error("Cannot use automatic component resolution without specifying an app directory");
            }

            this.appDirectory = init.appDir;
        }
    }

    /**
     * Starts automatically importing components and starts listening to incoming requests.
     * @param {number} [port=5000] - Port number where the application will listen for incoming requests.
     */
    async start(port: number = 5000) {
        if (this.automaticComponentResolution) {
            await this.resolveAutomaticControllers();
            await this.resolveAutomaticMiddlewares();
        }

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

                    let responseReplacement = await this.middlewareHelper.handleResponse(request, response);
                    if (responseReplacement) {
                        request[respondWith](responseReplacement);
                        return;
                    }

                    request[respondWith](response);
                });
            }
        }

        this.expressInstance.listen(port);

        console.log(`Started!`);
        console.log(`Controllers:\t\t${this.controllers.length}`);
        console.log(`Middlewares:\t\t${this.middlewares.length}`);
        console.log(`Port:\t\t\t${port}`);
    }

    /**
     * Returns an array with all the registered controllers.
     */
    getControllers() {
        return this.controllers;
    }

    /**
     * Returns an array with all the registered middlewares.
     */
    getMiddlewares() {
        return this.middlewares;
    }

    private async resolveAutomaticControllers(): Promise<void> {
        let modules = await this.resolveFilesInDirectory("controllers");

        for (let module of modules) {
            let instance = new module.default();
            this.controllers.push(instance);
        }
    }

    private async resolveAutomaticMiddlewares(): Promise<void> {
        let modules = await this.resolveFilesInDirectory("middlewares");

        for (let module of modules) {
            let instance = new module.default();
            this.middlewares.push(instance);
        }
    }

    private async resolveFilesInDirectory(directory: string): Promise<any[]> {
        let globPattern = path.resolve(this.appDirectory, `./${directory}/**/*.ts`);
        let filePaths = await asyncGlob(globPattern);

        let modules = [];

        for (let filePath of filePaths) {
            filePath = filePath.replace(/.ts$/, "");
            modules.push(await import(filePath));
        }

        return modules;
    }
}
