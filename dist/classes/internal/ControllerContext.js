"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ControllerContext {
    constructor(controller) {
        this.routes = new Set();
        this.allowCors = null;
        this.metaDataForKey = new Map();
        this.controller = controller;
    }
    getRouteForField(field) {
        return Array.from(this.routes).find(route => route.getKey() === field) ?? null;
    }
    registerRoute(route) {
        route.setController(this.controller);
        this.routes.add(route);
    }
    attachToApp(app, express) {
        this.app = app;
        for (let route of Array.from(this.routes)) {
            route.metadata = this.metaDataForKey.get(route.getKey()) ?? new Map();
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
exports.default = ControllerContext;
