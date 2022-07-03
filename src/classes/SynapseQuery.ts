import SynapseModel from "./SynapseModel";
import WhereQuery from "./internal/WhereQuery";

export const filters = Symbol();

interface FilterEntry {
    key: string
    operator: "="
    value: unknown
}

export default class SynapseQuery<T> {
    private targetModel: SynapseModel<T>;
    private [filters]: FilterEntry[] = [];

    constructor(targetModel: SynapseModel<T>) {
        this.targetModel = targetModel;
    }

    private addFilter(filterEntry: FilterEntry) {

    }

    where(key: string) {
        return new WhereQuery(this, key);
    }

    async get(): Promise<T> {
        this.targetModel.resolveQuery(new SynapseQuery<unknown>(this));
    }
}
