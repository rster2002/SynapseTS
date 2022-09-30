import type SynapseRequest from "./SynapseRequest";
import type SynapseResponse from "./SynapseResponse";
import RouteResult from "../types/RouteResult";
import SynapseComponent from "./SynapseComponent";

export default abstract class SynapseMiddleware extends SynapseComponent {
    /**
     * Checks whether this middleware should activate for the given request.
     * @param request The request to check for a match.
     */
    matchRoute?(request: SynapseRequest): boolean;

    /**
     * Process the incoming request and either return a response or do nothing and let the request continue to the
     * controller.
     * @param request Request to process.
     * @returns Return `undefined` or `null` to let the request continue to the controller. Return a valid result to
     * respond to the request before the request reaches the controller.
     */
    processRequest?(request: SynapseRequest): void | RouteResult;

    /**
     * Process the response that is returned from the controller.
     * @param response Response that is returned from the controller.
     * @returns Return `undefined` or `null` to send the current request to the user. Return with a valid result to
     * replace the current response with the new response.
     */
    processResponse?(response: SynapseResponse): void | RouteResult;
}
