import AppComponent from "./AppComponent";
import SynapseRequest from "../SynapseRequest";
import SynapseResponse from "../SynapseResponse";
import SynapseMiddleware from "../SynapseMiddleware";
import ResultTransformer from "./ResultTransformer";
import { appSymbol } from "../../symbols";
import SynapseRoute from "../SynapseRoute";
import { request, Response } from "express";

export default class MiddlewareHelper extends AppComponent {
    private readonly resultTransformer = new ResultTransformer(this[appSymbol]);

    async handleRequest(request: SynapseRequest): Promise<SynapseResponse> {
        let middlewares = this.getMiddlewaresForRoute(request);

        for (let middleware of middlewares) {
            let response = await this.wrapMethod(request, () => middleware.processRequest?.(request));

            if (response) {
                return response;
            }
        }

        return null;
    }

    async handleResponse(request: SynapseRequest, incomingResponse: SynapseResponse) {
        let middlewares = this.getMiddlewaresForRoute(request);

        for (let middleware of middlewares) {
            let response = await this.wrapMethod(request, () => middleware.processResponse?.(incomingResponse));

            if (response) {
                return response;
            }
        }

        return null;
    }

    private getMiddlewaresForRoute(request: SynapseRequest) {
        return this.getApp()
            .getMiddlewares()
            .filter(middleware => middleware.matchRoute(request));
    }

    private async wrapMethod(request: SynapseRequest, method: () => unknown): Promise<SynapseResponse> {
        try {
            let result = method();

            if (result !== undefined) {
                //@ts-ignore
                return this.resultTransformer.transformResult(result);
            }

            return null;
        } catch (e) {
            return this.resultTransformer.transformError(request, e);
        }
    }


    //
    // async handleRequest(request: SynapseRequest): Promise<SynapseResponse> {
    //     let middlewares = this.getApp().getMiddlewares();
    //
    //     for (let middleware of middlewares) {
    //         if (!middleware.matchRoute(request)) {
    //             continue;
    //         }
    //
    //         let response = await this.processMiddleware(request, middleware);
    //
    //         if (response) {
    //             return response;
    //         }
    //     }
    // }
    //
    // async handleResponse(request: SynapseRequest, response: SynapseResponse) {
    //     let middlewares = this.getApp().getMiddlewares();
    //
    //     for (let middleware of middlewares) {
    //         if (!middleware.matchRoute(request)) {
    //             continue;
    //         }
    //
    //         let response = await this.processMiddleware(request, middleware);
    //
    //         if (response) {
    //             return response;
    //         }
    //     }
    // }
    //
    // private async pro
    //
    // private async processMiddleware(request: SynapseRequest, middleware: SynapseMiddleware): Promise<SynapseResponse | null> {
    //     try {

    //     } catch (e) {
    //         return this.resultTransformer.transformError(request, e);
    //     }
    // }
}
