import { appSymbol, controllerContextSymbol } from "../symbols";
import type ControllerContext from "./internal/ControllerContext";
import SynapseApp from "./SynapseApp";
import SynapseComponent from "./SynapseComponent";

export default abstract class SynapseController extends SynapseComponent {
    [appSymbol]: SynapseApp;
    [controllerContextSymbol]: ControllerContext;
}
