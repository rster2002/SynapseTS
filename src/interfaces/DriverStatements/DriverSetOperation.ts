import DriverOperation from "./DriverOperation";
import DriverValueRef from "./DriverValueRef";

export default interface DriverSetOperation extends DriverOperation {
    value: DriverValueRef
}
