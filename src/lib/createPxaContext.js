import { create } from "zustand";
import { setState, findDifferences, getValueByPath, triggerChangeListener } from "./tools/functions";
import { createPxaClass } from "./tools/createPxaClass";

const createPxaContext = (initialValue, settings) => {
    const dataRef = {
        current: initialValue,
    };
    const prevRef = {
        current: undefined,
    };
    let currAddFn = {};
    let currImmutableKeyName;
    let currChangeListener;

    /**
     * Settings
     * !!! if smth is change, update usePxaState file as well. !!!
     */
    const {
        immutableKeyName: immutableKeyName1 = "value",
        changeListener: changeListener1,
        ...addFn1
    } = settings || {};
    currImmutableKeyName = immutableKeyName1;
    currAddFn = { ...currAddFn, ...addFn1 };
    currChangeListener = changeListener1;

    /**
     * Return
     */
    return create((set) => {
        const externalGet = () => dataRef?.current;
        const externalGetPrevious = () => prevRef?.current;
        const externalSet = (incomingData) => {
            const newData = setState({
                fn: incomingData,
                currRef: dataRef,
                prevRef: prevRef,
                immutableName: currImmutableKeyName,
            });
            if (currChangeListener && typeof currChangeListener === "function") {
                triggerChangeListener(dataRef, newData, currImmutableKeyName, currChangeListener);
            }

            prevRef.current = dataRef.current;
            dataRef.current = newData;
            set(
                typeof newData === "object"
                    ? newData
                    : createPxaClass({
                          data: newData,
                          IMMUTABLE_NAME: currImmutableKeyName,
                          ADD_FN: currAddFn,
                          externalSet,
                          externalGet,
                          externalGetPrevious,
                          externalReSet,
                      }),
            );
        };
        const externalReSet = (incomingData, settings) => {
            if (settings) {
                const {
                    immutableKeyName: immutableKeyName2,
                    changeListener: changeListener2,
                    ...addFn2
                } = settings || {};

                currImmutableKeyName = immutableKeyName2 || immutableKeyName1;
                currAddFn = { ...currAddFn, ...addFn2 };
                currChangeListener = changeListener2 || changeListener1;
            }

            const newData = setState({
                fn: incomingData,
                currRef: dataRef,
                prevRef: prevRef,
                immutableName: currImmutableKeyName,
            });
            if (currChangeListener && typeof currChangeListener === "function") {
                triggerChangeListener(dataRef, newData, currImmutableKeyName, currChangeListener);
            }

            prevRef.current = dataRef.current;
            dataRef.current = newData;
            set(
                createPxaClass({
                    data: newData,
                    IMMUTABLE_NAME: currImmutableKeyName,
                    ADD_FN: currAddFn,
                    externalSet,
                    externalGet,
                    externalGetPrevious,
                    externalReSet,
                }),
                true,
            );
        };
        return createPxaClass({
            data: initialValue,
            IMMUTABLE_NAME: currImmutableKeyName,
            ADD_FN: currAddFn,
            externalSet,
            externalGet,
            externalGetPrevious,
            externalReSet,
        });
    });
};
export default createPxaContext;
