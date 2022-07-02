import { controllerContextSymbol } from "../symbols";
import ControllerContext from "../classes/internal/ControllerContext";
import SynapseRoute from "../classes/SynapseRoute";
import HttpMethod from "../enums/HttpMethod";

export default function httpMethodDecoratorFactory(path, httpMethod: HttpMethod) {
    return function (target: any, fieldName: string) {
        target[controllerContextSymbol] = target[controllerContextSymbol] ?? new ControllerContext(target);
        target[controllerContextSymbol].registerRoute(new SynapseRoute(path, httpMethod, target, target[fieldName]));
    }
}
