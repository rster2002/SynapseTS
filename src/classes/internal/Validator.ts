export default class Validator {
    private readonly shape: object;
    expected: unknown;
    received: unknown;

    constructor(shape: object) {
        this.shape = shape;
    }

    validate(object: object): boolean {
        return this.validateValue(this.shape, object);
    }

    private validateValue(expected: unknown, value: unknown): boolean {
        if (value === undefined) {
            this.expected = expected;
            this.received = value;
            return false;
        }

        if (Array.isArray(expected)) {
            if (!Array.isArray(value)) {
                this.expected = expected;
                this.received = value;
                return false;
            }

            // For each element in the value array check if it matches one of the requirements in the target array.
            // So given the expected [0, { value: "" }] it would check for each element in the value array if it matches
            // either of the items in the expected array.
            return value.every(valueElement => {
                let anyPass = false;

                for (let expectedElement of expected) {
                    if (this.validateValue(expectedElement, valueElement)) {
                        anyPass = true;
                    }
                }

                if (!anyPass) {
                    this.expected = expected;
                    this.received = value;
                }

                return anyPass;
            });
        }

        if (typeof expected === "object" && expected !== undefined) {
            return Object.entries(expected).every(([key, expectedValue]) => {
                return this.validateValue(expectedValue, value[key]);
            });
        }

        let passValue = typeof expected === typeof value;

        if (!passValue) {
            this.expected = expected;
            this.received = value;
        }

        return passValue;
    }
}
