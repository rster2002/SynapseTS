import { BaseDriverValueRef } from "../DriverValueRef";
import DriverRefType from "../../../enums/DriverRefType";

export default interface NumberValueRef extends BaseDriverValueRef {
    type: DriverRefType.NUMBER;
    value: number;
}
