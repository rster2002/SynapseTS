export default class BodyNotSatisfied extends Error {
    private expected: unknown;
    private received: unknown;

    constructor(expected: unknown, received: unknown) {
        super(`Body did not satisfy the requirements: expected '${expected}' but received '${received}'`);

        this.expected = expected;
        this.received = received;
    }
}
