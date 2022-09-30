interface BaseLiteralValidationDefinition {
    type: "string" | "number"
}

type LiteralValidationDefinition = "string"
    | "number"
    | NumberLiteralValidationDefinition
    | StringLiteralValidationDefinition;
export default LiteralValidationDefinition;

export interface NumberLiteralValidationDefinition extends BaseLiteralValidationDefinition {
    type: "number"
    min?: number
    max?: number
}

export interface StringLiteralValidationDefinition extends BaseLiteralValidationDefinition {
    type: "string"
    fixedLength?: number
    minLength?: number
    maxLength?: number
}
