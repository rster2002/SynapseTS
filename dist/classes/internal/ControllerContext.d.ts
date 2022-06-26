import type App from "../App";
import type { Express } from "express";
import type Controller from "../Controller";
import type Route from "./Route";
export default class ControllerContext {
    private readonly controller;
    protected app: App;
    private routes;
    private allowCors;
    metaDataForKey: Map<string, Map<string, unknown>>;
    constructor(controller: Controller);
    getRouteForField(field: string): Route;
    registerRoute(route: Route): void;
    attachToApp(app: App, express: Express): void;
    getAllowCors(): boolean;
    getApp(): App;
}
