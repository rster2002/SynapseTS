import type SynapseRequest from "./SynapseRequest";
import type SynapseResponse from "./SynapseResponse";
import RouteResult from "../types/RouteResult";
import SynapseComponent from "./SynapseComponent";

export default abstract class SynapseMiddleware extends SynapseComponent {
    matchRoute?(request: SynapseRequest): boolean;
    processRequest?(request: SynapseRequest): void | RouteResult;
    processResponse?(response: SynapseResponse): void;
}
