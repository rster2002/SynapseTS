import SynapseRequest from "../classes/SynapseRequest";
import RouteResult from "./RouteResult";

type RouteExecutor = (request: SynapseRequest) => RouteResult | Promise<RouteResult>;
export default RouteExecutor;
