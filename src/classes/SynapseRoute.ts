import type HttpMethod from "../enums/HttpMethod";
import ExpressSynapseRequest from "./ExpressSynapseRequest";
import RouteExecutor from "../types/RouteExecutor";
import SynapseController from "./SynapseController";
import SynapseComponent from "./SynapseComponent";
import pathToRegex from "../utils/pathToRegex";

export const setController = Symbol();

export default class SynapseRoute extends SynapseComponent {
    private controller: SynapseController;

    private readonly path: string;
    private readonly method: HttpMethod;
    private readonly executor: RouteExecutor;

    private readonly metaData = new Map<string, unknown>();

    constructor(path: string, method: HttpMethod, controller: SynapseController, executor: RouteExecutor) {
        super();

        this.path = path;
        this.method = method;
        this.controller = controller;
        this.executor = executor;
    }

    async execute(request: ExpressSynapseRequest) {
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

    matchPath(path: string) {
        return this.getPathRegex().match(path);
    }

    getPathRegex() {
        return pathToRegex(this.path);
    }

    [setController](controller: SynapseController) {
        this.controller = controller;
    }
}
