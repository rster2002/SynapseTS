import type SynapseApp from "../SynapseApp";
import type { Express } from "express";
import type SynapseController from "../SynapseController";
import type Route from "./Route";

export default class ControllerContext {
    private readonly controller: SynapseController;
    protected app: SynapseApp;

    private routes = new Set<Route>();
    private allowCors: boolean | null = null;

    metaDataForKey = new Map<string, Map<string, unknown>>();

    constructor(controller: SynapseController) {
        this.controller = controller;
    }

    getRouteForField(field: string) {
        return Array.from(this.routes).find(route => route.getKey() === field) ?? null;
    }

    registerRoute(route: Route) {
        route.setController(this.controller);
        this.routes.add(route);
    }

    attachToApp(app: SynapseApp, express: Express) {
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
