import { create } from "zustand";
import { setState } from "./tools/functions";
import { createPxaClass } from "./tools/createPxaClass";

const createPxaContext = (initialValue, settings) => {
    const dataRef = {
        current: initialValue,
    };

    /**
     * Settings
     * !!! if smth is change, update usePxaState file as well. !!!
     */
    const { immutableKeyName: IMMUTABLE_NAME = "value", ...ADD_FN } = settings;

    /**
     * Return
     */
    return create((set) => {
        const externalGet = () => dataRef?.current;
        const externalSet = (incoming) => {
            const newData = setState(incoming, dataRef, IMMUTABLE_NAME);
            set(
                typeof newData === "object"
                    ? newData
                    : createPxaClass({ data: newData, IMMUTABLE_NAME, ADD_FN, externalSet, externalGet }),
            );
        };
        return createPxaClass({ data: initialValue, IMMUTABLE_NAME, ADD_FN, externalSet, externalGet });
    });
};
export default createPxaContext;
