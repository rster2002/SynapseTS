export default class Validator {
    private readonly shape;
    expected: unknown;
    received: unknown;
    constructor(shape: object);
    validate(object: object): boolean;
    private validateValue;
}
