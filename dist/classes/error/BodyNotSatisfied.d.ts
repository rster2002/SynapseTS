export default class BodyNotSatisfied extends Error {
    private expected;
    private received;
    constructor(expected: unknown, received: unknown);
}
