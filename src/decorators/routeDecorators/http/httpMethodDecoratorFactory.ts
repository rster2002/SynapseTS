import { controllerContextSymbol } from "../../../symbols";
import ControllerContext, { routeQueue } from "../../../classes/internal/ControllerContext";
import SynapseRoute from "../../../classes/SynapseRoute";
import HttpMethod from "../../../enums/HttpMethod";

export default function httpMethodDecoratorFactory(path, httpMethod: HttpMethod) {
    return function (target: any, fieldName: string) {
        let context: ControllerContext = target[controllerContextSymbol] = target[controllerContextSymbol] ?? new ControllerContext();

        let route = new SynapseRoute(path, httpMethod, context, fieldName)
        let executors = context[routeQueue][fieldName] ?? [];

        for (let executorEntry of executors) {
            executorEntry.executor(route, ...executorEntry.params);
        }

        context.registerRoute(route);
    }
}
