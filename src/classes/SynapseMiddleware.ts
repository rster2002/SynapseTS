import type SynapseRequest from "./SynapseRequest";
import type SynapseResponse from "./SynapseResponse";
import RouteResult from "../types/RouteResult";

export default abstract class SynapseMiddleware {
    matchRoute?(request: SynapseRequest): boolean;
    processRequest?(request: SynapseRequest): undefined | null | RouteResult;
    processResponse?(response: SynapseResponse): void;
}
