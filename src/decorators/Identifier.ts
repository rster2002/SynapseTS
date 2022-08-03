import ModelContext from "../classes/internal/ModelContext";
import { modelContext } from "../classes/SynapseModel";

export default function Identifier(target: any, fieldName: string) {
    let prototype = Object.getPrototypeOf(target.constructor);
    let context: ModelContext = prototype[modelContext] = prototype[modelContext] ?? new ModelContext();

    if (!(context instanceof ModelContext)) {
        throw new Error("Cannot add this decorator to something that's not a model");
    }

    context.setPrimaryField(fieldName);
}
