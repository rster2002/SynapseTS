import { HttpStatus, SynapseMiddleware, SynapseRequest, SynapseResponse } from "../../../src";
import RouteResult from "../../../src/types/RouteResult";
import { Role } from "../decorators/HttpAuthenticate";

export default class HttpAuthenticationMiddleware extends SynapseMiddleware {
    matchRoute(request: SynapseRequest): boolean {
        return request.getRoute().getMetaObject().has("httpAuthenticate");
    }

    processRequest(request: SynapseRequest): void | RouteResult {
        let authentication = request.getHeader("Authorization");

        if (authentication === null) {
            return new SynapseResponse({
                status: HttpStatus.UNAUTHORIZED,
                headers: {
                    "WWW-Authenticate": `Basic realm="Please login"`,
                },
                body: "Please login",
            });
        }

        let [username, password] = atob(authentication).split(":");
        let requiredRoles = <Role[]> request.getRoute().getMetaObject().get("roles");

        if (requiredRoles.includes(Role.ADMIN)) {
            if (username !== "admin" || password !== "admin") {
                return SynapseResponse.httpStatus(HttpStatus.FORBIDDEN);
            }
        }
    }
}
