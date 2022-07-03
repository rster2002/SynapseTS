import SynapseQuery, { filters } from "../SynapseQuery";

export default class WhereQuery {
    private readonly parent: SynapseQuery;
    private readonly key: string;

    constructor(parent: SynapseQuery, key: string) {
        this.parent = parent;
    }

    is(value: unknown) {
        this.parent[filters].push({
            key: this.key,
            operator: "=",
            value,
        });

        return this.parent;
    }
}
