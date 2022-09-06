import { BaseDriverValueRef } from "../DriverValueRef";
import DriverRefType from "../../../enums/DriverRefType";

export default interface DriverFieldRef extends BaseDriverValueRef {
    type: DriverRefType.FIELD;
    field: string;
    model?: string;
}
