import { useEffect } from "react";
import usePxaContext from "./usePxaContext";

const useSetContext = (contextFile, incomingFunction, fnOrStr) => {
    const { reSet } = usePxaContext(contextFile, (s) => [s.reSet]);
    const setData = async () => {
        const response = await incomingFunction();
        const [initialValue = {}, settings = {}] = response;
        reSet(initialValue, settings);
    };
    useEffect(() => {
        setData();
    }, []);

    const state = usePxaContext(contextFile, fnOrStr);
    if (!fnOrStr) return null;
    return state;
};
export default useSetContext;
