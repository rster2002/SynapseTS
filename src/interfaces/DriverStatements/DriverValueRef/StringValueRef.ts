import { BaseDriverValueRef } from "../DriverValueRef";
import DriverRefType from "../../../enums/DriverRefType";

export default interface StringValueRef extends BaseDriverValueRef {
    type: DriverRefType.STRING;
    value: string;
}
