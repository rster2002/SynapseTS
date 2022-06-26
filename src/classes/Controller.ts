import Response from "./Response";
import HttpStatus from "../enums/HttpStatus";
import type ResponseInit from "../interfaces/ResponseInit";
import { controllerContext } from "../symbols";
import type ControllerContext from "./internal/ControllerContext";
import type Middleware from "./Middleware";

export default abstract class Controller {
    [controllerContext]: ControllerContext;

    getMiddleware<T extends Middleware>(middleware: new () => T): T {
        let matchedMiddleware = this[controllerContext].getApp().getMiddlewares().find(i => i instanceof middleware);
        return <T> matchedMiddleware ?? null;
    }

    protected createResponse(init: ResponseInit = {}) {
        return new Response(init);
    }

    protected notFound(init: ResponseInit = {}) {
        return new Response({
            status: HttpStatus.NOT_FOUND,
            ...init,
        });
    }
}
