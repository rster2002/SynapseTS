import { appSymbol, controllerContextSymbol } from "../symbols";
import type ControllerContext from "./internal/ControllerContext";
import SynapseApp from "./SynapseApp";
import SynapseComponent from "./SynapseComponent";
import ConstructorFor from "../types/ConstructorFor";

export default abstract class SynapseController extends SynapseComponent {
    [appSymbol]: SynapseApp;
    [controllerContextSymbol]: ControllerContext;

    constructor() {
        super();

        this[controllerContextSymbol].setController(this);
    }

    protected getMiddleware<T>(middleware: ConstructorFor<T>): T {
        return undefined;
    }
}
