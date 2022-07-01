import type SynapseRequest from "./SynapseRequest";
import type Route from "./internal/Route";
import type SynapseResponse from "./SynapseResponse";

export default abstract class SynapseMiddleware {
    private response: unknown;

    abstract matchRoute(route: Route): boolean;
    abstract processRequest(request: SynapseRequest): void;
    abstract processResponse(response: SynapseResponse): void;

    protected respondWith(response: unknown) {
        this.response = response;
    }

    getPossibleResponse() {
        return this.response;
    }
}
