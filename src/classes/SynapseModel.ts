import ModelContext from "./internal/ModelContext";
import SynapseComponent from "./SynapseComponent";

export const modelContext = Symbol();

type Constructor<T> = { new(...rest): T };
export default abstract class SynapseModel extends SynapseComponent {
    private created = false;

    async create() {
        if (this.created) {
            throw new Error("Cannot create this entity again");
        }

        await this.getDriver().create({
            model: this.getModelName(),
            data: this.getFieldValues(),
        });

        this.created = true;
    }

    private getFieldValues() {
        let values = {};

        for (let field of this.getFields()) {
            values[field] = this[field];
        }

        return values;
    }

    private getFields() {
        return Object.entries(this)
            .filter(([key, value]) => typeof value !== "function")
            .map(([key]) => key);
    }

    private getModelName() {
        return this.constructor.name;
    }

    private getContext(): ModelContext {
        return Object.getPrototypeOf(this).constructor[modelContext];
    }

    private getDriver() {
        return this.getContext().driver;
    }

    static async getById<T>(this: Constructor<T>, id: string | number): Promise<T> {
        //@ts-ignore
        let primaryField = this.getContext().primaryField;

        if (primaryField === null) {
            throw new Error("Cannot get by id because there is no primary field specified");
        }

        //@ts-ignore
        let results = await this.getDriver().read({
            model: this.name,
            filter: [
                { left: { field: primaryField }, operation: "==", right: { value: id, }, },
            ],
        });

        if (results.length === 0) {
            return null;
        }

        let entity = results[0];

        return <T> {};
    }

    private static fromEntity(entity: object) {
        let instance = Object.create(this.prototype);
    }

    private static getContext(): ModelContext {
        return this[modelContext];
    }

    private static getDriver() {
        return this.getContext().driver;
    }
}
