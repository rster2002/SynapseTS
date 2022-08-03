import SynapseComponent from "./SynapseComponent";
import DriverQueryStatement from "../interfaces/DriverStatements/DriverQueryStatement";
import DriverCreateStatement from "../interfaces/DriverStatements/DriverCreateStatement";
import DriverUpdateStatement from "../interfaces/DriverStatements/DriverUpdateStatement";
import SynapseModel, { modelContext } from "../classes/SynapseModel";
import ModelContext from "../classes/internal/ModelContext";
import SynapseMigration from "./SynapseMigration";

export interface DriverOptions {
    schemaless: boolean;
}

export default abstract class SynapseDriver<T = null> extends SynapseComponent {
    private readonly options: DriverOptions;

    constructor(options: DriverOptions = {
        schemaless: true,
    }) {
        super();

        this.options = options;
    }

    abstract create(statement: DriverCreateStatement): Promise<void>;
    abstract read(statement: DriverQueryStatement): Promise<object[]>;
    abstract update(statement: DriverUpdateStatement): Promise<void>;
    abstract remove(statement: DriverQueryStatement): Promise<void>;

    createMigrationHelper(): T {
        return null;
    }

    get Model(): typeof SynapseModel {
        let classConstructor = class extends SynapseModel {}

        let context: ModelContext = classConstructor[modelContext] = classConstructor[modelContext] ?? new ModelContext();
        //@ts-ignore
        context.setDriver(this);

        return classConstructor;
    }

    get Migration(): typeof SynapseMigration<T> {
        return class extends SynapseMigration {
            async up(helper: T) { throw new Error("Up not implemented") };
            async down(helper: T) { throw new Error("Down not implemented") };
        }
    }

    async runMigrationUp(migration: typeof SynapseMigration<T>) {
        let helper = this.createMigrationHelper();
        await this.createMigrationInstance(migration, helper).up(helper);
    }

    async runMigrationDown(migration: typeof SynapseMigration<T>) {
        let helper = this.createMigrationHelper();
        await this.createMigrationInstance(migration, helper).down(helper);
    }

    private createMigrationInstance(migration: typeof SynapseMigration<T>, helper: T) {
        //@ts-ignore
        return new migration(helper);
    }
}
