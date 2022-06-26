export default class HeaderNotSatisfied extends Error {
    constructor(key: string) {
        super(`Expected header as not provided: '${key}'`);
    }
}
