import ValidationError from "./ValidationError";

export default class QueryNotSatisfied extends ValidationError {
    constructor(key: string) {
        super(`Expected query parameter as not provided: '${key}'`);
    }
}
