import SynapseDriver from "../src/classes/SynapseDriver";
import InternalDriverCreateStatement from "../src/interfaces/DriverStatements/internal/InternalDriverCreateStatement";
import DriverQueryStatement from "../src/interfaces/DriverStatements/DriverQueryStatement";
import InternalDriverUpdateStatement from "../src/interfaces/DriverStatements/internal/InternalDriverUpdateStatement";
import Identifier from "../src/decorators/Identifier";
import DriverValueRef from "../src/interfaces/DriverStatements/DriverValueRef";
import SynapseRepository from "../src/classes/SynapseRepository";

class TestDriver extends SynapseDriver {
    private entities = [];

    async create(statement: InternalDriverCreateStatement): Promise<void> {
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

    update(statement: InternalDriverUpdateStatement): Promise<void> {
        return Promise.resolve(undefined);
    }
}

let driver = new TestDriver();

interface User {
    name: string;
    age: number;
}
