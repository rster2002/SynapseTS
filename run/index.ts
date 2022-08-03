import SynapseDriver from "../src/classes/SynapseDriver";
import DriverCreateStatement from "../src/interfaces/DriverStatements/DriverCreateStatement";
import DriverQueryStatement from "../src/interfaces/DriverStatements/DriverQueryStatement";
import DriverUpdateStatement from "../src/interfaces/DriverStatements/DriverUpdateStatement";

class TestDriver extends SynapseDriver {
    create(statement: DriverCreateStatement): Promise<void> {
        return Promise.resolve(undefined);
    }

    read(statement: DriverQueryStatement): Promise<object[]> {
        return Promise.resolve([]);
    }

    remove(statement: DriverQueryStatement): Promise<void> {
        return Promise.resolve(undefined);
    }

    update(statement: DriverUpdateStatement): Promise<void> {
        return Promise.resolve(undefined);
    }
}

let driver = new TestDriver();

class User extends driver.Model {

}
