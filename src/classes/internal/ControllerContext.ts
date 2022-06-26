import type App from "../App";
import type { Express } from "express";
import type Controller from "../Controller";
import type Route from "./Route";

export default class ControllerContext {
    private readonly controller: Controller;
    protected app: App;

    private routes = new Set<Route>();
    private allowCors: boolean | null = null;

    metaDataForKey = new Map<string, Map<string, unknown>>();

    constructor(controller: Controller) {
        this.controller = controller;
    }

    getRouteForField(field: string) {
        return Array.from(this.routes).find(route => route.getKey() === field) ?? null;
    }

    registerRoute(route: Route) {
        route.setController(this.controller);
        this.routes.add(route);
    }

    attachToApp(app: App, express: Express) {
        this.app = app;

        for (let route of Array.from(this.routes)) {
            route.metadata = this.metaDataForKey.get(route.getKey()) ?? new Map<string, unknown>();
            route.attach(express);
        }
    }

    getAllowCors() {
        return this.allowCors;
    }

    getApp() {
        return this.app;
    }
}
