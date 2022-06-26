import type Controller from "./Controller";
import type BaseMiddlewares from "../types/BaseMiddlewares";
interface AppInit {
    dev?: boolean;
    cors?: boolean;
    controllers?: Controller[];
    middlewares?: BaseMiddlewares;
}
export default class App {
    private readonly expressInstance;
    private readonly controllers;
    private readonly middlewares;
    cors: boolean;
    dev: boolean;
    constructor(init: AppInit);
    start(): void;
    getMiddlewares(): import("./Middleware").default[];
}
export {};
