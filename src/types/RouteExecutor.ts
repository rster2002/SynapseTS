import ExpressSynapseRequest from "../classes/ExpressSynapseRequest";
import RouteResult from "./RouteResult";

type RouteExecutor = (request: ExpressSynapseRequest) => RouteResult | Promise<RouteResult>;
export default RouteExecutor;
