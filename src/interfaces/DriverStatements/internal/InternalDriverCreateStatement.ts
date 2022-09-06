import DriverOperation from "../DriverOperation";

export default interface InternalDriverCreateStatement extends DriverOperation {
    data: object;
}
