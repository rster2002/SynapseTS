import SynapseQuery from "./SynapseQuery";

export default abstract class SynapseModel<T> {
    constructor() {
    }

    static getByPrimaryKey(key: string) {
        // return new SynapseQuery(this);
    }

    static query() {
        return new SynapseQuery(this);
    }

    resolveQuery(query: SynapseQuery): T {
        return new this();
    }
}

class User extends SynapseModel<User> {
    resolveQuery(): Promise<this> {
        return Promise.resolve(undefined);
    }
}

User.query()
    .where("name").is("bjorn")
    .get();
