import type SynapseController from "../SynapseController";
import type SynapseRoute from "../SynapseRoute";

export default class ControllerContext {
    private readonly controller: SynapseController;
    private readonly routes: SynapseRoute[] = [];

    constructor(controller: SynapseController) {
        this.controller = controller;
    }

    registerRoute(route: SynapseRoute) {
        this.routes.push(route);
    }

    getRoutes() {
        return this.routes;
    }
}
