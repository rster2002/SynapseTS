import LiteralValidationDefinition, {
    NumberLiteralValidationDefinition,
    StringLiteralValidationDefinition
} from "../interfaces/LiteralValidationDefinition";
import LiteralValidator from "./internal/LiteralValidator";

export default abstract class SynapseComponent {
    protected getEnvKey(key): string | null
    protected getEnvKey(key, validationDefinition: NumberLiteralValidationDefinition): number
    protected getEnvKey(key, validationDefinition: StringLiteralValidationDefinition): string
    protected getEnvKey(key, defaultValue: number, validationDefinition: NumberLiteralValidationDefinition): number
    protected getEnvKey(key, defaultValue: string, validationDefinition: StringLiteralValidationDefinition): string
    protected getEnvKey<T>(key: string, defaultValue: T): string | T
    protected getEnvKey<T>(
        key: string,
        defaultValue: T | LiteralValidationDefinition = null,
        validationDefinition?: LiteralValidationDefinition
    ): number | string | null | T {
        let value = <string> process.env[key.toUpperCase()] ?? null;

        if (!defaultValue) {
            return value;
        }

        let validator = new LiteralValidator();
        if ("type" in defaultValue) {
            return validator.validate(value, defaultValue);
        }

        if (!validationDefinition) {
            return value ?? defaultValue;
        }

        let isValid = validator.validate(value, validationDefinition);
        return isValid ? value : defaultValue;
    }
}
