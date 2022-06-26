import type HttpMethod from "../../enums/HttpMethod";
import type Controller from "../Controller";
import type { Express, Request as ExpressRequest, Response as ExpressResponse } from "express";
import { controllerContext } from "../../symbols";
import type ControllerContext from "./ControllerContext";
import QueryNotSatisfied from "../error/QueryNotSatisfied";
import Response from "../Response";
import HttpStatus from "../../enums/HttpStatus";
import type ResponseInit from "../../interfaces/ResponseInit";
import BodyNotSatisfied from "../error/BodyNotSatisfied";
import Request from "../Request";
import type Middleware from "../Middleware";
import HeaderNotSatisfied from "../error/HeaderNotSatisfied";

export default class Route {
    private controller: Controller;
    private readonly route: string;
    private readonly method: HttpMethod;
    private readonly key: string;

    private matchedMiddlewares: Middleware[];
    private middlewareResponded = false;

    private request: Request;
    private currentRequest: ExpressRequest;
    private currentResponse: ExpressResponse;

    metadata = new Map<string, unknown>();

    constructor(route: string, method: HttpMethod, key: string) {
        this.route = route;
        this.method = method;
        this.key = key;
    }

    setController(controller: Controller) {
        this.controller = controller;
    }

    getControllerContext(): ControllerContext {
        return this.controller?.[controllerContext];
    }

    getRoute() {
        return this.route;
    }

    getMethod() {
        return this.method;
    }

    getKey() {
        return this.key;
    }

    attach(express: Express) {
        console.log("Attaching here", this.getMethod(), this.getRoute());
        express[this.getMethod()](this.getRoute(), (req, res) => {
            console.log(`[${this.getMethod()}] Incoming request`);

            this.middlewareResponded = false;
            this.matchedMiddlewares = [];
            this.currentRequest = req;
            this.currentResponse = res;

            this.request = new Request(this.currentRequest);

            this.resolveMiddlewares();

            if (this.middlewareResponded) {
                return;
            }

            this.resolveRequest();
        });
    }

    private resolveMiddlewares() {
        try {
            this.matchedMiddlewares = this.getControllerContext()
                .getApp()
                .getMiddlewares()
                .filter(middleware => middleware.matchRoute(this));

            for (let middleware of this.matchedMiddlewares) {
                middleware.processRequest(this.request);

                let result = middleware.getPossibleResponse();
                if (result) {
                    this.middlewareResponded = true;
                    return this.handleResult(result);
                }
            }
        } catch (e) {
            this.middlewareResponded = true;
            this.handleError(e);
        }
    }

    private resolveRequest() {
        try {
            let handler = this.controller[this.getKey()];

            if (!handler) {
                throw new Error();
            }

            let result = handler.call(this.controller, this.request);
            this.handleResult(result);
        } catch (e) {
            this.handleError(e);
        }
    }

    private handleResponseMiddlewares(response: Response) {
        if (!this.middlewareResponded) {
            for (let matchedMiddleware of this.matchedMiddlewares) {
                matchedMiddleware.processResponse(response);
            }
        }
    }

    private respond(init: ResponseInit) {
        let response = new Response(init);
        this.handleResponseMiddlewares(response);

        return response.resolveExpressResponse(this.currentResponse, this.controller);
    }

    private handleError(error: Error) {
        if (error instanceof QueryNotSatisfied) {
            return this.respond({
                status: HttpStatus.BAD_REQUEST,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    error: error.message,
                }),
            });
        }

        if (error instanceof BodyNotSatisfied) {
            return this.respond({
                status: HttpStatus.BAD_REQUEST,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    error: error.message,
                }),
            });
        }

        if (error instanceof HeaderNotSatisfied) {
            return this.respond({
                status: HttpStatus.BAD_REQUEST,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    error: error.message,
                }),
            });
        }

        if (this.getControllerContext().getApp().dev) {
            this.respond({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    error: error.message,
                    stack: error.stack,
                }),
            })
        }

        return this.respond({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
        });
    }

    private async handleResult(result: unknown) {
        if (result instanceof Promise) {
            result = await result;
        }

        if (result instanceof Response) {
            this.handleResponseMiddlewares(result);
            result.resolveExpressResponse(this.currentResponse, this.controller);
        }

        if (typeof result === "string") {
            return this.respond({
                status: HttpStatus.OK,
                body: result,
            });
        }

        if (typeof result === "object") {
            return this.respond({
                status: HttpStatus.OK,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(result),
            });
        }

        return this.respond({
            status: HttpStatus.NOT_IMPLEMENTED,
        });
    }
}
