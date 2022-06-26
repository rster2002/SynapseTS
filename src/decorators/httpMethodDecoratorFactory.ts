import { controllerContext } from "../symbols";
import ControllerContext from "../classes/internal/ControllerContext";
import Route from "../classes/internal/Route";
import HttpMethod from "../enums/HttpMethod";

export default function httpMethodDecoratorFactory(path, httpMethod: HttpMethod) {
    return function (target: any, fieldName: string) {
        target[controllerContext] = target[controllerContext] ?? new ControllerContext(target);
        target[controllerContext].registerRoute(new Route(path, httpMethod, fieldName));
    }
}
