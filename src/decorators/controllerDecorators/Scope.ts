import Constructor from "../../types/Constructor";
import ControllerContext from "../../classes/internal/ControllerContext";
import { controllerContextSymbol } from "../../symbols";

export default function Serializable(path: string) {
    return function<T extends Constructor>(constructor: T) {
        // let context: ControllerContext = constructor[controllerContextSymbol] = constructor[controllerContextSymbol] ?? new ControllerContext(target);

    }
}
