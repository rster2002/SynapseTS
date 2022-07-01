import SynapseResponse from "./SynapseResponse";
import HttpStatus from "../enums/HttpStatus";
import type ResponseInit from "../interfaces/ResponseInit";
import { controllerContext } from "../symbols";
import type ControllerContext from "./internal/ControllerContext";
import type SynapseMiddleware from "./SynapseMiddleware";

export default abstract class SynapseController {
    [controllerContext]: ControllerContext;

    getMiddleware<T extends SynapseMiddleware>(middleware: new () => T): T {
        let matchedMiddleware = this[controllerContext].getApp().getMiddlewares().find(i => i instanceof middleware);
        return <T> matchedMiddleware ?? null;
    }

    protected createResponse(init: ResponseInit = {}) {
        return new SynapseResponse(init);
    }

    protected notFound(init: ResponseInit = {}) {
        return new SynapseResponse({
            status: HttpStatus.NOT_FOUND,
            ...init,
        });
    }
}
