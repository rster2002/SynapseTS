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
import { Worker } from "worker_threads";
import * as readline from "readline";
import ServerShell from "./internal/ServerShell";
import SynapseCommand from "./SynapseCommand";

export const devMode = Symbol();

interface AppInit {
    dev?: boolean;
    cors?: boolean;
    controllers?: SynapseController[];
    middlewares?: SynapseMiddleware[];
    commands?: SynapseCommand[];

    auto?: boolean;
    appDir?: string;
}

export default class SynapseApp extends SynapseComponent {
    private readonly expressInstance: Express;
    private readonly serverPrompt: ServerShell;
    private readonly controllers: SynapseController[];
    private readonly middlewares: SynapseMiddleware[];
    private readonly commands: SynapseCommand[];

    private readonly middlewareHelper = new MiddlewareHelper(this);
    private readonly routeHelper = new RequestHelper(this);

    private readonly automaticComponentResolution: boolean = false;
    private readonly appDirectory: string;

    [devMode] = false;

    constructor(init: AppInit) {
        super();

        this.expressInstance = express();
        this.serverPrompt = new ServerShell(this);

        this.expressInstance.use(express.json({type: '*/*'}));
        this.expressInstance.use(cors());

        this.controllers = init.controllers ?? [];
        this.middlewares = init.middlewares ?? [];
        this.commands = init.commands ?? [];

        this[devMode] = init.dev ?? false;

        if (init.auto) {
            this.automaticComponentResolution = true;

            if (init.appDir === undefined) {
                throw new Error("Cannot use automatic component resolution without specifying an app directory");
            }

            this.appDirectory = init.appDir;
        }
    }

    async start(port: number) {
        if (this.automaticComponentResolution) {
            await this.resolveAutomaticControllers();
            await this.resolveAutomaticMiddlewares();
            await this.resolveAutomaticCommands();
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
        console.log(`Commands:\t\t${this.commands.length}`);
        console.log(`Port:\t\t\t${port}`);

        this.serverPrompt.start();
    }

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

    private async resolveAutomaticCommands(): Promise<void> {
        let modules = await this.resolveFilesInDirectory("commands");

        for (let module of modules) {
            let instance = new module.default();
            this.commands.push(instance);
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
