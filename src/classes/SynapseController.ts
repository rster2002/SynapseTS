import { appSymbol, controllerContextSymbol } from "../symbols";
import type ControllerContext from "./internal/ControllerContext";
import SynapseApp from "./SynapseApp";
import ResponseUtilsSynapseComponent from "./internal/ResponseUtilsSynapseComponent";

export default abstract class SynapseController extends ResponseUtilsSynapseComponent {
    [appSymbol]: SynapseApp;
    [controllerContextSymbol]: ControllerContext;
}
