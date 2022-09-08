export default class ParameterBuilder {
    parameter(parameter: string) {
        return this;
    }

    then(executor: () => void) {
        return this;
    }
}
