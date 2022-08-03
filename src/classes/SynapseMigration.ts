import SynapseComponent from "./SynapseComponent";

export default abstract class SynapseMigration<T = null> extends SynapseComponent {
    private readonly helper: T;

    constructor(helper: T) {
        super();

        this.helper = helper;
    }

    protected getHelper() {
        return this.helper;
    }

    abstract up(helper: T): Promise<void>;
    abstract down(helper: T): Promise<void>;
}
