import DriverValueRef from "./DriverValueRef";

type Operation = "==" | "!=" | "<" | "<=" | ">" | ">=";
type LiteralString = `"${string}"` | `'${string}'`;
type CompareValue = LiteralString | string | number;
export type LiteralFilter = `${LiteralString} ${Operation} ${CompareValue}`

export default interface DriverFilter {
    left: DriverValueRef;
    operation: Operation;
    right: DriverValueRef;
}
