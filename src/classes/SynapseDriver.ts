import SynapseComponent from "./SynapseComponent";
import DriverQueryStatement from "../interfaces/DriverStatements/DriverQueryStatement";
import InternalDriverCreateStatement from "../interfaces/DriverStatements/internal/InternalDriverCreateStatement";
import InternalDriverUpdateStatement from "../interfaces/DriverStatements/internal/InternalDriverUpdateStatement";
import SynapseModel, { modelContext } from "../classes/SynapseModel";
import ModelContext from "../classes/internal/ModelContext";
import SynapseMigration from "./SynapseMigration";
import InternalDriverQueryStatement from "../interfaces/DriverStatements/internal/InternalDriverQueryStatement";
import DriverFilter, { LiteralFilter } from "../interfaces/DriverStatements/DriverFilter";

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

    async executeCreate(statement: InternalDriverCreateStatement) {
        await this.create(statement);
    }

    async executeRead(statement: DriverQueryStatement) {
        await this.read(statement);
    }

    async executeUpdate(statement: InternalDriverUpdateStatement) {
        await this.update(statement);
    }

    async executeRemove(statement: DriverQueryStatement) {
        await this.remove(statement);
    }

    private transformLiteralFilter(literalStatement: LiteralFilter): DriverFilter {
        // let parts = literalStatement.split(" ");
    }

    protected abstract create(statement: InternalDriverCreateStatement): Promise<void>;
    protected abstract read(statement: InternalDriverQueryStatement): Promise<object[]>;
    protected abstract update(statement: InternalDriverUpdateStatement): Promise<void>;
    protected abstract remove(statement: DriverQueryStatement): Promise<void>;

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
