import ModelContext from "./internal/ModelContext";
import SynapseComponent from "./SynapseComponent";

export const modelContext = Symbol();

export default abstract class SynapseModel extends SynapseComponent {
    [modelContext]: ModelContext = null;

    async create() {

    }
}
