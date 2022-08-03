import SynapseDriver from "../src/classes/SynapseDriver";
import DriverCreateStatement from "../src/interfaces/DriverStatements/DriverCreateStatement";
import DriverQueryStatement from "../src/interfaces/DriverStatements/DriverQueryStatement";
import DriverUpdateStatement from "../src/interfaces/DriverStatements/DriverUpdateStatement";
import Identifier from "../src/decorators/Identifier";
import DriverValueRef from "../src/interfaces/DriverStatements/DriverValueRef";

class TestDriver extends SynapseDriver {
    private entities = [];

    async create(statement: DriverCreateStatement): Promise<void> {
        this.entities.push(statement.data);
        return;
        // return Promise.resolve(undefined);
    }

    async read(statement: DriverQueryStatement): Promise<object[]> {
        let entities = this.entities;

        for (let filter of statement.filter) {
            entities = entities.filter(entity => {
                let left = this.resolveFilterSide(entity, filter.left);
                let right = this.resolveFilterSide(entity, filter.right);

                if (filter.operation === "==") {
                    return left === right;
                }
            });
        }

        return entities;
    }

    private resolveFilterSide(entity: object, side: DriverValueRef) {
        if (side.field) {
            return entity[side.field];
        }

        return side.value;
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
    @Identifier
    private id: string = "a";
    private name: string;
    private age: number;

    constructor(name: string, age: number) {
        super();

        this.name = name;
        this.age = age;
    }
}

async function main() {
    let alice = new User("Alice", 44);

    await alice.create();
    let user = await User.getById("a");
}

main();
