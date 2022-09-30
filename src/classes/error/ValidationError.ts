import SynapseError from "./SynapseError";

export default class ValidationError extends SynapseError {
    constructor(...rest) {
        super(...rest);

        Object.setPrototypeOf(this, ValidationError.prototype);
    }
}
