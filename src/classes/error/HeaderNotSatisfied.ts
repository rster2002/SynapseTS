import ValidationError from "./ValidationError";

export default class HeaderNotSatisfied extends ValidationError {
    constructor(key: string) {
        super(`Expected header as not provided: '${key}'`);
    }
}
