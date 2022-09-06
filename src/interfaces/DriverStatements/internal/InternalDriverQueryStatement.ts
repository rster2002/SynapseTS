import DriverStatement from "../DriverStatement";
import DriverFilter from "../DriverFilter";

export default interface InternalDriverQueryStatement extends DriverStatement {
    filter: DriverFilter[];
}
