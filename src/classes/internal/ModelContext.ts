import SynapseDriver from "../SynapseDriver";

export default class ModelContext {
    private readonly driver: SynapseDriver;

    constructor(driver: SynapseDriver) {
        this.driver = driver;
    }
}
