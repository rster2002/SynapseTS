import { controllerContextSymbol } from "../../symbols";
import ControllerContext from "../../classes/internal/ControllerContext";

export default function SetMetaData(key: string, value?: unknown) {
    return function (target: any, fieldName: string) {
        target[controllerContextSymbol] = target[controllerContextSymbol] ?? new ControllerContext();
        target[controllerContextSymbol].metaDataForKey = target[controllerContextSymbol].metaDataForKey.get(fieldName)
            ?? new Map<string, unknown>();

        target[controllerContextSymbol].metaDataForKey.set(key, value);
    }
}
