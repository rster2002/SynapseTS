import DriverStatement from "./DriverStatement";
import DriverFilter from "./DriverFilter";
import DriverUpdateOperation from "./DriverUpdateOperation";

export default interface DriverUpdateStatement extends DriverStatement {
    filter: DriverFilter[];
    operations: DriverUpdateOperation[];
}
