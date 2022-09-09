import type ExpressSynapseRequest from "./ExpressSynapseRequest";
import type SynapseResponse from "./SynapseResponse";
import RouteResult from "../types/RouteResult";
import ResponseUtilsSynapseComponent from "./internal/ResponseUtilsSynapseComponent";

export default abstract class SynapseMiddleware extends ResponseUtilsSynapseComponent {
    matchRoute?(request: ExpressSynapseRequest): boolean;
    processRequest?(request: ExpressSynapseRequest): void | RouteResult;
    processResponse?(response: SynapseResponse): void;
}
