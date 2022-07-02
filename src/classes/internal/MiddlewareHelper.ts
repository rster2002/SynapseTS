import AppComponent from "./AppComponent";
import SynapseRequest from "../SynapseRequest";
import SynapseResponse from "../SynapseResponse";
import SynapseMiddleware from "../SynapseMiddleware";
import ResultTransformer from "./ResultTransformer";
import { appSymbol } from "../../symbols";

export default class MiddlewareHelper extends AppComponent {
    private readonly resultTransformer = new ResultTransformer(this[appSymbol]);

    async handleRequest(request: SynapseRequest): Promise<SynapseResponse> {
        let middlewares = this.getApp().getMiddlewares();

        for (let middleware of middlewares) {
            if (!middleware.matchRoute(request)) {
                continue;
            }

            let response = await this.processMiddleware(request, middleware);

            if (response) {
                return response;
            }
        }
    }

    private async processMiddleware(request: SynapseRequest, middleware: SynapseMiddleware): Promise<SynapseResponse | null> {
        try {
            let result = middleware.processRequest?.(request);

            if (result !== undefined) {
                return this.resultTransformer.transformResult(result);
            }

            return null;
        } catch (e) {
            return this.resultTransformer.transformError(request, e);
        }
    }
}
