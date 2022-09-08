import SynapseCommand from "../../src/classes/SynapseCommand";

export default class TestCommand extends SynapseCommand {
    register() {
        this.setKeyword("test");
    }
}
