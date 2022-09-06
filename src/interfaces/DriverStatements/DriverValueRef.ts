import DriverRefType from "../../enums/DriverRefType";
import DriverFieldRef from "./DriverValueRef/DriverFieldRef";
import StringValueRef from "./DriverValueRef/StringValueRef";
import NumberValueRef from "./DriverValueRef/NumberValueRef";

type DriverValueRef = DriverFieldRef
    | StringValueRef
    | NumberValueRef;

export default DriverValueRef;

export interface BaseDriverValueRef {
    type: DriverRefType;
}
