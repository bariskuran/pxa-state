import { useEffect } from "react";
import { usePxaState } from "./index";

const useDebouncedValue = (initialValue, delay = 500) => {
    const { value, debValue, timeout, set } = usePxaState({
        value: initialValue,
        debValue: initialValue,
        timeout: undefined,
    });

    useEffect(() => {
        clearTimeout(timeout);
        set({
            timeout: setTimeout(() => {
                set({ debValue: value });
            }, delay),
        });

        return () => {
            clearTimeout(timeout);
        };
    }, [value, delay]);

    const setUndebValue = (p) => set(p);
    return [debValue, setUndebValue, value];
};

export default useDebouncedValue;
