import SynapseComponent from "../SynapseComponent";
import SynapseRequest from "../../interfaces/SynapseRequest";
import LiteralValidationDefinition, {
    NumberLiteralValidationDefinition,
    StringLiteralValidationDefinition
} from "../../interfaces/LiteralValidationDefinition";
import SynapseResponse from "../SynapseResponse";
import { execute, respondWith } from "../ExpressSynapseRequest";
import SynapseRoute from "../SynapseRoute";

export default class TestingSynapseRequest extends SynapseComponent implements SynapseRequest {
    [execute](): Promise<any> {
        throw new Error("Method not implemented.");
    }

    [respondWith](response: SynapseResponse): void {
        throw new Error("Method not implemented.");
    }

    getHeader(name: string): string | null {
        throw new Error("Method not implemented.");
    }

    getMetaData(key: string): unknown {
        throw new Error("Method not implemented.");
    }

    getMetaObject(): Map<string, unknown> {
        throw new Error("Method not implemented.");
    }

    getParam(name: string): string | null {
        throw new Error("Method not implemented.");
    }

    getPath(): string | null {
        throw new Error("Method not implemented.");
    }

    getQuery(key: string): string | null {
        throw new Error("Method not implemented.");
    }

    getRawBody(): unknown {
        throw new Error("Method not implemented.");
    }

    getRoute(): SynapseRoute {
        throw new Error("Method not implemented.");
    }

    requireBody<T extends object>(shape: T): T {
        throw new Error("Method not implemented.");
    }

    requireHeader(name: string): string;
    requireHeader(name: string, validationDefinition: NumberLiteralValidationDefinition): number;
    requireHeader(name: string, validationDefinition: StringLiteralValidationDefinition): string;
    requireHeader(name: string, validationDefinition?: LiteralValidationDefinition): string | number;
    requireHeader(name: string, validationDefinition?: NumberLiteralValidationDefinition | StringLiteralValidationDefinition | LiteralValidationDefinition): string | number {
        throw new Error("Method not implemented.");
    }

    requireQuery(key: string): string;
    requireQuery(key: string, validationDefinition: NumberLiteralValidationDefinition): number;
    requireQuery(key: string, validationDefinition: StringLiteralValidationDefinition): string;
    requireQuery(key: string, validationDefinition?: LiteralValidationDefinition): string | number;
    requireQuery(key: string, validationDefinition?: NumberLiteralValidationDefinition | StringLiteralValidationDefinition | LiteralValidationDefinition): string | number {
        throw new Error("Method not implemented.");
    }

}
