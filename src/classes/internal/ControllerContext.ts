import type SynapseController from "../SynapseController";
import type SynapseRoute from "../SynapseRoute";

export const routeQueue = Symbol();
export const pushToQueue = Symbol();

export type RouteExecutor<T extends any[]> = (route: SynapseRoute, ...rest: T) => void;

interface ExecutorEntry {
    executor: RouteExecutor<unknown[]>
    params: unknown[]
}

export default class ControllerContext {
    private readonly controller: SynapseController;
    private readonly routes: SynapseRoute[] = [];
    [routeQueue]: { [key: string]: ExecutorEntry[] } = {};

    constructor(controller: SynapseController) {
        this.controller = controller;
    }

    registerRoute(route: SynapseRoute) {
        this.routes.push(route);
    }

    getRoutes() {
        return this.routes;
    }

    [pushToQueue](key: string, executor: RouteExecutor<unknown[]>, params: unknown[]) {
        if (this[routeQueue][key] === undefined) {
            this[routeQueue][key] = [];
        }

        this[routeQueue][key].push({
            executor,
            params,
        });
    }
}
