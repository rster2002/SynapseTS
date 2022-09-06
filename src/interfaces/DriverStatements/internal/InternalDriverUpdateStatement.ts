import DriverStatement from "../DriverStatement";
import DriverFilter from "../DriverFilter";
import InternalDriverUpdateOperation from "./InternalDriverUpdateOperation";

export default interface InternalDriverUpdateStatement extends DriverStatement {
    filter: DriverFilter[];
    operations: InternalDriverUpdateOperation[];
}
