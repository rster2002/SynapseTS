import SynapseDriver from "../SynapseDriver";

export default class ModelContext {
    driver: SynapseDriver = null;
    primaryField: string = null;

    setDriver(driver: SynapseDriver) {
        if (this.driver !== null) {
            throw new Error("Cannot reassign driver");
        }

        this.driver = driver;
    }

    setPrimaryField(fieldName: string) {
        if (this.primaryField !== null) {
            throw new Error("Cannot have multiple primary fields");
        }

        this.primaryField = fieldName;
    }
}
