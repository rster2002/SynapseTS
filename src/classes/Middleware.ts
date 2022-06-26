import type Request from "./Request";
import type Route from "./internal/Route";
import type Response from "./Response";

export default abstract class Middleware {
    private response: unknown;

    abstract matchRoute(route: Route): boolean;
    abstract processRequest(request: Request): void;
    abstract processResponse(response: Response): void;

    protected respondWith(response: unknown) {
        this.response = response;
    }

    getPossibleResponse() {
        return this.response;
    }
}
