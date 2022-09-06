import DriverStatement from "./DriverStatement";
import { LiteralFilter } from "./DriverFilter";

export default interface DriverQueryStatement extends DriverStatement {
    filter: LiteralFilter[];
}
