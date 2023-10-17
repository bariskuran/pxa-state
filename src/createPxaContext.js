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
    const { immutableKeyName: immutableKeyName1 = "value", ...addFn1 } = settings || {};
    let currImmutableKeyName = immutableKeyName1;
    let currAddFn = addFn1;

    /**
     * Return
     */
    return create((set) => {
        const externalGet = () => dataRef?.current;
        const externalSet = (incomingData, settings) => {
            const { immutableKeyName: immutableKeyName2, ...addFn2 } = settings;

            const newData = setState(incomingData, dataRef, currImmutableKeyName);

            currImmutableKeyName = immutableKeyName2 || immutableKeyName1;
            currAddFn = addFn2 || addFn1;

            set(
                typeof newData === "object"
                    ? newData
                    : createPxaClass({
                          data: newData,
                          IMMUTABLE_NAME: currImmutableKeyName,
                          ADD_FN: currAddFn,
                          externalSet,
                          externalGet,
                      }),
            );
        };
        return createPxaClass({
            data: initialValue,
            IMMUTABLE_NAME: currImmutableKeyName,
            ADD_FN: currAddFn,
            externalSet,
            externalGet,
        });
    });
};
export default createPxaContext;
