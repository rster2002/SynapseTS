import type HttpMethod from "../enums/HttpMethod";
import SynapseRequest from "./SynapseRequest";
import RouteExecutor from "../types/RouteExecutor";
import SynapseController from "./SynapseController";

export default class SynapseRoute {
    private readonly controller: SynapseController;

    private readonly path: string;
    private readonly method: HttpMethod;
    private readonly executor: RouteExecutor;

    private readonly metaData = new Map<string, unknown>();

    constructor(path: string, method: HttpMethod, controller: SynapseController, executor: RouteExecutor) {
        this.path = path;
        this.method = method;
        this.controller = controller;
        this.executor = executor;
    }

    async execute(request: SynapseRequest) {
        return this.executor.call(this.controller, request);
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
