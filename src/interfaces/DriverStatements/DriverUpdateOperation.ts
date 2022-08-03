import DriverOperation from "./DriverOperation";
import DriverValueRef from "./DriverValueRef";

export default interface DriverUpdateOperation extends DriverOperation {
    operation: "set" | "add" | "subtract";
    value: DriverValueRef
}
