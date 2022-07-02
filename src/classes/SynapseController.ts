import { appSymbol, controllerContextSymbol } from "../symbols";
import type ControllerContext from "./internal/ControllerContext";
import HttpStatus from "../enums/HttpStatus";
import SynapseResponse from "./SynapseResponse";
import SynapseApp from "./SynapseApp";

export default abstract class SynapseController {
    [appSymbol]: SynapseApp;
    [controllerContextSymbol]: ControllerContext;

    protected createResponseWithStatus(status: HttpStatus) {
        return new SynapseResponse({
            status,
            body: null,
        });
    }
}
