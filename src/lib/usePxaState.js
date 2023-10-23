import { useCallback, useRef, useState, useMemo } from "react";
import { freezedState, setState, findDifferences } from "./tools/functions";
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
            immutableName: currImmutableKeyName,
        });
        if (currChangeListener && typeof currChangeListener === "function") {
            const diffObj = findDifferences(dataRef?.current, newData);
            const keys = Object.keys(diffObj);
            if (keys?.length > 0) currChangeListener(diffObj, keys);
        }
        prevRef.current = dataRef.current;
        dataRef.current = newData;
        setData(newData);
    }, []);
    const externalPrepareContext = useCallback((immerFn, settings) => {
        const { immutableKeyName: immutableKeyName2, changeListener: changeListener2, ...addFn2 } = settings || {};
        currChangeListener = changeListener2 || changeListener1;
        currImmutableKeyName = immutableKeyName2 || immutableKeyName1;
        currAddFn = { ...currAddFn, ...addFn2 };
        const newData = setState({
            fn: immerFn,
            currRef: dataRef,
            immutableName: currImmutableKeyName,
        });
        prevRef.current = dataRef.current;
        dataRef.current = newData;
        setData(newData);
        return newData;
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
                externalPrepareContext,
                changeListener: currChangeListener,
            }),
        [dataRef?.current],
    );
};
export default usePxaState;
