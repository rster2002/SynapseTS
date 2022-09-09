import { controllerContextSymbol } from "../symbols";
import ControllerContext, { pushToQueue, RouteExecutor, routeQueue } from "../classes/internal/ControllerContext";

export default function createCustomDecorator<T extends any[]>(executor: RouteExecutor<T>) {
    return function(...rest: T) {
        return function(target: any, fieldName: string) {
            let context: ControllerContext = target[controllerContextSymbol] = target[controllerContextSymbol] ?? new ControllerContext(target);
            context[pushToQueue](fieldName, executor, rest);
        }
    }
}
