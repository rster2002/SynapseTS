import Response from "./Response";
import type ResponseInit from "../interfaces/ResponseInit";
import { controllerContext } from "../symbols";
import type ControllerContext from "./internal/ControllerContext";
import type Middleware from "./Middleware";
export default abstract class Controller {
    [controllerContext]: ControllerContext;
    getMiddleware<T extends Middleware>(middleware: new () => T): T;
    protected createResponse(init?: ResponseInit): Response;
    protected notFound(init?: ResponseInit): Response;
}
