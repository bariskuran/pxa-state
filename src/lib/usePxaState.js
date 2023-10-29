import { useCallback, useRef, useState, useMemo } from "react";
import { freezedState, setState } from "./tools/functions";
import { triggerChangeListener } from "./tools/functions";
import { createPxaClass } from "./tools/createPxaClass";

export const usePxaState = (initialState, settings = {}) => {
    let currAddFn = {};
    let currImmutableKeyName;
    let currChangeListener;
    const prevRef = useRef();

    /**
     * Settings
     * !!! if smth is change, update createPxaContext file as well. !!!
     */
    const {
        immutableKeyName: immutableKeyName1 = "value",
        changeListener: changeListener1,
        ...addFn1
    } = settings || {};
    currAddFn = { ...currAddFn, ...addFn1 };
    currImmutableKeyName = immutableKeyName1;
    currChangeListener = changeListener1;

    /**
     * States
     */
    const freezed = useMemo(() => freezedState(initialState), [initialState]);
    const [data, setData] = useState(freezed);
    const dataRef = useRef(freezed);

    /**
     * External Set and Get
     */
    const externalSet = useCallback((incoming) => {
        const newData = setState({
            fn: incoming,
            currRef: dataRef,
            prevRef: prevRef,
            immutableName: currImmutableKeyName,
        });

        if (currChangeListener && typeof currChangeListener === "function") {
            triggerChangeListener(dataRef, newData, currImmutableKeyName, currChangeListener);
        }

        prevRef.current = dataRef.current;
        dataRef.current = newData;
        setData(newData);
    }, []);
    const externalReSet = useCallback((incoming, settings) => {
        if (settings) {
            const { immutableKeyName: immutableKeyName2, changeListener: changeListener2, ...addFn2 } = settings || {};

            currImmutableKeyName = immutableKeyName2 || immutableKeyName1;
            currAddFn = { ...currAddFn, ...addFn2 };
            currChangeListener = changeListener2 || changeListener1;
        }
        const newData = setState({
            fn: incoming,
            currRef: dataRef,
            prevRef: prevRef,
            immutableName: currImmutableKeyName,
        });

        if (currChangeListener && typeof currChangeListener === "function") {
            triggerChangeListener(dataRef, newData, currImmutableKeyName, currChangeListener);
        }

        prevRef.current = dataRef.current;
        dataRef.current = newData;
        setData(newData);
    }, []);
    const externalGet = () => dataRef?.current;
    const externalGetPrevious = () => prevRef?.current;

    /**
     * Return
     */
    return useMemo(
        () =>
            createPxaClass({
                data,
                IMMUTABLE_NAME: currImmutableKeyName,
                ADD_FN: currAddFn,
                externalSet,
                externalGet,
                externalGetPrevious,
                externalReSet,
                changeListener: currChangeListener,
            }),
        [dataRef?.current],
    );
};
export default usePxaState;
