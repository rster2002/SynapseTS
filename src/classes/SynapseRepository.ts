import SynapseComponent from "./SynapseComponent";
import SynapseDriver from "./SynapseDriver";
import InternalDriverCreateStatement from "../interfaces/DriverStatements/internal/InternalDriverCreateStatement";
import DriverQueryStatement from "../interfaces/DriverStatements/DriverQueryStatement";
import InternalDriverUpdateStatement from "../interfaces/DriverStatements/internal/InternalDriverUpdateStatement";

export default abstract class SynapseRepository extends SynapseComponent {
    private readonly driver: SynapseDriver;

    protected constructor(driver: SynapseDriver) {
        super();

        this.driver = driver;
    }

    protected async create(statement: InternalDriverCreateStatement) {
        return await this.driver.create(statement);
    }

    protected async read(statement: DriverQueryStatement) {
        return await this.driver.read(statement);
    }

    protected async update(statement: InternalDriverUpdateStatement) {
        return await this.driver.update(statement);
    }

    protected async remove(statement: DriverQueryStatement) {
        return await this.driver.remove(statement);
    }
}
