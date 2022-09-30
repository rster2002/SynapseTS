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
    private controller: SynapseController;
    private readonly routes: SynapseRoute[] = [];
    [routeQueue]: { [key: string]: ExecutorEntry[] } = {};

    registerRoute(route: SynapseRoute) {
        this.routes.push(route);
    }

    getRoutes() {
        return this.routes;
    }

    setController(controller: SynapseController) {
        this.controller = controller;
    }

    getController() {
        return this.controller;
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
