export default class SynapseError extends Error {
    constructor(...rest) {
        super(...rest);

        Object.setPrototypeOf(this, SynapseError.prototype);
    }
}
