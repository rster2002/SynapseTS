import type HttpMethod from "../../enums/HttpMethod";
import type Controller from "../Controller";
import type { Express } from "express";
import type ControllerContext from "./ControllerContext";
export default class Route {
    private controller;
    private readonly route;
    private readonly method;
    private readonly key;
    private matchedMiddlewares;
    private middlewareResponded;
    private request;
    private currentRequest;
    private currentResponse;
    metadata: Map<string, unknown>;
    constructor(route: string, method: HttpMethod, key: string);
    setController(controller: Controller): void;
    getControllerContext(): ControllerContext;
    getRoute(): string;
    getMethod(): HttpMethod;
    getKey(): string;
    attach(express: Express): void;
    private resolveMiddlewares;
    private resolveRequest;
    private handleResponseMiddlewares;
    private respond;
    private handleError;
    private handleResult;
}
