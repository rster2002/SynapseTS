import DriverValueRef from "./DriverValueRef";

export default interface DriverFilter {
    left: DriverValueRef;
    operation: "==" | "!=" | "<" | "<=" | ">" | ">=";
    right: DriverValueRef;
}
