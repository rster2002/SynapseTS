import SynapseComponent from "./SynapseComponent";
import SynapseDriver from "./SynapseDriver";
import DriverCreateStatement from "../interfaces/DriverStatements/DriverCreateStatement";
import DriverQueryStatement from "../interfaces/DriverStatements/DriverQueryStatement";
import DriverUpdateStatement from "../interfaces/DriverStatements/DriverUpdateStatement";

export default abstract class SynapseRepository extends SynapseComponent {
    private readonly driver: SynapseDriver;

    protected constructor(driver: SynapseDriver) {
        super();

        this.driver = driver;
    }

    protected async create(statement: DriverCreateStatement) {
        return await this.driver.create(statement);
    }

    protected async read(statement: DriverQueryStatement) {
        return await this.driver.read(statement);
    }

    protected async update(statement: DriverUpdateStatement) {
        return await this.driver.update(statement);
    }

    protected async remove(statement: DriverQueryStatement) {
        return await this.driver.remove(statement);
    }
}
