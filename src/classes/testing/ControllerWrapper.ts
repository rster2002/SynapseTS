import SynapseComponent from "../SynapseComponent";
import SynapseController from "../SynapseController";
import HttpMethod from "../../enums/HttpMethod";
import ControllerContext from "../internal/ControllerContext";
import { controllerContextSymbol } from "../../symbols";

interface FetchOptions {
    method?: HttpMethod;
}

export default class ControllerWrapper extends SynapseComponent {
    private readonly controller: SynapseController;
    private readonly controllerContext: ControllerContext;

    constructor(controller: SynapseController) {
        super();

        this.controller = controller;
        this.controllerContext = controller[controllerContextSymbol];
    }

    fetch(path: string, options: FetchOptions = {}) {
        if (options.method === undefined) {
            options.method = HttpMethod.GET;
        }

        let route = this.controllerContext.getRoutes()
            .find(route => route.matchPath(path) && route.getMethod() === options.method);

        console.log(route);
    }

    // private createRequest(url, options: FetchOptions = {}): SynapseRequest {
    // }
}
