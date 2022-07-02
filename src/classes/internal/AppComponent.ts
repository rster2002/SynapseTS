import SynapseApp from "../SynapseApp";
import { appSymbol } from "../../symbols";

export default abstract class AppComponent {
    [appSymbol]: SynapseApp;

    constructor(app: SynapseApp) {
        this[appSymbol] = app;
    }

    protected getApp() {
        return this[appSymbol];
    }
}
