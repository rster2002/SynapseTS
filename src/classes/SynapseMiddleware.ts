import type SynapseRequest from "./SynapseRequest";
import type SynapseResponse from "./SynapseResponse";
import RouteResult from "../types/RouteResult";
import ResponseUtilsSynapseComponent from "./internal/ResponseUtilsSynapseComponent";

export default abstract class SynapseMiddleware extends ResponseUtilsSynapseComponent {
    matchRoute?(request: SynapseRequest): boolean;
    processRequest?(request: SynapseRequest): void | RouteResult;
    processResponse?(response: SynapseResponse): void;
}
