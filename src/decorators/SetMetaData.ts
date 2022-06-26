import { controllerContext } from "../symbols";
import ControllerContext from "../classes/internal/ControllerContext";

export default function SetMetaData(key: string, value?: unknown) {
    return function (target: any, fieldName: string) {
        target[controllerContext] = target[controllerContext] ?? new ControllerContext(target);
        target[controllerContext].metaDataForKey = target[controllerContext].metaDataForKey.get(fieldName)
            ?? new Map<string, unknown>();

        target[controllerContext].metaDataForKey.set(key, value);
    }
}
