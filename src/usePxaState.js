import { useCallback, useRef, useState, useMemo } from "react";
import { freezedState, setState } from "./tools/functions";
import { createPxaClass } from "./tools/createPxaClass";

export const usePxaState = (initialState, settings = {}) => {
    /**
     * Settings
     * !!! if smth is change, update createPxaContext file as well. !!!
     */
    const { immutableKeyName: IMMUTABLE_NAME = "value", ...ADD_FN } = settings;

    /**
     * States
     */
    const freezed = useMemo(() => freezedState(initialState), [initialState]);
    const [data, setData] = useState(freezed);
    const dataRef = useRef(freezed);

    /**
     * External Set and Get
     */
    const externalSet = useCallback((immerFn) => setState(immerFn, dataRef, IMMUTABLE_NAME, setData), []);
    const externalGet = () => dataRef?.current;
    const states = { data, IMMUTABLE_NAME, ADD_FN, externalSet, externalGet };

    /**
     * Return
     */
    return useMemo(() => createPxaClass({ ...states }), [dataRef?.current]);
};
export default usePxaState;
