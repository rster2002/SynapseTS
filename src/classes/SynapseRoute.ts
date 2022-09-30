import type HttpMethod from "../enums/HttpMethod";
import SynapseRequest from "./SynapseRequest";
import RouteExecutor from "../types/RouteExecutor";
import SynapseController from "./SynapseController";
import SynapseComponent from "./SynapseComponent";
import ControllerContext from "./internal/ControllerContext";

export const setController = Symbol();

export default class SynapseRoute extends SynapseComponent {
    private controllerContext: ControllerContext;

    private readonly path: string;
    private readonly method: HttpMethod;
    private readonly executorName: string;

    private readonly metaData = new Map<string, unknown>();

    constructor(path: string, method: HttpMethod, controllerContext: ControllerContext, executorName: string) {
        super();

        this.path = path;
        this.method = method;
        this.controllerContext = controllerContext;
        this.executorName = executorName;
    }

    async execute(request: SynapseRequest) {
        return this.controllerContext.getController()[this.executorName](request);
    }

    getMethod() {
        return this.method;
    }

    getPath() {
        return this.path;
    }

    getMetaObject() {
        return this.metaData;
    }

    getMetaData(key: string) {
        return this.metaData.get(key) ?? null;
    }
}
