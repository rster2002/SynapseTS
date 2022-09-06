import DriverOperation from "../DriverOperation";
import DriverValueRef from "../DriverValueRef";

export default interface InternalDriverUpdateOperation extends DriverOperation {
    operation: "set" | "add" | "subtract";
    value: DriverValueRef
}
