import DriverStatement from "./DriverStatement";
import DriverFilter from "./DriverFilter";

export default interface DriverQueryStatement extends DriverStatement {
    filter: DriverFilter[];
}
