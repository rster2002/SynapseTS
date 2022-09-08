import SynapseComponent from "./SynapseComponent";
import ParameterBuilder from "./internal/ParameterBuilder";

export default abstract class SynapseCommand extends SynapseComponent {
    private keyword: string;

    abstract register();

    protected setKeyword(keyword: string) {
        this.keyword = keyword;
    }

    protected parameter(parameter: string) {
        let builder = new ParameterBuilder();
        builder.parameter(parameter);

        return builder;
    }
}
