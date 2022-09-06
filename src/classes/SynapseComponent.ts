import LiteralValidationDefinition, {
    NumberLiteralValidationDefinition,
    StringLiteralValidationDefinition
} from "../interfaces/LiteralValidationDefinition";
import LiteralValidator from "./internal/LiteralValidator";

export default abstract class SynapseComponent {
    protected getEnvKey(key): string | null
    protected getEnvKey(key, defaultValue: number): number
    protected getEnvKey(key, defaultValue: string): string
    protected getEnvKey<T>(key, defaultValue: T): T
    protected getEnvKey<T>(key: string, defaultValue?: unknown): number | string | T {
        let value = <string> process.env[key.toUpperCase()] ?? null;

        if (defaultValue === undefined) {
            return value;
        }

        let validator = new LiteralValidator();
        if (typeof defaultValue === "number") {
            return validator.validate(value, { type: "number" });
        }

        return value;
    }
}
