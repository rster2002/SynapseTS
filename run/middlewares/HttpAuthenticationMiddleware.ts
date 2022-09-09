import { HttpStatus, SynapseMiddleware, SynapseRequest, SynapseResponse } from "../../src";
import RouteResult from "../../src/types/RouteResult";

export default class HttpAuthenticationMiddleware extends SynapseMiddleware {
    matchRoute(request: SynapseRequest): boolean {
        return request.getRoute().getMetaObject().has("httpAuthenticate");
    }

    processRequest(request: SynapseRequest): void | RouteResult {
        return new SynapseResponse({
            status: HttpStatus.UNAUTHORIZED,
            headers: {
                "WWW-Authenticate": `Basic realm="Please login"`,
            },
            body: "Please login",
        });
    }
}
