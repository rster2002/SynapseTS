import { execute, respondWith } from "../classes/ExpressSynapseRequest";
import SynapseResponse from "../classes/SynapseResponse";
import SynapseRoute from "../classes/SynapseRoute";
import LiteralValidationDefinition, {
    NumberLiteralValidationDefinition,
    StringLiteralValidationDefinition
} from "./LiteralValidationDefinition";

export default interface SynapseRequest {
    [execute](): Promise<any>;
    [respondWith](response: SynapseResponse): void;

    getRoute(): SynapseRoute;
    getPath(): string | null;

    getMetaObject(): Map<string, unknown>;
    getMetaData(key: string): unknown;

    getRawBody(): unknown;
    requireBody<T extends object>(shape: T): T;

    getParam(name: string): string | null;

    getHeader(name: string): string | null;
    requireHeader(name: string): string;
    requireHeader(name: string, validationDefinition: NumberLiteralValidationDefinition): number;
    requireHeader(name: string, validationDefinition: StringLiteralValidationDefinition): string;
    requireHeader(name: string, validationDefinition?: LiteralValidationDefinition): string | number;

    getQuery(key: string): string | null;
    requireQuery(key: string): string;
    requireQuery(key: string, validationDefinition: NumberLiteralValidationDefinition): number;
    requireQuery(key: string, validationDefinition: StringLiteralValidationDefinition): string;
    requireQuery(key: string, validationDefinition?: LiteralValidationDefinition): string | number;
}
