export default class QueryNotSatisfied extends Error {
    constructor(key: string) {
        super(`Expected query parameter as not provided: '${key}'`);
    }
}
