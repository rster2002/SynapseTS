import LiteralValidationDefinition, {
    NumberLiteralValidationDefinition,
    StringLiteralValidationDefinition
} from "../../interfaces/LiteralValidationDefinition";
import LiteralValidationError from "../error/LiteralValidationError";

export default class LiteralValidator {
    validate(value: unknown, validator: LiteralValidationDefinition): string | number {
        if (validator.type === "number") {
            return this.validateNumber(value, validator);
        }

        if (validator.type === "string") {
            return this.validateString(value, validator);
        }

        throw new LiteralValidator();
    }

    private validateNumber(value: unknown, validator: NumberLiteralValidationDefinition): number {
        if (isNaN(Number(value))) {
            throw new LiteralValidationError(`Expected a number, but got '${value}'`);
        }

        let numberValue = Number(value);

        if (validator.min && numberValue < validator.min) {
            throw new LiteralValidationError(`Expected number ${value} to be higher or equal to ${validator.min}`);
        }

        if (validator.max && numberValue > validator.max) {
            throw new LiteralValidationError(`Expected number ${value} to be lower or equal to ${validator.max}`);
        }

        return numberValue;
    }

    private validateString(value: unknown, validator: StringLiteralValidationDefinition): string {
        return String(value);
    }
}
