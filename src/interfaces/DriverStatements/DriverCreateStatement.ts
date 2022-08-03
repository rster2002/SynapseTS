import DriverOperation from "./DriverOperation";

export default interface DriverCreateStatement extends DriverOperation {
    data: object;
}
